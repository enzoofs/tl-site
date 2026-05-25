import Link from "next/link";

function FooterLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  const isAbsoluteExternal = href.startsWith("http");
  const isProtocol = href.startsWith("mailto:") || href.startsWith("tel:");

  if (!isAbsoluteExternal && !isProtocol) {
    return (
      <Link href={href} className="footer-link">
        {children}
      </Link>
    );
  }

  return (
    <a
      href={href}
      className="footer-link"
      {...(isAbsoluteExternal
        ? { target: "_blank", rel: "noopener noreferrer" }
        : {})}
    >
      {children}
    </a>
  );
}

export function Footer() {
  return (
    <footer
      className="hex-frost"
      style={{
        background: "var(--ink)",
        color: "var(--paper)",
        padding: "var(--sp-3) var(--sp-4)",
      }}
    >
      <div className="hex-frost-content">
        <div className="footer-row">
          {/* Brand: wordmark + tagline */}
          <div className="footer-brand">
            <span className="footer-wordmark">timelabs</span>
            <span className="footer-tagline">Automação empresarial.</span>
          </div>

          {/* Contato visivel + nav inline. Email/telefone ficam legiveis
             (sem uppercase); redes/legal mantem o tratamento mono caps. */}
          <nav aria-label="Rodapé" className="footer-links">
            <a href="mailto:contato@timelabs.com.br" className="footer-link footer-link--plain">
              contato@timelabs.com.br
            </a>
            <span className="footer-sep" aria-hidden="true">·</span>
            <a
              href="https://wa.me/5531995970472"
              className="footer-link footer-link--plain"
              target="_blank"
              rel="noopener noreferrer"
            >
              (31) 99597-0472
            </a>
            <span className="footer-sep" aria-hidden="true">·</span>
            <FooterLink href="https://www.linkedin.com/company/timelabs-automa%C3%A7%C3%A3o-de-processos/">
              linkedin
            </FooterLink>
            <span className="footer-sep" aria-hidden="true">·</span>
            <FooterLink href="https://instagram.com/timelabsbr">instagram</FooterLink>
            <span className="footer-sep" aria-hidden="true">·</span>
            <FooterLink href="/privacidade">privacidade</FooterLink>
            <span className="footer-sep" aria-hidden="true">·</span>
            <FooterLink href="/termos">termos</FooterLink>
          </nav>
        </div>

        <p className="footer-copy">
          &copy; 2026 TimeLabs &middot; Belo Horizonte, Brasil
        </p>
      </div>

      <style>{`
        .footer-row {
          max-width: 1200px;
          margin: 0 auto;
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: var(--sp-4);
          flex-wrap: wrap;
        }
        .footer-brand {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }
        .footer-wordmark {
          font-family: var(--font-display);
          font-size: 22px;
          line-height: 1;
          color: var(--paper);
        }
        .footer-tagline {
          font-family: var(--font-italic);
          font-style: italic;
          font-size: 13px;
          color: var(--paper);
          opacity: 0.5;
        }
        .footer-links {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 10px;
        }
        .footer-link {
          font-family: var(--font-mono);
          font-size: 12px;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          color: var(--paper);
          text-decoration: none;
          opacity: 0.72;
          transition: color 0.25s var(--ease), opacity 0.25s var(--ease);
        }
        .footer-link:hover {
          color: var(--mercury);
          opacity: 1;
        }
        .footer-link--plain {
          font-family: var(--font-body);
          font-size: 14px;
          letter-spacing: 0;
          text-transform: none;
          opacity: 0.85;
        }
        .footer-sep {
          color: var(--paper);
          opacity: 0.3;
          font-size: 12px;
        }
        .footer-copy {
          max-width: 1200px;
          margin: var(--sp-2) auto 0;
          padding-top: var(--sp-2);
          border-top: 1px solid rgba(239, 233, 218, 0.08);
          font-family: var(--font-mono);
          font-size: 11px;
          letter-spacing: 1.5px;
          color: var(--paper);
          opacity: 0.4;
        }
        @media (max-width: 768px) {
          .footer-row {
            flex-direction: column;
            align-items: flex-start;
            gap: var(--sp-3);
          }
        }
        @media (max-width: 639px) {
          .footer-links {
            gap: 8px;
          }
          .footer-link {
            font-size: 11px;
            letter-spacing: 1px;
          }
        }
      `}</style>
    </footer>
  );
}
