"use client";

import AnimatedCounter from "@/components/ui/animated-counter";
import SectionReveal from "@/components/ui/section-reveal";
import HexMesh from "@/components/ui/hex-mesh";

const padroes = [
  {
    value: 7,
    suffix: "dias",
    label: "do briefing ao diagnóstico assinado",
    sub: "DIAGNÓSTICO",
  },
  {
    value: 2,
    suffix: "semanas",
    label: "da assinatura ao primeiro sistema rodando",
    sub: "EXECUÇÃO",
  },
  {
    value: 0,
    suffix: "lock-in",
    label: "todo o código é seu, em todo ponto do contrato",
    sub: "PROPRIEDADE",
  },
] as const;

export function Resultados() {
  return (
    <SectionReveal as="section" data-hex-density="0.06">
      <div
        id="padroes"
        style={{
          position: "relative",
          isolation: "isolate",
          background: "var(--bg-alt)",
          padding: "var(--sp-8) var(--sp-5)",
        }}
      >
        <HexMesh variant="light" density={0.06} showPath={false} showPulse={false} />
        <div style={{ position: "relative", zIndex: 1, maxWidth: 1280, margin: "0 auto" }}>
          <p className="eyebrow">Padrões</p>
          <h2 className="hl-gloock hl-mid">Compromissos com quem nos contrata.</h2>
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: 18,
              color: "var(--fg-soft)",
              margin: "0 0 var(--sp-6)",
              maxWidth: 520,
            }}
          >
            Três promessas. Por escrito, em todo contrato.
          </p>

          <div className="padroes-grid">
            {padroes.map((p, i) => (
              <div
                key={i}
                style={{
                  borderTop: "1px solid var(--fg)",
                  paddingTop: "var(--sp-4)",
                }}
              >
                <div
                  style={{
                    fontSize: "clamp(64px, 7vw, 120px)",
                    lineHeight: 1,
                    marginBottom: "var(--sp-2)",
                  }}
                >
                  <AnimatedCounter
                    value={p.value}
                    suffix={p.suffix}
                    duration={2200}
                  />
                </div>
                <p
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: 17,
                    lineHeight: 1.45,
                    color: "var(--fg)",
                    margin: "0 0 var(--sp-1)",
                  }}
                >
                  {p.label}
                </p>
                <p
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 11,
                    letterSpacing: 2,
                    textTransform: "uppercase",
                    color: "var(--fg-soft)",
                    margin: 0,
                  }}
                >
                  {p.sub}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .padroes-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: var(--sp-5);
        }
        @media (max-width: 1024px) {
          .padroes-grid {
            grid-template-columns: 1fr;
          }
        }
        @media (max-width: 639px) {
          .padroes-grid {
            gap: var(--sp-3);
          }
        }
      `}</style>
    </SectionReveal>
  );
}
