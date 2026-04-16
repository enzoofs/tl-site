"use client";

import { useEffect, useRef, useCallback } from "react";

/* ==========================================================================
   HEX PATH — overlay global. Path percorre o grafo de vertices/corners
   (arestas entre hexes). Ancoras sao "atravessadas" via arco de boundary.
   Clusters de 1-3 hexes dourados pulsam ao pulso chegar.
   ========================================================================== */

const HEX_R = 24;
const HEX_W = HEX_R * Math.sqrt(3);
const ROW_H = HEX_R * 1.5;
const SVG_NS = "http://www.w3.org/2000/svg";

interface Cell {
  col: number;
  row: number;
}
interface Pt {
  x: number;
  y: number;
}

function cellCenter(col: number, row: number) {
  const parity = ((row % 2) + 2) % 2;
  return {
    cx: col * HEX_W + (parity ? HEX_W / 2 : 0),
    cy: row * ROW_H,
  };
}

function cornersOf(col: number, row: number): Pt[] {
  const { cx, cy } = cellCenter(col, row);
  const out: Pt[] = [];
  for (let i = 0; i < 6; i++) {
    const a = (Math.PI / 180) * (60 * i - 30);
    out.push({ x: cx + HEX_R * Math.cos(a), y: cy + HEX_R * Math.sin(a) });
  }
  return out;
}

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

function cornerKey(x: number, y: number): string {
  return `${Math.round(x * 10)}|${Math.round(y * 10)}`;
}

function cellCornerKey(cell: Cell, idx: number): string {
  const { cx, cy } = cellCenter(cell.col, cell.row);
  const a = (Math.PI / 180) * (60 * idx - 30);
  return cornerKey(cx + HEX_R * Math.cos(a), cy + HEX_R * Math.sin(a));
}

interface CornerNode {
  x: number;
  y: number;
  neighbors: Set<string>;
}
interface Bounds {
  colMin: number;
  colMax: number;
  rowMin: number;
  rowMax: number;
}

function buildCornerGraph(bounds: Bounds): Map<string, CornerNode> {
  const g = new Map<string, CornerNode>();
  for (let r = bounds.rowMin; r <= bounds.rowMax; r++) {
    for (let c = bounds.colMin; c <= bounds.colMax; c++) {
      const cs = cornersOf(c, r);
      for (let i = 0; i < 6; i++) {
        const a = cs[i];
        const b = cs[(i + 1) % 6];
        const ka = cornerKey(a.x, a.y);
        const kb = cornerKey(b.x, b.y);
        let na = g.get(ka);
        if (!na) {
          na = { x: a.x, y: a.y, neighbors: new Set() };
          g.set(ka, na);
        }
        let nb = g.get(kb);
        if (!nb) {
          nb = { x: b.x, y: b.y, neighbors: new Set() };
          g.set(kb, nb);
        }
        na.neighbors.add(kb);
        nb.neighbors.add(ka);
      }
    }
  }
  return g;
}

/* Qual corner da celula aponta mais na direcao do alvo */
function anchorCornerIndex(from: Cell, toward: Cell): number {
  const s = cellCenter(from.col, from.row);
  const t = cellCenter(toward.col, toward.row);
  const dx = t.cx - s.cx;
  const dy = t.cy - s.cy;
  let bestDot = -Infinity;
  let bestIdx = 0;
  for (let i = 0; i < 6; i++) {
    const a = (Math.PI / 180) * (60 * i - 30);
    const ox = HEX_R * Math.cos(a);
    const oy = HEX_R * Math.sin(a);
    const dot = ox * dx + oy * dy;
    if (dot > bestDot) {
      bestDot = dot;
      bestIdx = i;
    }
  }
  return bestIdx;
}

/* Arco ao longo da boundary da celula, do entryIdx ao exitIdx (menor caminho) */
function anchorArc(cell: Cell, entryIdx: number, exitIdx: number): Pt[] {
  const corners = cornersOf(cell.col, cell.row);
  const cwSteps = ((exitIdx - entryIdx) + 6) % 6;
  const ccwSteps = ((entryIdx - exitIdx) + 6) % 6;
  const out: Pt[] = [];
  if (cwSteps === 0) {
    out.push(corners[entryIdx]);
    return out;
  }
  if (cwSteps <= ccwSteps) {
    for (let k = 0; k <= cwSteps; k++) out.push(corners[(entryIdx + k) % 6]);
  } else {
    for (let k = 0; k <= ccwSteps; k++) out.push(corners[(entryIdx - k + 6) % 6]);
  }
  return out;
}

/* BFS no grafo de corners. Sempre encontra caminho (se existir) sem detours.
   Shuffle dos vizinhos gera paths diferentes a cada build pra variedade. */
function cornerWalk(
  startKey: string,
  endKey: string,
  graph: Map<string, CornerNode>
): Pt[] {
  if (!graph.has(startKey) || !graph.has(endKey)) return [];
  if (startKey === endKey) {
    const n = graph.get(startKey)!;
    return [{ x: n.x, y: n.y }];
  }
  const parent = new Map<string, string>();
  parent.set(startKey, startKey);
  const queue: string[] = [startKey];
  let head = 0;
  let found = false;
  while (head < queue.length) {
    const cur = queue[head++];
    if (cur === endKey) {
      found = true;
      break;
    }
    const node = graph.get(cur)!;
    const nbrs: string[] = [];
    for (const nk of node.neighbors) {
      if (!parent.has(nk)) nbrs.push(nk);
    }
    for (let i = nbrs.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [nbrs[i], nbrs[j]] = [nbrs[j], nbrs[i]];
    }
    for (const nk of nbrs) {
      parent.set(nk, cur);
      queue.push(nk);
    }
  }
  if (!found) return [];
  const keys: string[] = [];
  let cur = endKey;
  while (cur !== startKey) {
    keys.push(cur);
    cur = parent.get(cur)!;
  }
  keys.push(startKey);
  keys.reverse();
  return keys.map((k) => {
    const n = graph.get(k)!;
    return { x: n.x, y: n.y };
  });
}

/* Ancoras aleatorias em bandas verticais */
function pickAnchors(cols: number, rowMax: number): Cell[] {
  const targetSpacingPx = 320;
  const n = Math.max(6, Math.round((rowMax * ROW_H) / targetSpacingPx));
  const band = rowMax / n;
  const out: Cell[] = [];
  for (let i = 0; i < n; i++) {
    const col = 2 + Math.floor(Math.random() * Math.max(1, cols - 5));
    const row = Math.round(i * band + band * (0.25 + Math.random() * 0.5));
    out.push({
      col: Math.max(1, Math.min(cols - 2, col)),
      row: Math.max(1, Math.min(rowMax - 1, row)),
    });
  }
  return out;
}

/* Cluster de 1-3 hexes adjacentes ao redor do primary */
function buildCluster(
  primary: Cell,
  cols: number,
  rowMax: number,
  used: Set<string>
): Cell[] {
  const roll = Math.random();
  const targetSize = roll < 0.45 ? 1 : roll < 0.8 ? 2 : 3;
  const cells: Cell[] = [primary];
  used.add(`${primary.col}_${primary.row}`);

  while (cells.length < targetSize) {
    const last = cells[Math.floor(Math.random() * cells.length)];
    const odd = (((last.row % 2) + 2) % 2) === 1;
    const dirs: [number, number][] = [
      [1, 0],
      [-1, 0],
      [odd ? 1 : 0, -1],
      [-(odd ? 0 : 1), -1],
      [odd ? 1 : 0, 1],
      [-(odd ? 0 : 1), 1],
    ];
    for (let i = dirs.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [dirs[i], dirs[j]] = [dirs[j], dirs[i]];
    }
    let added = false;
    for (const [dc, dr] of dirs) {
      const nc = last.col + dc;
      const nr = last.row + dr;
      if (nc < 1 || nc > cols - 2 || nr < 1 || nr > rowMax - 1) continue;
      const k = `${nc}_${nr}`;
      if (used.has(k)) continue;
      cells.push({ col: nc, row: nr });
      used.add(k);
      added = true;
      break;
    }
    if (!added) break;
  }
  return cells;
}

function segLength(path: Pt[]): number {
  let L = 0;
  for (let i = 1; i < path.length; i++) {
    L += Math.hypot(path[i].x - path[i - 1].x, path[i].y - path[i - 1].y);
  }
  return L;
}

/* Subgrafo restrito aos corners das celulas do cluster — BFS interno fica
   contido na area do cluster, podendo passar pelas arestas compartilhadas. */
function buildClusterGraph(cluster: Cell[]): Map<string, CornerNode> {
  const g = new Map<string, CornerNode>();
  for (const cell of cluster) {
    const cs = cornersOf(cell.col, cell.row);
    for (let i = 0; i < 6; i++) {
      const a = cs[i];
      const b = cs[(i + 1) % 6];
      const ka = cornerKey(a.x, a.y);
      const kb = cornerKey(b.x, b.y);
      let na = g.get(ka);
      if (!na) {
        na = { x: a.x, y: a.y, neighbors: new Set() };
        g.set(ka, na);
      }
      let nb = g.get(kb);
      if (!nb) {
        nb = { x: b.x, y: b.y, neighbors: new Set() };
        g.set(kb, nb);
      }
      na.neighbors.add(kb);
      nb.neighbors.add(ka);
    }
  }
  return g;
}

/* Celula do cluster mais proxima de um alvo */
function closestInCluster(cluster: Cell[], target: Cell): Cell {
  const tc = cellCenter(target.col, target.row);
  let best = cluster[0];
  let bestD = Infinity;
  for (const c of cluster) {
    const p = cellCenter(c.col, c.row);
    const d = Math.hypot(p.cx - tc.cx, p.cy - tc.cy);
    if (d < bestD) {
      bestD = d;
      best = c;
    }
  }
  return best;
}

interface BuildResult {
  svg: SVGSVGElement;
  pulseDur: number;
}

function buildPathSVG(
  docW: number,
  docH: number,
  reducedMotion: boolean
): BuildResult | null {
  if (!docW || !docH) return null;

  const cols = Math.ceil(docW / HEX_W) + 2;
  const rowMax = Math.ceil(docH / ROW_H) + 1;
  const bounds: Bounds = { colMin: 0, colMax: cols - 1, rowMin: 0, rowMax };

  const anchors = pickAnchors(cols, rowMax);
  if (anchors.length < 2) return null;

  const usedCells = new Set<string>();
  const clusters: Cell[][] = anchors.map((a) =>
    buildCluster(a, cols, rowMax, usedCells)
  );

  const graph = buildCornerGraph(bounds);

  /* Pra cada ancora: celula/corner de entrada (vindo da anterior) e saida (rumo a seguinte).
     Em clusters multi-celula, entry/exit podem cair em celulas diferentes — dai a linha
     "passa no meio" cruzando as arestas compartilhadas entre os hexes dourados. */
  interface Port {
    cell: Cell;
    idx: number;
  }
  const entry: Port[] = [];
  const exit: Port[] = [];

  for (let i = 0; i < anchors.length; i++) {
    const cluster = clusters[i];
    if (i < anchors.length - 1) {
      const next = anchors[i + 1];
      const cell = closestInCluster(cluster, next);
      exit.push({ cell, idx: anchorCornerIndex(cell, next) });
    } else {
      exit.push({ cell: cluster[0], idx: 0 });
    }
    if (i > 0) {
      const prev = anchors[i - 1];
      const cell = closestInCluster(cluster, prev);
      entry.push({ cell, idx: anchorCornerIndex(cell, prev) });
    } else {
      entry.push({ cell: exit[0].cell, idx: (exit[0].idx + 3) % 6 });
    }
  }
  /* Ultimo ancora: exit oposto ao entry (path termina la) */
  const lastI = anchors.length - 1;
  exit[lastI] = { cell: entry[lastI].cell, idx: (entry[lastI].idx + 3) % 6 };

  const fullPath: Pt[] = [];
  const arrivalLen: number[] = [];

  /* Traversal interno na ancora 0: entry -> exit via subgrafo do cluster */
  const firstInternal = cornerWalk(
    cellCornerKey(entry[0].cell, entry[0].idx),
    cellCornerKey(exit[0].cell, exit[0].idx),
    buildClusterGraph(clusters[0])
  );
  fullPath.push(...firstInternal);
  arrivalLen.push(0);

  for (let i = 0; i < anchors.length - 1; i++) {
    /* Segmento externo: exit de [i] -> entry de [i+1] (grafo global) */
    const seg = cornerWalk(
      cellCornerKey(exit[i].cell, exit[i].idx),
      cellCornerKey(entry[i + 1].cell, entry[i + 1].idx),
      graph
    );
    if (seg.length < 2) {
      arrivalLen.push(arrivalLen[arrivalLen.length - 1]);
      continue;
    }
    fullPath.push(...seg.slice(1));
    arrivalLen.push(segLength(fullPath));

    /* Traversal interno do cluster [i+1]: pode cruzar arestas compartilhadas */
    const internal = cornerWalk(
      cellCornerKey(entry[i + 1].cell, entry[i + 1].idx),
      cellCornerKey(exit[i + 1].cell, exit[i + 1].idx),
      buildClusterGraph(clusters[i + 1])
    );
    if (internal.length > 1) fullPath.push(...internal.slice(1));
  }

  if (fullPath.length < 2) return null;

  const svg = document.createElementNS(SVG_NS, "svg");
  svg.setAttribute("viewBox", `0 0 ${docW} ${docH}`);
  svg.setAttribute("preserveAspectRatio", "xMinYMin slice");
  svg.setAttribute("aria-hidden", "true");

  const pathD =
    "M " + fullPath.map((p) => `${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(" L ");
  const totalLength = segLength(fullPath);

  /* Pra cada cluster, identifica em qual trecho do path o pulso esta "dentro" dele.
     Usa corners das celulas do cluster como marcadores. */
  const clusterCornerKeys: Set<string>[] = clusters.map((cluster) => {
    const keys = new Set<string>();
    for (const cell of cluster) {
      for (const c of cornersOf(cell.col, cell.row)) {
        keys.add(cornerKey(c.x, c.y));
      }
    }
    return keys;
  });
  const clusterSpans: { entryLen: number; exitLen: number }[] = clusters.map(
    () => ({ entryLen: -1, exitLen: -1 })
  );
  {
    let cum = 0;
    for (let i = 0; i < fullPath.length; i++) {
      if (i > 0) {
        cum += Math.hypot(
          fullPath[i].x - fullPath[i - 1].x,
          fullPath[i].y - fullPath[i - 1].y
        );
      }
      const key = cornerKey(fullPath[i].x, fullPath[i].y);
      for (let j = 0; j < clusters.length; j++) {
        if (clusterCornerKeys[j].has(key)) {
          if (clusterSpans[j].entryLen < 0) clusterSpans[j].entryLen = cum;
          clusterSpans[j].exitLen = cum;
        }
      }
    }
  }

  /* Mask: path fica invisivel nas regioes dos hexes dourados.
     Branco = visivel, preto = invisivel. Hexes das ancoras desenhados em preto
     criam "buracos" que apagam a linha dentro deles. */
  const defs = document.createElementNS(SVG_NS, "defs");
  const mask = document.createElementNS(SVG_NS, "mask");
  mask.setAttribute("id", "hex-path-mask");
  mask.setAttribute("maskUnits", "userSpaceOnUse");
  mask.setAttribute("x", "0");
  mask.setAttribute("y", "0");
  mask.setAttribute("width", String(docW));
  mask.setAttribute("height", String(docH));
  const maskBg = document.createElementNS(SVG_NS, "rect");
  maskBg.setAttribute("width", String(docW));
  maskBg.setAttribute("height", String(docH));
  maskBg.setAttribute("fill", "white");
  mask.appendChild(maskBg);
  for (const cluster of clusters) {
    for (const cell of cluster) {
      const { cx, cy } = cellCenter(cell.col, cell.row);
      const hole = document.createElementNS(SVG_NS, "polygon");
      hole.setAttribute("fill", "black");
      /* Buraco menor que o hex visual: esconde interior mas deixa arestas/shared-edges
         (no raio ~0.87R) visiveis, pra linha "atravessar" o cluster entre hexes */
      hole.setAttribute("points", hexPoints(cx, cy, HEX_R * 0.65));
      mask.appendChild(hole);
    }
  }
  defs.appendChild(mask);

  /* Filter bloom duplo pra ancoras: tight glow + wide halo = efeito constelacao */
  const anchorGlowFilter = document.createElementNS(SVG_NS, "filter");
  anchorGlowFilter.setAttribute("id", "hex-anchor-glow");
  anchorGlowFilter.setAttribute("x", "-150%");
  anchorGlowFilter.setAttribute("y", "-150%");
  anchorGlowFilter.setAttribute("width", "400%");
  anchorGlowFilter.setAttribute("height", "400%");
  /* Camada 1: glow tight (nucleo brilhante) */
  const tightBlur = document.createElementNS(SVG_NS, "feGaussianBlur");
  tightBlur.setAttribute("in", "SourceGraphic");
  tightBlur.setAttribute("stdDeviation", "4");
  tightBlur.setAttribute("result", "tight");
  anchorGlowFilter.appendChild(tightBlur);
  /* Camada 2: halo wide (bloom que sangra pra fora) */
  const wideBlur = document.createElementNS(SVG_NS, "feGaussianBlur");
  wideBlur.setAttribute("in", "SourceGraphic");
  wideBlur.setAttribute("stdDeviation", "14");
  wideBlur.setAttribute("result", "wide");
  anchorGlowFilter.appendChild(wideBlur);
  /* Merge: tight + wide compostos juntos */
  const merge = document.createElementNS(SVG_NS, "feMerge");
  const mergeWide = document.createElementNS(SVG_NS, "feMergeNode");
  mergeWide.setAttribute("in", "wide");
  merge.appendChild(mergeWide);
  const mergeTight = document.createElementNS(SVG_NS, "feMergeNode");
  mergeTight.setAttribute("in", "tight");
  merge.appendChild(mergeTight);
  anchorGlowFilter.appendChild(merge);
  defs.appendChild(anchorGlowFilter);

  svg.appendChild(defs);

  /* Grupo mascarado: tudo aqui dentro "some" nas areas dos hexes dourados */
  const masked = document.createElementNS(SVG_NS, "g");
  masked.setAttribute("mask", "url(#hex-path-mask)");
  svg.appendChild(masked);

  const conn = document.createElementNS(SVG_NS, "path");
  conn.setAttribute("d", pathD);
  conn.setAttribute("class", "conn");
  masked.appendChild(conn);

  const pulseDur = Math.max(14, totalLength / 220);

  if (!reducedMotion) {
    const pulseLen = 100;
    const gap = Math.max(totalLength - pulseLen, pulseLen);

    const filter = document.createElementNS(SVG_NS, "filter");
    filter.setAttribute("id", "hex-pulse-glow");
    filter.setAttribute("x", "-100%");
    filter.setAttribute("y", "-100%");
    filter.setAttribute("width", "300%");
    filter.setAttribute("height", "300%");
    const blur = document.createElementNS(SVG_NS, "feGaussianBlur");
    blur.setAttribute("in", "SourceGraphic");
    blur.setAttribute("stdDeviation", "6");
    filter.appendChild(blur);
    defs.appendChild(filter);

    const glow = document.createElementNS(SVG_NS, "path");
    glow.setAttribute("d", pathD);
    glow.setAttribute("fill", "none");
    glow.setAttribute("stroke", "rgba(224, 176, 58, 0.55)");
    glow.setAttribute("stroke-width", "8");
    glow.setAttribute("stroke-linecap", "round");
    glow.setAttribute("stroke-linejoin", "round");
    glow.setAttribute("stroke-dasharray", `${pulseLen} ${gap}`);
    glow.setAttribute("filter", "url(#hex-pulse-glow)");
    const glowAnim = document.createElementNS(SVG_NS, "animate");
    glowAnim.setAttribute("attributeName", "stroke-dashoffset");
    glowAnim.setAttribute("values", `0;${-totalLength}`);
    glowAnim.setAttribute("dur", pulseDur.toFixed(2) + "s");
    glowAnim.setAttribute("repeatCount", "indefinite");
    glow.appendChild(glowAnim);
    masked.appendChild(glow);

    const core = document.createElementNS(SVG_NS, "path");
    core.setAttribute("d", pathD);
    core.setAttribute("fill", "none");
    core.setAttribute("stroke", "#E0B03A");
    core.setAttribute("stroke-width", "2");
    core.setAttribute("stroke-linecap", "round");
    core.setAttribute("stroke-linejoin", "round");
    core.setAttribute("stroke-dasharray", `${pulseLen} ${gap}`);
    const coreAnim = document.createElementNS(SVG_NS, "animate");
    coreAnim.setAttribute("attributeName", "stroke-dashoffset");
    coreAnim.setAttribute("values", `0;${-totalLength}`);
    coreAnim.setAttribute("dur", pulseDur.toFixed(2) + "s");
    coreAnim.setAttribute("repeatCount", "indefinite");
    core.appendChild(coreAnim);
    masked.appendChild(core);
  }

  /* Brightness variavel por anchor: cria variacao de profundidade (uns brilham mais
     que outros). Bias pro centro vertical da pagina pra efeito de concentracao organica. */
  const anchorBrightness: number[] = anchors.map((a) => {
    const centerFrac = 1 - Math.abs((a.row * ROW_H) / docH - 0.5) * 2;
    const base = 0.4 + Math.random() * 0.6;
    return Math.min(1, base * (0.5 + centerFrac * 0.5));
  });

  /* Ancoras renderizadas POR ULTIMO. Cada cluster recebe animacao sincronizada
     a janela em que o pulso o atravessa: fill-opacity sobe e glow acende, depois volta. */
  for (let i = 0; i < anchors.length; i++) {
    const span = clusterSpans[i];
    const hasSpan = span.entryLen >= 0 && span.exitLen >= 0;
    let entryFrac = hasSpan ? span.entryLen / totalLength : 0;
    let exitFrac = hasSpan ? span.exitLen / totalLength : 1;
    entryFrac = Math.max(0.001, Math.min(0.999, entryFrac));
    exitFrac = Math.max(entryFrac + 0.003, Math.min(0.999, exitFrac));
    const rampIn = 0.006;
    const rampOut = 0.02;
    const t0 = Math.max(0, entryFrac - rampIn);
    const t1 = entryFrac;
    const t2 = exitFrac;
    const t3 = Math.min(0.9999, exitFrac + rampOut);
    const keyTimes = `0;${t0.toFixed(4)};${t1.toFixed(4)};${t2.toFixed(4)};${t3.toFixed(4)};1`;

    const bright = anchorBrightness[i];
    /* Opacidades escaladas pelo brightness do anchor */
    const glowBaseOp = (0.25 + bright * 0.35).toFixed(2);
    const litBaseFill = (0.3 + bright * 0.35).toFixed(2);
    const litPeakFill = (0.5 + bright * 0.5).toFixed(2);

    for (const cell of clusters[i]) {
      const { cx, cy } = cellCenter(cell.col, cell.row);

      /* Glow atras: raio 1.6x = halo amplo, bloom duplo borra pra criar constelacao */
      if (!reducedMotion && hasSpan) {
        const glowLit = document.createElementNS(SVG_NS, "polygon");
        glowLit.setAttribute("points", hexPoints(cx, cy, HEX_R * 1.6));
        glowLit.setAttribute("fill", `rgba(224, 176, 58, ${glowBaseOp})`);
        glowLit.setAttribute("stroke", "none");
        glowLit.setAttribute("filter", "url(#hex-anchor-glow)");
        glowLit.setAttribute("opacity", "0");
        const gAnim = document.createElementNS(SVG_NS, "animate");
        gAnim.setAttribute("attributeName", "opacity");
        gAnim.setAttribute("values", `0;0;${bright.toFixed(2)};${bright.toFixed(2)};0;0`);
        gAnim.setAttribute("keyTimes", keyTimes);
        gAnim.setAttribute("dur", pulseDur.toFixed(2) + "s");
        gAnim.setAttribute("repeatCount", "indefinite");
        glowLit.appendChild(gAnim);
        svg.appendChild(glowLit);
      }

      /* Hex solido: fill-opacity escalado pelo brightness deste anchor */
      const lit = document.createElementNS(SVG_NS, "polygon");
      lit.setAttribute("class", "hx-lit");
      lit.setAttribute("points", hexPoints(cx, cy, HEX_R * 0.95));
      if (!reducedMotion && hasSpan) {
        const anim = document.createElementNS(SVG_NS, "animate");
        anim.setAttribute("attributeName", "fill-opacity");
        anim.setAttribute("values", `${litBaseFill};${litBaseFill};${litPeakFill};${litPeakFill};${litBaseFill};${litBaseFill}`);
        anim.setAttribute("keyTimes", keyTimes);
        anim.setAttribute("dur", pulseDur.toFixed(2) + "s");
        anim.setAttribute("repeatCount", "indefinite");
        lit.appendChild(anim);
      }
      svg.appendChild(lit);
    }
  }

  return { svg, pulseDur };
}

export default function HexPath() {
  const wrapRef = useRef<HTMLDivElement>(null);

  const build = useCallback(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;

    const docH = Math.max(
      document.documentElement.scrollHeight,
      document.body.scrollHeight
    );
    const docW = document.documentElement.clientWidth;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const result = buildPathSVG(docW, docH, reducedMotion);
    wrap.innerHTML = "";
    wrap.style.height = docH + "px";
    if (result) wrap.appendChild(result.svg);
  }, []);

  useEffect(() => {
    const raf1 = requestAnimationFrame(() => {
      const raf2 = requestAnimationFrame(build);
      (build as unknown as { _raf2: number })._raf2 = raf2;
    });

    let resizeTimer: ReturnType<typeof setTimeout>;
    const onResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(build, 300);
    };
    window.addEventListener("resize", onResize);

    const ro = new ResizeObserver(() => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(build, 300);
    });
    ro.observe(document.body);

    return () => {
      cancelAnimationFrame(raf1);
      cancelAnimationFrame(
        (build as unknown as { _raf2?: number })._raf2 ?? 0
      );
      clearTimeout(resizeTimer);
      window.removeEventListener("resize", onResize);
      ro.disconnect();
    };
  }, [build]);

  return <div id="hex-global" ref={wrapRef} aria-hidden="true" />;
}
