import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Hero } from "@/components/sections/hero";
import { Problema } from "@/components/sections/problema";
import { Operacoes } from "@/components/sections/operacoes";
import { Metodo } from "@/components/sections/metodo";
import { Resultados } from "@/components/sections/resultados";
import { Integracoes } from "@/components/sections/integracoes";
import { CtaFinal } from "@/components/sections/cta-final";
import Halo from "@/components/ui/halo";

export default function Home() {
  return (
    <>
      <a href="#hero" className="skip-link">
        Pular para o conteúdo
      </a>
      <Halo />
      <Header />
      <main id="main-content" className="pt-[50px]">
        <Hero />
        <Problema />
        <Operacoes />
        <Metodo />
        <Resultados />
        <Integracoes />
        <CtaFinal />
      </main>
      <Footer />
    </>
  );
}
