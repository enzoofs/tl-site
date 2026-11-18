import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { WhatsAppFloat } from "@/components/ui/whatsapp-float";

// Casca padrão das páginas internas: link de pular, menu, conteúdo, rodapé e WhatsApp.
export function Pagina({ children }: { children: React.ReactNode }) {
  return (
    <>
      <a href="#main-content" className="skip-link">
        Pular para o conteúdo
      </a>
      <Header />
      <main id="main-content" className="pt-[56px]">
        {children}
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  );
}
