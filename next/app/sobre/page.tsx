import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import HexMesh from "@/components/ui/hex-mesh";

export const metadata: Metadata = {
  title: "Sobre — TimeLabs",
  description:
    "Quem está por trás da TimeLabs. Founders, princípios e a razão pela qual existimos.",
  alternates: { canonical: "/sobre" },
};

type Founder = {
  initials: string;
  name: string;
  role: string;
};

const founders: Founder[] = [
  { initials: "EF", name: "Enzo Ferraz", role: "Founder" },
  { initials: "FF", name: "Francisco Fonseca", role: "COO" },
  { initials: "MP", name: "Marcos Paes", role: "CTO" },
];

const principios = [
  {
    title: "Outcome, não ferramenta.",
    body: "Não vendemos plataforma. Vendemos horas de volta no calendário do seu time. As escolhas técnicas são meio — nunca a oferta.",
  },
  {
    title: "Zero lock-in.",
    body: "Todo o código é seu, em todo ponto do contrato. Você decide quem mantém. Não há refém técnico do nosso lado.",
  },
  {
    title: "Diagnóstico antes da proposta.",
    body: "Mapeamos a operação com a sua equipe antes de cobrar qualquer coisa. Se não conseguimos ajudar, dizemos. E indicamos quem consegue.",
  },
];

export default function SobrePage() {
  return (
    <>
      <a href="#main-content" className="skip-link">
        Pular para o conteúdo
      </a>
      <Header />
      <main id="main-content" className="pt-[50px]">
        {/* HERO */}
        <section
          style={{
            position: "relative",
            isolation: "isolate",
            background: "var(--bg)",
            padding: "var(--sp-8) var(--sp-5) var(--sp-6)",
          }}
        >
          <HexMesh variant="light" density={0.06} showPath={false} showPulse={false} />
          <div style={{ position: "relative", zIndex: 1, maxWidth: 1080, margin: "0 auto" }}>
            <p className="eyebrow">Sobre</p>
            <h1 className="hl-gloock">Quem está por trás.</h1>
            <p
              style={{
                fontFamily: "var(--font-italic)",
                fontStyle: "italic",
                fontSize: "clamp(22px, 2.6vw, 32px)",
                lineHeight: 1.3,
                color: "var(--fg-soft)",
                margin: "var(--sp-2) 0 0",
                maxWidth: 720,
              }}
            >
              Três pessoas, um método, uma razão de existir.
            </p>
          </div>
        </section>

        {/* FOUNDERS */}
        <section
          style={{
            position: "relative",
            isolation: "isolate",
            background: "var(--bg-alt)",
            padding: "var(--sp-7) var(--sp-5)",
          }}
        >
          <div style={{ maxWidth: 1080, margin: "0 auto" }}>
            <p className="eyebrow">Fundadores</p>
            <div className="founders-grid">
              {founders.map((f) => (
                <article key={f.name} className="founder-card">
                  <div className="founder-photo" aria-hidden="true">
                    <span className="founder-initials">{f.initials}</span>
                  </div>
                  <h2 className="founder-name">{f.name}</h2>
                  <p className="founder-role">{f.role}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* NARRATIVA — por que existimos */}
        <section
          style={{
            position: "relative",
            isolation: "isolate",
            background: "var(--bg)",
            padding: "var(--sp-8) var(--sp-5)",
          }}
        >
          <HexMesh variant="light" density={0.05} showPath={false} showPulse={false} />
          <div style={{ position: "relative", zIndex: 1, maxWidth: 760, margin: "0 auto" }}>
            <p className="eyebrow">Por que existimos</p>
            <h2 className="hl-gloock hl-mid" style={{ marginBottom: "var(--sp-4)" }}>
              Tempo é a única coisa que não volta.
            </h2>
            <div className="narrative-body">
              <p>
                Mesmo assim, equipes inteiras gastam metade do dia atualizando
                planilhas, copiando dados de um sistema para o outro, respondendo
                o mesmo e-mail toda semana. O trabalho que importa fica para o
                fim do expediente — quando todo mundo já está cansado.
              </p>
              <p>
                A TimeLabs nasce dessa constatação: existe uma camada inteira de
                trabalho que máquinas podem fazer melhor — desde que alguém com
                método as ensine. Não é mágica, não é hype. É o resultado de
                olhar para um processo com os olhos de quem viveu a operação.
              </p>
              <p>
                Não vendemos software. Não vendemos plataforma. Vendemos horas
                devolvidas ao calendário do seu time, e a tranquilidade de que
                processos críticos não dependem de uma única pessoa se lembrar
                de fazer.
              </p>
            </div>
          </div>
        </section>

        {/* PRINCÍPIOS */}
        <section
          style={{
            position: "relative",
            isolation: "isolate",
            background: "var(--bg-alt)",
            padding: "var(--sp-7) var(--sp-5)",
          }}
        >
          <div style={{ maxWidth: 1080, margin: "0 auto" }}>
            <p className="eyebrow">Princípios</p>
            <h2 className="hl-gloock hl-mid" style={{ marginBottom: "var(--sp-5)" }}>
              No que acreditamos.
            </h2>
            <div className="principios-grid">
              {principios.map((p) => (
                <div key={p.title} className="principio-card">
                  <h3 className="principio-title">{p.title}</h3>
                  <p className="principio-body">{p.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section
          style={{
            background: "var(--ink)",
            color: "var(--paper)",
            padding: "var(--sp-7) var(--sp-5)",
            textAlign: "center",
          }}
        >
          <div style={{ maxWidth: 640, margin: "0 auto" }}>
            <p className="hl-italic hl-gold" style={{ textAlign: "center" }}>
              Quer entender se faz sentido pra sua operação?
            </p>
            <Link href="/#agendar" className="cta-link">
              Agendar conversa
            </Link>
          </div>
        </section>
      </main>
      <Footer />

      <style>{`
        /* ---- FOUNDERS ---- */
        .founders-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: var(--sp-5);
          margin-top: var(--sp-4);
        }
        .founder-card {
          text-align: left;
        }
        .founder-photo {
          aspect-ratio: 1 / 1;
          background: linear-gradient(135deg, var(--paper-dim), var(--bg));
          border: 1px solid color-mix(in srgb, var(--mercury) 35%, transparent);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: var(--sp-3);
          position: relative;
        }
        [data-theme="dark"] .founder-photo {
          background: linear-gradient(135deg, #3a322a, var(--bg));
        }
        .founder-photo::before {
          content: "";
          position: absolute;
          inset: 8px;
          border: 1px solid color-mix(in srgb, var(--fg) 8%, transparent);
          pointer-events: none;
        }
        .founder-initials {
          font-family: var(--font-display);
          font-size: clamp(48px, 6vw, 72px);
          letter-spacing: var(--track-display);
          color: var(--mercury);
          opacity: 0.85;
        }
        .founder-name {
          font-family: var(--font-display);
          font-size: 26px;
          line-height: 1.15;
          color: var(--fg);
          margin: 0 0 4px;
          font-weight: 400;
        }
        .founder-role {
          font-family: var(--font-mono);
          font-size: 11px;
          letter-spacing: 2.5px;
          text-transform: uppercase;
          color: var(--fg-soft);
          margin: 0;
        }

        /* ---- NARRATIVE ---- */
        .narrative-body {
          font-family: var(--font-body);
          font-size: 18px;
          line-height: 1.7;
          color: var(--fg);
        }
        .narrative-body p {
          margin: 0 0 var(--sp-3);
        }
        .narrative-body p:last-child {
          margin-bottom: 0;
        }

        /* ---- PRINCÍPIOS ---- */
        .principios-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: var(--sp-5);
        }
        .principio-card {
          border-top: 1px solid var(--fg);
          padding-top: var(--sp-3);
        }
        .principio-title {
          font-family: var(--font-display);
          font-size: 24px;
          line-height: 1.2;
          color: var(--fg);
          margin: 0 0 var(--sp-2);
          font-weight: 400;
        }
        .principio-body {
          font-family: var(--font-body);
          font-size: 16px;
          line-height: 1.6;
          color: var(--fg);
          margin: 0;
        }

        /* ---- CTA ---- */
        .cta-link {
          display: inline-block;
          margin-top: var(--sp-3);
          font-family: var(--font-mono);
          font-size: 11px;
          letter-spacing: 3px;
          text-transform: uppercase;
          text-decoration: none;
          color: var(--ink);
          background: var(--mercury);
          padding: 14px 32px;
          transition: background 0.25s var(--ease);
        }
        .cta-link:hover {
          background: var(--mercury-soft);
        }

        /* ---- RESPONSIVE ---- */
        @media (max-width: 1024px) {
          .founders-grid {
            grid-template-columns: repeat(3, 1fr);
            gap: var(--sp-4);
          }
          .principios-grid {
            grid-template-columns: 1fr;
            gap: var(--sp-4);
          }
        }
        @media (max-width: 639px) {
          .founders-grid {
            grid-template-columns: 1fr;
            gap: var(--sp-5);
          }
          .founder-photo {
            max-width: 240px;
          }
        }
      `}</style>
    </>
  );
}
