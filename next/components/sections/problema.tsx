"use client";

import SectionReveal from "@/components/ui/section-reveal";
import HexMesh from "@/components/ui/hex-mesh";

const cards = [
  {
    num: "01",
    text: "Tarefas repetitivas consomem o tempo de quem deveria estar decidindo.",
  },
  {
    num: "02",
    text: "Sistemas que não se comunicam geram retrabalho e erros de digitação.",
  },
  {
    num: "03",
    text: "Dados espalhados em planilhas escondem as decisões que importam.",
  },
] as const;

export function Problema() {
  return (
    <SectionReveal as="section" className="problema-section" data-hex-density="0.06">
      <div
        id="problema"
        style={{
          position: "relative",
          isolation: "isolate",
          background: "var(--bg-alt)",
          padding: "var(--sp-8) var(--sp-5)",
        }}
      >
        <HexMesh variant="light" density={0.06} showPath={false} showPulse={false} />
        <div
          style={{
            position: "relative",
            zIndex: 1,
            maxWidth: 1280,
            margin: "0 auto",
          }}
        >
          <p className="eyebrow">O problema</p>
          <h2 className="hl-gloock">Sua equipe perde horas todo dia.</h2>

          <div className="problema-grid" style={{ marginTop: "var(--sp-5)" }}>
            {cards.map((card) => (
              <div
                key={card.num}
                className="problema-card"
                style={{
                  borderTop: "1px solid var(--fg)",
                  paddingTop: "var(--sp-3)",
                  transition:
                    "transform 0.3s var(--ease), box-shadow 0.3s var(--ease)",
                }}
              >
                <p
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 12,
                    color: "var(--mercury)",
                    margin: "0 0 var(--sp-2)",
                  }}
                >
                  {card.num}
                </p>
                <p
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: 19,
                    lineHeight: 1.55,
                    color: "var(--fg)",
                    margin: 0,
                  }}
                >
                  {card.text}
                </p>
              </div>
            ))}
          </div>

          <p className="citation" style={{ marginTop: "var(--sp-6)" }}>
            Automação bem feita devolve esse tempo.
          </p>
        </div>
      </div>

      <style>{`
        .problema-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: var(--sp-4);
        }
        .problema-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 32px rgba(224, 176, 58, 0.15);
        }
        @media (max-width: 1024px) {
          .problema-grid {
            grid-template-columns: 1fr;
          }
        }
        @media (max-width: 639px) {
          .problema-grid {
            gap: var(--sp-2);
          }
          .problema-card {
            padding-top: var(--sp-2) !important;
          }
        }
      `}</style>
    </SectionReveal>
  );
}
