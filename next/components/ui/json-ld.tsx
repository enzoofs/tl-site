// Injeta dados estruturados (schema.org) na página, para o Google e as IAs lerem.

export function JsonLd({ dados }: { dados: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      // Troca "<" para que um texto com "</script>" nunca feche a tag antes da hora.
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(dados).replace(/</g, "\\u003c"),
      }}
    />
  );
}
