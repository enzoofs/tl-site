"use client";

import { motion } from "framer-motion";
import Button from "@/components/ui/button";
import HexMesh from "@/components/ui/hex-mesh";
import TextReveal from "@/components/ui/text-reveal";

const ease = [0.22, 0.61, 0.36, 1] as const;

export function Hero() {
  return (
    <section
      id="hero"
      data-hex-density="0.12"
      style={{
        position: "relative",
        isolation: "isolate",
        minHeight: "calc(100svh - 56px)",
        padding: "var(--sp-6) var(--sp-5) var(--sp-5)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <HexMesh variant="light" />

      <div
        style={{
          position: "relative",
          zIndex: 1,
          maxWidth: 920,
          margin: "0 auto",
          width: "100%",
        }}
        className="hero-text"
      >
        <motion.p
          className="eyebrow"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, ease }}
        >
          IA & software sob encomenda
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease }}
        >
          <h1 aria-label="TimeLabs" className="wordmark">
            t
            <span className="wordmark-i">
              ı
              <svg
                className="wordmark-hex"
                width="0.18em"
                height="0.18em"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <polygon
                  points="10,0 18.66,5 18.66,15 10,20 1.34,15 1.34,5"
                  fill="var(--mercury)"
                />
              </svg>
            </span>
            meLabs
          </h1>
        </motion.div>

        <TextReveal as="p" className="tagline">
          Em 30 minutos achamos onde vale automatizar com IA — ou construir
          do zero.
        </TextReveal>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5, ease }}
          className="hero-lede"
        >
          Você conta como o trabalho acontece hoje. Saímos da conversa com
          um plano: o que dá pra resolver com IA, o que precisa de sistema
          construído sob medida, e o retorno esperado de cada frente.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.65, ease }}
          className="hero-cta-row"
        >
          <Button variant="primary" href="#agendar">
            Agendar diagnóstico
          </Button>
          <Button variant="secondary" href="#operacoes">
            Ver como trabalhamos
          </Button>
        </motion.div>
      </div>

      <style>{`
        .wordmark {
          font-family: var(--font-display);
          font-size: clamp(56px, 8.5vw, 112px);
          line-height: 1.02;
          letter-spacing: var(--track-display);
          margin: 0 0 var(--sp-2);
          color: var(--fg);
        }
        .wordmark-i {
          position: relative;
          display: inline-block;
        }
        .wordmark-hex {
          position: absolute;
          top: 0.1em;
          left: 50%;
          transform: translateX(-50%);
        }
        .hero-text .tagline {
          margin-top: var(--sp-2);
        }
        .hero-lede {
          font-family: var(--font-body);
          font-size: clamp(17px, 1.8vw, 21px);
          line-height: 1.6;
          color: var(--fg);
          margin: var(--sp-3) 0 var(--sp-4);
          max-width: 720px;
        }
        .hero-cta-row {
          display: flex;
          flex-wrap: wrap;
          gap: var(--sp-2);
        }
        @media (max-width: 639px) {
          .wordmark {
            font-size: clamp(44px, 13vw, 64px);
          }
          .hero-lede {
            font-size: 16px;
          }
          .hero-cta-row a,
          .hero-cta-row button {
            width: 100%;
            text-align: center;
            justify-content: center;
          }
        }
      `}</style>
    </section>
  );
}
