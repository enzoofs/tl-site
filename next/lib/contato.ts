// Contatos e links usados em várias páginas (um lugar só para mudar).

const WHATSAPP_NUMERO = "5531995970472";

/** Link do WhatsApp com mensagem pronta. */
export function linkWhatsapp(mensagem: string): string {
  return `https://wa.me/${WHATSAPP_NUMERO}?text=${encodeURIComponent(mensagem)}`;
}

/** Agendamento de 30 minutos (seção de CTA da home). */
export const LINK_AGENDAR = "/#agendar";
