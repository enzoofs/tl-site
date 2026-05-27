"use client";

import SectionReveal from "@/components/ui/section-reveal";
import HexMesh from "@/components/ui/hex-mesh";

/* Itens propositalmente sem âncora de setor — verbo + objeto + benefício.
   A diversidade do TRABALHO (não da indústria) sugere o generalismo. */
const items = [
  {
    num: "01",
    text: "Cadastro automático de produtos em ERP.",
  },
  {
    num: "02",
    text: "Notificação imediata após andamento de processos.",
  },
  {
    num: "03",
    text: "Gerar posts em redes sociais com um clique.",
  },
  {
    num: "04",
    text: "Controlar presença de evento por QR code.",
  },
  {
    num: "05",
    text: "Extrair e estruturar dados de PDF em escala.",
  },
  {
    num: "06",
    text: "Conciliar pagamento entre sistemas diferentes.",
  },
  {
    num: "07",
    text: "Resposta no WhatsApp 24h, sem ninguém na ponta.",
  },
  {
    num: "08",
    text: "Transformar reunião em ata imediatamente.",
  },
] as const;

export function OndeEntramos() {
  return (
    <SectionReveal as="section" data-hex-density="0.06">
      <div
        id="onde-entramos"
        style={{
          position: "relative",
          isolation: "isolate",
          background: "var(--bg)",
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
          <p className="eyebrow">Onde a gente entra</p>
          <h2 className="hl-gloock hl-mid">
            A automação não é uma indústria.
            <br />
            É um olhar.
          </h2>
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: 18,
              lineHeight: 1.55,
              color: "var(--fg-soft)",
              margin: "var(--sp-3) 0 var(--sp-6)",
              maxWidth: 640,
            }}
          >
            Setores diferentes, operações diferentes, mesmo método.
          </p>

          <div className="onde-grid">
            {items.map((item) => (
              <div key={item.num} className="onde-item">
                <p className="onde-num">{item.num}</p>
                <p className="onde-text">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .onde-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: var(--sp-3);
        }
        .onde-item {
          border-top: 1px solid var(--fg);
          padding-top: var(--sp-3);
          transition: transform 0.3s var(--ease);
        }
        .onde-item:hover {
          transform: translateY(-2px);
        }
        .onde-num {
          font-family: var(--font-mono);
          font-size: 12px;
          color: var(--gold-text);
          margin: 0 0 var(--sp-2);
        }
        .onde-text {
          font-family: var(--font-body);
          font-size: 16px;
          line-height: 1.5;
          color: var(--fg);
          margin: 0;
        }
        @media (max-width: 1024px) {
          .onde-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        @media (max-width: 639px) {
          .onde-grid {
            grid-template-columns: 1fr;
            gap: var(--sp-2);
          }
          .onde-item {
            padding-top: var(--sp-2);
          }
        }
      `}</style>
    </SectionReveal>
  );
}
