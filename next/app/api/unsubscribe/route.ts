import { NextResponse } from "next/server";
import { createHmac, timingSafeEqual } from "node:crypto";

/* Mesma assinatura HMAC-SHA256 (truncada a 24 hex) gerada pelo
   Prospector em src/outreach/unsubscribe.py - as duas pontas precisam
   compartilhar UNSUB_SECRET. */
function sign(email: string): string {
  const secret = process.env.UNSUB_SECRET;
  if (!secret) throw new Error("UNSUB_SECRET not configured");
  return createHmac("sha256", secret)
    .update(email.trim().toLowerCase())
    .digest("hex")
    .slice(0, 24);
}

function safeEqual(a: string, b: string): boolean {
  const bufA = Buffer.from(a);
  const bufB = Buffer.from(b);
  if (bufA.length !== bufB.length) return false;
  return timingSafeEqual(bufA, bufB);
}

const OPT_OUT_MARKER = "NAO-CONTATAR";

interface AirtableRecord {
  id: string;
  fields: Record<string, unknown>;
}

export async function POST(request: Request) {
  let body: { email?: string; token?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "invalid_body" }, { status: 400 });
  }

  const email = (body.email ?? "").trim();
  const token = (body.token ?? "").trim();
  if (!email || !token) {
    return NextResponse.json({ error: "missing_fields" }, { status: 400 });
  }

  const apiKey = process.env.AIRTABLE_API_KEY;
  const baseId = process.env.AIRTABLE_BASE_ID;
  const tableName = process.env.AIRTABLE_TABLE_NAME || "Leads";

  if (!process.env.UNSUB_SECRET || !apiKey || !baseId) {
    console.error("Unsubscribe route not configured (missing env vars)");
    return NextResponse.json({ error: "not_configured" }, { status: 503 });
  }

  let expected: string;
  try {
    expected = sign(email);
  } catch {
    return NextResponse.json({ error: "not_configured" }, { status: 503 });
  }

  if (!safeEqual(token, expected)) {
    return NextResponse.json({ error: "invalid_token" }, { status: 403 });
  }

  const escapedEmail = email.toLowerCase().replace(/"/g, '\\"');
  const formula = `LOWER({Email}) = "${escapedEmail}"`;
  const searchUrl =
    `https://api.airtable.com/v0/${baseId}/${encodeURIComponent(tableName)}` +
    `?filterByFormula=${encodeURIComponent(formula)}`;

  const searchRes = await fetch(searchUrl, {
    headers: { Authorization: `Bearer ${apiKey}` },
  });

  if (!searchRes.ok) {
    console.error("Airtable search failed:", await searchRes.text());
    return NextResponse.json({ error: "airtable_error" }, { status: 502 });
  }

  const searchData = (await searchRes.json()) as { records?: AirtableRecord[] };
  const records = searchData.records ?? [];

  if (records.length === 0) {
    /* Nenhum lead com esse email no Airtable - do ponto de vista de
       quem clicou, a intencao foi cumprida (nao ha nada pra remover) */
    return NextResponse.json({ ok: true, found: false });
  }

  const timestamp = new Date().toISOString().slice(0, 16).replace("T", " ");
  const updates = records.slice(0, 10).map((record) => {
    const notasAtual = String(record.fields["Notas"] ?? "").trim();
    const notas = notasAtual.includes(OPT_OUT_MARKER)
      ? notasAtual
      : `${notasAtual}\n[${timestamp}] Descadastro via site - ${OPT_OUT_MARKER}`.trim();
    return { id: record.id, fields: { Notas: notas } };
  });

  const patchRes = await fetch(
    `https://api.airtable.com/v0/${baseId}/${encodeURIComponent(tableName)}`,
    {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ records: updates }),
    }
  );

  if (!patchRes.ok) {
    console.error("Airtable update failed:", await patchRes.text());
    return NextResponse.json({ error: "airtable_error" }, { status: 502 });
  }

  return NextResponse.json({ ok: true, found: true, count: records.length });
}
