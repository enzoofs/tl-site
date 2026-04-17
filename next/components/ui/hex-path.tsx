"use client";

import { useEffect, useRef, useCallback } from "react";
import {
  HEX_R,
  HEX_W,
  ROW_H,
  SVG_NS,
  Cell,
  Pt,
  cellCenter,
  cellHash,
  hexPoints,
  cornersOf,
  cornerKey,
  cellCornerKey,
} from "./hex-grid";

/* ==========================================================================
   HEX PATH — overlay global (lamplighter ciclico).

   Conceito: um pulso dourado (invisivel como trajeto, so o pingo eh visto)
   entra off-screen no topo, desce em serpente tocando os centros de TODOS
   os .hx-shade existentes, sai off-screen no pe. Cada shade tocado acende,
   segura alguns segundos, e apaga — cauda de luz seguindo o pulso como um
   lamplighter classico apagando as lampadas atras de si. O pulso loopa
   indefinidamente, a cidade respira.
   ========================================================================== */

/* Timing (absolutos em segundos — convertidos pra fracao do pulseDur) */
const HOLD_LIT_SEC = 8;
const FADE_OUT_SEC = 2.5;
const RAMP_IN_SEC = 0.2;

/* -------------------- PRNG deterministico (Mulberry32) ------------------- */

function mulberry32(seed: number) {
  let s = seed | 0;
  return function rng(): number {
    s = (s + 0x6d2b79f5) | 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/* -------------------- Density map (lido do DOM) -------------------------- */

interface DensityBand {
  yStart: number;
  yEnd: number;
  density: number;
}

function readDensityBands(): DensityBand[] {
  const sections = document.querySelectorAll<HTMLElement>(
    "[data-hex-density]"
  );
  const bands: DensityBand[] = [];
  for (const sec of sections) {
    const d = parseFloat(sec.getAttribute("data-hex-density") || "0");
    if (!(d > 0)) continue;
    const rect = sec.getBoundingClientRect();
    const yStart = rect.top + window.scrollY;
    const yEnd = yStart + rect.height;
    bands.push({ yStart, yEnd, density: d });
  }
  bands.sort((a, b) => a.yStart - b.yStart);
  return bands;
}

function makeDensityAt(bands: DensityBand[]) {
  return (y: number): number => {
    for (const b of bands) {
      if (y >= b.yStart && y < b.yEnd) return b.density;
    }
    return 0;
  };
}

/* -------------------- Zonas de texto protegidas ------------------------- */

interface Rect {
  left: number;
  top: number;
  right: number;
  bottom: number;
}

/* Seletor abrangente de elementos que contem texto legivel. Coletamos seus
   bounding rects pra evitar que hexes dourados acendam em cima. Nao pega
   qualquer <span> (muito amplo e captura elementos decorativos) — foca em
   headings, paragrafos, links, botoes, inputs e classes de destaque do
   design system (eyebrow, wordmark, tagline, hl-*, citation). */
const TEXT_SELECTOR =
  "h1, h2, h3, h4, h5, h6, p, a, button, label, input, textarea, " +
  ".eyebrow, .tagline, .wordmark, .citation, " +
  "[class*='hl-']";

/* Padding ao redor do texto onde shades sao filtrados. ~1 raio de hex garante
   respiro visual minimo antes do dourado comecar. */
const TEXT_PADDING = HEX_R;

function readTextRects(): Rect[] {
  const els = document.querySelectorAll<HTMLElement>(TEXT_SELECTOR);
  const rects: Rect[] = [];
  const scrollX = window.scrollX;
  const scrollY = window.scrollY;
  for (const el of els) {
    const r = el.getBoundingClientRect();
    if (r.width <= 0 || r.height <= 0) continue;
    rects.push({
      left: r.left + scrollX - TEXT_PADDING,
      top: r.top + scrollY - TEXT_PADDING,
      right: r.right + scrollX + TEXT_PADDING,
      bottom: r.bottom + scrollY + TEXT_PADDING,
    });
  }
  return rects;
}

function pointOverText(cx: number, cy: number, rects: Rect[]): boolean {
  for (const r of rects) {
    if (cx >= r.left && cx <= r.right && cy >= r.top && cy <= r.bottom) {
      return true;
    }
  }
  return false;
}

/* -------------------- Clusters ao acender -------------------------------- */

/* 6 vizinhos hexagonais dependem da paridade da row (offset horizontal). */
function hexNeighbors(cell: Cell): Cell[] {
  const odd = (((cell.row % 2) + 2) % 2) === 1;
  const dirs: [number, number][] = [
    [1, 0],
    [-1, 0],
    [odd ? 1 : 0, -1],
    [odd ? 0 : -1, -1],
    [odd ? 1 : 0, 1],
    [odd ? 0 : -1, 1],
  ];
  return dirs.map(([dc, dr]) => ({ col: cell.col + dc, row: cell.row + dr }));
}

/* Decide cluster size com bias pra singles (majoria das vezes 1 hex). De
   vez em quando acende 2, 3 ou 4 hexes conectados — quebra a monotonia
   de unidades isoladas. Vizinhos adicionados nao podem cair sobre texto. */
function pickClusterCells(
  primary: Cell,
  cols: number,
  rowMax: number,
  textRects: Rect[],
  rng: () => number
): Cell[] {
  const roll = rng();
  let targetSize: number;
  if (roll < 0.7) targetSize = 1;
  else if (roll < 0.88) targetSize = 2;
  else if (roll < 0.97) targetSize = 3;
  else targetSize = 4;

  const cluster: Cell[] = [primary];
  const used = new Set<string>([`${primary.col}_${primary.row}`]);

  while (cluster.length < targetSize) {
    /* Expande a partir de um membro aleatorio do cluster (nao so do primary)
       — permite crescer em formato L ou Y, nao so estrela */
    const from = cluster[Math.floor(rng() * cluster.length)];
    const nbrs = hexNeighbors(from);
    for (let i = nbrs.length - 1; i > 0; i--) {
      const j = Math.floor(rng() * (i + 1));
      [nbrs[i], nbrs[j]] = [nbrs[j], nbrs[i]];
    }
    let added = false;
    for (const nb of nbrs) {
      if (nb.col < 1 || nb.col > cols - 2) continue;
      if (nb.row < 1 || nb.row > rowMax - 1) continue;
      const k = `${nb.col}_${nb.row}`;
      if (used.has(k)) continue;
      const { cx } = cellCenter(nb.col, nb.row);
      const cy = nb.row * ROW_H;
      if (pointOverText(cx, cy, textRects)) continue;
      cluster.push(nb);
      used.add(k);
      added = true;
      break;
    }
    if (!added) break;
  }
  return cluster;
}

/* -------------------- Coleta de shades + ordenacao serpente ------------- */

/* Coleta os .hx-shade do mesh (cellHash < density) que NAO caem sobre texto.
   O polygon dourado sobreposto so aparece quando o pulso chega — entao basta
   nao animar em cima de texto pra garantir que o texto nunca seja obscurecido. */
function collectShadeCells(
  cols: number,
  rowMax: number,
  densityAt: (y: number) => number,
  textRects: Rect[]
): Cell[] {
  const out: Cell[] = [];
  for (let r = 1; r < rowMax; r++) {
    const y = r * ROW_H;
    const d = densityAt(y);
    if (d <= 0) continue;
    for (let c = 1; c < cols - 1; c++) {
      if (cellHash(c, r) >= d) continue;
      const { cx } = cellCenter(c, r);
      if (pointOverText(cx, y, textRects)) continue;
      out.push({ col: c, row: r });
    }
  }
  return out;
}

/* Descida com amostragem: agrupa shades em bandas verticais e PEGA SOMENTE
   ALGUNS de cada banda (1-3 aleatoriamente). Assim o pulso nao precisa
   visitar todos os shades de uma faixa antes de descer — visita 1-3, cai
   pra proxima banda, visita mais 1-3, e por ai vai. O feature se distribui
   pela pagina inteira ao inves de saturar o topo. Cada reload sorteia um
   subset diferente, variando o visual entre sessoes.

   Bandas com muitos shades contribuem na mesma proporcao que bandas ralas
   — o que importa eh a DESCIDA continua, nao a cobertura completa. */
function orderShadesWandering(shades: Cell[], rng: () => number): Cell[] {
  const BAND_ROWS = 4;
  const byBand = new Map<number, Cell[]>();
  for (const c of shades) {
    const band = Math.floor(c.row / BAND_ROWS);
    const arr = byBand.get(band) || [];
    arr.push(c);
    byBand.set(band, arr);
  }
  const bands = Array.from(byBand.keys()).sort((a, b) => a - b);
  const out: Cell[] = [];
  for (const band of bands) {
    const pool = byBand.get(band)!;
    /* Fisher-Yates dentro da banda */
    for (let i = pool.length - 1; i > 0; i--) {
      const j = Math.floor(rng() * (i + 1));
      [pool[i], pool[j]] = [pool[j], pool[i]];
    }
    /* Pega entre 2 e 4 shades da banda (ou todos se tiver menos) */
    const takeCount = Math.min(pool.length, 2 + Math.floor(rng() * 3));
    out.push(...pool.slice(0, takeCount));
  }
  return out;
}

/* -------------------- Grafo de corners (arestas do grid hexagonal) ------ */

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

/* Constroi o grafo de corners do grid hexagonal no bounds dado. Cada hex
   contribui com 6 corners; arestas do hex conectam pares adjacentes de
   corners bidirecionalmente. Corners compartilhados entre hexes vizinhos
   sao unificados via cornerKey(x,y) (tolerancia 0.1px). */
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

/* Qual dos 6 corners da celula aponta mais na direcao do alvo (dot product
   do vetor do corner contra o vetor em direcao ao alvo). */
function anchorCornerIndex(from: Cell, toward: Cell): number {
  const s = cellCenter(from.col, from.row);
  const t = cellCenter(toward.col, toward.row);
  const dx = t.cx - s.cx;
  const dy = t.cy - s.cy;
  let bestDot = -Infinity;
  let bestIdx = 0;
  for (let i = 0; i < 6; i++) {
    const a = (Math.PI / 180) * (60 * i - 30);
    const ox = Math.cos(a);
    const oy = Math.sin(a);
    const dot = ox * dx + oy * dy;
    if (dot > bestDot) {
      bestDot = dot;
      bestIdx = i;
    }
  }
  return bestIdx;
}

/* BFS entre dois corners no grafo. Retorna sequencia de Pt ao longo de
   arestas conectadas. Shuffle dos vizinhos usa rng pra variedade
   deterministica por seed. */
function cornerWalk(
  startKey: string,
  endKey: string,
  graph: Map<string, CornerNode>,
  rng: () => number
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
      const j = Math.floor(rng() * (i + 1));
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

/* -------------------- Render helpers ------------------------------------- */

interface LitVisuals {
  isDark: boolean;
  stroke: string;
  strokeWidth: string;
}

function readLitVisuals(): LitVisuals {
  const isDark = document.documentElement.dataset.theme === "dark";
  return {
    isDark,
    stroke: isDark
      ? "rgba(224, 176, 58, 0.95)"
      : "rgba(224, 176, 58, 0.75)",
    strokeWidth: isDark ? "1.2" : "0.8",
  };
}

/* Hex aceso estatico (sem anim). Attrs diretos pra driblar o CSS .hx-lit
   que cappa fill-opacity em 0.45. */
function appendStaticLit(svg: SVGSVGElement, cell: Cell, v: LitVisuals) {
  const { cx, cy } = cellCenter(cell.col, cell.row);

  const glow = document.createElementNS(SVG_NS, "polygon");
  glow.setAttribute("points", hexPoints(cx, cy, HEX_R * 1.6));
  glow.setAttribute("fill", "rgba(224, 176, 58, 0.55)");
  glow.setAttribute("stroke", "none");
  glow.setAttribute("filter", "url(#hex-anchor-glow)");
  glow.setAttribute("opacity", "0.75");
  svg.appendChild(glow);

  const lit = document.createElementNS(SVG_NS, "polygon");
  lit.setAttribute("points", hexPoints(cx, cy, HEX_R * 0.95));
  lit.setAttribute("fill", "#E0B03A");
  lit.setAttribute("stroke", v.stroke);
  lit.setAttribute("stroke-width", v.strokeWidth);
  lit.setAttribute("fill-opacity", "0.9");
  svg.appendChild(lit);
}

function appendAnchorGlowFilter(defs: SVGDefsElement) {
  const f = document.createElementNS(SVG_NS, "filter");
  f.setAttribute("id", "hex-anchor-glow");
  f.setAttribute("x", "-150%");
  f.setAttribute("y", "-150%");
  f.setAttribute("width", "400%");
  f.setAttribute("height", "400%");
  const tight = document.createElementNS(SVG_NS, "feGaussianBlur");
  tight.setAttribute("in", "SourceGraphic");
  tight.setAttribute("stdDeviation", "4");
  tight.setAttribute("result", "tight");
  f.appendChild(tight);
  const wide = document.createElementNS(SVG_NS, "feGaussianBlur");
  wide.setAttribute("in", "SourceGraphic");
  wide.setAttribute("stdDeviation", "14");
  wide.setAttribute("result", "wide");
  f.appendChild(wide);
  const merge = document.createElementNS(SVG_NS, "feMerge");
  const mw = document.createElementNS(SVG_NS, "feMergeNode");
  mw.setAttribute("in", "wide");
  merge.appendChild(mw);
  const mt = document.createElementNS(SVG_NS, "feMergeNode");
  mt.setAttribute("in", "tight");
  merge.appendChild(mt);
  f.appendChild(merge);
  defs.appendChild(f);
}

function appendPulseGlowFilter(defs: SVGDefsElement) {
  const f = document.createElementNS(SVG_NS, "filter");
  f.setAttribute("id", "hex-pulse-glow");
  /* filterUnits=objectBoundingBox com area de bleed moderada (nao 300%)
     reduz o tamanho do buffer intermediario que o browser precisa renderizar
     a cada frame — principal causa do FPS baixo do trail. */
  f.setAttribute("x", "-50%");
  f.setAttribute("y", "-50%");
  f.setAttribute("width", "200%");
  f.setAttribute("height", "200%");
  const blur = document.createElementNS(SVG_NS, "feGaussianBlur");
  blur.setAttribute("in", "SourceGraphic");
  /* stdDeviation=4 (era 8) corta o custo do blur pela metade, mantendo
     sensacao de rastro suave. Combinado com stroke-width menor (6 em vez
     de 10), o trail fica mais barato de rasterizar a cada frame. */
  blur.setAttribute("stdDeviation", "4");
  f.appendChild(blur);
  defs.appendChild(f);
}

/* -------------------- Build SVG ----------------------------------------- */

interface BuildResult {
  svg: SVGSVGElement;
  pulseDur: number;
}

interface BuildOpts {
  docW: number;
  docH: number;
  reducedMotion: boolean;
  seed: number;
}

function buildPathSVG(opts: BuildOpts): BuildResult | null {
  const { docW, docH, reducedMotion, seed } = opts;
  if (!docW || !docH) return null;

  const rng = mulberry32(seed);
  const cols = Math.ceil(docW / HEX_W) + 2;
  const rowMax = Math.ceil(docH / ROW_H) + 1;

  const bands = readDensityBands();
  const densityAt = makeDensityAt(bands);
  const textRects = readTextRects();
  const allShades = collectShadeCells(cols, rowMax, densityAt, textRects);

  const svg = document.createElementNS(SVG_NS, "svg");
  svg.setAttribute("viewBox", `0 0 ${docW} ${docH}`);
  svg.setAttribute("preserveAspectRatio", "xMinYMin slice");
  svg.setAttribute("aria-hidden", "true");

  const defs = document.createElementNS(SVG_NS, "defs");
  appendAnchorGlowFilter(defs);
  svg.appendChild(defs);

  /* reduced-motion: sem pulso, renderiza todos acesos estaticos */
  if (reducedMotion) {
    const v = readLitVisuals();
    for (const c of allShades) appendStaticLit(svg, c, v);
    return { svg, pulseDur: 0 };
  }

  if (allShades.length < 2) {
    return { svg, pulseDur: 0 };
  }

  const ordered = orderShadesWandering(allShades, rng);

  /* Path: pulso caminha SO por arestas do grid (corner a corner via BFS).
     Cada shade em "ordered" tem um anchor corner escolhido na direcao do
     proximo shade (ou pra baixo no ultimo). Entre anchors consecutivos, o
     BFS acha o caminho mais curto de arestas — o resultado eh zigzag
     natural nos angulos de 60/120 do grid. */
  const bounds: Bounds = {
    colMin: 0,
    colMax: cols - 1,
    rowMin: 0,
    rowMax,
  };
  const graph = buildCornerGraph(bounds);

  /* Anchor corner de cada shade: o corner mais alinhado com o proximo.
     Pro ultimo, usa um alvo fake pra baixo pra que o anchor final "aponte"
     pra o off-screen de baixo (continuidade visual). */
  const anchorKeys: string[] = ordered.map((cell, i) => {
    const next =
      ordered[i + 1] || { col: cell.col, row: cell.row + 3 };
    return cellCornerKey(cell, anchorCornerIndex(cell, next));
  });

  /* Monta waypoints + anchorIndices. Inicio/fim sao retas verticais off-
     screen (os unicos segmentos que nao seguem arestas do grid — mas estao
     fora da tela, entao invisiveis). */
  const firstAnchor = graph.get(anchorKeys[0]);
  const lastAnchor = graph.get(anchorKeys[anchorKeys.length - 1]);
  if (!firstAnchor || !lastAnchor) {
    return { svg, pulseDur: 0 };
  }

  const waypoints: Pt[] = [];
  const anchorIndices: number[] = [];

  waypoints.push({ x: firstAnchor.x, y: -240 });
  waypoints.push({ x: firstAnchor.x, y: firstAnchor.y });
  anchorIndices.push(waypoints.length - 1);

  for (let i = 0; i < anchorKeys.length - 1; i++) {
    const walk = cornerWalk(anchorKeys[i], anchorKeys[i + 1], graph, rng);
    if (walk.length < 2) {
      /* BFS falhou (anchor fora do grafo?) — pula, mas registra anchor
         anterior como "alcancado" pra o shade ainda acender. */
      anchorIndices.push(waypoints.length - 1);
      continue;
    }
    /* walk[0] eh o anchor anterior (ja no waypoints), entao pulamos */
    for (let k = 1; k < walk.length; k++) waypoints.push(walk[k]);
    anchorIndices.push(waypoints.length - 1);
  }

  waypoints.push({ x: lastAnchor.x, y: docH + 240 });

  /* pathD = polyline reto entre waypoints (cada segmento entre corners
     adjacentes do grid eh uma aresta reta de comprimento HEX_R=24). */
  const pathD =
    "M " +
    waypoints.map((p) => `${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(" L ");

  /* Comprimentos cumulativos ate cada waypoint */
  const cumLens: number[] = new Array(waypoints.length).fill(0);
  let totalLength = 0;
  for (let i = 1; i < waypoints.length; i++) {
    totalLength += Math.hypot(
      waypoints[i].x - waypoints[i - 1].x,
      waypoints[i].y - waypoints[i - 1].y
    );
    cumLens[i] = totalLength;
  }

  /* shadeFracs[i] = fracao do path em que o pulso chega no anchor do shade i */
  const shadeFracs: number[] = anchorIndices.map(
    (idx) => cumLens[idx] / totalLength
  );

  /* Pulso ciclico (indefinite). Velocidade ~18 px/s — levemente mais agil
     que os 15 px/s anteriores, mas ainda contemplativo. */
  const pulseDur = Math.max(210, Math.min(540, totalLength / 18));

  /* Cauda: stroke-dashed longo e difuso que arrasta atras da cabeca.
     Cabeca: um <circle> sem blur seguindo o path via animateMotion, nitido
     na ponta. DOIS meteoros concorrentes desfasados por pulseDur/2: quando
     um esta na metade inferior da pagina, o outro ja esta aparecendo no topo.
     Evita o hiato visual quando o unico pulso estava off-screen.

     Stroke mais fino (6 em vez de 10) + blur menor (stdDev 4 em vez de 8)
     + tailLen menor (110) reduzem drasticamente o custo por frame, que
     estava causando drops de FPS em monitores grandes. */
  const tailLen = 110;
  const tailGap = Math.max(totalLength - tailLen, tailLen);
  const headLead = (tailLen / totalLength) * pulseDur;

  appendPulseGlowFilter(defs);

  /* Adiciona um par cauda+cabeca (meteoro completo) com offset temporal. */
  function addMeteor(beginOffsetSec: number) {
    const beginAttr = beginOffsetSec.toFixed(2) + "s";

    /* Cauda difusa — mais fina que antes pra nao pesar o blur */
    const tail = document.createElementNS(SVG_NS, "path");
    tail.setAttribute("d", pathD);
    tail.setAttribute("fill", "none");
    tail.setAttribute("stroke", "rgba(224, 176, 58, 0.65)");
    tail.setAttribute("stroke-width", "6");
    tail.setAttribute("stroke-linecap", "round");
    tail.setAttribute("stroke-linejoin", "round");
    tail.setAttribute("stroke-dasharray", `${tailLen} ${tailGap}`);
    tail.setAttribute("filter", "url(#hex-pulse-glow)");
    const tailAnim = document.createElementNS(SVG_NS, "animate");
    tailAnim.setAttribute("attributeName", "stroke-dashoffset");
    tailAnim.setAttribute("values", `0;${-totalLength}`);
    tailAnim.setAttribute("dur", pulseDur.toFixed(2) + "s");
    tailAnim.setAttribute("repeatCount", "indefinite");
    tailAnim.setAttribute("begin", beginAttr);
    tail.appendChild(tailAnim);
    svg.appendChild(tail);

    /* Cabeca = bolinha redonda nitida */
    const head = document.createElementNS(SVG_NS, "circle");
    head.setAttribute("r", "3.5");
    head.setAttribute("fill", "#E0B03A");
    head.setAttribute("cx", "0");
    head.setAttribute("cy", "0");
    const headMotion = document.createElementNS(SVG_NS, "animateMotion");
    headMotion.setAttribute("dur", pulseDur.toFixed(2) + "s");
    headMotion.setAttribute("repeatCount", "indefinite");
    headMotion.setAttribute("path", pathD);
    /* Combina adiantamento da cabeca (pra alinhar com a ponta da cauda) com
       o offset temporal do meteoro. */
    headMotion.setAttribute(
      "begin",
      (beginOffsetSec - headLead).toFixed(2) + "s"
    );
    head.appendChild(headMotion);
    svg.appendChild(head);
  }

  addMeteor(0);
  addMeteor(-pulseDur / 2);

  /* Cada shade: halo + hex com animate ciclico. Acende quando o pulso chega,
     segura HOLD_LIT_SEC, faz fade out em FADE_OUT_SEC, volta ao cinza.
     O ciclo tem dur=pulseDur (sync com o pulso) e repeatCount=indefinite
     — toda volta do pulso traz a mesma sequencia.
     Attrs diretos (sem class .hx-lit) pra evitar conflito CSS. */
  const visuals = readLitVisuals();
  const peakBoost = visuals.isDark ? 1.1 : 1.0;

  const rampInFrac = RAMP_IN_SEC / pulseDur;
  const holdFrac = HOLD_LIT_SEC / pulseDur;
  const fadeOutFrac = FADE_OUT_SEC / pulseDur;

  for (let i = 0; i < ordered.length; i++) {
    const primary = ordered[i];

    const entryFrac = Math.max(0.01, Math.min(0.98, shadeFracs[i]));
    /* 5 keyframes: t0=inicio-rampIn (cinza), t1=peak (coincide com o toque
       do pulso), t2=fim-hold, t3=fim-fade. Com FPS baixo esse timing se
       percebe mais fluido que colocar o toque no inicio do acender (onde
       cada frame perdido vira delay visivel). */
    const t0 = Math.max(0.001, entryFrac - rampInFrac);
    const t1 = Math.max(t0 + 0.001, entryFrac);
    const t2 = Math.min(0.985, t1 + holdFrac);
    const t3 = Math.min(0.995, t2 + fadeOutFrac);
    const keyTimes = `0;${t0.toFixed(4)};${t1.toFixed(4)};${t2.toFixed(4)};${t3.toFixed(4)};1`;

    const bright = 0.7 + rng() * 0.3;
    const peakFill = Math.min(0.95, (0.6 + bright * 0.35) * peakBoost).toFixed(2);

    /* Expande o anchor em um cluster de 1-4 hexes adjacentes (geralmente 1,
       as vezes 2-3, raro 4). Todos compartilham o mesmo timing — acendem
       juntos quando o pulso chega no primary. */
    const cluster = pickClusterCells(primary, cols, rowMax, textRects, rng);

    /* Respiracao simples do halo: 1 dip no meio do HOLD (7 keyTimes, sem
       spline). Mais leve que 3 oscilacoes + cubic splines — importante pra
       nao dropar FPS com muitos halos ativos simultaneamente. */
    const bMid = t1 + (t2 - t1) * 0.5;
    const haloKeyTimes =
      `0;${t0.toFixed(4)};${t1.toFixed(4)};` +
      `${bMid.toFixed(4)};` +
      `${t2.toFixed(4)};${t3.toFixed(4)};1`;
    const breathDip = (bright * 0.7).toFixed(2);
    const brightStr = bright.toFixed(2);
    const haloValues =
      `0;0;${brightStr};` +
      `${breathDip};` +
      `${brightStr};0;0`;

    for (const cell of cluster) {
      const { cx, cy } = cellCenter(cell.col, cell.row);

      /* Pra cada meteoro (2 deles, desfasados por pulseDur/2), um par
         halo+hex proprio com animacao independente. Halo eh um polygon 1.4x
         maior com fill dourado transparente SEM filter blur — o degrade
         visual vem do overlay de dois polygons concentricos com alphas
         diferentes, nao de feGaussianBlur (que era o gargalo de FPS).
         O HALO respira durante o hold (3 oscilacoes bright -> 0.7*bright)
         enquanto o CORE permanece estavel — brilho ganha vida organica. */
      for (const beginOffsetSec of [0, -pulseDur / 2]) {
        const beginAttr = beginOffsetSec.toFixed(2) + "s";
        const coreValues = `0;0;${brightStr};${brightStr};0;0`;

        /* Halo com respiração */
        const halo = document.createElementNS(SVG_NS, "polygon");
        halo.setAttribute("points", hexPoints(cx, cy, HEX_R * 1.4));
        halo.setAttribute("fill", "#E0B03A");
        halo.setAttribute("fill-opacity", "0.28");
        halo.setAttribute("stroke", "none");
        halo.setAttribute("opacity", "0");
        const haloAnim = document.createElementNS(SVG_NS, "animate");
        haloAnim.setAttribute("attributeName", "opacity");
        haloAnim.setAttribute("values", haloValues);
        haloAnim.setAttribute("keyTimes", haloKeyTimes);
        haloAnim.setAttribute("dur", pulseDur.toFixed(2) + "s");
        haloAnim.setAttribute("repeatCount", "indefinite");
        haloAnim.setAttribute("begin", beginAttr);
        halo.appendChild(haloAnim);
        svg.appendChild(halo);

        /* Hex core — nitido, sobre o halo, timing simples sem respiracao */
        const lit = document.createElementNS(SVG_NS, "polygon");
        lit.setAttribute("points", hexPoints(cx, cy, HEX_R * 0.95));
        lit.setAttribute("fill", "#E0B03A");
        lit.setAttribute("fill-opacity", peakFill);
        lit.setAttribute("stroke", visuals.stroke);
        lit.setAttribute("stroke-width", visuals.strokeWidth);
        lit.setAttribute("opacity", "0");
        const anim = document.createElementNS(SVG_NS, "animate");
        anim.setAttribute("attributeName", "opacity");
        anim.setAttribute("values", coreValues);
        anim.setAttribute("keyTimes", keyTimes);
        anim.setAttribute("dur", pulseDur.toFixed(2) + "s");
        anim.setAttribute("repeatCount", "indefinite");
        anim.setAttribute("begin", beginAttr);
        lit.appendChild(anim);
        svg.appendChild(lit);
      }
    }
  }

  return { svg, pulseDur };
}

/* -------------------- React component ----------------------------------- */

export default function HexPath() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const seedRef = useRef<number>(0);

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

    const result = buildPathSVG({
      docW,
      docH,
      reducedMotion,
      seed: seedRef.current,
    });
    wrap.innerHTML = "";
    wrap.style.height = docH + "px";
    if (result) wrap.appendChild(result.svg);
  }, []);

  useEffect(() => {
    seedRef.current = (Date.now() & 0x7fffffff) || 1;

    let raf2 = 0;
    const raf1 = requestAnimationFrame(() => {
      raf2 = requestAnimationFrame(build);
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
      cancelAnimationFrame(raf2);
      clearTimeout(resizeTimer);
      window.removeEventListener("resize", onResize);
      ro.disconnect();
    };
  }, [build]);

  return <div id="hex-global" ref={wrapRef} aria-hidden="true" />;
}
