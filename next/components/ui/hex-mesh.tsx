"use client";

import { useEffect, useRef, useCallback } from "react";
import {
  HEX_W,
  ROW_H,
  SVG_NS,
  cellCenter,
  cellHash,
  hexPoints,
} from "./hex-grid";

/* ==========================================================================
   HEX MESH — base (hx + hx-shade) em coords globais pra tilar continuamente
   entre seccoes. Path + pulso migraram pro overlay global (hex-path.tsx).
   Cada polygon ganha data-col/data-row pra permitir lookup cross-component
   (HexPath usa esses dados pra alinhar clusters ao grid real).
   ========================================================================== */

function buildMeshSVG(
  w: number,
  h: number,
  docY: number,
  density: number
): SVGSVGElement | null {
  if (!w || !h) return null;

  const cols = Math.ceil(w / HEX_W) + 2;
  const rowStart = Math.floor(docY / ROW_H) - 1;
  const rowEnd = Math.ceil((docY + h) / ROW_H) + 1;

  const svg = document.createElementNS(SVG_NS, "svg");
  svg.setAttribute("viewBox", `0 0 ${w} ${h}`);
  svg.setAttribute("preserveAspectRatio", "xMinYMin slice");

  const meshG = document.createElementNS(SVG_NS, "g");
  for (let r = rowStart; r <= rowEnd; r++) {
    for (let c = -1; c <= cols; c++) {
      const { cx: cxGlobal } = cellCenter(c, r);
      const cyGlobal = r * ROW_H;
      const cx = cxGlobal;
      const cy = cyGlobal - docY;
      const shaded = cellHash(c, r) < density;
      const p = document.createElementNS(SVG_NS, "polygon");
      p.setAttribute("class", shaded ? "hx-shade" : "hx");
      p.setAttribute("points", hexPoints(cx, cy));
      p.setAttribute("data-cx", cx.toFixed(1));
      p.setAttribute("data-cy", cy.toFixed(1));
      p.setAttribute("data-col", String(c));
      p.setAttribute("data-row", String(r));
      meshG.appendChild(p);
    }
  }
  svg.appendChild(meshG);
  return svg;
}

/* ==========================================================================
   React component
   ========================================================================== */

interface HexMeshProps {
  variant?: "light" | "dark";
  density?: number;
  /** @deprecated path agora vive no overlay global <HexPath/> */
  showPath?: boolean;
  /** @deprecated pulso agora vive no overlay global <HexPath/> */
  showPulse?: boolean;
}

const INTERACT_RADIUS = 140;
const INTERACT_BOOST = 0.14;
const INTERACT_FILL_LIGHT = "rgb(43, 37, 32)";
const INTERACT_FILL_DARK = "rgb(239, 233, 218)";

interface CellInfo {
  el: SVGPolygonElement;
  cx: number;
  cy: number;
}

export default function HexMesh({
  variant = "light",
  density = 0.12,
}: HexMeshProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const cellInfoRef = useRef<CellInfo[]>([]);
  const activeSetRef = useRef<Set<SVGPolygonElement>>(new Set());
  const rafRef = useRef(0);

  const build = useCallback(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    const parent = wrap.parentElement;
    if (!parent) return;

    const w = parent.offsetWidth;
    const h = parent.offsetHeight;
    if (!w || !h) return;

    /* offsetTop acumulado ignora transforms (framer-motion no SectionReveal),
       dando posicao de layout estavel pro alinhamento do grid global */
    let docY = 0;
    let el: HTMLElement | null = parent;
    while (el) {
      docY += el.offsetTop;
      el = el.offsetParent as HTMLElement | null;
    }

    const svg = buildMeshSVG(w, h, docY, density);
    if (!svg) return;

    wrap.innerHTML = "";
    wrap.appendChild(svg);

    const polygons = svg.querySelectorAll<SVGPolygonElement>(".hx, .hx-shade");
    cellInfoRef.current = Array.from(polygons).map((el) => ({
      el,
      cx: parseFloat(el.getAttribute("data-cx") || "0"),
      cy: parseFloat(el.getAttribute("data-cy") || "0"),
    }));
  }, [density]);

  useEffect(() => {
    const raf = requestAnimationFrame(build);

    let resizeTimer: ReturnType<typeof setTimeout>;
    const onResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(build, 300);
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(resizeTimer);
      window.removeEventListener("resize", onResize);
    };
  }, [build]);

  const variantRef = useRef(variant);
  variantRef.current = variant;

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    const section = wrap.parentElement;
    if (!section) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reducedMotion) return;

    const onMouseMove = (e: MouseEvent) => {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        const svg = wrap.querySelector("svg");
        if (!svg) return;

        const pt = svg.createSVGPoint();
        pt.x = e.clientX;
        pt.y = e.clientY;
        const ctm = svg.getScreenCTM()?.inverse();
        if (!ctm) return;
        const svgPt = pt.matrixTransform(ctm);

        const fillColor =
          variantRef.current === "dark"
            ? INTERACT_FILL_DARK
            : INTERACT_FILL_LIGHT;

        const newActive = new Set<SVGPolygonElement>();

        for (const cell of cellInfoRef.current) {
          const dx = cell.cx - svgPt.x;
          const dy = cell.cy - svgPt.y;
          const distSq = dx * dx + dy * dy;

          if (distSq < INTERACT_RADIUS * INTERACT_RADIUS) {
            const t = Math.sqrt(distSq) / INTERACT_RADIUS;
            const boost = INTERACT_BOOST * (1 - t) * (1 - t);
            cell.el.style.fill = fillColor;
            cell.el.style.fillOpacity = String(boost);
            newActive.add(cell.el);
          }
        }

        for (const el of activeSetRef.current) {
          if (!newActive.has(el)) {
            el.style.fill = "";
            el.style.fillOpacity = "";
          }
        }

        activeSetRef.current = newActive;
      });
    };

    const onMouseLeave = () => {
      cancelAnimationFrame(rafRef.current);
      for (const el of activeSetRef.current) {
        el.style.fill = "";
        el.style.fillOpacity = "";
      }
      activeSetRef.current.clear();
    };

    section.addEventListener("mousemove", onMouseMove);
    section.addEventListener("mouseleave", onMouseLeave);

    return () => {
      cancelAnimationFrame(rafRef.current);
      section.removeEventListener("mousemove", onMouseMove);
      section.removeEventListener("mouseleave", onMouseLeave);
      onMouseLeave();
    };
  }, []);

  return (
    <div
      ref={wrapRef}
      className={`sec-mesh${variant === "dark" ? " sec-mesh--dark" : ""}`}
      aria-hidden="true"
    />
  );
}
