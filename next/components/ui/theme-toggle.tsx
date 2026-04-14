"use client";

import { useCallback, useEffect, useState } from "react";

export default function ThemeToggle() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    setDark(document.documentElement.getAttribute("data-theme") === "dark");
  }, []);

  const toggle = useCallback(() => {
    const next = !dark;
    setDark(next);
    document.documentElement.setAttribute(
      "data-theme",
      next ? "dark" : "light"
    );
    if (!next) document.documentElement.removeAttribute("data-theme");
    localStorage.setItem("timelabs-theme", next ? "dark" : "light");
  }, [dark]);

  return (
    <button
      onClick={toggle}
      aria-label={dark ? "Ativar modo claro" : "Ativar modo escuro"}
      style={{ background: "none", border: "none", cursor: "pointer", padding: 8 }}
    >
      <svg
        width="22"
        height="24"
        viewBox="0 0 22 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        {/* Hexagon outline */}
        <path
          d="M11 0.577L21 6.35v11.3L11 23.423 1 17.65V6.35L11 0.577z"
          stroke="var(--mercury)"
          strokeWidth="1.4"
          fill="none"
        />
        {/* Sun / Moon icon centered inside hexagon */}
        {dark ? (
          /* Moon crescent */
          <path
            d="M13.5 8a5 5 0 1 0 0 8 4 4 0 0 1 0-8z"
            fill="var(--mercury)"
          />
        ) : (
          /* Sun */
          <g fill="var(--mercury)">
            <circle cx="11" cy="12" r="2.8" />
            <line x1="11" y1="6.5" x2="11" y2="7.8" stroke="var(--mercury)" strokeWidth="1.2" strokeLinecap="square" />
            <line x1="11" y1="16.2" x2="11" y2="17.5" stroke="var(--mercury)" strokeWidth="1.2" strokeLinecap="square" />
            <line x1="6.5" y1="12" x2="7.8" y2="12" stroke="var(--mercury)" strokeWidth="1.2" strokeLinecap="square" />
            <line x1="14.2" y1="12" x2="15.5" y2="12" stroke="var(--mercury)" strokeWidth="1.2" strokeLinecap="square" />
            <line x1="7.8" y1="8.8" x2="8.7" y2="9.7" stroke="var(--mercury)" strokeWidth="1.2" strokeLinecap="square" />
            <line x1="13.3" y1="14.3" x2="14.2" y2="15.2" stroke="var(--mercury)" strokeWidth="1.2" strokeLinecap="square" />
            <line x1="7.8" y1="15.2" x2="8.7" y2="14.3" stroke="var(--mercury)" strokeWidth="1.2" strokeLinecap="square" />
            <line x1="13.3" y1="9.7" x2="14.2" y2="8.8" stroke="var(--mercury)" strokeWidth="1.2" strokeLinecap="square" />
          </g>
        )}
      </svg>
    </button>
  );
}
