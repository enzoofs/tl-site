import type { Metadata } from "next";
import Link from "next/link";
import { Pagina } from "@/components/layout/pagina";
import { Secao } from "@/components/layout/secao";
import { ARTIGOS } from "@/lib/artigos";
import { dataPorExtenso } from "@/components/blog/artigo-layout";

export const metadata: Metadata = {
  title: "Blog — IA, automação e visibilidade de marca — TimeLabs",
  description:
    "Artigos da TimeLabs, de Belo Horizonte, sobre IA, automação de processos e como as marcas aparecem (ou não) nas respostas do ChatGPT e do Google.",
  alternates: { canonical: "/blog" },
};

export default function BlogPage() {
  return (
    <Pagina>
      <Secao topo>
        <p className="eyebrow">Blog</p>
        <h1 className="hl-gloock">O que estamos aprendendo.</h1>
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
          IA, automação e visibilidade de marca, com dados da nossa própria casa.
        </p>
      </Secao>

      <Secao fundo="var(--bg-alt)" maxWidth={760}>
        {ARTIGOS.map((a) => (
          <article key={a.slug} style={{ marginBottom: "var(--sp-5)" }}>
            <p className="eyebrow" style={{ marginBottom: "var(--sp-1)" }}>
              {dataPorExtenso(a.data)}
            </p>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: 26,
                margin: "0 0 var(--sp-1)",
              }}
            >
              <Link href={`/blog/${a.slug}`}>{a.titulo}</Link>
            </h2>
            <p style={{ lineHeight: 1.6, margin: 0 }}>{a.descricao}</p>
          </article>
        ))}
      </Secao>
    </Pagina>
  );
}
