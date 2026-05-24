import type { Metadata } from "next";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

export const metadata: Metadata = {
  title: "Política de Privacidade — TimeLabs",
  description:
    "Como a TimeLabs trata seus dados pessoais em conformidade com a Lei Geral de Proteção de Dados (LGPD).",
  alternates: { canonical: "/privacidade" },
};

const sections = [
  {
    title: "1. Quem somos",
    body: (
      <>
        <p>
          A <strong>TimeLabs</strong> é uma empresa de automação e inteligência
          artificial sediada em Belo Horizonte/MG. Oferecemos sistemas sob medida
          que substituem o trabalho manual repetitivo em rotinas empresariais.
        </p>
        <p>
          <strong>Contato do controlador de dados:</strong>
          <br />
          Enzo Ferraz · <a href="mailto:contato@timelabs.com.br">contato@timelabs.com.br</a>
          <br />
          WhatsApp · (31) 99597-0472
        </p>
      </>
    ),
  },
  {
    title: "2. Quais dados tratamos",
    body: (
      <>
        <p>
          <strong>Quando você preenche o formulário de contato:</strong> nome
          (opcional) e e-mail.
        </p>
        <p>
          <strong>Quando você navega no site:</strong> dados anonimizados de uso
          (páginas visitadas, dispositivo, origem do tráfego), sem identificação
          pessoal.
        </p>
        <p>
          Não solicitamos, não tratamos e não armazenamos dados sensíveis (origem
          racial, religião, saúde, dados biométricos, etc.).
        </p>
      </>
    ),
  },
  {
    title: "3. Para que usamos",
    body: (
      <ul>
        <li>Responder ao seu contato e dar continuidade à conversa comercial.</li>
        <li>Entender de forma agregada como o site é usado, para melhorá-lo.</li>
        <li>
          <strong>Não vendemos, não alugamos e não compartilhamos</strong> seus
          dados com terceiros para fins de marketing ou publicidade.
        </li>
      </ul>
    ),
  },
  {
    title: "4. Base legal (LGPD, art. 7)",
    body: (
      <p>
        Tratamos dados pessoais com fundamento em <strong>consentimento</strong>{" "}
        (quando você preenche o formulário) ou <strong>legítimo interesse</strong>{" "}
        (analytics anonimizado), nos termos do art. 7º, I e IX, da Lei nº
        13.709/2018 (LGPD).
      </p>
    ),
  },
  {
    title: "5. Compartilhamento com terceiros",
    body: (
      <>
        <p>
          Para operar o site e responder ao seu contato, utilizamos provedores
          de infraestrutura — como serviços de hospedagem (Vercel), e-mail e
          armazenamento — que tratam dados conforme contrato e suas próprias
          políticas de privacidade.
        </p>
        <p>
          Nenhum desses parceiros recebe seus dados para fins próprios de
          marketing.
        </p>
      </>
    ),
  },
  {
    title: "6. Retenção",
    body: (
      <ul>
        <li>
          <strong>Dados de contato comercial:</strong> mantidos por até 24 meses
          após o último contato, ou até você solicitar exclusão.
        </li>
        <li>
          <strong>Dados de analytics:</strong> agregados e anonimizados, sem
          prazo definido, pois não permitem identificar você.
        </li>
      </ul>
    ),
  },
  {
    title: "7. Seus direitos (LGPD, art. 18)",
    body: (
      <>
        <p>Você tem direito, a qualquer momento, a:</p>
        <ul>
          <li>Confirmar a existência de tratamento de dados;</li>
          <li>Acessar seus dados;</li>
          <li>Corrigir dados incompletos, inexatos ou desatualizados;</li>
          <li>Solicitar anonimização, bloqueio ou eliminação;</li>
          <li>Solicitar portabilidade a outro fornecedor;</li>
          <li>Obter informação sobre compartilhamentos realizados;</li>
          <li>Revogar consentimento a qualquer tempo.</li>
        </ul>
        <p>
          Para exercer qualquer desses direitos, envie um e-mail para{" "}
          <a href="mailto:contato@timelabs.com.br">contato@timelabs.com.br</a>.
          Responderemos em até 15 dias úteis.
        </p>
      </>
    ),
  },
  {
    title: "8. Segurança",
    body: (
      <p>
        Toda a comunicação com o site é feita por HTTPS. Acessos administrativos
        são restritos e protegidos por autenticação. Em caso de incidente de
        segurança que possa acarretar risco relevante aos titulares,
        notificaremos a ANPD e os titulares afetados nos termos do art. 48 da
        LGPD.
      </p>
    ),
  },
  {
    title: "9. Encarregado pelo tratamento (DPO)",
    body: (
      <p>
        Enzo Ferraz · <a href="mailto:contato@timelabs.com.br">contato@timelabs.com.br</a>
      </p>
    ),
  },
  {
    title: "10. Alterações desta política",
    body: (
      <p>
        Esta política pode ser atualizada para refletir mudanças legais,
        técnicas ou operacionais. A data de “Última atualização” no topo desta
        página indica sempre a versão em vigor.
      </p>
    ),
  },
];

export default function PrivacidadePage() {
  return (
    <>
      <a href="#main-content" className="skip-link">
        Pular para o conteúdo
      </a>
      <Header />
      <main id="main-content" className="pt-[50px]">
        <article className="legal-page">
          <p className="eyebrow">Documento legal</p>
          <h1 className="hl-gloock">Política de Privacidade</h1>
          <p className="legal-meta">
            Última atualização: 19 de maio de 2026
          </p>

          <p className="legal-lede">
            Este documento descreve, em linguagem clara, como a TimeLabs trata
            seus dados pessoais — em conformidade com a Lei Geral de Proteção de
            Dados (Lei nº 13.709/2018).
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
          color: var(--mercury);
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
