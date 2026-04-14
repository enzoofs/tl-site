const headingStyle: React.CSSProperties = {
  fontFamily: "var(--font-mono)",
  fontSize: 11,
  letterSpacing: 3,
  textTransform: "uppercase",
  color: "var(--mercury)",
  marginBottom: "var(--sp-3)",
};

function FooterLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  const isExternal = href.startsWith("http") || href.startsWith("mailto:") || href.startsWith("tel:");
  return (
    <a
      href={href}
      className="footer-link"
      {...(isExternal && href.startsWith("http")
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
      style={{
        background: "var(--ink)",
        color: "var(--paper)",
        padding: "var(--sp-7) var(--sp-4) var(--sp-5)",
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          display: "grid",
          gap: "var(--sp-5)",
        }}
        className="footer-grid"
      >
        {/* Col 1: Brand */}
        <div>
          <p
            style={{
              fontFamily: "var(--font-display)",
              fontSize: 32,
              lineHeight: 1.1,
              margin: "0 0 var(--sp-2)",
              color: "var(--paper)",
            }}
          >
            timelabs
          </p>
          <p
            style={{
              fontFamily: "var(--font-italic)",
              fontStyle: "italic",
              fontSize: 16,
              color: "var(--paper)",
              opacity: 0.5,
              margin: 0,
            }}
          >
            Automação empresarial.
          </p>
        </div>

        {/* Col 2: Contato */}
        <div>
          <p style={headingStyle}>CONTATO</p>
          <FooterLink href="mailto:contato@timelabsbr.com">
            contato@timelabsbr.com
          </FooterLink>
        </div>

        {/* Col 3: Redes */}
        <div>
          <p style={headingStyle}>REDES</p>
          <FooterLink href="https://linkedin.com/company/timelabs">
            LinkedIn
          </FooterLink>
          <FooterLink href="https://instagram.com/timelabs">
            Instagram
          </FooterLink>
        </div>

        {/* Col 4: Legal */}
        <div>
          <p style={headingStyle}>LEGAL</p>
          <FooterLink href="/privacidade">Política de Privacidade</FooterLink>
          <FooterLink href="/termos">Termos de Uso</FooterLink>
        </div>
      </div>

      {/* Bottom row */}
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          borderTop: "1px solid rgba(239, 233, 218, 0.12)",
          marginTop: "var(--sp-6)",
          paddingTop: "var(--sp-3)",
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "var(--sp-2)",
        }}
      >
        <p
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 11,
            color: "var(--paper)",
            opacity: 0.45,
            margin: 0,
          }}
        >
          &copy; 2026 TimeLabs &middot; São Paulo, Brasil
        </p>
      </div>

      <style>{`
        .footer-link {
          display: block;
          font-family: var(--font-body);
          font-size: 15px;
          color: var(--paper);
          text-decoration: none;
          opacity: 0.78;
          transition: color 0.25s var(--ease), opacity 0.25s var(--ease);
          margin-bottom: 10px;
        }
        .footer-link:hover {
          color: var(--mercury);
          opacity: 1;
        }
        .footer-grid {
          grid-template-columns: repeat(4, 1fr);
        }
        @media (max-width: 1024px) {
          .footer-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        @media (max-width: 639px) {
          .footer-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </footer>
  );
}
