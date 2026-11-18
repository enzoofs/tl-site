import HexMesh from "@/components/ui/hex-mesh";
import SectionReveal from "@/components/ui/section-reveal";
import Button from "@/components/ui/button";

// Seção padrão (mesmo visual do /sobre e do /grifo).
export function Secao({
  fundo = "var(--bg)",
  maxWidth = 1080,
  topo = false,
  children,
}: {
  fundo?: "var(--bg)" | "var(--bg-alt)";
  maxWidth?: number;
  /** true = primeira seção da página (mais respiro em cima) */
  topo?: boolean;
  children: React.ReactNode;
}) {
  return (
    <SectionReveal as="section" data-hex-density="0.05">
      <div
        style={{
          position: "relative",
          isolation: "isolate",
          background: fundo,
          padding: topo
            ? "var(--sp-8) var(--sp-5) var(--sp-6)"
            : "var(--sp-7) var(--sp-5)",
        }}
      >
        <HexMesh variant="light" density={0.05} />
        <div
          style={{ position: "relative", zIndex: 1, maxWidth, margin: "0 auto" }}
        >
          {children}
        </div>
      </div>
    </SectionReveal>
  );
}

// Faixa escura de chamada para ação, no fim da página.
export function ChamadaFinal({
  titulo,
  texto,
  botoes,
}: {
  titulo: string;
  texto: string;
  botoes: { rotulo: string; href: string; secundario?: boolean }[];
}) {
  return (
    <SectionReveal as="section" data-hex-density="0.12">
      <div
        style={{
          position: "relative",
          isolation: "isolate",
          background: "var(--ink)",
          color: "var(--paper)",
          padding: "var(--sp-7) var(--sp-5)",
          textAlign: "center",
        }}
      >
        <HexMesh variant="dark" density={0.12} />
        <div
          style={{ position: "relative", zIndex: 1, maxWidth: 760, margin: "0 auto" }}
        >
          <h2 className="hl-gloock hl-mid" style={{ color: "var(--paper)" }}>
            {titulo}
          </h2>
          <p style={{ margin: "var(--sp-3) 0 var(--sp-4)", lineHeight: 1.7 }}>
            {texto}
          </p>
          <div
            style={{
              display: "flex",
              gap: "var(--sp-2)",
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            {botoes.map((b) => (
              <Button key={b.rotulo} href={b.href} variant="mercury">
                {b.rotulo}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </SectionReveal>
  );
}

// Estilos reaproveitados pelas páginas de conteúdo.
export const estiloGrade: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
  gap: "var(--sp-4)",
  marginTop: "var(--sp-4)",
};

export const estiloCartao: React.CSSProperties = {
  border: "1px solid var(--paper-soft)",
  padding: "var(--sp-4)",
  background: "var(--bg)",
};
