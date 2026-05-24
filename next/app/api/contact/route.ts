import { Resend } from "resend";
import { NextResponse } from "next/server";

const TO_EMAIL = "contato@timelabs.com.br";
const FROM_EMAIL = "TimeLabs <noreply@timelabs.com.br>";

/* Rate-limit in-memory por IP. Best-effort — vive enquanto o container Vercel
   estiver quente. Em produção séria trocar por Vercel KV ou Upstash. */
const RATE_WINDOW_MS = 60_000;
const RATE_MAX = 5;
const hits = new Map<string, number[]>();

function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function getClientIp(request: Request): string {
  const fwd = request.headers.get("x-forwarded-for");
  if (fwd) return fwd.split(",")[0].trim();
  return request.headers.get("x-real-ip") ?? "unknown";
}

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const arr = (hits.get(ip) ?? []).filter((t) => now - t < RATE_WINDOW_MS);
  if (arr.length >= RATE_MAX) {
    hits.set(ip, arr);
    return true;
  }
  arr.push(now);
  hits.set(ip, arr);
  return false;
}

export async function POST(request: Request) {
  const ip = getClientIp(request);
  if (rateLimited(ip)) {
    return NextResponse.json({ error: "rate_limited" }, { status: 429 });
  }

  let body: { email?: string; honeypot?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "invalid_body" }, { status: 400 });
  }

  const { email, honeypot } = body;

  /* Honeypot: se preenchido, devolver ok silenciosamente — bot pensa que passou */
  if (honeypot && honeypot.trim()) {
    return NextResponse.json({ ok: true });
  }

  if (!email || typeof email !== "string" || !isValidEmail(email)) {
    return NextResponse.json({ error: "invalid_email" }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("RESEND_API_KEY not configured");
    return NextResponse.json({ error: "not_configured" }, { status: 503 });
  }

  const resend = new Resend(apiKey);

  try {
    const { error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: TO_EMAIL,
      replyTo: email,
      subject: "Novo lead — TimeLabs",
      text: [
        "Novo contato recebido pelo site TimeLabs.",
        "",
        `E-mail: ${email}`,
        "",
        "Responda diretamente a este e-mail para falar com o lead.",
      ].join("\n"),
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json({ error: "send_failed" }, { status: 502 });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Contact route exception:", err);
    return NextResponse.json({ error: "server_error" }, { status: 500 });
  }
}
