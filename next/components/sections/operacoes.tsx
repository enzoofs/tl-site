"use client";

import { useState } from "react";
import HexMesh from "@/components/ui/hex-mesh";
import {
  LiquidGlassCard,
  LiquidGlassFilter,
} from "@/components/ui/liquid-glass-card";

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

function GlyphIntegrar({ hovered }: { hovered: boolean }) {
  return (
    <svg width="56" height="56" viewBox="0 0 56 56" fill="none" aria-hidden="true">
      <rect x="6" y="20" width="22" height="16" rx="8" stroke="var(--paper)" strokeWidth="1.5" fill="none" style={dash(hovered)} />
      <rect x="28" y="20" width="22" height="16" rx="8" stroke="var(--mercury)" strokeWidth="1.5" fill="none" style={dash(hovered)} />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Card data                                                          */
/* ------------------------------------------------------------------ */

type Op = {
  id: string;
  title: string;
  desc: string;
  Glyph: ({ hovered }: { hovered: boolean }) => React.ReactElement;
};

const ops: readonly Op[] = [
  {
    id: "consultoria",
    title: "Consultoria de IA",
    desc: "Mapeamos onde IA resolve de verdade — não onde é hype. Agentes que leem, respondem, decidem e avisam, plugados nas ferramentas que sua equipe já usa. Você sai sabendo o que automatizar primeiro e o retorno esperado.",
    Glyph: GlyphAutomatizar,
  },
  {
    id: "desenvolvimento",
    title: "Desenvolvimento sob encomenda",
    desc: "Quando não existe ferramenta pronta pro seu processo, construímos uma — pensada pro seu fluxo, não o contrário. Sistema próprio, sem mensalidade de plataforma genérica que resolve só metade do problema.",
    Glyph: GlyphIntegrar,
  },
] as const;

/* ------------------------------------------------------------------ */
/* Card component                                                     */
/* ------------------------------------------------------------------ */

function OpCard({
  op,
  className,
}: {
  op: Op;
  className?: string;
}) {
  const [hovered, setHovered] = useState(false);
  return (
    <LiquidGlassCard
      className={`ops-card ${className || ""}`}
      onHoverChange={setHovered}
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
          color: "var(--paper-soft)",
          margin: 0,
        }}
      >
        {op.desc}
      </p>
    </LiquidGlassCard>
  );
}

/* ------------------------------------------------------------------ */
/* Section                                                            */
/* ------------------------------------------------------------------ */

export function Operacoes() {
  return (
    <section
      id="operacoes"
      data-hex-density="0.12"
      style={{
        position: "relative",
        isolation: "isolate",
        background: "var(--ink)",
        color: "var(--paper)",
        padding: "var(--sp-7) var(--sp-5)",
      }}
    >
      <HexMesh variant="dark" />
      <LiquidGlassFilter />
      <div style={{ position: "relative", maxWidth: 1280, margin: "0 auto" }}>
        <p className="eyebrow eyebrow-gold">O que fazemos</p>
        <h2 className="hl-gloock hl-paper">Duas frentes, um objetivo.</h2>
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
          Entramos pela consultoria, pelo desenvolvimento, ou pelas duas —
          conforme o que a operação pede.
        </p>

        <div className="ops-bento">
          <OpCard op={ops[0]} className="ops-card-consultoria" />
          <OpCard op={ops[1]} className="ops-card-dev" />
        </div>
      </div>

      <style>{`
        .ops-bento {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: var(--sp-3);
        }
        @media (max-width: 768px) {
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
