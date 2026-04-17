"use client";

import { FormEvent, useState } from "react";
import { motion } from "framer-motion";
import Button from "@/components/ui/button";
import HexMesh from "@/components/ui/hex-mesh";

export function CtaFinal() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    /* In production this would POST to an API. For now, show success. */
    setSubmitted(true);
  };

  return (
    <section
      id="agendar"
      data-hex-density="0.12"
      style={{
        background: "var(--ink)",
        color: "var(--paper)",
        padding: "var(--sp-8) var(--sp-5)",
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
            color: "var(--paper)",
            opacity: 0.85,
            margin: "0 0 var(--sp-5)",
            maxWidth: 560,
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          Conte seu cenário. Dizemos se conseguimos ajudar — e, se não,
          indicamos quem consegue.
        </p>

        {!submitted ? (
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="seu@email.com"
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
            <Button variant="mercury" type="submit">
              Agendar conversa
            </Button>
          </form>
        ) : (
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
        )}
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
