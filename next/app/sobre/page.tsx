import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import HexMesh from "@/components/ui/hex-mesh";
import SectionReveal from "@/components/ui/section-reveal";
import { WhatsAppFloat } from "@/components/ui/whatsapp-float";

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
  bio: string;
  bioPlaceholder?: boolean;
  photoUrl?: string;
};

const founders: Founder[] = [
  {
    initials: "EF",
    name: "Enzo Ferraz",
    role: "Founder",
    bio: "Bio em breve.",
    bioPlaceholder: true,
  },
  {
    initials: "FF",
    name: "Francisco Fonseca",
    role: "COO",
    bio: "Bio em breve.",
    bioPlaceholder: true,
  },
  {
    initials: "MP",
    name: "Marcos Paes",
    role: "CTO",
    bio: "Bio em breve.",
    bioPlaceholder: true,
  },
];

const principios = [
  {
    title: "Resultado, não ferramenta.",
    body: "Não vendemos plataforma. Vendemos horas de volta no calendário do seu time. As escolhas técnicas são meio — nunca a oferta.",
  },
  {
    title: "Manutenção é parte do produto.",
    body: "Quando algo dá errado, a gente corrige. Quando o negócio muda, a gente adapta. Sem fatura surpresa, sem renegociação.",
  },
  {
    title: "Diagnóstico antes da proposta.",
    body: "Mapeamos a operação com a sua equipe antes de cobrar qualquer coisa. Se não conseguimos ajudar, dizemos. E indicamos quem consegue.",
  },
];

/* Pointy-top regular hexagon, inscribed in a 173×200 viewBox.
   Perimeter ≈ 600 units (6 edges × ~100). The animated "cometa" uses
   stroke-dasharray to draw a short bright segment and stroke-dashoffset
   to chase it around the polygon. */
function FounderHex({
  initials,
  photoUrl,
  name,
  index = 0,
}: {
  initials: string;
  photoUrl?: string;
  name: string;
  index?: number;
}) {
  const clipId = `hex-clip-${initials.toLowerCase()}`;
  const outerPoints = "86.5,0 173,50 173,150 86.5,200 0,150 0,50";
  const innerPoints = "86.5,8 165.5,54 165.5,146 86.5,192 7.5,146 7.5,54";

  return (
    <div className="founder-hex-wrap">
      <svg
        viewBox="-3 -3 179 206"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label={`Imagem de ${name}`}
        className="founder-hex"
      >
        <defs>
          <linearGradient id={`grad-${clipId}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="var(--paper-dim)" />
            <stop offset="100%" stopColor="var(--bg)" />
          </linearGradient>
          <clipPath id={clipId}>
            <polygon points={outerPoints} />
          </clipPath>
        </defs>

        {photoUrl ? (
          <image
            href={photoUrl}
            width="173"
            height="200"
            preserveAspectRatio="xMidYMid slice"
            clipPath={`url(#${clipId})`}
          />
        ) : (
          <polygon points={outerPoints} fill={`url(#grad-${clipId})`} />
        )}

        {/* Inner subtle stroke — editorial inset */}
        <polygon
          points={innerPoints}
          fill="none"
          stroke="currentColor"
          strokeOpacity="0.08"
          strokeWidth="1"
        />

        {/* Faint base hex outline — keeps the shape readable between sweeps */}
        <polygon
          points={outerPoints}
          fill="none"
          stroke="var(--mercury)"
          strokeWidth="1"
          strokeOpacity="0.22"
        />

        {/* Animated gold comet — short dash chases the perimeter */}
        <polygon
          points={outerPoints}
          fill="none"
          stroke="var(--mercury)"
          strokeWidth="2"
          strokeLinecap="round"
          className="founder-hex-trail"
          style={{ animationDelay: `${index * -1.7}s` }}
        />

        {!photoUrl && (
          <text
            x="86.5"
            y="100"
            textAnchor="middle"
            dominantBaseline="central"
            className="founder-initials"
          >
            {initials}
          </text>
        )}
      </svg>
    </div>
  );
}

export default function SobrePage() {
  return (
    <>
      <a href="#main-content" className="skip-link">
        Pular para o conteúdo
      </a>
      <Header />
      <main id="main-content" className="pt-[56px]">
        {/* HERO */}
        <SectionReveal as="section" data-hex-density="0.06">
          <div
            style={{
              position: "relative",
              isolation: "isolate",
              background: "var(--bg)",
              padding: "var(--sp-8) var(--sp-5) var(--sp-6)",
            }}
          >
            <HexMesh variant="light" density={0.06} />
            <div
              style={{
                position: "relative",
                zIndex: 1,
                maxWidth: 1080,
                margin: "0 auto",
              }}
            >
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
          </div>
        </SectionReveal>

        {/* FOUNDERS */}
        <SectionReveal as="section" data-hex-density="0.05">
          <div
            style={{
              position: "relative",
              isolation: "isolate",
              background: "var(--bg-alt)",
              padding: "var(--sp-7) var(--sp-5)",
            }}
          >
            <HexMesh variant="light" density={0.05} />
            <div
              style={{
                position: "relative",
                zIndex: 1,
                maxWidth: 1080,
                margin: "0 auto",
              }}
            >
              <p className="eyebrow">Fundadores</p>
              <div className="founders-grid">
                {founders.map((f, i) => (
                  <article key={f.name} className="founder-card">
                    <FounderHex
                      initials={f.initials}
                      photoUrl={f.photoUrl}
                      name={f.name}
                      index={i}
                    />
                    <h2 className="founder-name">{f.name}</h2>
                    <p className="founder-role">{f.role}</p>
                    <p
                      className={
                        f.bioPlaceholder
                          ? "founder-bio founder-bio--placeholder"
                          : "founder-bio"
                      }
                    >
                      {f.bio}
                    </p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </SectionReveal>

        {/* NARRATIVA — por que existimos */}
        <SectionReveal as="section" data-hex-density="0.05">
          <div
            style={{
              position: "relative",
              isolation: "isolate",
              background: "var(--bg)",
              padding: "var(--sp-8) var(--sp-5)",
            }}
          >
            <HexMesh variant="light" density={0.05} />
            <div
              style={{
                position: "relative",
                zIndex: 1,
                maxWidth: 760,
                margin: "0 auto",
              }}
            >
              <p className="eyebrow">Por que existimos</p>
              <h2
                className="hl-gloock hl-mid"
                style={{ marginBottom: "var(--sp-4)" }}
              >
                Tempo é a única coisa que não volta.
              </h2>
              <div className="narrative-body">
                <p>
                  Mesmo assim, equipes inteiras gastam metade do dia
                  atualizando planilha, copiando dado de um sistema pra outro,
                  respondendo o mesmo e-mail toda semana. O trabalho que
                  importa fica pro fim do expediente, quando ninguém mais
                  aguenta pensar.
                </p>
                <p>
                  A TimeLabs nasce dessa constatação. Existe uma camada
                  inteira de trabalho que máquina faz melhor que gente —
                  desde que alguém com método ensine. Não é mágica. Não é
                  hype. É o resultado de olhar pra um processo com os olhos
                  de quem já viveu a operação.
                </p>
                <p>
                  Não vendemos software. Não vendemos plataforma. Vendemos
                  horas de volta no calendário do seu time, e a tranquilidade
                  de que processo crítico não depende de alguém se lembrar
                  de fazer.
                </p>
              </div>
            </div>
          </div>
        </SectionReveal>

        {/* PRINCÍPIOS */}
        <SectionReveal as="section" data-hex-density="0.06">
          <div
            style={{
              position: "relative",
              isolation: "isolate",
              background: "var(--bg-alt)",
              padding: "var(--sp-7) var(--sp-5)",
            }}
          >
            <HexMesh variant="light" density={0.06} />
            <div
              style={{
                position: "relative",
                zIndex: 1,
                maxWidth: 1080,
                margin: "0 auto",
              }}
            >
              <p className="eyebrow">Princípios</p>
              <h2
                className="hl-gloock hl-mid"
                style={{ marginBottom: "var(--sp-5)" }}
              >
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
          </div>
        </SectionReveal>

        {/* CTA */}
        <SectionReveal as="section" data-hex-density="0.10">
          <div
            style={{
              position: "relative",
              isolation: "isolate",
              background: "var(--ink)",
              color: "var(--paper)",
              padding: "var(--sp-7) var(--sp-5)",
              textAlign: "center",
              overflow: "hidden",
            }}
          >
            <HexMesh variant="dark" density={0.10} />
            <div
              style={{
                position: "relative",
                zIndex: 1,
                maxWidth: 640,
                margin: "0 auto",
              }}
            >
              <p
                className="hl-italic hl-gold"
                style={{ textAlign: "center", marginBottom: "var(--sp-3)" }}
              >
                Quer entender se faz sentido pra sua operação?
              </p>
              <Link href="/#agendar" className="cta-link">
                Agendar conversa
              </Link>
            </div>
          </div>
        </SectionReveal>
      </main>
      <Footer />
      <WhatsAppFloat />

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
          color: var(--fg);
        }
        .founder-hex-wrap {
          width: 100%;
          max-width: 220px;
          margin: 0 0 var(--sp-3);
          /* Depth shadow movida pro wrapper — composita uma vez, nao
             interfere com a animacao do trail dentro do SVG. */
          filter: drop-shadow(0 8px 24px rgba(43, 37, 32, 0.08));
        }
        [data-theme="dark"] .founder-hex-wrap {
          filter: drop-shadow(0 8px 24px rgba(0, 0, 0, 0.35));
        }
        .founder-hex {
          width: 100%;
          height: auto;
          display: block;
          overflow: visible;
        }
        /* Cometa dourado correndo o perimetro do hexagono.
           Perimetro ≈ 600 unidades no viewBox → trail ~ 78u + gap ~ 522u.
           will-change isola em layer GPU pra o filter nao forcar repaint
           do SVG inteiro a cada frame. */
        .founder-hex-trail {
          stroke-dasharray: 78 522;
          stroke-dashoffset: 0;
          animation: founder-hex-trail-spin 5.2s linear infinite;
          will-change: stroke-dashoffset;
        }
        @keyframes founder-hex-trail-spin {
          to { stroke-dashoffset: -600; }
        }
        @media (prefers-reduced-motion: reduce) {
          .founder-hex-trail {
            animation: none;
            stroke-dasharray: none;
            stroke-opacity: 0.9;
          }
        }
        .founder-initials {
          font-family: var(--font-display);
          font-size: 56px;
          letter-spacing: var(--track-display);
          fill: var(--mercury);
          opacity: 0.9;
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
          color: var(--gold-text);
          margin: 0 0 var(--sp-2);
        }
        .founder-bio {
          font-family: var(--font-body);
          font-size: 15px;
          line-height: 1.6;
          color: var(--fg);
          margin: 0;
        }
        .founder-bio--placeholder {
          font-family: var(--font-italic);
          font-style: italic;
          color: var(--fg-soft);
          opacity: 0.7;
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
        @media (max-width: 768px) {
          .founders-grid {
            grid-template-columns: 1fr;
            gap: var(--sp-5);
          }
          .founder-hex-wrap {
            max-width: 180px;
          }
        }
      `}</style>
    </>
  );
}
