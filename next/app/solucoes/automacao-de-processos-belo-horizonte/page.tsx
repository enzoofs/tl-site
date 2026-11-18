import { SolucaoPage, metadataDaSolucao } from "@/components/solucoes/solucao-page";

const SLUG = "automacao-de-processos-belo-horizonte";

export const metadata = metadataDaSolucao(SLUG);

export default function Page() {
  return <SolucaoPage slug={SLUG} />;
}
