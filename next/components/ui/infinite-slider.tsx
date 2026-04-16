"use client";

import type { ReactNode } from "react";

interface InfiniteSliderProps {
  children: ReactNode;
  speed?: string;
  direction?: "left" | "right";
  className?: string;
}

export default function InfiniteSlider({
  children,
  speed = "40s",
  direction = "left",
  className,
}: InfiniteSliderProps) {
  const animDirection = direction === "left" ? "normal" : "reverse";

  return (
    <div
      className={className}
      style={{
        overflow: "hidden",
        maskImage:
          "linear-gradient(to right, transparent, black 80px, black calc(100% - 80px), transparent)",
        WebkitMaskImage:
          "linear-gradient(to right, transparent, black 80px, black calc(100% - 80px), transparent)",
      }}
    >
      <div
        style={{
          display: "flex",
          width: "max-content",
          animation: `marquee ${speed} linear infinite`,
          animationDirection: animDirection,
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLDivElement).style.animationPlayState = "paused";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLDivElement).style.animationPlayState = "running";
        }}
      >
        {/* Two copies for seamless loop */}
        <div style={{ display: "flex", flexShrink: 0 }}>{children}</div>
        <div style={{ display: "flex", flexShrink: 0 }} aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  );
}
