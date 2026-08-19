"use client";

import SectionReveal from "@/components/ui/section-reveal";
import HexMesh from "@/components/ui/hex-mesh";

const cards = [
  {
    num: "01",
    title: "Hora cara em trabalho barato.",
    body: "Quem decide passa o dia digitando o que máquina faria.",
  },
  {
    num: "02",
    title: "Um sistema não conversa com o outro — quem conversa é a sua equipe.",
    body: "E cada cópia entre eles é uma chance de erro.",
  },
  {
    num: "03",
    title: "O número que importa está escondido.",
    body: "Tantas planilhas que os números importantes desaparecem.",
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
          padding: "var(--sp-7) var(--sp-5)",
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
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: 18,
              lineHeight: 1.55,
              color: "var(--fg-soft)",
              margin: "var(--sp-3) 0 0",
              maxWidth: 640,
            }}
          >
            Não é falta de gente boa. É o mesmo padrão se repetindo em quase
            toda operação que já vimos:
          </p>

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
                    color: "var(--gold-text)",
                    margin: "0 0 var(--sp-2)",
                  }}
                >
                  {card.num}
                </p>
                <p
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: 22,
                    lineHeight: 1.25,
                    color: "var(--fg)",
                    margin: "0 0 var(--sp-2)",
                  }}
                >
                  {card.title}
                </p>
                <p
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: 16,
                    lineHeight: 1.55,
                    color: "var(--fg-soft)",
                    margin: 0,
                  }}
                >
                  {card.body}
                </p>
              </div>
            ))}
          </div>

          <p className="citation" style={{ marginTop: "var(--sp-6)" }}>
            É falta de método — e, às vezes, de um sistema que ainda não
            existe.
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
