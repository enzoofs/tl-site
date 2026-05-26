"use client";

import { useRef, type ReactNode } from "react";
import { motion, useInView } from "framer-motion";

type DataAttrs = { [K in `data-${string}`]?: string };

interface SectionRevealProps extends DataAttrs {
  children: ReactNode;
  className?: string;
  id?: string;
  as?: "section" | "div" | "article" | "aside";
}

/* motion.create() é caro e cria um component novo a cada call. Caching por
   tag name evita refazer o factory toda re-render do pai. */
const motionCache = {
  section: motion.create("section"),
  div: motion.create("div"),
  article: motion.create("article"),
  aside: motion.create("aside"),
} as const;

export default function SectionReveal({
  children,
  className,
  id,
  as = "div",
  ...rest
}: SectionRevealProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.15 });

  const Component = motionCache[as];

  return (
    <Component
      ref={ref}
      className={className}
      id={id}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{
        duration: 0.8,
        ease: [0.22, 0.61, 0.36, 1],
      }}
      {...rest}
    >
      {children}
    </Component>
  );
}
