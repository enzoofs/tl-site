import type { Metadata } from "next";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

export const metadata: Metadata = {
  title: "Termos de Uso — TimeLabs",
  description:
    "Termos que regulam o uso do site timelabs.com.br e a relação com os serviços oferecidos pela TimeLabs.",
  alternates: { canonical: "/termos" },
};

const sections = [
  {
    title: "1. Objeto",
    body: (
      <p>
        Este documento estabelece as condições gerais de uso do site{" "}
        <strong>timelabs.com.br</strong> e dos materiais nele disponibilizados.
        A contratação dos serviços de automação e inteligência artificial
        prestados pela TimeLabs é formalizada por proposta comercial específica,
        firmada entre as partes.
      </p>
    ),
  },
  {
    title: "2. Sobre a TimeLabs",
    body: (
      <p>
        A TimeLabs é uma empresa de automação empresarial sediada em Belo
        Horizonte/MG, atuando no desenvolvimento de sistemas sob medida que
        substituem o trabalho manual repetitivo em rotinas administrativas,
        operacionais e analíticas.
      </p>
    ),
  },
  {
    title: "3. Sobre o conteúdo do site",
    body: (
      <>
        <p>
          O conteúdo é apresentado em caráter informativo e institucional. Os
          exemplos, números e descrições de operações têm finalidade ilustrativa
          e podem variar conforme o escopo de cada projeto.
        </p>
        <p>
          Reservamo-nos o direito de atualizar, complementar ou remover
          conteúdo a qualquer momento, sem aviso prévio.
        </p>
      </>
    ),
  },
  {
    title: "4. Propriedade intelectual",
    body: (
      <p>
        Todo o conteúdo deste site — textos, identidade visual, código,
        ilustrações e marcas — é de propriedade da TimeLabs ou licenciado para
        seu uso. É vedada a reprodução, distribuição, modificação ou uso
        comercial sem autorização prévia e expressa.
      </p>
    ),
  },
  {
    title: "5. Conduta do usuário",
    body: (
      <>
        <p>Ao utilizar este site, você se compromete a não:</p>
        <ul>
          <li>Praticar atividades ilícitas ou que violem direitos de terceiros;</li>
          <li>Realizar scraping massivo, mineração automatizada ou engenharia reversa;</li>
          <li>Tentar contornar mecanismos de segurança;</li>
          <li>
            Enviar conteúdo difamatório, abusivo, fraudulento ou prejudicial
            através de qualquer formulário ou canal de contato.
          </li>
        </ul>
      </>
    ),
  },
  {
    title: "6. Limitação de responsabilidade",
    body: (
      <>
        <p>
          O site é fornecido “como está” e “conforme disponível”. A TimeLabs
          envida esforços razoáveis para mantê-lo operante, acessível e
          atualizado, mas não garante operação ininterrupta ou ausência de
          falhas técnicas.
        </p>
        <p>
          A TimeLabs não se responsabiliza por danos indiretos, lucros cessantes
          ou prejuízos decorrentes do uso ou da impossibilidade de uso do site,
          ressalvadas as hipóteses legais.
        </p>
      </>
    ),
  },
  {
    title: "7. Privacidade e proteção de dados",
    body: (
      <p>
        O tratamento de dados pessoais coletados por este site está descrito na{" "}
        <a href="/privacidade">Política de Privacidade</a>, que é parte
        integrante destes Termos.
      </p>
    ),
  },
  {
    title: "8. Alterações destes Termos",
    body: (
      <p>
        Estes Termos podem ser atualizados periodicamente. A versão vigente é
        sempre a publicada nesta página, com a data indicada no topo do
        documento. Recomendamos consulta periódica.
      </p>
    ),
  },
  {
    title: "9. Lei aplicável e foro",
    body: (
      <p>
        Estes Termos são regidos pelas leis da República Federativa do Brasil.
        Fica eleito o foro da Comarca de Belo Horizonte/MG para dirimir
        quaisquer controvérsias decorrentes deste documento.
      </p>
    ),
  },
  {
    title: "10. Contato",
    body: (
      <p>
        Dúvidas, solicitações ou comunicações sobre estes Termos podem ser
        enviadas para{" "}
        <a href="mailto:contato@timelabs.com.br">contato@timelabs.com.br</a>.
      </p>
    ),
  },
];

export default function TermosPage() {
  return (
    <>
      <a href="#main-content" className="skip-link">
        Pular para o conteúdo
      </a>
      <Header />
      <main id="main-content" className="pt-[50px]">
        <article className="legal-page">
          <p className="eyebrow">Documento legal</p>
          <h1 className="hl-gloock">Termos de Uso</h1>
          <p className="legal-meta">
            Última atualização: 19 de maio de 2026
          </p>

          <p className="legal-lede">
            Estes termos regulam o uso do site timelabs.com.br. Ao acessar e
            navegar pelo site, você concorda com as condições descritas a
            seguir.
          </p>

          {sections.map((section) => (
            <section key={section.title} className="legal-section">
              <h2>{section.title}</h2>
              <div className="legal-body">{section.body}</div>
            </section>
          ))}
        </article>
      </main>
      <Footer />

      <style>{`
        .legal-page {
          max-width: 760px;
          margin: 0 auto;
          padding: var(--sp-7) var(--sp-4) var(--sp-8);
          color: var(--fg);
        }
        .legal-page .eyebrow {
          margin-bottom: var(--sp-2);
        }
        .legal-page .hl-gloock {
          font-size: clamp(36px, 5vw, 52px);
          line-height: 1.1;
          margin: 0 0 var(--sp-2);
        }
        .legal-meta {
          font-family: var(--font-mono);
          font-size: 12px;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: var(--fg-soft);
          margin: 0 0 var(--sp-5);
        }
        .legal-lede {
          font-family: var(--font-italic);
          font-style: italic;
          font-size: 19px;
          line-height: 1.55;
          color: var(--fg-soft);
          margin: 0 0 var(--sp-6);
          padding-bottom: var(--sp-5);
          border-bottom: 1px solid color-mix(in srgb, var(--fg) 12%, transparent);
        }
        .legal-section {
          margin-bottom: var(--sp-5);
        }
        .legal-section h2 {
          font-family: var(--font-display);
          font-weight: 400;
          font-size: 22px;
          line-height: 1.25;
          letter-spacing: -0.01em;
          margin: 0 0 var(--sp-2);
          color: var(--fg);
        }
        .legal-body {
          font-family: var(--font-body);
          font-size: 16px;
          line-height: 1.75;
          color: var(--fg);
        }
        .legal-body p {
          margin: 0 0 var(--sp-2);
        }
        .legal-body ul {
          margin: 0 0 var(--sp-2);
          padding-left: 24px;
        }
        .legal-body li {
          margin-bottom: 6px;
        }
        .legal-body a {
          color: var(--gold-text);
          text-decoration: underline;
          text-underline-offset: 3px;
          text-decoration-thickness: 1px;
        }
        .legal-body a:hover {
          color: var(--fg);
        }
        .legal-body strong {
          color: var(--fg);
          font-weight: 700;
        }
      `}</style>
    </>
  );
}
