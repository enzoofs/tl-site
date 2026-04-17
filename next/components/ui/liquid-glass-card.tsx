"use client";

import { useState, type ReactNode } from "react";

/* ==========================================================================
   Liquid glass: superficie de vidro com 5 camadas sobrepostas — backdrop
   blur, tint escuro, shimmer distortido com feTurbulence+feDisplacementMap,
   outer face shadow, inner edge highlight. Hover troca os highlights pra
   tons dourados. Compartilhado entre secoes Operacoes e Metodo.
   ========================================================================== */

export function LiquidGlassFilter() {
  return (
    <svg
      aria-hidden="true"
      style={{
        position: "absolute",
        width: 0,
        height: 0,
        pointerEvents: "none",
      }}
    >
      <defs>
        <filter
          id="liquid-glass-distort"
          x="-20%"
          y="-20%"
          width="140%"
          height="140%"
          filterUnits="objectBoundingBox"
        >
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.012 0.02"
            numOctaves={2}
            result="turb"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="turb"
            scale="40"
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>
      </defs>
    </svg>
  );
}

interface LiquidGlassCardProps {
  children: ReactNode;
  className?: string;
  minHeight?: number | string;
  /** Callback de hover pra componentes internos que reagem (ex: glyphs) */
  onHoverChange?: (hovered: boolean) => void;
}

export function LiquidGlassCard({
  children,
  className,
  minHeight = 280,
  onHoverChange,
}: LiquidGlassCardProps) {
  const [hovered, setHovered] = useState(false);

  const edgeShadow = hovered
    ? "inset 3px 3px 3px 0 rgba(224, 176, 58, 0.55), inset -3px -3px 3px 0 rgba(224, 176, 58, 0.55)"
    : "inset 3px 3px 3px 0 rgba(255, 255, 255, 0.45), inset -3px -3px 3px 0 rgba(255, 255, 255, 0.45)";

  const faceShadow = hovered
    ? "0 6px 8px rgba(0, 0, 0, 0.22), 0 0 16px rgba(0, 0, 0, 0.1), 0 0 48px rgba(224, 176, 58, 0.28)"
    : "0 4px 4px rgba(0, 0, 0, 0.15), 0 0 12px rgba(0, 0, 0, 0.08), 0 0 32px rgba(255, 255, 255, 0.15)";

  const setHover = (v: boolean) => {
    setHovered(v);
    onHoverChange?.(v);
  };

  return (
    <div
      className={className}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        position: "relative",
        zIndex: 1,
        minHeight,
        padding: "var(--sp-4)",
        cursor: "default",
        transition: "transform 0.4s var(--ease)",
        transform: hovered ? "translateY(-4px)" : "translateY(0)",
      }}
    >
      {/* Bend — pure backdrop blur, no SVG filter here (it would void the blur) */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 0,
          backdropFilter: "blur(32px) saturate(140%)",
          WebkitBackdropFilter: "blur(32px) saturate(140%)",
        }}
      />
      {/* Tint — damps what remains of the mesh so content stays readable */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 1,
          background: hovered
            ? "rgba(43, 37, 32, 0.55)"
            : "rgba(43, 37, 32, 0.62)",
          transition: "background 0.4s var(--ease)",
        }}
      />
      {/* Liquid shimmer — subtle SVG displacement, kept off the backdrop layer
          so the blur survives (filters on backdrop-filter elements kill it). */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 2,
          background:
            "linear-gradient(135deg, rgba(239, 233, 218, 0.10) 0%, rgba(239, 233, 218, 0) 45%, rgba(224, 176, 58, 0.08) 100%)",
          filter: "url(#liquid-glass-distort)",
          mixBlendMode: "screen",
          opacity: hovered ? 1 : 0.75,
          transition: "opacity 0.4s var(--ease)",
        }}
      />
      {/* Face — outer shadow + golden glow on hover */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 3,
          boxShadow: faceShadow,
          transition: "box-shadow 0.4s var(--ease)",
          pointerEvents: "none",
        }}
      />
      {/* Edge — inner highlights, swaps to gold on hover */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 4,
          boxShadow: edgeShadow,
          transition: "box-shadow 0.4s var(--ease)",
          pointerEvents: "none",
        }}
      />
      {/* Content */}
      <div
        style={{
          position: "relative",
          zIndex: 5,
          display: "flex",
          flexDirection: "column",
          gap: "var(--sp-3)",
          height: "100%",
        }}
      >
        {children}
      </div>
    </div>
  );
}
