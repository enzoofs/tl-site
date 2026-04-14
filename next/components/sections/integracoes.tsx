import InfiniteSlider from "@/components/ui/infinite-slider";

const tools = [
  "Zapier",
  "Make",
  "n8n",
  "WhatsApp API",
  "Salesforce",
  "HubSpot",
  "Google Sheets",
  "Slack",
  "Power BI",
  "SAP",
] as const;

function Pill({ label }: { label: string }) {
  return (
    <span
      className="integ-pill"
      style={{
        display: "inline-block",
        border: "1px solid var(--fg)",
        padding: "10px 20px",
        fontFamily: "var(--font-mono)",
        fontSize: 12,
        letterSpacing: 2,
        textTransform: "uppercase",
        color: "var(--fg)",
        whiteSpace: "nowrap",
        marginRight: "var(--sp-2)",
        transition:
          "background 0.25s var(--ease), color 0.25s var(--ease)",
        cursor: "default",
      }}
    >
      {label}
    </span>
  );
}

export function Integracoes() {
  return (
    <section
      id="integracoes"
      style={{
        background: "var(--bg)",
        padding: "var(--sp-7) 0",
        textAlign: "center",
      }}
    >
      <div style={{ padding: "0 var(--sp-4)", marginBottom: "var(--sp-5)" }}>
        <p className="eyebrow">Integrações</p>
        <h2 className="hl-gloock hl-mid">
          Conectamos com o que você já usa.
        </h2>
      </div>

      {/* Row 1: left */}
      <InfiniteSlider speed="50s" direction="left">
        {tools.map((t) => (
          <Pill key={t} label={t} />
        ))}
      </InfiniteSlider>

      <div style={{ height: "var(--sp-2)" }} />

      {/* Row 2: right (reversed) */}
      <InfiniteSlider speed="55s" direction="right">
        {[...tools].reverse().map((t) => (
          <Pill key={t} label={t} />
        ))}
      </InfiniteSlider>

      <style>{`
        .integ-pill:hover {
          background: var(--fg) !important;
          color: var(--bg) !important;
        }
      `}</style>
    </section>
  );
}
