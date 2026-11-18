import type { Metadata } from "next";
import { Pagina } from "@/components/layout/pagina";
import {
  Secao,
  ChamadaFinal,
  estiloGrade,
  estiloCartao,
} from "@/components/layout/secao";
import { JsonLd } from "@/components/ui/json-ld";
import { SOLUCOES, type Solucao } from "@/lib/solucoes";
import { LINK_AGENDAR, linkWhatsapp } from "@/lib/contato";

const BASE_URL = "https://timelabs.com.br";

function acharSolucao(slug: string): Solucao {
  const s = SOLUCOES.find((x) => x.slug === slug);
  if (!s) throw new Error(`Solução não encontrada: ${slug}`);
  return s;
}

/** Metadata (título, descrição, canonical) da página de uma solução. */
export function metadataDaSolucao(slug: string): Metadata {
  const s = acharSolucao(slug);
  return {
    title: `${s.titulo} — TimeLabs`,
    description: s.descricao,
    alternates: { canonical: `/solucoes/${s.slug}` },
  };
}

/** Página de uma solução: resposta direta, exemplos, quem faz, FAQ e chamada. */
export function SolucaoPage({ slug }: { slug: string }) {
  const s = acharSolucao(slug);
  const url = `${BASE_URL}/solucoes/${s.slug}`;

  return (
    <Pagina>
      {/* Dados estruturados: o serviço e as perguntas frequentes */}
      <JsonLd
        dados={{
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "Service",
              name: s.titulo,
              description: s.descricao,
              url,
              provider: { "@type": "Organization", name: "TimeLabs", url: BASE_URL },
              areaServed: { "@type": "City", name: "Belo Horizonte" },
            },
            {
              "@type": "FAQPage",
              mainEntity: s.faq.map((f) => ({
                "@type": "Question",
                name: f.p,
                acceptedAnswer: { "@type": "Answer", text: f.r },
              })),
            },
          ],
        }}
      />

      <Secao topo maxWidth={900}>
        <p className="eyebrow">Soluções · Belo Horizonte</p>
        <h1 className="hl-gloock hl-mid">{s.titulo}</h1>
        <p
          style={{
            fontFamily: "var(--font-italic)",
            fontStyle: "italic",
            fontSize: "clamp(20px, 2.2vw, 26px)",
            lineHeight: 1.4,
            color: "var(--fg-soft)",
            margin: "var(--sp-3) 0 0",
          }}
        >
          {s.resposta}
        </p>
      </Secao>

      <Secao fundo="var(--bg-alt)">
        <p className="eyebrow">Em que podemos ajudar</p>
        <p style={{ lineHeight: 1.7, maxWidth: 760, margin: "var(--sp-2) 0 0" }}>
          {s.introExemplos}
        </p>
        <div style={estiloGrade}>
          {s.exemplos.map((e) => (
            <article key={e.titulo} style={estiloCartao}>
              <h2
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: 22,
                  margin: "0 0 var(--sp-1)",
                }}
              >
                {e.titulo}
              </h2>
              <p style={{ lineHeight: 1.6, margin: 0 }}>{e.texto}</p>
            </article>
          ))}
        </div>
      </Secao>

      <Secao maxWidth={760}>
        <p className="eyebrow">Quem faz</p>
        <h2 className="hl-gloock hl-mid" style={{ marginBottom: "var(--sp-3)" }}>
          {s.quem.titulo}
        </h2>
        <p style={{ lineHeight: 1.7 }}>{s.quem.texto}</p>
      </Secao>

      <Secao fundo="var(--bg-alt)" maxWidth={760}>
        <p className="eyebrow">Perguntas frequentes</p>
        <h2 className="hl-gloock hl-mid" style={{ marginBottom: "var(--sp-3)" }}>
          O que mais perguntam.
        </h2>
        {s.faq.map((f) => (
          <div key={f.p} style={{ marginBottom: "var(--sp-3)" }}>
            <h3
              style={{
                fontFamily: "var(--font-display)",
                fontSize: 20,
                margin: "0 0 var(--sp-1)",
              }}
            >
              {f.p}
            </h3>
            <p style={{ lineHeight: 1.7, margin: 0 }}>{f.r}</p>
          </div>
        ))}
      </Secao>

      <ChamadaFinal
        titulo="Vamos achar onde vale automatizar?"
        texto="Uma conversa de 30 minutos para mapear a sua operação, antes de qualquer proposta."
        botoes={[
          { rotulo: "Agendar 30 minutos", href: LINK_AGENDAR },
          {
            rotulo: "Chamar no WhatsApp",
            href: linkWhatsapp(`Olá! Vi a página "${s.titulo}" e quero conversar.`),
          },
        ]}
      />
    </Pagina>
  );
}
