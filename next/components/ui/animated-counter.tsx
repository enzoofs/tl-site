"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

interface AnimatedCounterProps {
  value: number;
  suffix?: string;
  duration?: number;
}

export default function AnimatedCounter({
  value,
  suffix,
  duration = 2000,
}: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const [display, setDisplay] = useState(0);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  useEffect(() => {
    if (!inView || reduced) return;

    const start = performance.now();

    function tick(now: number) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // ease-out quad
      const eased = 1 - (1 - progress) * (1 - progress);
      setDisplay(Math.round(eased * value));
      if (progress < 1) {
        requestAnimationFrame(tick);
      }
    }

    requestAnimationFrame(tick);
  }, [inView, value, duration, reduced]);

  const shown = reduced ? value : display;

  return (
    <span ref={ref} style={{ display: "inline-flex", alignItems: "baseline", gap: 4 }}>
      <span
        style={{
          fontFamily: "var(--font-display)",
          letterSpacing: "var(--track-display)",
        }}
      >
        {shown}
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
