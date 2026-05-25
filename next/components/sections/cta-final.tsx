"use client";

import { FormEvent, useState } from "react";
import { motion } from "framer-motion";
import Button from "@/components/ui/button";
import HexMesh from "@/components/ui/hex-mesh";

type Status = "idle" | "loading" | "success" | "error";

const FALLBACK_EMAIL = "contato@timelabs.com.br";

export function CtaFinal() {
  const [email, setEmail] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!email.trim() || status === "loading") return;

    setStatus("loading");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), honeypot }),
      });

      if (res.ok) {
        setStatus("success");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  const mailtoHref = `mailto:${FALLBACK_EMAIL}?subject=${encodeURIComponent(
    "Quero conversar com a TimeLabs",
  )}&body=${encodeURIComponent(
    email.trim() ? `Olá, meu e-mail é ${email.trim()}.\n\n` : "",
  )}`;

  return (
    <section
      id="agendar"
      data-hex-density="0.12"
      style={{
        background: "var(--ink)",
        color: "var(--paper)",
        padding: "var(--sp-7) var(--sp-5)",
        position: "relative",
        isolation: "isolate",
        overflow: "hidden",
      }}
    >
      <HexMesh variant="dark" />
      {/* Radial gold glow */}
      <motion.div
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          width: 600,
          height: 400,
          transform: "translate(-50%, -60%)",
          background:
            "radial-gradient(circle, rgba(224,176,58,0.15), transparent 60%)",
          pointerEvents: "none",
          zIndex: 0,
        }}
        aria-hidden="true"
      />

      <div
        style={{
          maxWidth: 720,
          margin: "0 auto",
          position: "relative",
          zIndex: 1,
          textAlign: "center",
        }}
      >
        <p className="eyebrow eyebrow-gold">Próximo passo</p>
        <h2 className="hl-gloock hl-paper hl-big">Vamos conversar?</h2>
        <p className="hl-italic hl-gold" style={{ textAlign: "center" }}>
          30 minutos, gratuito, sem compromisso.
        </p>
        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: 18,
            lineHeight: 1.65,
            color: "var(--paper-soft)",
            margin: "0 0 var(--sp-5)",
            maxWidth: 560,
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          Conte seu cenário. Dizemos se conseguimos ajudar — e, se não,
          indicamos quem consegue.
        </p>

        {status === "success" ? (
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 0.61, 0.36, 1] }}
            style={{
              fontFamily: "var(--font-italic)",
              fontStyle: "italic",
              fontSize: 20,
              color: "var(--mercury)",
            }}
          >
            Recebido. Respondemos em até um dia útil.
          </motion.p>
        ) : status === "error" ? (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 0.61, 0.36, 1] }}
            style={{
              fontFamily: "var(--font-body)",
              fontSize: 17,
              lineHeight: 1.55,
              color: "var(--paper)",
            }}
          >
            <p style={{ margin: "0 0 var(--sp-2)" }}>
              Não conseguimos receber agora — escreva direto pra gente?
            </p>
            <a
              href={mailtoHref}
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 14,
                letterSpacing: 1.5,
                color: "var(--mercury)",
                textDecoration: "underline",
                textUnderlineOffset: 4,
              }}
            >
              {FALLBACK_EMAIL}
            </a>
          </motion.div>
        ) : (
          <form
            onSubmit={handleSubmit}
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "var(--sp-2)",
              justifyContent: "center",
              alignItems: "flex-end",
            }}
          >
            <label htmlFor="cta-email" className="sr-only">
              Seu e-mail
            </label>
            <input
              id="cta-email"
              type="email"
              required
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="seu@email.com"
              disabled={status === "loading"}
              style={{
                flex: "1 1 280px",
                maxWidth: 400,
                background: "transparent",
                border: "none",
                borderBottom: "1px solid var(--paper)",
                fontFamily: "var(--font-body)",
                fontSize: 18,
                color: "var(--paper)",
                padding: "12px 0",
                outline: "none",
                transition: "border-color 0.25s var(--ease)",
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderBottomColor = "var(--mercury)";
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderBottomColor = "var(--paper)";
              }}
            />
            {/* Honeypot — invisible to humans, magnet for bots. */}
            <input
              type="text"
              name="company"
              tabIndex={-1}
              autoComplete="off"
              value={honeypot}
              onChange={(e) => setHoneypot(e.target.value)}
              aria-hidden="true"
              style={{
                position: "absolute",
                left: "-9999px",
                width: 1,
                height: 1,
                opacity: 0,
                pointerEvents: "none",
              }}
            />
            <Button
              variant="mercury"
              type="submit"
              disabled={status === "loading"}
            >
              {status === "loading" ? "Enviando…" : "Agendar conversa"}
            </Button>
          </form>
        )}

        {status === "idle" || status === "loading" ? (
          <p
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 12,
              letterSpacing: 1.5,
              color: "var(--paper-soft)",
              marginTop: "var(--sp-2)",
              opacity: 0.85,
            }}
          >
            Respondemos em até um dia útil pra marcar.
          </p>
        ) : null}
      </div>

      <style>{`
        @media (max-width: 639px) {
          #agendar form {
            flex-direction: column;
            align-items: stretch !important;
          }
          #agendar input {
            max-width: 100% !important;
            flex: 1 1 auto !important;
          }
        }
      `}</style>
    </section>
  );
}
