"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import Button from "@/components/ui/button";
import HexMesh from "@/components/ui/hex-mesh";
import TextReveal from "@/components/ui/text-reveal";

const ease = [0.22, 0.61, 0.36, 1] as const;

export default function HeroLabPage() {
  return (
    <>
      <Header />
      <main style={{ background: "var(--bg)" }}>
        {/* ==========================================================
            BARRA SUPERIOR · marca da página de lab
            ========================================================== */}
        <div
          style={{
            position: "sticky",
            top: 56,
            zIndex: 5,
            background: "color-mix(in srgb, var(--paper) 92%, transparent)",
            backdropFilter: "blur(8px)",
            WebkitBackdropFilter: "blur(8px)",
            borderBottom:
              "1px solid color-mix(in srgb, var(--ink) 14%, transparent)",
            padding: "var(--sp-2) var(--sp-5)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "var(--sp-3)",
            flexWrap: "wrap",
          }}
        >
          <p
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 11,
              letterSpacing: "var(--track-mono)",
              color: "var(--gold-text)",
              textTransform: "uppercase",
              margin: 0,
            }}
          >
            § labs · hero candidate v2 · Fluxo de Transmutação
          </p>
          <div
            style={{
              display: "flex",
              gap: "var(--sp-3)",
              fontFamily: "var(--font-mono)",
              fontSize: 11,
              letterSpacing: "var(--track-mono)",
              textTransform: "uppercase",
            }}
          >
            <Link href="/" style={{ color: "var(--fg)" }}>
              ver hero atual ↗
            </Link>
            <Link href="/labs/selos" style={{ color: "var(--fg)" }}>
              estudo dos selos ↗
            </Link>
          </div>
        </div>

        {/* ==========================================================
            HERO CANDIDATE · duas linhas
            Linha 1: texto + CTA (centralizado, max-width contido)
            Linha 2: Fluxo de Transmutação (full-width)
            ========================================================== */}
        <section
          id="hero"
          data-hex-density="0.12"
          style={{
            position: "relative",
            isolation: "isolate",
            minHeight: "calc(100svh - 56px - 44px)",
            padding: "var(--sp-6) var(--sp-5) var(--sp-5)",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <HexMesh variant="light" />

          {/* ============== LINHA 1 · texto ============== */}
          <div
            style={{
              position: "relative",
              zIndex: 1,
              maxWidth: 920,
              margin: "0 auto",
              width: "100%",
              padding: "var(--sp-4) 0 var(--sp-5)",
            }}
            className="hero2-text"
          >
            <motion.p
              className="eyebrow"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, ease }}
            >
              Automação empresarial
            </motion.p>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease }}
            >
              <h1 aria-label="TimeLabs" className="wordmark2">
                t
                <span className="wordmark2-i">
                  ı
                  <svg
                    className="wordmark2-hex"
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
              Devolvemos tempo ao seu negócio.
            </TextReveal>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.5, ease }}
              className="hero2-lede"
            >
              Automatizamos processos repetitivos, integramos os sistemas que
              você já usa e transformamos dados em decisão. Sua equipe volta
              a focar no que importa.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.65, ease }}
              className="hero2-cta-row"
            >
              <Button variant="primary" href="#agendar">
                Agendar conversa
              </Button>
              <Button variant="secondary" href="#operacoes">
                Ver como funciona
              </Button>
            </motion.div>
          </div>

          {/* ============== LINHA 2 · Fluxo ============== */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, delay: 0.4, ease }}
            style={{
              position: "relative",
              zIndex: 1,
              width: "100%",
              maxWidth: 1280,
              margin: "auto auto 0",
            }}
            className="hero2-flux"
          >
            <img
              src="/assets/selo-v2-b.svg"
              alt="Fluxo de Transmutação — TimeLabs"
              fetchPriority="high"
              className="hero2-flux-img"
            />
          </motion.div>
        </section>
      </main>
      <Footer />

      <style>{`
        .wordmark2 {
          font-family: var(--font-display);
          font-size: clamp(64px, 10vw, 128px);
          line-height: 1;
          letter-spacing: var(--track-display);
          margin: 0 0 var(--sp-2);
          color: var(--fg);
        }
        .wordmark2-i {
          position: relative;
          display: inline-block;
        }
        .wordmark2-hex {
          position: absolute;
          top: 0.1em;
          left: 50%;
          transform: translateX(-50%);
        }
        .hero2-text .tagline {
          margin-top: var(--sp-2);
        }
        .hero2-lede {
          font-family: var(--font-body);
          font-size: clamp(17px, 1.8vw, 21px);
          line-height: 1.6;
          color: var(--fg);
          margin: var(--sp-3) 0 var(--sp-4);
          max-width: 720px;
        }
        .hero2-cta-row {
          display: flex;
          flex-wrap: wrap;
          gap: var(--sp-2);
        }
        .hero2-flux-img {
          width: 100%;
          height: auto;
          display: block;
          max-height: 56vh;
          object-fit: contain;
        }
        @media (max-width: 1024px) {
          .hero2-flux-img {
            max-height: 44vh;
          }
        }
        @media (max-width: 639px) {
          .wordmark2 {
            font-size: clamp(48px, 14vw, 72px);
          }
          .hero2-cta-row a,
          .hero2-cta-row button {
            width: 100%;
            text-align: center;
            justify-content: center;
          }
          .hero2-flux-img {
            max-height: none;
          }
        }
      `}</style>
    </>
  );
}
