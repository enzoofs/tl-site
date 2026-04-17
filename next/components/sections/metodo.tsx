"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import HexMesh from "@/components/ui/hex-mesh";
import {
  LiquidGlassCard,
  LiquidGlassFilter,
} from "@/components/ui/liquid-glass-card";

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
    >
      <LiquidGlassCard minHeight={260}>
        <p
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 12,
            color: "var(--mercury)",
            margin: 0,
          }}
        >
          {phase.num}
        </p>
        <h3
          style={{
            fontFamily: "var(--font-display)",
            fontSize: 28,
            lineHeight: 1.15,
            color: "var(--paper)",
            margin: 0,
          }}
        >
          {phase.title}
        </h3>
        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: 15,
            lineHeight: 1.6,
            color: "var(--paper)",
            opacity: 0.82,
            margin: 0,
          }}
        >
          {phase.desc}
        </p>
      </LiquidGlassCard>
    </motion.div>
  );
}

export function Metodo() {
  return (
    <section
      id="metodo"
      data-hex-density="0.06"
      style={{
        position: "relative",
        isolation: "isolate",
        background: "var(--bg)",
        padding: "var(--sp-8) var(--sp-5)",
      }}
    >
      <HexMesh variant="light" density={0.06} showPath={false} showPulse={false} />
      <LiquidGlassFilter />
      <div style={{ position: "relative", zIndex: 1, maxWidth: 1280, margin: "0 auto" }}>
        <p className="eyebrow">Como trabalhamos</p>
        <h2 className="hl-gloock">Do mapeamento à operação.</h2>
        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: 20,
            lineHeight: 1.55,
            color: "var(--fg)",
            margin: "0 0 var(--sp-5)",
            maxWidth: 640,
          }}
        >
          Quatro fases. Projetos começam em até duas semanas.
        </p>

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
          gap: var(--sp-3);
        }
        @media (max-width: 1024px) {
          .metodo-grid {
            grid-template-columns: repeat(2, 1fr);
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
