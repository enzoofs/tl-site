"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import HexMesh from "@/components/ui/hex-mesh";

const ease = [0.22, 0.61, 0.36, 1] as const;

const phases = [
  {
    num: "01",
    title: "Diagnóstico",
    desc: "Mapeamos seus processos atuais em reuniões com a equipe. Identificamos gargalos, repetições e oportunidades concretas.",
  },
  {
    num: "02",
    title: "Desenho",
    desc: "Projetamos a solução com você. Validamos cada passo antes de escrever uma linha de código.",
  },
  {
    num: "03",
    title: "Implementação",
    desc: "Construímos, integramos e testamos em ambiente real, sem interromper sua operação no dia a dia.",
  },
  {
    num: "04",
    title: "Acompanhamento",
    desc: "Monitoramos resultados e ajustamos conforme sua equipe cresce e o negócio muda.",
  },
] as const;

function PhaseCard({
  phase,
  index,
}: {
  phase: (typeof phases)[number];
  index: number;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
      transition={{ duration: 0.7, delay: index * 0.15, ease }}
      style={{
        borderTop: "1px solid var(--fg)",
        paddingTop: "var(--sp-3)",
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
        {phase.num}
      </p>
      <h3
        style={{
          fontFamily: "var(--font-display)",
          fontSize: 30,
          lineHeight: 1.15,
          color: "var(--fg)",
          margin: "0 0 var(--sp-2)",
        }}
      >
        {phase.title}
      </h3>
      <p
        style={{
          fontFamily: "var(--font-body)",
          fontSize: 16,
          lineHeight: 1.6,
          color: "var(--fg)",
          margin: 0,
        }}
      >
        {phase.desc}
      </p>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/* SVG Timeline: horizontal dashed line with 4 gold circles           */
/* ------------------------------------------------------------------ */

function Timeline() {
  return (
    <div className="metodo-timeline" style={{ margin: "var(--sp-4) 0 var(--sp-5)" }}>
      <svg
        width="100%"
        height="24"
        viewBox="0 0 1100 24"
        preserveAspectRatio="xMidYMid meet"
        fill="none"
        aria-hidden="true"
        style={{ display: "block", overflow: "visible" }}
      >
        {/* Dashed line */}
        <line
          x1="0"
          y1="12"
          x2="1100"
          y2="12"
          stroke="var(--fg-soft)"
          strokeWidth="1"
          strokeDasharray="8 6"
        />
        {/* 4 gold circles at even intervals */}
        {[137.5, 412.5, 687.5, 962.5].map((cx, i) => (
          <circle
            key={i}
            cx={cx}
            cy={12}
            r={6}
            fill="var(--mercury)"
          />
        ))}
      </svg>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Section                                                            */
/* ------------------------------------------------------------------ */

export function Metodo() {
  return (
    <section
      id="metodo"
      style={{
        position: "relative",
        isolation: "isolate",
        background: "var(--bg)",
        padding: "var(--sp-8) var(--sp-5)",
      }}
    >
      <HexMesh variant="light" density={0.06} showPath={false} showPulse={false} />
      <div style={{ position: "relative", zIndex: 1, maxWidth: 1280, margin: "0 auto" }}>
        <p className="eyebrow">Como trabalhamos</p>
        <h2 className="hl-gloock">Do mapeamento à operação.</h2>
        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: 20,
            lineHeight: 1.55,
            color: "var(--fg)",
            margin: "0 0 var(--sp-3)",
            maxWidth: 640,
          }}
        >
          Quatro fases. Projetos começam em até duas semanas.
        </p>

        <Timeline />

        <div className="metodo-grid">
          {phases.map((phase, i) => (
            <PhaseCard key={phase.num} phase={phase} index={i} />
          ))}
        </div>
      </div>

      <style>{`
        .metodo-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: var(--sp-4);
        }
        .metodo-timeline {
          display: block;
        }
        @media (max-width: 1024px) {
          .metodo-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          .metodo-timeline {
            display: none;
          }
        }
        @media (max-width: 639px) {
          .metodo-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
}
