import type { Metadata } from "next";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

export const metadata: Metadata = {
  title: "Selos · Fluxo de Transmutação — TimeLabs Labs",
  description: "Iteração do selo do hero: fluxo de transmutação vencedor, alternativas no banco.",
  robots: { index: false, follow: false },
};

export default function SelosLabPage() {
  return (
    <>
      <Header />
      <main
        style={{
          background: "var(--bg)",
          color: "var(--fg)",
          minHeight: "100svh",
          paddingTop: "calc(56px + var(--sp-6))",
          paddingBottom: "var(--sp-7)",
        }}
      >
        <div
          style={{
            maxWidth: 1280,
            margin: "0 auto",
            padding: "0 var(--sp-5)",
          }}
        >
          {/* Header do estudo */}
          <header style={{ marginBottom: "var(--sp-6)" }}>
            <p
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 12,
                letterSpacing: "var(--track-mono)",
                color: "var(--gold-text)",
                textTransform: "uppercase",
                margin: 0,
              }}
            >
              § iteração · selo do hero · v2
            </p>
            <h1
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(40px, 6vw, 72px)",
                lineHeight: 1.05,
                letterSpacing: "var(--track-display)",
                margin: "var(--sp-2) 0 var(--sp-3)",
                color: "var(--fg)",
              }}
            >
              Fluxo de Transmutação.
            </h1>
            <p
              style={{
                fontFamily: "var(--font-italic)",
                fontStyle: "italic",
                fontSize: "clamp(18px, 2vw, 22px)",
                color: "var(--fg-soft)",
                maxWidth: 760,
                margin: 0,
                lineHeight: 1.5,
              }}
            >
              Caminho 4 escolhido. Composição horizontal, três tempos,
              labels editoriais. Direção principal — pronta pra aplicar no
              hero quando você aprovar.
            </p>
          </header>

          {/* HERÓ: Fluxo de Transmutação em linha cheia */}
          <section className="hero-variant" style={{ marginBottom: "var(--sp-7)" }}>
            <div className="hero-variant-tag">
              <span className="hero-letter">B</span>
              <div className="hero-tag-meta">
                <span className="hero-tag-caminho">Caminho 4 — não-circular, alquimia visível</span>
                <span className="hero-tag-status">vencedor · v2</span>
              </div>
            </div>

            <div className="hero-variant-stage">
              <img
                src="/assets/selo-v2-b.svg"
                alt="Fluxo de Transmutação"
                className="hero-variant-img"
              />
            </div>

            <div className="hero-variant-meta">
              <div>
                <h2 className="hero-title">
                  Fluxo de Transmutação
                  <span className="hero-sub"> · três tempos, uma narrativa</span>
                </h2>
                <p className="hero-narrative">
                  Esquerda: o caos operacional — fragmentos de hexágonos
                  quebrados, pontos dispersos, processos sem método. Centro:
                  o reator — o crisol onde a TimeLabs transmuta sistemas e
                  dados. Direita: a saída — linha dourada limpa, hex destilado,
                  ponto de decisão pulsante.
                </p>
              </div>

              <ul className="hero-beats">
                <li>
                  <strong>Composição.</strong> Horizontal 1200×540 — quebra
                  deliberadamente a forma circular. O hero do site precisará
                  abrigar essa proporção; conversamos sobre isso na hora de
                  aplicar.
                </li>
                <li>
                  <strong>Animação.</strong> Três partículas escuras drift do
                  caos pro reator (stagger 1,2s). Duas partículas douradas
                  saem do reator e percorrem o trilho até o ponto de decisão.
                  Reator pulsa em sincronia. Pulso outward emana do mercúrio
                  central a cada 3,6s.
                </li>
                <li>
                  <strong>Tipografia.</strong> Labels em mono uppercase no
                  estilo do Codex Operandi (§ I · ENTRADA / § II · TRANSMUTAÇÃO
                  / § III · DECISÃO), descritores em serif italic abaixo.
                </li>
                <li>
                  <strong>Próximos passos sugeridos.</strong> (1) revisar copy
                  dos descritores · (2) decidir layout do hero pra acomodar a
                  proporção horizontal · (3) gerar versão estática (sem
                  animação) pra OG image e favicon · (4) aplicar.
                </li>
              </ul>
            </div>
          </section>

          {/* BANCO: alternativas */}
          <section>
            <header style={{ marginBottom: "var(--sp-4)" }}>
              <p
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 12,
                  letterSpacing: "var(--track-mono)",
                  color: "var(--gold-text)",
                  textTransform: "uppercase",
                  margin: 0,
                }}
              >
                § banco · alternativas
              </p>
              <h2
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(24px, 3vw, 32px)",
                  margin: "var(--sp-1) 0 var(--sp-2)",
                  color: "var(--fg)",
                }}
              >
                Guardadas — não aplicadas.
              </h2>
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: 15,
                  color: "var(--fg-soft)",
                  margin: 0,
                  maxWidth: 720,
                  lineHeight: 1.5,
                }}
              >
                Direções que continuam relevantes para outros usos (peças
                institucionais, dossiês, animações de aplicação) e que podem
                voltar à mesa em iterações futuras.
              </p>
            </header>

            <div className="alt-grid">
              {/* C · Astrolábio */}
              <article className="alt-card">
                <div className="alt-tag">
                  <span className="alt-letter">C</span>
                  <span className="alt-caminho">Caminho 6 — selo canônico</span>
                </div>
                <div className="alt-stage">
                  <img
                    src="/assets/selo-v2-c.svg"
                    alt="Astrolábio canônico"
                    className="alt-img"
                  />
                </div>
                <div>
                  <h3 className="alt-title">Astrolábio</h3>
                  <p className="alt-desc">
                    Selo canônico do Codex Operandi com órbita tipográfica
                    e os seis sigilos alquímicos. Mais contemplativo que
                    operacional — instrumento parado.
                  </p>
                  <p className="alt-note">
                    <span className="alt-note-tag">nota futura</span>
                    Avaliar substituir os 6 sigilos alquímicos pelos 4 glifos
                    funcionais da opção A (checklist · rede · barras ·
                    silhuetas). Ganharia legibilidade B2B em troca de
                    fidelidade ao brand book.
                  </p>
                </div>
              </article>

              {/* A · Motor */}
              <article className="alt-card">
                <div className="alt-tag">
                  <span className="alt-letter">A</span>
                  <span className="alt-caminho">Caminho 1 — diagrama operacional</span>
                </div>
                <div className="alt-stage">
                  <img
                    src="/assets/selo-v2-a.svg"
                    alt="Motor Alquímico"
                    className="alt-img"
                  />
                </div>
                <div>
                  <h3 className="alt-title">Motor Alquímico</h3>
                  <p className="alt-desc">
                    Quatro inputs identificáveis (processos · sistemas · dados ·
                    pessoas) → reator → único vetor dourado em diagonal
                    terminando num ponto de decisão. Lê como diagrama de
                    operação.
                  </p>
                  <p className="alt-note">
                    <span className="alt-note-tag">descartado</span>
                    Direção operacional clara, mas perde o ar alquímico do
                    brand book. Os glifos funcionais podem ser reaproveitados
                    em C (nota acima).
                  </p>
                </div>
              </article>
            </div>
          </section>

          {/* Referência */}
          <section style={{ marginTop: "var(--sp-7)" }}>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(20px, 2.4vw, 24px)",
                margin: "0 0 var(--sp-3)",
                color: "var(--fg)",
              }}
            >
              Selo atual do hero — referência
            </h2>
            <div className="current-ref">
              <img
                src="/assets/selo-hero.svg"
                alt="Selo atual do hero"
                className="current-ref-img"
              />
              <div>
                <p
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: 15,
                    lineHeight: 1.6,
                    margin: "0 0 var(--sp-2)",
                    color: "var(--fg)",
                  }}
                >
                  Em produção hoje. Anéis concêntricos, cardinais dourados,
                  rotação contínua de 120s. Funciona como ornamento, mas não
                  comunica método.
                </p>
                <p
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 11,
                    letterSpacing: "var(--track-mono)",
                    color: "var(--fg-soft)",
                    textTransform: "uppercase",
                    margin: 0,
                  }}
                >
                  · /assets/selo-hero.svg · rotação contínua · sem sigilos ·
                </p>
              </div>
            </div>
          </section>
        </div>
      </main>
      <Footer />

      <style>{`
        /* =====================================================
           HERÓ DA PÁGINA · Fluxo de Transmutação em linha cheia
           ===================================================== */
        .hero-variant {
          border: 1px solid color-mix(in srgb, var(--ink) 22%, transparent);
          background: var(--paper-alt);
          padding: var(--sp-4);
        }
        .hero-variant-tag {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-bottom: var(--sp-3);
          margin-bottom: var(--sp-3);
          border-bottom: 1px solid color-mix(in srgb, var(--ink) 14%, transparent);
        }
        .hero-letter {
          font-family: var(--font-display);
          font-size: 44px;
          line-height: 1;
          color: var(--fg);
        }
        .hero-tag-meta {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 4px;
          font-family: var(--font-mono);
          font-size: 11px;
          letter-spacing: var(--track-mono);
          text-transform: uppercase;
        }
        .hero-tag-caminho {
          color: var(--fg-soft);
        }
        .hero-tag-status {
          color: var(--gold-text);
        }
        .hero-variant-stage {
          background: var(--paper);
          padding: var(--sp-3);
          margin-bottom: var(--sp-4);
          border: 1px solid color-mix(in srgb, var(--ink) 8%, transparent);
        }
        .hero-variant-img {
          width: 100%;
          height: auto;
          display: block;
        }
        .hero-variant-meta {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: var(--sp-4);
        }
        .hero-title {
          font-family: var(--font-display);
          font-size: clamp(26px, 2.6vw, 34px);
          line-height: 1.1;
          letter-spacing: var(--track-display);
          margin: 0 0 var(--sp-2);
          color: var(--fg);
        }
        .hero-sub {
          font-family: var(--font-italic);
          font-style: italic;
          font-weight: 400;
          font-size: 0.7em;
          color: var(--fg-soft);
        }
        .hero-narrative {
          font-family: var(--font-body);
          font-size: 15px;
          line-height: 1.65;
          color: var(--fg);
          margin: 0;
        }
        .hero-beats {
          list-style: none;
          padding: 0;
          margin: 0;
          font-family: var(--font-body);
          font-size: 14px;
          line-height: 1.55;
          color: var(--fg);
        }
        .hero-beats li {
          padding: var(--sp-2) 0;
          border-bottom: 1px solid color-mix(in srgb, var(--ink) 10%, transparent);
        }
        .hero-beats li:last-child {
          border-bottom: 0;
        }
        .hero-beats strong {
          font-family: var(--font-mono);
          font-weight: 600;
          font-size: 12px;
          letter-spacing: var(--track-mono);
          text-transform: uppercase;
          color: var(--gold-text);
          display: block;
          margin-bottom: 2px;
        }

        /* =====================================================
           BANCO · alternativas em grid 2 colunas
           ===================================================== */
        .alt-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: var(--sp-4);
        }
        .alt-card {
          display: flex;
          flex-direction: column;
          gap: var(--sp-3);
          border: 1px solid color-mix(in srgb, var(--ink) 16%, transparent);
          background: var(--paper-alt);
          padding: var(--sp-3);
          opacity: 0.92;
        }
        .alt-tag {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          padding-bottom: var(--sp-1);
          border-bottom: 1px solid color-mix(in srgb, var(--ink) 10%, transparent);
        }
        .alt-letter {
          font-family: var(--font-display);
          font-size: 24px;
          line-height: 1;
          color: var(--fg);
        }
        .alt-caminho {
          font-family: var(--font-mono);
          font-size: 10px;
          letter-spacing: var(--track-mono);
          text-transform: uppercase;
          color: var(--fg-soft);
        }
        .alt-stage {
          background: var(--paper);
          padding: var(--sp-2);
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 280px;
          border: 1px solid color-mix(in srgb, var(--ink) 6%, transparent);
        }
        .alt-img {
          width: 100%;
          max-width: 320px;
          height: auto;
          display: block;
        }
        .alt-title {
          font-family: var(--font-display);
          font-size: 22px;
          line-height: 1.1;
          letter-spacing: var(--track-display);
          margin: 0 0 var(--sp-1);
          color: var(--fg);
        }
        .alt-desc {
          font-family: var(--font-body);
          font-size: 14px;
          line-height: 1.55;
          color: var(--fg);
          margin: 0 0 var(--sp-2);
        }
        .alt-note {
          font-family: var(--font-body);
          font-size: 13px;
          line-height: 1.5;
          color: var(--fg-soft);
          margin: 0;
          padding: var(--sp-2);
          background: color-mix(in srgb, var(--mercury) 8%, transparent);
          border-left: 2px solid var(--mercury);
        }
        .alt-note-tag {
          font-family: var(--font-mono);
          font-size: 10px;
          letter-spacing: var(--track-mono);
          text-transform: uppercase;
          color: var(--gold-text);
          display: block;
          margin-bottom: 4px;
        }

        /* =====================================================
           REFERÊNCIA · selo atual
           ===================================================== */
        .current-ref {
          display: grid;
          grid-template-columns: 220px 1fr;
          gap: var(--sp-4);
          align-items: center;
          padding: var(--sp-3);
          border: 1px solid color-mix(in srgb, var(--ink) 14%, transparent);
          background: var(--paper-alt);
        }
        .current-ref-img {
          width: 100%;
          height: auto;
          display: block;
          opacity: 0.85;
        }

        /* =====================================================
           RESPONSIVO
           ===================================================== */
        @media (max-width: 900px) {
          .hero-variant-meta {
            grid-template-columns: 1fr;
          }
          .alt-grid {
            grid-template-columns: 1fr;
          }
          .current-ref {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </>
  );
}
