"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import Cal, { getCalApi } from "@calcom/embed-react";
import HexMesh from "@/components/ui/hex-mesh";

const CAL_LINK = "timelabs/30min";
const CAL_NAMESPACE = "agendar-30min";
const FALLBACK_EMAIL = "contato@timelabs.com.br";
const FALLBACK_WHATSAPP = "https://wa.me/5531995970472";

declare global {
  interface Window {
    plausible?: (
      event: string,
      options?: { props?: Record<string, string> },
    ) => void;
  }
}

export function CtaFinal() {
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const cal = await getCalApi({ namespace: CAL_NAMESPACE });
        if (cancelled) return;

        cal("ui", {
          hideEventTypeDetails: false,
          layout: "month_view",
          theme: "dark",
          cssVarsPerTheme: {
            light: {
              "cal-bg": "#2B2520",
              "cal-bg-emphasis": "#332c25",
              "cal-brand": "#E0B03A",
            },
            dark: {
              "cal-bg": "#2B2520",
              "cal-bg-emphasis": "#332c25",
              "cal-brand": "#E0B03A",
            },
          },
        });

        cal("on", {
          action: "bookingSuccessfulV2",
          callback: () => {
            window.plausible?.("Booking Confirmed");
          },
        });
      } catch {
        // Cal embed handles its own loading/error visuals; fallback contacts
        // below the embed stay always visible as a safety net.
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

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
          maxWidth: 880,
          margin: "0 auto",
          position: "relative",
          zIndex: 1,
          textAlign: "center",
        }}
      >
        <p className="eyebrow eyebrow-gold">Próximo passo</p>
        <h2 className="hl-gloock hl-paper hl-big">Vamos conversar?</h2>
        <p className="hl-italic hl-gold" style={{ textAlign: "center" }}>
          30 minutos. Sem compromisso.
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
          Você conta como o trabalho acontece. A gente sai com três frentes
          concretas pra automatizar — ou com a indicação de quem resolve
          melhor.
        </p>

        <div className="cal-shell">
          <Cal
            namespace={CAL_NAMESPACE}
            calLink={CAL_LINK}
            style={{ width: "100%", height: "100%", overflow: "scroll" }}
            config={{ layout: "month_view", theme: "dark" }}
          />
        </div>

        <p className="cal-secondary-fallback">
          Prefere outro canal?{" "}
          <a href={`mailto:${FALLBACK_EMAIL}`}>{FALLBACK_EMAIL}</a>
          {" · "}
          <a href={FALLBACK_WHATSAPP} target="_blank" rel="noopener noreferrer">
            WhatsApp
          </a>
        </p>
      </div>

      <style>{`
        .cal-shell {
          position: relative;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(224, 176, 58, 0.12);
          border-radius: 12px;
          padding: 8px;
          min-height: 640px;
          overflow: hidden;
        }
        .cal-secondary-fallback {
          font-family: var(--font-mono);
          font-size: 12px;
          letter-spacing: 1.5px;
          color: var(--paper-soft);
          margin-top: var(--sp-3);
          opacity: 0.85;
        }
        .cal-secondary-fallback a {
          color: var(--mercury);
          text-decoration: none;
        }
        .cal-secondary-fallback a:hover {
          text-decoration: underline;
          text-underline-offset: 3px;
        }
        @media (max-width: 639px) {
          .cal-shell {
            min-height: 720px;
          }
        }
      `}</style>
    </section>
  );
}
