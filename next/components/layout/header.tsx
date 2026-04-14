"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import ThemeToggle from "@/components/ui/theme-toggle";

type NavLink = {
  label: string;
  href: string;
  accent?: boolean;
};

const NAV_LINKS: NavLink[] = [
  { label: "Problema", href: "#problema" },
  { label: "O que fazemos", href: "#operacoes" },
  { label: "Como trabalhamos", href: "#metodo" },
  { label: "Resultados", href: "#resultados" },
  { label: "Agendar", href: "#agendar", accent: true },
];

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Lock body scroll when mobile menu is open */
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const handleNavClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      e.preventDefault();
      setMenuOpen(false);
      const target = document.querySelector(href);
      target?.scrollIntoView({ behavior: "smooth" });
    },
    [],
  );

  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        height: 50,
        zIndex: 100,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 var(--sp-4)",
        background: scrolled
          ? "rgba(43, 37, 32, 0.88)"
          : "var(--ink)",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(12px)" : "none",
        color: "var(--paper)",
        transition:
          "background 0.35s var(--ease), backdrop-filter 0.35s var(--ease)",
      }}
    >
      {/* Logo */}
      <a
        href="#"
        aria-label="TimeLabs — voltar ao topo"
        style={{
          fontFamily: "var(--font-mono)",
          fontWeight: 700,
          fontSize: 13,
          letterSpacing: 3,
          color: "var(--paper)",
          textDecoration: "none",
        }}
      >
        TIMELABS
      </a>

      {/* Desktop nav */}
      <nav
        aria-label="Navegação principal"
        style={{
          display: "flex",
          alignItems: "center",
          gap: "var(--sp-4)",
        }}
        className="header-desktop-nav"
      >
        {NAV_LINKS.map((link) => (
          <a
            key={link.href}
            href={link.href}
            onClick={(e) => handleNavClick(e, link.href)}
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 11,
              letterSpacing: 2,
              textTransform: "uppercase",
              textDecoration: "none",
              color: link.accent ? "var(--mercury)" : "var(--paper)",
              opacity: link.accent ? 1 : 0.82,
              transition: "color 0.25s var(--ease), opacity 0.25s var(--ease)",
            }}
            onMouseEnter={(e) => {
              if (!link.accent) {
                e.currentTarget.style.opacity = "1";
                e.currentTarget.style.color = "var(--mercury)";
              }
            }}
            onMouseLeave={(e) => {
              if (!link.accent) {
                e.currentTarget.style.opacity = "0.82";
                e.currentTarget.style.color = "var(--paper)";
              }
            }}
          >
            {link.label}
          </a>
        ))}
      </nav>

      {/* Right side: ThemeToggle + Hamburger */}
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <ThemeToggle />

        {/* Hamburger — mobile only */}
        <button
          className="header-hamburger"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
          style={{
            display: "none",
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: 14,
          }}
        >
          <svg
            width="22"
            height="16"
            viewBox="0 0 22 16"
            fill="none"
            aria-hidden="true"
          >
            <motion.line
              x1="0"
              y1="1"
              x2="22"
              y2="1"
              stroke="var(--paper)"
              strokeWidth="1.5"
              animate={menuOpen ? { rotate: 45, y: 7, x: 0 } : { rotate: 0, y: 0, x: 0 }}
              style={{ transformOrigin: "center" }}
              transition={{ duration: 0.3 }}
            />
            <motion.line
              x1="0"
              y1="8"
              x2="22"
              y2="8"
              stroke="var(--paper)"
              strokeWidth="1.5"
              animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
              transition={{ duration: 0.2 }}
            />
            <motion.line
              x1="0"
              y1="15"
              x2="22"
              y2="15"
              stroke="var(--paper)"
              strokeWidth="1.5"
              animate={menuOpen ? { rotate: -45, y: -7, x: 0 } : { rotate: 0, y: 0, x: 0 }}
              style={{ transformOrigin: "center" }}
              transition={{ duration: 0.3 }}
            />
          </svg>
        </button>
      </div>

      {/* Mobile overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            aria-label="Menu de navegação mobile"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 0.61, 0.36, 1] }}
            style={{
              position: "fixed",
              inset: 0,
              top: 50,
              background: "var(--ink)",
              zIndex: 99,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: "var(--sp-5)",
            }}
          >
            {NAV_LINKS.map((link, i) => (
              <motion.a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{
                  duration: 0.35,
                  delay: i * 0.06,
                  ease: [0.22, 0.61, 0.36, 1],
                }}
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(32px, 6vw, 48px)",
                  textDecoration: "none",
                  color: link.accent ? "var(--mercury)" : "var(--paper)",
                }}
              >
                {link.label}
              </motion.a>
            ))}
          </motion.nav>
        )}
      </AnimatePresence>

      {/* Responsive styles */}
      <style jsx>{`
        @media (max-width: 639px) {
          .header-desktop-nav {
            display: none !important;
          }
          .header-hamburger {
            display: block !important;
          }
        }
      `}</style>
    </header>
  );
}
