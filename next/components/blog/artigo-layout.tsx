import type { Metadata } from "next";
import Link from "next/link";
import { Pagina } from "@/components/layout/pagina";
import { Secao, ChamadaFinal } from "@/components/layout/secao";
import { JsonLd } from "@/components/ui/json-ld";
import { ARTIGOS, type Artigo } from "@/lib/artigos";
import { linkWhatsapp } from "@/lib/contato";

const BASE_URL = "https://timelabs.com.br";

function acharArtigo(slug: string): Artigo {
  const a = ARTIGOS.find((x) => x.slug === slug);
  if (!a) throw new Error(`Artigo não encontrado: ${slug}`);
  return a;
}

/** Metadata do artigo (título, descrição e canonical). */
export function metadataDoArtigo(slug: string): Metadata {
  const a = acharArtigo(slug);
  return {
    title: `${a.titulo} — TimeLabs`,
    description: a.descricao,
    alternates: { canonical: `/blog/${a.slug}` },
  };
}

/** Formata AAAA-MM-DD como "19 de novembro de 2026". */
export function dataPorExtenso(iso: string): string {
  const [ano, mes, dia] = iso.split("-").map(Number);
  return new Date(ano, mes - 1, dia).toLocaleDateString("pt-BR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

/** Casca de um artigo: título, data, texto (children) e chamada final. */
export function ArtigoLayout({
  slug,
  children,
}: {
  slug: string;
  children: React.ReactNode;
}) {
  const a = acharArtigo(slug);
  return (
    <Pagina>
      <JsonLd
        dados={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: a.titulo,
          description: a.descricao,
          datePublished: a.data,
          mainEntityOfPage: `${BASE_URL}/blog/${a.slug}`,
          author: { "@type": "Person", name: a.autor },
          publisher: { "@type": "Organization", name: "TimeLabs", url: BASE_URL },
        }}
      />
      <Secao topo maxWidth={760}>
        <p className="eyebrow">
          <Link href="/blog">Blog</Link> · {dataPorExtenso(a.data)}
        </p>
        <h1 className="hl-gloock hl-mid">{a.titulo}</h1>
        <p style={{ color: "var(--fg-soft)", margin: "var(--sp-2) 0 var(--sp-4)" }}>
          Por {a.autor}, TimeLabs
        </p>
        <div className="narrative-body">{children}</div>
      </Secao>
      <ChamadaFinal
        titulo="Quer saber como a IA enxerga a sua marca?"
        texto="O Grifo faz esse mesmo teste para a sua empresa e entrega o plano do que ajustar."
        botoes={[
          { rotulo: "Conhecer o Grifo", href: "/grifo" },
          {
            rotulo: "Chamar no WhatsApp",
            href: linkWhatsapp("Olá! Li o blog da TimeLabs e quero meu diagnóstico do Grifo."),
          },
        ]}
      />
    </Pagina>
  );
}
