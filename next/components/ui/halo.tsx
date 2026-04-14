"use client";

import { useCallback, useEffect, useRef } from "react";

export default function Halo() {
  const ref = useRef<HTMLDivElement>(null);

  const onMove = useCallback((e: MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty("--mx", `${e.clientX}px`);
    el.style.setProperty("--my", `${e.clientY}px`);
    document.documentElement.classList.add("mouse-active");
  }, []);

  const onLeave = useCallback(() => {
    document.documentElement.classList.remove("mouse-active");
  }, []);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) return;

    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseleave", onLeave);

    return () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      document.documentElement.classList.remove("mouse-active");
    };
  }, [onMove, onLeave]);

  return <div ref={ref} className="hex-halo" aria-hidden="true" />;
}
