"use client";

import AnimatedCounter from "@/components/ui/animated-counter";
import SectionReveal from "@/components/ui/section-reveal";
import HexMesh from "@/components/ui/hex-mesh";

const kpis = [
  {
    value: 412,
    suffix: "h",
    label: "horas devolvidas por mês",
    sub: "POR CLIENTE MÉDIO",
  },
  {
    value: 37,
    suffix: undefined,
    label: "automações em produção",
    sub: "SOMANDO TODOS OS CLIENTES",
  },
  {
    value: 2,
    suffix: "sem",
    label: "para entrar em operação",
    sub: "PRAZO MÉDIO DO PRIMEIRO ENTREGÁVEL",
  },
] as const;

export function Resultados() {
  return (
    <SectionReveal as="section">
      <div
        id="resultados"
        style={{
          position: "relative",
          isolation: "isolate",
          background: "var(--bg-alt)",
          padding: "var(--sp-8) var(--sp-5)",
        }}
      >
        <HexMesh variant="light" density={0.06} showPath={false} showPulse={false} />
        <div style={{ position: "relative", zIndex: 1, maxWidth: 1280, margin: "0 auto" }}>
          <p className="eyebrow">Resultados</p>
          <h2 className="hl-gloock hl-mid">Números de clientes reais.</h2>
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: 18,
              color: "var(--fg-soft)",
              margin: "0 0 var(--sp-6)",
              maxWidth: 520,
            }}
          >
            Média dos nossos clientes em operação desde 2025.
          </p>

          <div className="resultados-grid">
            {kpis.map((kpi, i) => (
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
                    value={kpi.value}
                    suffix={kpi.suffix}
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
                  {kpi.label}
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
                  {kpi.sub}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .resultados-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: var(--sp-5);
        }
        @media (max-width: 1024px) {
          .resultados-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </SectionReveal>
  );
}
