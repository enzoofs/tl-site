import type { Metadata } from "next";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import HexMesh from "@/components/ui/hex-mesh";
import SectionReveal from "@/components/ui/section-reveal";
import Button from "@/components/ui/button";
import { WhatsAppFloat } from "@/components/ui/whatsapp-float";

export const metadata: Metadata = {
  title: "Grifo — visibilidade da sua marca em IA — TimeLabs",
  description:
    "O Grifo mede como a sua marca é citada no ChatGPT, no Gemini e no Google e entrega o plano de ações e os artigos para aparecer mais.",
  alternates: { canonical: "/grifo" },
};

// Link do WhatsApp com mensagem pronta (mesmo número do restante do site)
const WHATSAPP_DIAGNOSTICO =
  "https://wa.me/5531995970472?text=" +
  encodeURIComponent("Olá! Quero meu diagnóstico do Grifo.");

const passos = [
  {
    n: "01",
    titulo: "Radar",
    texto:
      "Fazemos as perguntas que os seus clientes fazem às IAs e registramos quem é citado: você ou o concorrente.",
  },
  {
    n: "02",
    titulo: "Plano de ações",
    texto:
      "Você recebe a lista do que ajustar, em ordem de prioridade, com um guia de como fazer cada item.",
  },
  {
    n: "03",
    titulo: "Conteúdo",
    texto:
      "O Grifo escreve artigos já revisados para o seu site. Você edita e publica quando quiser.",
  },
];

const entregas = [
  "Radar de perguntas, com relatório pronto para apresentar",
  "Rastreamento do site: o que as IAs conseguem ler dele",
  "Plano de ações priorizado, com guias",
  "Artigos escritos e revisados, com blog hospedado se você não tiver um",
  "Acompanhamento dos resultados, mês a mês",
];

const planos = [
  {
    nome: "Fundador",
    para: "Para empresas",
    preco: "R$ 297",
    unidade: "/mês",
    destaque: "Restam 2 vagas",
    itens: [
      "8 radares por mês",
      "8 artigos por mês",
      "Portal com acesso próprio",
      "Contrato de 6 meses",
    ],
  },
  {
    nome: "Agência",
    para: "Para agências que revendem",
    preco: "R$ 197",
    unidade: "/mês por cliente",
    destaque: null,
    itens: [
      "8 radares por mês, por cliente",
      "8 artigos por mês, por cliente",
      "Um painel para toda a carteira",
      "Cada cliente com o próprio acesso",
      "Contrato de 6 meses",
    ],
  },
];

const perguntas = [
  {
    p: "Preciso ter blog?",
    r: "Não. Se você não tiver um, hospedamos o blog para publicar os artigos.",
  },
  {
    p: "Em quanto tempo vejo resultado?",
    r: "O radar sai logo no início e mostra onde você está hoje. Mudar o que as IAs respondem leva semanas, porque depende de conteúdo publicado e lido. Por isso trabalhamos com acompanhamento mensal.",
  },
  {
    p: "Meus dados ficam seguros?",
    r: "Cada cliente enxerga só os próprios dados, com isolamento no banco de dados, e há backup diário.",
  },
  {
    p: "Tem fidelidade?",
    r: "Sim, o contrato é de 6 meses, tempo mínimo para o conteúdo ser publicado, lido e medido.",
  },
];

// Bloco de seção reutilizável (mesmo padrão visual do /sobre)
function Secao({
  fundo,
  maxWidth = 1080,
  children,
}: {
  fundo: "var(--bg)" | "var(--bg-alt)";
  maxWidth?: number;
  children: React.ReactNode;
}) {
  return (
    <SectionReveal as="section" data-hex-density="0.05">
      <div
        style={{
          position: "relative",
          isolation: "isolate",
          background: fundo,
          padding: "var(--sp-7) var(--sp-5)",
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

const grade: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
  gap: "var(--sp-4)",
  marginTop: "var(--sp-4)",
};

const cartao: React.CSSProperties = {
  border: "1px solid var(--paper-soft)",
  padding: "var(--sp-4)",
  background: "var(--bg)",
};

export default function GrifoPage() {
  return (
    <>
      <a href="#main-content" className="skip-link">
        Pular para o conteúdo
      </a>
      <Header />
      <main id="main-content" className="pt-[56px]">
        {/* HERO */}
        <SectionReveal as="section" data-hex-density="0.06">
          <div
            style={{
              position: "relative",
              isolation: "isolate",
              background: "var(--bg)",
              padding: "var(--sp-8) var(--sp-5) var(--sp-6)",
            }}
          >
            <HexMesh variant="light" density={0.06} />
            <div
              style={{
                position: "relative",
                zIndex: 1,
                maxWidth: 1080,
                margin: "0 auto",
              }}
            >
              <p className="eyebrow">Grifo · Visibilidade em IA</p>
              <h1 className="hl-gloock">
                Quando alguém pergunta ao ChatGPT pelo seu mercado, a sua marca
                aparece?
              </h1>
              <p
                style={{
                  fontFamily: "var(--font-italic)",
                  fontStyle: "italic",
                  fontSize: "clamp(22px, 2.6vw, 32px)",
                  lineHeight: 1.3,
                  color: "var(--fg-soft)",
                  margin: "var(--sp-2) 0 var(--sp-4)",
                  maxWidth: 720,
                }}
              >
                O Grifo mede como a sua marca é citada no ChatGPT, no Gemini e
                no Google, e diz exatamente o que fazer para aparecer mais.
              </p>
              <div style={{ display: "flex", gap: "var(--sp-2)", flexWrap: "wrap" }}>
                <Button href={WHATSAPP_DIAGNOSTICO}>Quero meu diagnóstico</Button>
                <Button href="#como-funciona" variant="secondary">
                  Ver como funciona
                </Button>
              </div>
            </div>
          </div>
        </SectionReveal>

        {/* PROBLEMA */}
        <Secao fundo="var(--bg-alt)" maxWidth={760}>
          <p className="eyebrow">O problema</p>
          <h2 className="hl-gloock hl-mid" style={{ marginBottom: "var(--sp-3)" }}>
            Você pode estar perdendo clientes sem saber.
          </h2>
          <p style={{ lineHeight: 1.7 }}>
            As pessoas estão trocando a busca do Google por perguntas feitas
            direto às IAs. Quem não é citado nas respostas perde o cliente sem
            nem saber que perdeu, e hoje quase ninguém mede isso direito.
          </p>
        </Secao>

        {/* COMO FUNCIONA */}
        <div id="como-funciona" />
        <Secao fundo="var(--bg)">
          <p className="eyebrow">Como funciona</p>
          <h2 className="hl-gloock hl-mid">Três passos.</h2>
          <div style={grade}>
            {passos.map((p) => (
              <article key={p.n} style={cartao}>
                <p className="eyebrow" style={{ marginBottom: "var(--sp-1)" }}>
                  {p.n}
                </p>
                <h3 style={{ fontFamily: "var(--font-display)", fontSize: 24, margin: "0 0 var(--sp-1)" }}>
                  {p.titulo}
                </h3>
                <p style={{ lineHeight: 1.6, margin: 0 }}>{p.texto}</p>
              </article>
            ))}
          </div>
        </Secao>

        {/* O QUE VOCÊ RECEBE */}
        <Secao fundo="var(--bg-alt)" maxWidth={760}>
          <p className="eyebrow">O que você recebe</p>
          <h2 className="hl-gloock hl-mid" style={{ marginBottom: "var(--sp-3)" }}>
            Do diagnóstico ao conteúdo publicado.
          </h2>
          <ul style={{ lineHeight: 1.8, paddingLeft: "1.2em", margin: 0 }}>
            {entregas.map((e) => (
              <li key={e}>{e}</li>
            ))}
          </ul>
        </Secao>

        {/* AGÊNCIAS */}
        <Secao fundo="var(--bg)" maxWidth={760}>
          <p className="eyebrow">Para agências</p>
          <h2 className="hl-gloock hl-mid" style={{ marginBottom: "var(--sp-3)" }}>
            Revenda o Grifo aos seus clientes.
          </h2>
          <p style={{ lineHeight: 1.7 }}>
            Um painel só para a sua carteira, cada cliente com o próprio acesso
            e relatórios prontos para apresentar. Você define o que cobra do
            seu cliente; o seu custo é R$ 197 por cliente ao mês.
          </p>
        </Secao>

        {/* PLANOS */}
        <div id="planos" />
        <Secao fundo="var(--bg-alt)">
          <p className="eyebrow">Planos</p>
          <h2 className="hl-gloock hl-mid">Preço simples, sem surpresa.</h2>
          <div style={grade}>
            {planos.map((pl) => (
              <article key={pl.nome} style={cartao}>
                <p className="eyebrow" style={{ marginBottom: "var(--sp-1)" }}>
                  {pl.para}
                </p>
                <h3 style={{ fontFamily: "var(--font-display)", fontSize: 28, margin: "0 0 var(--sp-1)" }}>
                  {pl.nome}
                </h3>
                {pl.destaque && (
                  <p
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: 11,
                      letterSpacing: 3,
                      textTransform: "uppercase",
                      color: "var(--gold-text)",
                      margin: "0 0 var(--sp-2)",
                    }}
                  >
                    {pl.destaque}
                  </p>
                )}
                <p style={{ margin: "0 0 var(--sp-2)" }}>
                  <span style={{ fontFamily: "var(--font-display)", fontSize: 40 }}>
                    {pl.preco}
                  </span>{" "}
                  <span style={{ color: "var(--fg-soft)" }}>{pl.unidade}</span>
                </p>
                <ul style={{ lineHeight: 1.8, paddingLeft: "1.2em", margin: "0 0 var(--sp-3)" }}>
                  {pl.itens.map((i) => (
                    <li key={i}>{i}</li>
                  ))}
                </ul>
                <Button href={WHATSAPP_DIAGNOSTICO}>Quero meu diagnóstico</Button>
              </article>
            ))}
          </div>
        </Secao>

        {/* PERGUNTAS FREQUENTES */}
        <Secao fundo="var(--bg)" maxWidth={760}>
          <p className="eyebrow">Perguntas frequentes</p>
          <h2 className="hl-gloock hl-mid" style={{ marginBottom: "var(--sp-3)" }}>
            O que mais perguntam.
          </h2>
          {perguntas.map((q) => (
            <div key={q.p} style={{ marginBottom: "var(--sp-3)" }}>
              <h3 style={{ fontFamily: "var(--font-display)", fontSize: 20, margin: "0 0 var(--sp-1)" }}>
                {q.p}
              </h3>
              <p style={{ lineHeight: 1.7, margin: 0 }}>{q.r}</p>
            </div>
          ))}
        </Secao>

        {/* CTA FINAL */}
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
            <div style={{ position: "relative", zIndex: 1, maxWidth: 760, margin: "0 auto" }}>
              <h2 className="hl-gloock hl-mid" style={{ color: "var(--paper)" }}>
                Descubra como a IA enxerga a sua marca hoje.
              </h2>
              <p style={{ margin: "var(--sp-3) 0 var(--sp-4)", lineHeight: 1.7 }}>
                Fale com a gente e receba o seu diagnóstico.
              </p>
              <Button href={WHATSAPP_DIAGNOSTICO} variant="mercury">
                Quero meu diagnóstico
              </Button>
            </div>
          </div>
        </SectionReveal>
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  );
}
