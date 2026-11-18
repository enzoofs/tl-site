import { SolucaoPage, metadataDaSolucao } from "@/components/solucoes/solucao-page";

const SLUG = "ia-automacao-pequenas-empresas-belo-horizonte";

export const metadata = metadataDaSolucao(SLUG);

export default function Page() {
  return <SolucaoPage slug={SLUG} />;
}
