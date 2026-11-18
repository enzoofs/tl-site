import type { Metadata } from "next";
import Image from "next/image";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import HexMesh from "@/components/ui/hex-mesh";
import SectionReveal from "@/components/ui/section-reveal";
import Button from "@/components/ui/button";
import { WhatsAppFloat } from "@/components/ui/whatsapp-float";

export const metadata: Metadata = {
  title: "Seu Bloco — presença de ensaio com QR code — TimeLabs",
  description:
    "O Seu Bloco registra a presença dos ensaios por QR code e localização, separa bateria e coral e entrega o relatório pronto para a diretoria.",
  alternates: { canonical: "/seubloco" },
};

// Link do WhatsApp com mensagem pronta (mesmo número da /grifo)
const WHATSAPP_SEUBLOCO =
  "https://wa.me/5531995970472?text=" +
  encodeURIComponent("Olá! Quero conhecer o Seu Bloco para o meu bloco.");

// Cadastro e uso do sistema acontecem no domínio do produto
const URL_CADASTRO = "https://seubloco.com/cadastrar";

// Pasta dos prints (todos com dados fictícios)
const PRINTS = "/assets/prints/seubloco";

// Dados estruturados: o preço é o de tabela (mensal); acordos especiais ficam fora
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Seu Bloco",
  url: "https://seubloco.com",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  inLanguage: "pt-BR",
  description:
    "Sistema de presença de ensaios para blocos de carnaval: check-in por QR code e localização, cadastro de membros, separação entre bateria e coral e relatório de presença exportável em planilha.",
  publisher: { "@type": "Organization", name: "TimeLabs", url: "https://timelabs.com.br" },
  offers: {
    "@type": "Offer",
    price: "79.90",
    priceCurrency: "BRL",
    description: "Mensalidade por bloco",
    url: "https://seubloco.com/cadastrar",
  },
};

const problemas = [
  "A lista de presença vira caderno, foto ou mensagem no grupo.",
  "Ninguém sabe ao certo quem foi a quantos ensaios.",
  "Presença confirmada de longe, por quem nem apareceu.",
  "No fim, a diretoria monta a planilha na mão.",
];

const passos = [
  {
    n: "01",
    titulo: "Cadastre o bloco",
    texto:
      "Nome, cidade, cores do bloco e contato da diretoria. Você escolhe o plano e o sistema já abre com a identidade do seu bloco.",
  },
  {
    n: "02",
    titulo: "Monte a lista e os ensaios",
    texto:
      "Cadastre os membros (ou importe uma planilha), defina os instrumentos e crie cada ensaio com horário, local e raio de presença.",
  },
  {
    n: "03",
    titulo: "Marque presença com o QR",
    texto:
      "Cada ensaio tem um QR code. O membro lê com o celular e a presença só vale se ele estiver no local, dentro do horário.",
  },
  {
    n: "04",
    titulo: "Acompanhe e exporte",
    texto:
      "A diretoria vê quem veio em cada ensaio, o percentual de cada membro e baixa tudo em planilha.",
  },
];

const recursos = [
  {
    titulo: "QR code + localização",
    texto: "A presença só é registrada perto do ponto de encontro, dentro do raio que você definir.",
  },
  {
    titulo: "Bateria e coral",
    texto: "Ensaios e relatórios separados por grupo, para o percentual de cada um não se misturar.",
  },
  {
    titulo: "Ajuste manual",
    texto: "Esqueceu o celular? A diretoria marca ou remove a presença direto na lista do ensaio.",
  },
  {
    titulo: "Importação por planilha",
    texto: "Traga a lista de membros e as presenças de ensaios antigos sem digitar tudo de novo.",
  },
  {
    titulo: "Relatório pronto",
    texto: "Percentual de presença por membro e exportação em Excel, sem montar nada na mão.",
  },
  {
    titulo: "As cores do seu bloco",
    texto: "A página do bloco e o painel seguem a paleta que você escolher no cadastro.",
  },
];

const planos = [
  {
    nome: "Mensal",
    preco: "R$ 79,90",
    unidade: "/mês por bloco",
    itens: [
      "Cobrança recorrente mensal",
      "Membros e ensaios do seu bloco",
      "Check-in por QR e relatórios",
    ],
  },
  {
    nome: "À vista até o Carnaval",
    preco: "10% off",
    unidade: "sobre os meses até o Carnaval",
    itens: [
      "Um único pagamento, sem mensalidade",
      "O valor é calculado no cadastro, conforme os meses que faltam",
      "Mesmos recursos do plano mensal",
    ],
  },
];

const perguntas = [
  {
    p: "O membro precisa baixar um aplicativo?",
    r: "Não. O Seu Bloco abre no navegador do celular. O membro entra com o e-mail e os 6 últimos dígitos do celular cadastrados pela diretoria e lê o QR code do ensaio.",
  },
  {
    p: "E se alguém marcar presença sem estar no ensaio?",
    r: "A presença só é aceita dentro do horário do ensaio e perto do local definido, no raio que a diretoria escolheu. Fora disso, o sistema avisa que não foi possível marcar.",
  },
  {
    p: "E se o membro esquecer o celular ou der problema?",
    r: "A diretoria marca ou remove a presença manualmente na lista do ensaio.",
  },
  {
    p: "Meu bloco tem bateria e coral. Funciona?",
    r: "Sim. Cada membro e cada ensaio pertence a um grupo, e o relatório é sempre de um grupo por vez, para ninguém levar falta em ensaio que não era dele.",
  },
  {
    p: "Já tenho a lista de membros em planilha. Preciso digitar tudo?",
    r: "Não. Dá para importar a planilha de membros e também as presenças de ensaios anteriores.",
  },
  {
    p: "Como eu pago?",
    r: "O pagamento é feito no cadastro, pelo Stripe. Você escolhe entre a mensalidade e o pagamento à vista até o Carnaval.",
  },
];

// Bloco de seção reutilizável (mesmo padrão visual da /grifo)
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
        <div style={{ position: "relative", zIndex: 1, maxWidth, margin: "0 auto" }}>
          {children}
        </div>
      </div>
    </SectionReveal>
  );
}

const grade: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
  gap: "var(--sp-4)",
  marginTop: "var(--sp-4)",
};

const cartao: React.CSSProperties = {
  border: "1px solid var(--paper-soft)",
  padding: "var(--sp-4)",
  background: "var(--bg)",
};

// Moldura de celular (390x844 → proporção 780x1688)
function Celular({ src, alt, legenda }: { src: string; alt: string; legenda: string }) {
  return (
    <figure style={{ margin: 0, textAlign: "center" }}>
      <div
        style={{
          width: 220,
          margin: "0 auto",
          padding: 8,
          background: "var(--ink)",
          borderRadius: 28,
        }}
      >
        <Image
          src={`${PRINTS}/${src}`}
          alt={alt}
          width={780}
          height={1688}
          sizes="220px"
          style={{ width: "100%", height: "auto", borderRadius: 20, display: "block" }}
        />
      </div>
      <figcaption style={{ marginTop: "var(--sp-2)", color: "var(--fg-soft)", fontSize: 14 }}>
        {legenda}
      </figcaption>
    </figure>
  );
}

export default function SeuBlocoPage() {
  return (
    <>
      <a href="#main-content" className="skip-link">
        Pular para o conteúdo
      </a>
      <Header />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
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
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                gap: "var(--sp-6)",
                alignItems: "center",
              }}
            >
              <div>
                <p className="eyebrow">Seu Bloco · Presença de ensaio</p>
                <h1 className="hl-gloock">
                  Presença de ensaio que a diretoria pode confiar.
                </h1>
                <p
                  style={{
                    fontFamily: "var(--font-italic)",
                    fontStyle: "italic",
                    fontSize: "clamp(20px, 2.4vw, 28px)",
                    lineHeight: 1.3,
                    color: "var(--fg-soft)",
                    margin: "var(--sp-2) 0 var(--sp-4)",
                    maxWidth: 560,
                  }}
                >
                  O membro lê o QR code no ensaio e a presença só vale se ele
                  estiver no local. A diretoria acompanha tudo em um painel.
                </p>
                <div style={{ display: "flex", gap: "var(--sp-2)", flexWrap: "wrap" }}>
                  <Button href={WHATSAPP_SEUBLOCO}>Falar com a TimeLabs</Button>
                  <Button href={URL_CADASTRO} variant="secondary">
                    Cadastrar meu bloco
                  </Button>
                </div>
                <p style={{ marginTop: "var(--sp-3)", color: "var(--fg-soft)", fontSize: 14 }}>
                  Já em uso no Abalô-Caxi e no Lavô Tá Novo.
                </p>
              </div>
              <Celular
                src="evento-detalhe-mobile.webp"
                alt="Tela do Seu Bloco com o QR code de um ensaio e a lista de presenças"
                legenda="QR code do ensaio e lista de presenças"
              />
            </div>
          </div>
        </SectionReveal>

        {/* PROBLEMA */}
        <Secao fundo="var(--bg-alt)" maxWidth={760}>
          <p className="eyebrow">O problema</p>
          <h2 className="hl-gloock hl-mid" style={{ marginBottom: "var(--sp-3)" }}>
            Bloco grande, controle de presença no improviso.
          </h2>
          <ul style={{ lineHeight: 1.8, paddingLeft: "1.2em", margin: 0 }}>
            {problemas.map((p) => (
              <li key={p}>{p}</li>
            ))}
          </ul>
        </Secao>

        {/* COMO FUNCIONA */}
        <div id="como-funciona" />
        <Secao fundo="var(--bg)">
          <p className="eyebrow">Como funciona</p>
          <h2 className="hl-gloock hl-mid">Quatro passos.</h2>
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

        {/* RECURSOS */}
        <Secao fundo="var(--bg-alt)">
          <p className="eyebrow">O que o sistema faz</p>
          <h2 className="hl-gloock hl-mid">Do ensaio ao relatório.</h2>
          <div style={grade}>
            {recursos.map((r) => (
              <article key={r.titulo} style={cartao}>
                <h3 style={{ fontFamily: "var(--font-display)", fontSize: 22, margin: "0 0 var(--sp-1)" }}>
                  {r.titulo}
                </h3>
                <p style={{ lineHeight: 1.6, margin: 0 }}>{r.texto}</p>
              </article>
            ))}
          </div>
        </Secao>

        {/* TELAS */}
        <Secao fundo="var(--bg)">
          <p className="eyebrow">O sistema por dentro</p>
          <h2 className="hl-gloock hl-mid">As telas que o seu bloco vai usar.</h2>
          <p style={{ lineHeight: 1.7, maxWidth: 640, color: "var(--fg-soft)" }}>
            Capturas do sistema real, com membros e dados fictícios.
          </p>

          {/* Cadastro (desktop) em moldura de navegador */}
          <figure style={{ margin: "var(--sp-4) 0 var(--sp-6)" }}>
            <div style={{ border: "1px solid var(--paper-soft)", background: "var(--bg-alt)" }}>
              <div
                style={{
                  padding: "8px 14px",
                  borderBottom: "1px solid var(--paper-soft)",
                  fontFamily: "var(--font-mono)",
                  fontSize: 11,
                  letterSpacing: 2,
                  color: "var(--fg-soft)",
                }}
              >
                seubloco.com/cadastrar
              </div>
              <Image
                src={`${PRINTS}/cadastro-desktop.webp`}
                alt="Tela de cadastro do bloco no Seu Bloco, com nome, cidade, contato e cores"
                width={2880}
                height={1800}
                sizes="(max-width: 1080px) 100vw, 1080px"
                style={{ width: "100%", height: "auto", display: "block" }}
              />
            </div>
            <figcaption style={{ marginTop: "var(--sp-2)", color: "var(--fg-soft)", fontSize: 14 }}>
              Cadastro do bloco: nome, cidade, contato e cores.
            </figcaption>
          </figure>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: "var(--sp-5) var(--sp-4)",
            }}
          >
            <Celular
              src="login-bloco-mobile.webp"
              alt="Página de entrada de um bloco, com as cores do bloco"
              legenda="Página do bloco, com as cores dele"
            />
            <Celular
              src="painel-eventos-mobile.webp"
              alt="Painel da diretoria com a lista de ensaios de bateria e coral"
              legenda="Painel da diretoria: ensaios por grupo"
            />
            <Celular
              src="membro-home-mobile.webp"
              alt="Tela inicial do membro com o ensaio em andamento e o botão de marcar presença"
              legenda="Tela do membro: ensaio acontecendo agora"
            />
            <Celular
              src="checkin-sucesso-mobile.webp"
              alt="Confirmação de presença registrada após ler o QR code"
              legenda="Presença registrada no local"
            />
            <Celular
              src="membros-mobile.webp"
              alt="Lista de membros do bloco com instrumento e grupo"
              legenda="Membros, instrumentos e grupos"
            />
            <Celular
              src="relatorio-mobile.webp"
              alt="Relatório de presença com percentual por membro e botão de exportar planilha"
              legenda="Relatório com exportação em planilha"
            />
          </div>
        </Secao>

        {/* PLANOS */}
        <div id="planos" />
        <Secao fundo="var(--bg-alt)">
          <p className="eyebrow">Planos</p>
          <h2 className="hl-gloock hl-mid">Preço simples, por bloco.</h2>
          <div style={grade}>
            {planos.map((pl) => (
              <article key={pl.nome} style={cartao}>
                <h3 style={{ fontFamily: "var(--font-display)", fontSize: 26, margin: "0 0 var(--sp-1)" }}>
                  {pl.nome}
                </h3>
                <p style={{ margin: "0 0 var(--sp-2)" }}>
                  <span style={{ fontFamily: "var(--font-display)", fontSize: 40 }}>{pl.preco}</span>{" "}
                  <span style={{ color: "var(--fg-soft)" }}>{pl.unidade}</span>
                </p>
                <ul style={{ lineHeight: 1.8, paddingLeft: "1.2em", margin: "0 0 var(--sp-3)" }}>
                  {pl.itens.map((i) => (
                    <li key={i}>{i}</li>
                  ))}
                </ul>
                <Button href={URL_CADASTRO}>Cadastrar meu bloco</Button>
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
                Chega de caderno no ensaio.
              </h2>
              <p style={{ margin: "var(--sp-3) 0 var(--sp-4)", lineHeight: 1.7 }}>
                Fale com a gente e veja o Seu Bloco funcionando no seu bloco.
              </p>
              <Button href={WHATSAPP_SEUBLOCO} variant="mercury">
                Falar com a TimeLabs
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
