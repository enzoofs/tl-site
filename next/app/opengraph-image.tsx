import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const runtime = "nodejs";

export const alt = "TimeLabs — automação empresarial que devolve tempo";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/* OG image dinamica. Carrega a Gloock do filesystem pra que o wordmark
   tenha a tipografia da marca. Sem fonte custom o Satori cai pra
   sans-serif default e a identidade vai pro lixo. */
export default async function Image() {
  const fontsDir = join(process.cwd(), "fonts");
  const [fontData, italicData] = await Promise.all([
    readFile(join(fontsDir, "Gloock-Regular.ttf")),
    readFile(join(fontsDir, "InstrumentSerif-Italic.ttf")),
  ]);

  const PAPER = "#EFE9DA";
  const INK = "#2B2520";
  const MERCURY = "#E0B03A";

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
        {/* Hexagono decorativo no canto superior direito */}
        <svg
          width="180"
          height="208"
          viewBox="0 0 180 208"
          style={{ position: "absolute", top: 64, right: 80 }}
        >
          <polygon
            points="90,4 176,54 176,154 90,204 4,154 4,54"
            fill="none"
            stroke={MERCURY}
            strokeWidth="2"
            opacity="0.4"
          />
          <polygon
            points="90,32 152,68 152,140 90,176 28,140 28,68"
            fill={MERCURY}
            opacity="0.85"
          />
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
          }}
        >
          Automação empresarial
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
