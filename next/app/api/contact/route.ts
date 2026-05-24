/**
 * Lead capture route — Resend integration.
 *
 * DISABLED while the site is deployed via GitHub Pages (`output: "export"` in
 * next.config.ts). POST handlers are incompatible with static export, and
 * keeping the export active prevents Next.js from emitting the `out/` folder.
 *
 * TO RE-ENABLE after migrating to Vercel:
 *   1. In next.config.ts, remove `output: "export"`, `basePath`, `assetPrefix`.
 *   2. Uncomment the block below.
 *   3. Set RESEND_API_KEY on Vercel (Settings → Environment Variables).
 *   4. Verify `timelabs.com.br` on resend.com (DKIM + SPF on GoDaddy).
 *
 * Until then the contact form falls back gracefully to a mailto link.
 */

export const dynamic = "force-static";

export async function GET() {
  return Response.json({ error: "not_configured" }, { status: 503 });
}

/*
import { Resend } from "resend";
import { NextResponse } from "next/server";

const TO_EMAIL = "contato@timelabs.com.br";
const FROM_EMAIL = "TimeLabs <noreply@timelabs.com.br>";

function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export async function POST(request: Request) {
  let body: { email?: string; honeypot?: string };

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "invalid_body" }, { status: 400 });
  }

  const { email, honeypot } = body;

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
*/
