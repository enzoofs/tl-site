"use client";

import { useEffect, useRef, useCallback, useState } from "react";

/* ==========================================================================
   HEX MESH — React port of the vanilla TimeLabs hex mesh algorithm
   ========================================================================== */

const HEX_R = 24;
const HEX_W = HEX_R * Math.sqrt(3);
const ROW_H = HEX_R * 1.5;
const SVG_NS = "http://www.w3.org/2000/svg";

/* ---- Geometry helpers ---- */

function hexPoints(cx: number, cy: number, r = HEX_R): string {
  const pts: string[] = [];
  for (let i = 0; i < 6; i++) {
    const a = (Math.PI / 180) * (60 * i - 30);
    pts.push(
      `${(cx + r * Math.cos(a)).toFixed(2)},${(cy + r * Math.sin(a)).toFixed(2)}`
    );
  }
  return pts.join(" ");
}

function cellCenter(col: number, row: number) {
  return {
    cx: col * HEX_W + (row % 2 ? HEX_W / 2 : 0),
    cy: row * ROW_H,
  };
}

/* ---- Hex distance (offset -> cube) ---- */

function offsetToCube(col: number, row: number) {
  const x = col - (row - (row & 1)) / 2;
  const z = row;
  return { x, y: -x - z, z };
}

function hexDist(c1: number, r1: number, c2: number, r2: number) {
  const a = offsetToCube(c1, r1);
  const b = offsetToCube(c2, r2);
  return (Math.abs(a.x - b.x) + Math.abs(a.y - b.y) + Math.abs(a.z - b.z)) / 2;
}

function neighbors(col: number, row: number): [number, number][] {
  const odd = row % 2 === 1;
  return [
    [col + 1, row],
    [col - 1, row],
    [col + (odd ? 1 : 0), row - 1],
    [col - (odd ? 0 : 1), row - 1],
    [col + (odd ? 1 : 0), row + 1],
    [col - (odd ? 0 : 1), row + 1],
  ];
}

/* ---- Greedy grid pathfinding ---- */

interface Cell {
  col: number;
  row: number;
}

function gridPath(start: Cell, end: Cell, cols: number, rows: number): Cell[] {
  const path: Cell[] = [start];
  let cur = { ...start };
  let parity = 0;
  let safety = 0;
  while ((cur.col !== end.col || cur.row !== end.row) && safety++ < 80) {
    const curDist = hexDist(cur.col, cur.row, end.col, end.row);
    const opts = neighbors(cur.col, cur.row)
      .filter(([c, r]) => c >= 0 && r >= 0 && c < cols && r < rows)
      .map(([c, r]) => ({ c, r, d: hexDist(c, r, end.col, end.row) }))
      .filter((o) => o.d < curDist)
      .sort((a, b) => a.d - b.d);
    if (!opts.length) break;
    const pick = opts[parity % Math.min(opts.length, 2)];
    parity++;
    cur = { col: pick.c, row: pick.r };
    path.push(cur);
  }
  return path;
}

/* ---- Anchor picking ---- */

function pickAnchors(cols: number, rows: number): Cell[] {
  const total = 8 + Math.floor(Math.random() * 3);
  const anchors: Cell[] = [];
  const step = cols / total;
  for (let i = 0; i < total; i++) {
    const col = Math.round(
      step * (i + 0.5) + (Math.random() - 0.5) * step * 0.4
    );
    const midRow = Math.floor(rows / 2);
    const amp = Math.min(rows / 2 - 1, 4 + Math.random() * 3);
    const row = Math.round(midRow + Math.sin(i * 1.3 + Math.random()) * amp);
    anchors.push({
      col: Math.max(1, Math.min(cols - 2, col)),
      row: Math.max(1, Math.min(rows - 2, row)),
    });
  }
  return anchors;
}

/* ==========================================================================
   Imperative SVG builder (mirrors original vanilla JS for performance)
   ========================================================================== */

function buildMeshSVG(
  w: number,
  h: number,
  reducedMotion: boolean,
  density: number,
  showPath: boolean,
  showPulse: boolean,
): SVGSVGElement | null {
  if (!w || !h) return null;

  const cols = Math.ceil(w / HEX_W) + 2;
  const rows = Math.ceil(h / ROW_H) + 2;

  /* Generate hex grid cells */
  const cells: { col: number; row: number; cx: number; cy: number }[] = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      cells.push({ col: c, row: r, ...cellCenter(c, r) });
    }
  }

  /* Shaded cells based on density prop */
  const shadeSet = new Set<number>();
  const nShade = Math.floor(cells.length * density);
  for (let i = 0; i < nShade; i++)
    shadeSet.add(Math.floor(Math.random() * cells.length));

  /* Anchors and golden path */
  const anchors = pickAnchors(cols, rows);
  const fullPath: Cell[] = [];
  for (let i = 0; i < anchors.length - 1; i++) {
    const seg = gridPath(anchors[i], anchors[i + 1], cols, rows);
    if (i === 0) fullPath.push(...seg);
    else fullPath.push(...seg.slice(1));
  }

  /* Build SVG */
  const svg = document.createElementNS(SVG_NS, "svg");
  svg.setAttribute(
    "viewBox",
    `0 0 ${cols * HEX_W} ${rows * ROW_H}`
  );
  svg.setAttribute("preserveAspectRatio", "xMidYMid slice");

  /* Base mesh — each polygon stores its center for mouse interaction */
  const meshG = document.createElementNS(SVG_NS, "g");
  for (let i = 0; i < cells.length; i++) {
    const p = document.createElementNS(SVG_NS, "polygon");
    p.setAttribute("class", shadeSet.has(i) ? "hx-shade" : "hx");
    p.setAttribute("points", hexPoints(cells[i].cx, cells[i].cy));
    p.setAttribute("data-cx", cells[i].cx.toFixed(1));
    p.setAttribute("data-cy", cells[i].cy.toFixed(1));
    meshG.appendChild(p);
  }
  svg.appendChild(meshG);

  /* Connection polyline through all path centers */
  if (showPath && fullPath.length > 1) {
    const ptsStr = fullPath
      .map((n) => {
        const { cx, cy } = cellCenter(n.col, n.row);
        return `${cx.toFixed(1)},${cy.toFixed(1)}`;
      })
      .join(" ");
    const conn = document.createElementNS(SVG_NS, "polyline");
    conn.setAttribute("class", "conn");
    conn.setAttribute("points", ptsStr);
    svg.appendChild(conn);

    /* Lit cells at anchor positions */
    for (const a of anchors) {
      const { cx, cy } = cellCenter(a.col, a.row);
      const lit = document.createElementNS(SVG_NS, "polygon");
      lit.setAttribute("class", "hx-lit");
      lit.setAttribute("points", hexPoints(cx, cy, HEX_R * 0.9));
      svg.appendChild(lit);
    }

    /* Light pulse flowing along the path */
    if (showPulse && !reducedMotion) {
      const pathD =
        "M " +
        fullPath
          .map((n) => {
            const { cx, cy } = cellCenter(n.col, n.row);
            return `${cx.toFixed(1)} ${cy.toFixed(1)}`;
          })
          .join(" L ");

      /* Calculate total path length for dash animation */
      let totalLength = 0;
      for (let i = 1; i < fullPath.length; i++) {
        const prev = cellCenter(fullPath[i - 1].col, fullPath[i - 1].row);
        const curr = cellCenter(fullPath[i].col, fullPath[i].row);
        const dx = curr.cx - prev.cx;
        const dy = curr.cy - prev.cy;
        totalLength += Math.sqrt(dx * dx + dy * dy);
      }

      const pulseLen = 100;
      const gap = totalLength - pulseLen;
      const dur = Math.max(4, totalLength / 280).toFixed(1);

      /* Glow filter */
      const defs = document.createElementNS(SVG_NS, "defs");
      const filter = document.createElementNS(SVG_NS, "filter");
      filter.setAttribute("id", "pulse-glow");
      filter.setAttribute("x", "-100%");
      filter.setAttribute("y", "-100%");
      filter.setAttribute("width", "300%");
      filter.setAttribute("height", "300%");
      const blur = document.createElementNS(SVG_NS, "feGaussianBlur");
      blur.setAttribute("in", "SourceGraphic");
      blur.setAttribute("stdDeviation", "6");
      filter.appendChild(blur);
      defs.appendChild(filter);
      svg.appendChild(defs);

      /* Glow layer — wide, blurred, soft gold */
      const glowPath = document.createElementNS(SVG_NS, "path");
      glowPath.setAttribute("d", pathD);
      glowPath.setAttribute("fill", "none");
      glowPath.setAttribute("stroke", "rgba(224, 176, 58, 0.55)");
      glowPath.setAttribute("stroke-width", "8");
      glowPath.setAttribute("stroke-linecap", "round");
      glowPath.setAttribute("stroke-linejoin", "round");
      glowPath.setAttribute("stroke-dasharray", `${pulseLen} ${gap}`);
      glowPath.setAttribute("filter", "url(#pulse-glow)");
      const glowAnim = document.createElementNS(SVG_NS, "animate");
      glowAnim.setAttribute("attributeName", "stroke-dashoffset");
      glowAnim.setAttribute("values", `0;${-totalLength}`);
      glowAnim.setAttribute("dur", dur + "s");
      glowAnim.setAttribute("repeatCount", "indefinite");
      glowPath.appendChild(glowAnim);
      svg.appendChild(glowPath);

      /* Core pulse — sharp bright line */
      const corePath = document.createElementNS(SVG_NS, "path");
      corePath.setAttribute("d", pathD);
      corePath.setAttribute("fill", "none");
      corePath.setAttribute("stroke", "#E0B03A");
      corePath.setAttribute("stroke-width", "2");
      corePath.setAttribute("stroke-linecap", "round");
      corePath.setAttribute("stroke-linejoin", "round");
      corePath.setAttribute("stroke-dasharray", `${pulseLen} ${gap}`);
      const coreAnim = document.createElementNS(SVG_NS, "animate");
      coreAnim.setAttribute("attributeName", "stroke-dashoffset");
      coreAnim.setAttribute("values", `0;${-totalLength}`);
      coreAnim.setAttribute("dur", dur + "s");
      coreAnim.setAttribute("repeatCount", "indefinite");
      corePath.appendChild(coreAnim);
      svg.appendChild(corePath);
    }
  }

  return svg;
}

/* ==========================================================================
   React component
   ========================================================================== */

interface HexMeshProps {
  variant?: "light" | "dark";
  /** Fraction of cells that get the shaded fill (0–1). Default 0.12 */
  density?: number;
  /** Show the golden connection path between anchors. Default true */
  showPath?: boolean;
  /** Show the animated pulse traveling the path. Default true */
  showPulse?: boolean;
}

/* ---- Mouse interaction constants ---- */
const INTERACT_RADIUS = 140;
const INTERACT_BOOST = 0.14;
const INTERACT_FILL_LIGHT = "rgb(43, 37, 32)";
const INTERACT_FILL_DARK = "rgb(239, 233, 218)";

interface CellInfo {
  el: SVGPolygonElement;
  cx: number;
  cy: number;
  isShade: boolean;
}

export default function HexMesh({
  variant = "light",
  density = 0.12,
  showPath = true,
  showPulse = true,
}: HexMeshProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const cellInfoRef = useRef<CellInfo[]>([]);
  const activeSetRef = useRef<Set<SVGPolygonElement>>(new Set());
  const rafRef = useRef(0);
  const [, setTick] = useState(0);

  const build = useCallback(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    const parent = wrap.parentElement;
    if (!parent) return;

    const w = parent.offsetWidth;
    const h = parent.offsetHeight;
    if (!w || !h) return;

    const reducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const svg = buildMeshSVG(w, h, reducedMotion, density, showPath, showPulse);
    if (!svg) return;

    /* Replace old SVG */
    wrap.innerHTML = "";
    wrap.appendChild(svg);

    /* Cache polygon positions for mouse interaction */
    const polygons = svg.querySelectorAll<SVGPolygonElement>(".hx, .hx-shade");
    cellInfoRef.current = Array.from(polygons).map((el) => ({
      el,
      cx: parseFloat(el.getAttribute("data-cx") || "0"),
      cy: parseFloat(el.getAttribute("data-cy") || "0"),
      isShade: el.classList.contains("hx-shade"),
    }));
  }, [density, showPath, showPulse]);

  useEffect(() => {
    /* Build after first paint so parent has correct dimensions */
    const raf = requestAnimationFrame(() => {
      build();
      setTick((t) => t + 1);
    });

    /* Debounced rebuild on resize */
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

  /* ---- Mouse interaction ---- */
  const variantRef = useRef(variant);
  variantRef.current = variant;

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    const section = wrap.parentElement;
    if (!section) return;

    const reducedMotion =
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) return;

    const onMouseMove = (e: MouseEvent) => {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        const svg = wrap.querySelector("svg");
        if (!svg) return;

        /* Convert screen coordinates to SVG space */
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

        /* Reset cells no longer in range */
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
