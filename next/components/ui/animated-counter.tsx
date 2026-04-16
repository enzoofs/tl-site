"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useSpring, useTransform, motion, MotionValue } from "framer-motion";

/* ==========================================================================
   ANIMATED COUNTER — digitos rolam individualmente com spring physics.
   Cada digito eh um slot vertical que anima via useSpring do Framer Motion,
   criando efeito de "slot machine" premium.
   ========================================================================== */

const DIGIT_HEIGHT = 1.15; // em — altura do slot de cada digito

interface AnimatedCounterProps {
  value: number;
  suffix?: string;
  duration?: number;
}

export default function AnimatedCounter({
  value,
  suffix,
  duration = 2200,
}: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  /* Converte o valor em array de digitos (ex: 412 -> [4, 1, 2]) */
  const digits = String(value).split("").map(Number);

  const shown = reduced || !inView ? value : undefined;

  return (
    <span ref={ref} style={{ display: "inline-flex", alignItems: "baseline", gap: 4 }}>
      <span
        style={{
          fontFamily: "var(--font-display)",
          letterSpacing: "var(--track-display)",
          display: "inline-flex",
        }}
      >
        {shown !== undefined ? (
          /* Reduced motion ou fora da view: numero estatico */
          <span>{value}</span>
        ) : (
          /* Spring roller: cada digito rola independente */
          digits.map((digit, i) => (
            <SpringDigit
              key={i}
              target={digit}
              delay={i * 0.12}
              duration={duration}
            />
          ))
        )}
      </span>
      {suffix && (
        <span
          style={{
            fontFamily: "var(--font-italic)",
            fontStyle: "italic",
            fontSize: "0.6em",
            color: "var(--ink-soft)",
          }}
        >
          {suffix}
        </span>
      )}
    </span>
  );
}

/* Slot individual: um digito que rola de 0 ate o target com spring */
function SpringDigit({
  target,
  delay,
  duration,
}: {
  target: number;
  delay: number;
  duration: number;
}) {
  const spring = useSpring(0, {
    stiffness: 50,
    damping: 20,
    mass: 1,
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      spring.set(target);
    }, delay * 1000);
    return () => clearTimeout(timer);
  }, [spring, target, delay]);

  return (
    <span
      style={{
        display: "inline-block",
        height: `${DIGIT_HEIGHT}em`,
        width: "0.65em",
        overflow: "hidden",
        position: "relative",
      }}
    >
      {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => (
        <DigitSlot key={n} digit={n} mv={spring} />
      ))}
    </span>
  );
}

/* Cada numero dentro do slot — posicao vertical animada pelo spring */
function DigitSlot({ digit, mv }: { digit: number; mv: MotionValue<number> }) {
  /* Retorna string com unidade em — o container usa em, entao o offset tambem precisa */
  const y = useTransform(mv, (latest) => {
    const place = latest % 10;
    let offset = (10 + digit - place) % 10;
    if (offset > 5) offset -= 10;
    return `${(offset * DIGIT_HEIGHT).toFixed(3)}em`;
  });

  return (
    <motion.span
      style={{
        y,
        position: "absolute",
        inset: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      aria-hidden={digit !== 0 ? "true" : undefined}
    >
      {digit}
    </motion.span>
  );
}
