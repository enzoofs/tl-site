import type { Metadata } from "next";
import Link from "next/link";
import { Pagina } from "@/components/layout/pagina";
import {
  Secao,
  ChamadaFinal,
  estiloGrade,
  estiloCartao,
} from "@/components/layout/secao";
import { linkWhatsapp } from "@/lib/contato";

export const metadata: Metadata = {
  title: "Projetos e produtos próprios — TimeLabs",
  description:
    "Além dos projetos sob encomenda, a TimeLabs desenvolve produtos próprios: Grifo, Seu Bloco e o Gerador de Conteúdo. Veja o que já está no ar e o que está em desenvolvimento.",
  alternates: { canonical: "/projetos" },
};

type Projeto = {
  nome: string;
  situacao: "No ar" | "Em desenvolvimento";
  texto: string;
  /** Destino do cartão; sem link = ainda não tem página pública */
  href?: string;
  rotulo?: string;
};

const PROJETOS: Projeto[] = [
  {
    nome: "Grifo",
    situacao: "No ar",
    texto:
      "Mede como a sua marca é citada no ChatGPT, no Gemini e no Google, entrega o plano de ações e escreve os artigos para aparecer mais.",
    href: "/grifo",
    rotulo: "Conhecer o Grifo",
  },
  {
    nome: "Seu Bloco",
    situacao: "No ar",
    texto:
      "Plataforma para blocos de carnaval organizarem ensaios, presença e cobrança, com acesso próprio para cada bloco.",
    href: "/seubloco",
    rotulo: "Conhecer o Seu Bloco",
  },
  {
    nome: "Gerador de Conteúdo",
    situacao: "Em desenvolvimento",
    texto:
      "Gera o texto, a arte e as hashtags dos posts a partir de um briefing. Uma pessoa revisa e aprova; depois da aprovação, a publicação no Instagram é agendada e feita automaticamente (em fase de testes).",
  },
];

export default function ProjetosPage() {
  return (
    <Pagina>
      <Secao topo>
        <p className="eyebrow">Projetos</p>
        <h1 className="hl-gloock">Estamos construindo produtos próprios.</h1>
        <p
          style={{
            fontFamily: "var(--font-italic)",
            fontStyle: "italic",
            fontSize: "clamp(22px, 2.6vw, 32px)",
            lineHeight: 1.3,
            color: "var(--fg-soft)",
            margin: "var(--sp-2) 0 0",
            maxWidth: 720,
          }}
        >
          Além dos projetos sob encomenda, a TimeLabs desenvolve ferramentas
          que resolvem problemas que a gente mesmo encontrou.
        </p>
      </Secao>

      <Secao fundo="var(--bg-alt)">
        <div style={estiloGrade}>
          {PROJETOS.map((p) => (
            <article key={p.nome} style={estiloCartao}>
              <p className="eyebrow" style={{ marginBottom: "var(--sp-1)" }}>
                {p.situacao}
              </p>
              <h2
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: 28,
                  margin: "0 0 var(--sp-2)",
                }}
              >
                {p.nome}
              </h2>
              <p style={{ lineHeight: 1.6, margin: "0 0 var(--sp-2)" }}>
                {p.texto}
              </p>
              {p.href && p.rotulo && (
                <Link
                  href={p.href}
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 11,
                    letterSpacing: 3,
                    textTransform: "uppercase",
                    color: "var(--gold-text)",
                  }}
                >
                  {p.rotulo} →
                </Link>
              )}
            </article>
          ))}
        </div>
        <p style={{ lineHeight: 1.7, maxWidth: 720, marginTop: "var(--sp-5)" }}>
          Outros projetos estão em desenvolvimento neste momento e serão
          anunciados aqui quando estiverem prontos.
        </p>
      </Secao>

      <ChamadaFinal
        titulo="Quer acompanhar de perto?"
        texto="Fale com a gente: se algum desses produtos resolve um problema seu, ou se você tem um problema que ainda não tem produto, a conversa é bem-vinda."
        botoes={[
          {
            rotulo: "Chamar no WhatsApp",
            href: linkWhatsapp("Olá! Vi a página de projetos da TimeLabs e quero conversar."),
          },
        ]}
      />
    </Pagina>
  );
}
