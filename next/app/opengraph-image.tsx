import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const runtime = "nodejs";

export const alt = "TimeLabs — consultoria de IA e software sob encomenda";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const PAPER = "#EFE9DA";
const INK = "#2B2520";
const MERCURY = "#E0B03A";

/* Mesma logica do hex-mesh do site: grade pointy-top, alguns hexes
   "shaded" sutilmente. Hash deterministico pra build reproduzivel.
   Densidade baixa (12%) pra nao competir com o texto. */
const HEX_R = 38;
const HEX_W = Math.sqrt(3) * HEX_R;
const ROW_H = HEX_R * 1.5;
const SHADE_DENSITY = 0.12;

function hexPoints(cx: number, cy: number, r: number): string {
  const pts: string[] = [];
  for (let i = 0; i < 6; i++) {
    const angle = (Math.PI / 3) * i + Math.PI / 6;
    pts.push(`${(cx + r * Math.cos(angle)).toFixed(1)},${(cy + r * Math.sin(angle)).toFixed(1)}`);
  }
  return pts.join(" ");
}

function cellHash(c: number, r: number): number {
  const h = ((c * 73856093) ^ (r * 19349663)) >>> 0;
  return (h % 1000) / 1000;
}

function buildHexes() {
  const cols = Math.ceil(size.width / HEX_W) + 1;
  const rows = Math.ceil(size.height / ROW_H) + 1;
  const nodes: { points: string; shaded: boolean; key: string }[] = [];
  for (let row = -1; row <= rows; row++) {
    for (let col = -1; col <= cols; col++) {
      const xOffset = row % 2 === 0 ? 0 : HEX_W / 2;
      const cx = col * HEX_W + xOffset;
      const cy = row * ROW_H;
      const shaded = cellHash(col, row) < SHADE_DENSITY;
      nodes.push({ points: hexPoints(cx, cy, HEX_R), shaded, key: `${col}-${row}` });
    }
  }
  return nodes;
}

export default async function Image() {
  const fontsDir = join(process.cwd(), "fonts");
  const [fontData, italicData] = await Promise.all([
    readFile(join(fontsDir, "Gloock-Regular.ttf")),
    readFile(join(fontsDir, "InstrumentSerif-Italic.ttf")),
  ]);

  const hexes = buildHexes();

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: INK,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "flex-start",
          padding: "80px 96px",
          position: "relative",
        }}
      >
        {/* Hex mesh de fundo — sutil, mesma estetica do site */}
        <svg
          width={size.width}
          height={size.height}
          viewBox={`0 0 ${size.width} ${size.height}`}
          style={{ position: "absolute", top: 0, left: 0 }}
        >
          {hexes.map((h) =>
            h.shaded ? (
              <polygon
                key={h.key}
                points={h.points}
                fill="rgba(239,233,218,0.09)"
                stroke="rgba(239,233,218,0.10)"
                strokeWidth={0.5}
              />
            ) : (
              <polygon
                key={h.key}
                points={h.points}
                fill="none"
                stroke="rgba(239,233,218,0.06)"
                strokeWidth={0.5}
              />
            ),
          )}
        </svg>

        {/* Eyebrow */}
        <div
          style={{
            color: PAPER,
            fontSize: 22,
            letterSpacing: "0.4em",
            textTransform: "uppercase",
            opacity: 0.6,
            marginBottom: 32,
            fontFamily: "sans-serif",
            position: "relative",
          }}
        >
          IA & software sob encomenda
        </div>

        {/* Wordmark */}
        <div
          style={{
            color: PAPER,
            fontSize: 140,
            fontFamily: "Gloock",
            lineHeight: 1,
            letterSpacing: "-0.02em",
            display: "flex",
            alignItems: "baseline",
            position: "relative",
          }}
        >
          t
          <span style={{ position: "relative", display: "flex" }}>
            ı
            <svg
              width="22"
              height="22"
              viewBox="0 0 20 20"
              style={{ position: "absolute", top: 22, left: 4 }}
            >
              <polygon
                points="10,0 18.66,5 18.66,15 10,20 1.34,15 1.34,5"
                fill={MERCURY}
              />
            </svg>
          </span>
          meLabs
        </div>

        {/* Tagline */}
        <div
          style={{
            color: MERCURY,
            fontSize: 42,
            fontFamily: "Instrument",
            fontStyle: "italic",
            marginTop: 32,
            lineHeight: 1.2,
            position: "relative",
          }}
        >
          Devolvemos tempo ao seu negócio.
        </div>

        {/* URL no rodape */}
        <div
          style={{
            position: "absolute",
            bottom: 56,
            left: 96,
            color: PAPER,
            opacity: 0.5,
            fontSize: 22,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            fontFamily: "sans-serif",
          }}
        >
          timelabs.com.br
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: "Gloock",
          data: fontData,
          style: "normal",
          weight: 400,
        },
        {
          name: "Instrument",
          data: italicData,
          style: "italic",
          weight: 400,
        },
      ],
    },
  );
}
