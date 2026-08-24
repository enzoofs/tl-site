import type { Metadata } from "next";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { UnsubscribePanel } from "./unsubscribe-panel";

export const metadata: Metadata = {
  title: "Descadastro — TimeLabs",
  description: "Pare de receber e-mails de prospecção da TimeLabs.",
  alternates: { canonical: "/descadastro" },
  robots: { index: false, follow: false },
};

export default async function DescadastroPage({
  searchParams,
}: {
  searchParams: Promise<{ email?: string; t?: string }>;
}) {
  const params = await searchParams;
  const email = (params.email ?? "").trim();
  const token = (params.t ?? "").trim();

  return (
    <>
      <a href="#main-content" className="skip-link">
        Pular para o conteúdo
      </a>
      <Header />
      <main id="main-content" className="pt-[56px]">
        <article className="legal-page">
          <p className="eyebrow">Preferências de e-mail</p>
          <h1 className="hl-gloock">Descadastro</h1>
          <p className="legal-lede">
            Sem ressentimento. Confirme abaixo e você não recebe mais
            e-mails de prospecção da TimeLabs.
          </p>
          <UnsubscribePanel email={email} token={token} />
        </article>
      </main>
      <Footer />

      <style>{`
        .legal-page {
          max-width: 640px;
          margin: 0 auto;
          padding: var(--sp-7) var(--sp-4) var(--sp-8);
          color: var(--fg);
        }
        .legal-page .eyebrow { margin-bottom: var(--sp-2); }
        .legal-page .hl-gloock {
          font-size: clamp(36px, 5vw, 52px);
          line-height: 1.1;
          margin: 0 0 var(--sp-2);
        }
        .legal-lede {
          font-family: var(--font-italic);
          font-style: italic;
          font-size: 19px;
          line-height: 1.55;
          color: var(--fg-soft);
          margin: 0 0 var(--sp-5);
          padding-bottom: var(--sp-5);
          border-bottom: 1px solid color-mix(in srgb, var(--fg) 12%, transparent);
        }
        .unsub-panel {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: var(--sp-3);
        }
        .unsub-email {
          font-family: var(--font-mono);
          font-size: 14px;
          letter-spacing: 0.5px;
          padding: 10px 16px;
          background: var(--bg-alt);
          border: 1px solid color-mix(in srgb, var(--fg) 15%, transparent);
        }
        .unsub-btn {
          font-family: var(--font-mono);
          font-size: 13px;
          letter-spacing: 2px;
          text-transform: uppercase;
          font-weight: 600;
          background: var(--mercury);
          color: var(--ink);
          border: none;
          padding: 16px 30px;
          cursor: pointer;
          transition: background 0.15s ease, transform 0.15s ease;
        }
        .unsub-btn:hover:not(:disabled) {
          background: var(--mercury-soft);
          transform: translateY(-1px);
        }
        .unsub-btn:focus-visible {
          outline: 2px solid var(--fg);
          outline-offset: 3px;
        }
        .unsub-btn:disabled { opacity: 0.6; cursor: default; }
        .unsub-success {
          font-family: var(--font-body);
          font-size: 17px;
          line-height: 1.6;
          color: var(--fg);
        }
        .unsub-error {
          font-family: var(--font-body);
          font-size: 15px;
          line-height: 1.6;
          color: #9c4a34;
        }
      `}</style>
    </>
  );
}
