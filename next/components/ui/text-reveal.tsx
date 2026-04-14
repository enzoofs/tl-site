"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

interface TextRevealProps {
  children: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "span";
}

export default function TextReveal({
  children,
  className,
  as: Tag = "span",
}: TextRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  if (reduced) {
    return <Tag className={className}>{children}</Tag>;
  }

  const chars = children.split("");

  return (
    <Tag className={className} aria-label={children}>
      <span ref={ref} style={{ display: "contents" }}>
        {chars.map((char, i) => (
          <motion.span
            key={`${i}-${char}`}
            aria-hidden="true"
            style={{
              display: "inline-block",
              whiteSpace: char === " " ? "pre" : undefined,
            }}
            initial={{ opacity: 0, y: "40%", filter: "blur(12px)" }}
            animate={
              inView
                ? { opacity: 1, y: "0%", filter: "blur(0px)" }
                : { opacity: 0, y: "40%", filter: "blur(12px)" }
            }
            transition={{
              duration: 0.5,
              delay: i * 0.04,
              ease: [0.22, 0.61, 0.36, 1],
            }}
          >
            {char}
          </motion.span>
        ))}
      </span>
    </Tag>
  );
}
