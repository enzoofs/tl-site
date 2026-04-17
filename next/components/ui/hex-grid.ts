/* ==========================================================================
   HEX GRID — funcoes/constantes puras compartilhadas por HexMesh e HexPath.
   Single source of truth do grid hexagonal pointy-top (math do -30deg).
   ========================================================================== */

export const HEX_R = 24;
export const HEX_W = HEX_R * Math.sqrt(3);
export const ROW_H = HEX_R * 1.5;
export const SVG_NS = "http://www.w3.org/2000/svg";

export interface Cell {
  col: number;
  row: number;
}
export interface Pt {
  x: number;
  y: number;
}

/* Centro da celula (col,row) em coords globais. Linhas pares recebem
   offset horizontal de HEX_W/2 — padrao tipico de grid hexagonal. */
export function cellCenter(col: number, row: number): { cx: number; cy: number } {
  const parity = ((row % 2) + 2) % 2;
  return {
    cx: col * HEX_W + (parity ? HEX_W / 2 : 0),
    cy: row * ROW_H,
  };
}

/* Hash deterministico (col,row) globais -> [0,1). Mesmo (col,row) sempre
   da o mesmo valor — permite que HexMesh e HexPath concordem sobre quais
   celulas sao .hx-shade sem precisar de comunicacao. */
export function cellHash(col: number, row: number): number {
  let h = (col * 73856093) ^ (row * 19349663);
  h = Math.imul(h ^ (h >>> 13), 1274126177);
  return ((h ^ (h >>> 16)) >>> 0) / 4294967296;
}

/* 6 vertices do hex. r permite encolher pra gerar "buracos" de mask menores. */
export function cornersOf(col: number, row: number, r = HEX_R): Pt[] {
  const { cx, cy } = cellCenter(col, row);
  const out: Pt[] = [];
  for (let i = 0; i < 6; i++) {
    const a = (Math.PI / 180) * (60 * i - 30);
    out.push({ x: cx + r * Math.cos(a), y: cy + r * Math.sin(a) });
  }
  return out;
}

/* String "x,y x,y ..." pra usar como atributo points de <polygon>. */
export function hexPoints(cx: number, cy: number, r = HEX_R): string {
  const pts: string[] = [];
  for (let i = 0; i < 6; i++) {
    const a = (Math.PI / 180) * (60 * i - 30);
    pts.push(
      `${(cx + r * Math.cos(a)).toFixed(2)},${(cy + r * Math.sin(a)).toFixed(2)}`
    );
  }
  return pts.join(" ");
}

/* Chave estavel de um ponto 2D — toleramos ate 0.1px de diferenca
   arredondando pra 1 casa decimal. Usado pra unificar corners compartilhados
   entre hexes vizinhos no grafo de arestas. */
export function cornerKey(x: number, y: number): string {
  return `${Math.round(x * 10)}|${Math.round(y * 10)}`;
}

/* Chave corner do hex (col,row) no indice idx (0..5, mesma ordem de cornersOf). */
export function cellCornerKey(cell: Cell, idx: number): string {
  const { cx, cy } = cellCenter(cell.col, cell.row);
  const a = (Math.PI / 180) * (60 * idx - 30);
  return cornerKey(cx + HEX_R * Math.cos(a), cy + HEX_R * Math.sin(a));
}

/* Chave "col_row" pra identificar uma celula de forma estavel. */
export function cellKey(col: number, row: number): string {
  return `${col}_${row}`;
}
