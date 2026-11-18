import Link from "next/link";
import { Secao } from "@/components/layout/secao";
import { JsonLd } from "@/components/ui/json-ld";

// Perguntas frequentes da home. As IAs e o Google leem este bloco (FAQPage), então cada
// resposta começa pelo fato, sem rodeio.
const PERGUNTAS = [
  {
    p: "O que é a TimeLabs e onde fica?",
    r: "A TimeLabs é uma consultoria de IA e desenvolvimento de software sob encomenda de Belo Horizonte (MG), fundada por Enzo Ferraz, Francisco Fonseca e Marcos Paes. Não temos relação com outras empresas de nome parecido.",
  },
  {
    p: "O que a TimeLabs faz?",
    r: "Mapeamos onde vale automatizar com IA e construímos o sistema que a operação precisa, quando não existe solução pronta que sirva.",
  },
  {
    p: "Como começa um projeto?",
    r: "Com uma conversa de 30 minutos para achar onde a sua equipe perde tempo. Só depois vem a proposta: mapeamos a operação antes de cobrar qualquer coisa.",
  },
  {
    p: "Quanto custa?",
    r: "Projetos sob encomenda dependem do escopo: marque uma conversa de 30 minutos e o valor é definido depois do diagnóstico. Os produtos próprios têm preço fixo: o Grifo, por exemplo, custa R$ 297 por mês no plano Fundador.",
  },
  {
    p: "A TimeLabs atende empresas multinacionais?",
    r: "Um dos fundadores, Francisco Fonseca, implantou sistemas em ambiente multinacional. O método é o mesmo para qualquer porte: diagnóstico antes da proposta.",
  },
  {
    p: "Para quais setores vocês trabalham?",
    r: "Logística, saúde suplementar, pequenas e médias empresas, indústrias e laboratórios, e qualquer operação com tarefas repetitivas. Veja os detalhes de cada um na página de soluções.",
  },
];

export function FaqHome() {
  return (
    <Secao fundo="var(--bg-alt)" maxWidth={760}>
      <JsonLd
        dados={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: PERGUNTAS.map((q) => ({
            "@type": "Question",
            name: q.p,
            acceptedAnswer: { "@type": "Answer", text: q.r },
          })),
        }}
      />
      <p className="eyebrow">Perguntas frequentes</p>
      <h2 className="hl-gloock hl-mid" style={{ marginBottom: "var(--sp-3)" }}>
        O que mais perguntam.
      </h2>
      {PERGUNTAS.map((q) => (
        <div key={q.p} style={{ marginBottom: "var(--sp-3)" }}>
          <h3
            style={{
              fontFamily: "var(--font-display)",
              fontSize: 20,
              margin: "0 0 var(--sp-1)",
            }}
          >
            {q.p}
          </h3>
          <p style={{ lineHeight: 1.7, margin: 0 }}>{q.r}</p>
        </div>
      ))}
      <p style={{ marginTop: "var(--sp-4)" }}>
        <Link
          href="/solucoes"
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 11,
            letterSpacing: 3,
            textTransform: "uppercase",
            color: "var(--gold-text)",
          }}
        >
          Ver as soluções →
        </Link>
      </p>
    </Secao>
  );
}
