"use client";

import { useEffect, useState } from "react";

const WHATSAPP_NUMBER = "5531995970472";
const PREFILLED_MESSAGE =
  "Olá, vim pelo site da TimeLabs. Quero entender se faz sentido conversar.";

declare global {
  interface Window {
    plausible?: (event: string, options?: { props?: Record<string, string> }) => void;
  }
}

export function WhatsAppFloat() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 240);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    PREFILLED_MESSAGE,
  )}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Conversar pelo WhatsApp"
      onClick={() => window.plausible?.("WhatsApp Click")}
      className="whatsapp-float"
      data-visible={visible ? "true" : "false"}
    >
      <svg
        width="26"
        height="26"
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden="true"
      >
        {/* WhatsApp glyph — single-path version */}
        <path
          d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.967-.94 1.164-.173.198-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.611-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.371-.272.298-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.247-.694.247-1.289.173-1.413-.074-.124-.272-.198-.57-.347zM12.05 21.785h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.889-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.886 9.884zm8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"
          fill="currentColor"
        />
      </svg>

      <style>{`
        .whatsapp-float {
          position: fixed;
          bottom: 24px;
          right: 24px;
          width: 56px;
          height: 56px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--ink);
          color: var(--mercury);
          border: 1px solid rgba(224, 176, 58, 0.4);
          box-shadow:
            0 4px 16px rgba(0, 0, 0, 0.2),
            0 0 0 0 rgba(224, 176, 58, 0.0);
          z-index: 90;
          text-decoration: none;
          opacity: 0;
          transform: translateY(12px) scale(0.92);
          pointer-events: none;
          transition:
            opacity 0.35s var(--ease),
            transform 0.35s var(--ease),
            box-shadow 0.25s var(--ease),
            border-color 0.25s var(--ease);
        }
        .whatsapp-float[data-visible="true"] {
          opacity: 1;
          transform: translateY(0) scale(1);
          pointer-events: auto;
        }
        .whatsapp-float:hover {
          border-color: var(--mercury);
          box-shadow:
            0 6px 22px rgba(0, 0, 0, 0.28),
            0 0 0 4px rgba(224, 176, 58, 0.12);
        }
        .whatsapp-float:focus-visible {
          outline: 2px solid var(--mercury);
          outline-offset: 4px;
        }
        @media (max-width: 639px) {
          .whatsapp-float {
            bottom: 16px;
            right: 16px;
            width: 52px;
            height: 52px;
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .whatsapp-float {
            transition: opacity 0.01ms;
            transform: none;
          }
          .whatsapp-float[data-visible="true"] {
            transform: none;
          }
        }
      `}</style>
    </a>
  );
}
