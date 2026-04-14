"use client";

import { motion } from "framer-motion";
import Button from "@/components/ui/button";
import HexMesh from "@/components/ui/hex-mesh";

const ease = [0.22, 0.61, 0.36, 1] as const;

export function Hero() {
  return (
    <section
      id="hero"
      style={{
        position: "relative",
        isolation: "isolate",
        minHeight: "calc(100svh - 50px)",
        padding: "var(--sp-8) var(--sp-5)",
      }}
    >
      <HexMesh variant="light" />
      <div
        style={{
          position: "relative",
          zIndex: 1,
          display: "grid",
          alignItems: "center",
          maxWidth: 1280,
          margin: "0 auto",
          gap: "var(--sp-5)",
          minHeight: "calc(100svh - 50px - var(--sp-8) * 2)",
        }}
        className="hero-grid"
      >
      {/* Left column */}
      <div style={{ maxWidth: 640 }} className="hero-left">
        {/* Eyebrow */}
        <motion.p
          className="eyebrow"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, ease }}
        >
          Automação empresarial
        </motion.p>

        {/* Wordmark */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease }}
        >
          <h1
            aria-label="TimeLabs"
            className="wordmark"
          >
            t
            <span className="wordmark-i">
              ı
              <svg
                className="wordmark-hex"
                width="0.22em"
                height="0.22em"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <polygon
                  points="10,0 20,10 10,20 0,10"
                  fill="var(--mercury)"
                />
              </svg>
            </span>
            meLabs
          </h1>
        </motion.div>

        {/* Tagline */}
        <motion.p
          className="tagline"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3, ease }}
        >
          Devolvemos tempo ao seu negócio.
        </motion.p>

        {/* Lede */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5, ease }}
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "clamp(18px, 2vw, 22px)",
            lineHeight: 1.6,
            color: "var(--fg)",
            margin: "0 0 var(--sp-5)",
          }}
        >
          Automatizamos processos repetitivos, integramos os sistemas que
          você já usa e transformamos dados em decisão. Sua equipe volta a
          focar no que importa.
        </motion.p>

        {/* CTA row */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.65, ease }}
          style={{ display: "flex", flexWrap: "wrap", gap: "var(--sp-2)" }}
        >
          <Button variant="primary" href="#agendar">
            Agendar conversa
          </Button>
          <Button variant="secondary" href="#operacoes">
            Ver como funciona
          </Button>
        </motion.div>
      </div>

      {/* Right column */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        className="hero-right"
      >
        <motion.img
          src="/assets/selo-hero.svg"
          alt="Selo TimeLabs — hexágono dourado com logotipo"
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 1.2,
            delay: 0.4,
            ease: [0.22, 0.61, 0.36, 1],
          }}
          className="hero-selo"
          style={{
            maxWidth: 440,
            width: "100%",
            height: "auto",
          }}
        />
      </div>

      <style jsx>{`
        .wordmark {
          font-family: var(--font-display);
          font-size: clamp(52px, 8vw, 96px);
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
          top: 0.05em;
          left: 50%;
          transform: translateX(-50%);
        }
        .hero-grid {
          grid-template-columns: 58fr 42fr;
        }
        @media (max-width: 1024px) {
          .hero-grid {
            grid-template-columns: 1fr;
          }
          .hero-right {
            order: 2;
          }
          .hero-selo {
            max-width: 280px !important;
          }
        }
      `}</style>
      </div>
    </section>
  );
}
