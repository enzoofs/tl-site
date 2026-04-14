"use client";

import { useState } from "react";
import HexMesh from "@/components/ui/hex-mesh";

/* ------------------------------------------------------------------ */
/* SVG glyph icons (56x56) for each operation                        */
/* ------------------------------------------------------------------ */

const DUR = "2s";

function dash(hovered: boolean) {
  return {
    strokeDasharray: 200,
    strokeDashoffset: hovered ? 0 : 200,
    transition: `stroke-dashoffset ${DUR} var(--ease)`,
  };
}

/* Gear/cog — universal automation symbol */
function GlyphAutomatizar({ hovered }: { hovered: boolean }) {
  return (
    <svg width="56" height="56" viewBox="0 0 56 56" fill="none" aria-hidden="true">
      <path
        d="M28 10 L31 16 L37 14 L36 21 L43 22 L39 27 L43 32 L36 33 L37 40 L31 38 L28 44 L25 38 L19 40 L20 33 L13 32 L17 27 L13 22 L20 21 L19 14 L25 16 Z"
        stroke="var(--paper)"
        strokeWidth="1.5"
        strokeLinejoin="round"
        fill="none"
        style={dash(hovered)}
      />
      <circle cx="28" cy="27" r="6" stroke="var(--mercury)" strokeWidth="1.5" fill="none" style={dash(hovered)} />
    </svg>
  );
}

/* Two interlocking chain links — connection/integration */
function GlyphIntegrar({ hovered }: { hovered: boolean }) {
  return (
    <svg width="56" height="56" viewBox="0 0 56 56" fill="none" aria-hidden="true">
      <rect
        x="6" y="20" width="22" height="16" rx="8"
        stroke="var(--paper)"
        strokeWidth="1.5"
        fill="none"
        style={dash(hovered)}
      />
      <rect
        x="28" y="20" width="22" height="16" rx="8"
        stroke="var(--mercury)"
        strokeWidth="1.5"
        fill="none"
        style={dash(hovered)}
      />
    </svg>
  );
}

/* Upward diagonal arrow — improvement/optimization */
function GlyphOtimizar({ hovered }: { hovered: boolean }) {
  return (
    <svg width="56" height="56" viewBox="0 0 56 56" fill="none" aria-hidden="true">
      <line
        x1="14" y1="42" x2="42" y2="14"
        stroke="var(--paper)"
        strokeWidth="1.5"
        strokeLinecap="round"
        style={dash(hovered)}
      />
      <polyline
        points="26,14 42,14 42,30"
        stroke="var(--mercury)"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        style={dash(hovered)}
      />
    </svg>
  );
}

/* Three ascending bars — chart/data analysis */
function GlyphAnalisar({ hovered }: { hovered: boolean }) {
  return (
    <svg width="56" height="56" viewBox="0 0 56 56" fill="none" aria-hidden="true">
      <line x1="16" y1="44" x2="16" y2="32" stroke="var(--paper)" strokeWidth="3" strokeLinecap="round" style={dash(hovered)} />
      <line x1="28" y1="44" x2="28" y2="24" stroke="var(--paper)" strokeWidth="3" strokeLinecap="round" style={dash(hovered)} />
      <line x1="40" y1="44" x2="40" y2="16" stroke="var(--mercury)" strokeWidth="3" strokeLinecap="round" style={dash(hovered)} />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Card data                                                          */
/* ------------------------------------------------------------------ */

const ops = [
  {
    id: "automatizar",
    title: "Automatizar",
    desc: "Eliminamos tarefas manuais com fluxos inteligentes que rodam sozinhos, liberando sua equipe para o que importa.",
    Glyph: GlyphAutomatizar,
  },
  {
    id: "integrar",
    title: "Integrar",
    desc: "Conectamos seus sistemas para que dados fluam sem retrabalho, sem copiar e colar, sem planilha intermediária.",
    Glyph: GlyphIntegrar,
  },
  {
    id: "otimizar",
    title: "Otimizar",
    desc: "Redesenhamos processos para reduzir etapas, eliminar gargalos e acelerar entregas.",
    Glyph: GlyphOtimizar,
  },
  {
    id: "analisar",
    title: "Analisar",
    desc: "Transformamos dados dispersos em dashboards claros que revelam o que precisa de atenção agora.",
    Glyph: GlyphAnalisar,
  },
] as const;

/* ------------------------------------------------------------------ */
/* Card component                                                     */
/* ------------------------------------------------------------------ */

function OpCard({
  op,
  className,
}: {
  op: (typeof ops)[number];
  className?: string;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className={`ops-card ${className || ""}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? "rgba(43, 37, 32, 0.70)" : "var(--ink)",
        border: "1px solid rgba(239, 233, 218, 0.2)",
        padding: "var(--sp-4)",
        minHeight: 280,
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        gap: "var(--sp-3)",
        transition: "border-color 0.4s var(--ease), transform 0.4s var(--ease), box-shadow 0.4s var(--ease), background 0.4s var(--ease)",
        borderColor: hovered ? "rgba(224, 176, 58, 0.5)" : "rgba(239, 233, 218, 0.2)",
        transform: hovered ? "translateY(-4px)" : "translateY(0)",
        boxShadow: hovered ? "0 8px 32px rgba(224, 176, 58, 0.12)" : "none",
      }}
    >
      <op.Glyph hovered={hovered} />
      <h3
        style={{
          fontFamily: "var(--font-display)",
          fontSize: 28,
          color: "var(--paper)",
          margin: 0,
          lineHeight: 1.15,
        }}
      >
        {op.title}
      </h3>
      <p
        style={{
          fontFamily: "var(--font-body)",
          fontSize: 15,
          lineHeight: 1.6,
          color: "var(--paper)",
          opacity: 0.82,
          margin: 0,
        }}
      >
        {op.desc}
      </p>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Section                                                            */
/* ------------------------------------------------------------------ */

export function Operacoes() {
  return (
    <section
      id="operacoes"
      style={{
        position: "relative",
        isolation: "isolate",
        background: "var(--ink)",
        color: "var(--paper)",
        padding: "var(--sp-8) var(--sp-5)",
      }}
    >
      <HexMesh variant="dark" />
      <div style={{ position: "relative", zIndex: 1, maxWidth: 1280, margin: "0 auto" }}>
        <p className="eyebrow eyebrow-gold">O que fazemos</p>
        <h2 className="hl-gloock hl-paper">Quatro operações.</h2>
        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: 20,
            color: "var(--paper)",
            opacity: 0.75,
            margin: "0 0 var(--sp-6)",
            maxWidth: 600,
          }}
        >
          Combinadas ou separadas, conforme a sua necessidade.
        </p>

        <div className="ops-bento">
          <OpCard op={ops[0]} className="ops-card-auto" />
          <OpCard op={ops[1]} className="ops-card-int" />
          <OpCard op={ops[2]} className="ops-card-oti" />
          <OpCard op={ops[3]} className="ops-card-ana" />
        </div>
      </div>

      <style>{`
        .ops-bento {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          grid-template-rows: auto auto;
          gap: var(--sp-3);
        }
        .ops-card-auto {
          grid-column: 1 / 3;
          grid-row: 1;
        }
        .ops-card-int {
          grid-column: 3;
          grid-row: 1;
        }
        .ops-card-oti {
          grid-column: 1;
          grid-row: 2;
        }
        .ops-card-ana {
          grid-column: 2 / 4;
          grid-row: 2;
        }
        @media (max-width: 1024px) {
          .ops-bento {
            grid-template-columns: repeat(2, 1fr);
            grid-template-rows: auto;
          }
          .ops-card-auto,
          .ops-card-int,
          .ops-card-oti,
          .ops-card-ana {
            grid-column: auto;
            grid-row: auto;
          }
        }
        @media (max-width: 639px) {
          .ops-bento {
            grid-template-columns: 1fr;
          }
          .ops-card {
            min-height: auto !important;
            padding: var(--sp-3) !important;
          }
        }
      `}</style>
    </section>
  );
}
