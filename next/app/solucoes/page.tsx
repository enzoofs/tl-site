import type { Metadata } from "next";
import Link from "next/link";
import { Pagina } from "@/components/layout/pagina";
import {
  Secao,
  ChamadaFinal,
  estiloGrade,
  estiloCartao,
} from "@/components/layout/secao";
import { SOLUCOES } from "@/lib/solucoes";
import { LINK_AGENDAR, linkWhatsapp } from "@/lib/contato";

export const metadata: Metadata = {
  title: "Soluções de IA e software sob encomenda em Belo Horizonte — TimeLabs",
  description:
    "Onde a TimeLabs, de Belo Horizonte, aplica IA, automação e software sob encomenda: logística, saúde suplementar, pequenas e médias empresas, indústria e laboratórios.",
  alternates: { canonical: "/solucoes" },
};

export default function SolucoesPage() {
  return (
    <Pagina>
      <Secao topo>
        <p className="eyebrow">Soluções · Belo Horizonte</p>
        <h1 className="hl-gloock">Onde aplicamos IA e software sob encomenda.</h1>
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
          Em todos os casos o caminho é o mesmo: diagnóstico antes da proposta.
        </p>
      </Secao>

      <Secao fundo="var(--bg-alt)">
        <div style={estiloGrade}>
          {SOLUCOES.map((s) => (
            <article key={s.slug} style={estiloCartao}>
              <h2
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: 22,
                  margin: "0 0 var(--sp-1)",
                }}
              >
                <Link href={`/solucoes/${s.slug}`}>{s.titulo}</Link>
              </h2>
              <p style={{ lineHeight: 1.6, margin: 0 }}>{s.resumo}</p>
            </article>
          ))}
        </div>
      </Secao>

      <ChamadaFinal
        titulo="Seu caso não está na lista?"
        texto="Conte onde a sua equipe perde tempo. Se não conseguirmos ajudar, dizemos, e indicamos quem consegue."
        botoes={[
          { rotulo: "Agendar 30 minutos", href: LINK_AGENDAR },
          {
            rotulo: "Chamar no WhatsApp",
            href: linkWhatsapp("Olá! Quero conversar sobre um projeto."),
          },
        ]}
      />
    </Pagina>
  );
}
