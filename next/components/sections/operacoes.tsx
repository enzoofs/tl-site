"use client";

import { useState } from "react";
import HexMesh from "@/components/ui/hex-mesh";

/* ------------------------------------------------------------------ */
/* SVG glyph icons (56x56) for each operation                        */
/* ------------------------------------------------------------------ */

function GlyphAutomatizar({ hovered }: { hovered: boolean }) {
  return (
    <svg width="56" height="56" viewBox="0 0 56 56" fill="none" aria-hidden="true">
      <polygon
        points="28,6 50,28 28,50 6,28"
        stroke="var(--paper)"
        strokeWidth="1.5"
        fill="none"
        style={{
          strokeDasharray: 400,
          strokeDashoffset: hovered ? 0 : 400,
          transition: "stroke-dashoffset 0.8s var(--ease)",
        }}
      />
      <line
        x1="14"
        y1="28"
        x2="42"
        y2="28"
        stroke="var(--mercury)"
        strokeWidth="1.5"
        style={{
          strokeDasharray: 400,
          strokeDashoffset: hovered ? 0 : 400,
          transition: "stroke-dashoffset 0.8s var(--ease)",
        }}
      />
    </svg>
  );
}

function GlyphIntegrar({ hovered }: { hovered: boolean }) {
  const dash = {
    strokeDasharray: 400,
    strokeDashoffset: hovered ? 0 : 400,
    transition: "stroke-dashoffset 0.8s var(--ease)",
  };
  return (
    <svg width="56" height="56" viewBox="0 0 56 56" fill="none" aria-hidden="true">
      <circle cx="14" cy="28" r="5" stroke="var(--paper)" strokeWidth="1.5" fill="none" style={dash} />
      <circle cx="42" cy="14" r="5" stroke="var(--paper)" strokeWidth="1.5" fill="none" style={dash} />
      <circle cx="42" cy="42" r="5" stroke="var(--paper)" strokeWidth="1.5" fill="none" style={dash} />
      <line x1="19" y1="26" x2="37" y2="16" stroke="var(--mercury)" strokeWidth="1.2" style={dash} />
      <line x1="19" y1="30" x2="37" y2="40" stroke="var(--mercury)" strokeWidth="1.2" style={dash} />
    </svg>
  );
}

function GlyphOtimizar({ hovered }: { hovered: boolean }) {
  const dash = {
    strokeDasharray: 400,
    strokeDashoffset: hovered ? 0 : 400,
    transition: "stroke-dashoffset 0.8s var(--ease)",
  };
  return (
    <svg width="56" height="56" viewBox="0 0 56 56" fill="none" aria-hidden="true">
      <polygon
        points="28,4 52,28 28,52 4,28"
        stroke="var(--paper)"
        strokeWidth="1.5"
        fill="none"
        style={dash}
      />
      <line x1="28" y1="16" x2="28" y2="40" stroke="var(--mercury)" strokeWidth="1.5" style={dash} />
    </svg>
  );
}

function GlyphAnalisar({ hovered }: { hovered: boolean }) {
  const dash = {
    strokeDasharray: 400,
    strokeDashoffset: hovered ? 0 : 400,
    transition: "stroke-dashoffset 0.8s var(--ease)",
  };
  return (
    <svg width="56" height="56" viewBox="0 0 56 56" fill="none" aria-hidden="true">
      <ellipse cx="28" cy="28" rx="20" ry="14" stroke="var(--paper)" strokeWidth="1.5" fill="none" style={dash} />
      <circle cx="28" cy="28" r="3" fill="var(--mercury)" style={{ opacity: hovered ? 1 : 0.4, transition: "opacity 0.6s var(--ease)" }} />
      <line x1="18" y1="12" x2="18" y2="44" stroke="var(--mercury)" strokeWidth="1" style={dash} />
      <line x1="38" y1="12" x2="38" y2="44" stroke="var(--mercury)" strokeWidth="1" style={dash} />
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
      className={className}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: "var(--ink)",
        border: "1px solid rgba(239, 233, 218, 0.2)",
        padding: "var(--sp-4)",
        minHeight: 280,
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        gap: "var(--sp-3)",
        transition: "border-color 0.3s var(--ease)",
        borderColor: hovered ? "rgba(224, 176, 58, 0.5)" : "rgba(239, 233, 218, 0.2)",
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
        }
      `}</style>
    </section>
  );
}
