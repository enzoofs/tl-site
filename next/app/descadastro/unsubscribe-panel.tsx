"use client";

import { useState } from "react";

type Status = "idle" | "loading" | "success" | "error";

export function UnsubscribePanel({ email, token }: { email: string; token: string }) {
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  if (!email || !token) {
    return (
      <p className="unsub-error">
        Este link está incompleto. Use o link exatamente como veio no
        e-mail, ou responda o e-mail pedindo pra ser removido da lista.
      </p>
    );
  }

  if (status === "success") {
    return (
      <p className="unsub-success">
        Prontinho — <strong>{email}</strong> não recebe mais e-mails de
        prospecção da TimeLabs.
      </p>
    );
  }

  async function handleUnsubscribe() {
    setStatus("loading");
    try {
      const res = await fetch("/api/unsubscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, token }),
      });
      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        setStatus("error");
        setMessage(
          data.error === "invalid_token"
            ? "Este link não é válido — pode ter sido copiado errado. Responda o e-mail original pedindo pra ser removido da lista."
            : "Algo deu errado do nosso lado. Tenta de novo em alguns minutos, ou responde o e-mail pedindo pra ser removido."
        );
        return;
      }

      setStatus("success");
    } catch {
      setStatus("error");
      setMessage("Não conseguimos conectar agora. Tenta de novo em alguns minutos.");
    }
  }

  return (
    <div className="unsub-panel">
      <p className="unsub-email">{email}</p>
      {status === "error" && <p className="unsub-error">{message}</p>}
      <button
        type="button"
        className="unsub-btn"
        onClick={handleUnsubscribe}
        disabled={status === "loading"}
      >
        {status === "loading" ? "Descadastrando…" : "Confirmar descadastro"}
      </button>
    </div>
  );
}
