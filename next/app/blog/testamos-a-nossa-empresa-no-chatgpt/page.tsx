import { ArtigoLayout, metadataDoArtigo } from "@/components/blog/artigo-layout";

const SLUG = "testamos-a-nossa-empresa-no-chatgpt";

export const metadata = metadataDoArtigo(SLUG);

// Todos os números abaixo vêm do radar da TimeLabs de 16/10/2026 (dados reais).
export default function Page() {
  return (
    <ArtigoLayout slug={SLUG}>
      <p>
        Quem vende medição de visibilidade em IA deveria começar medindo a
        própria casa. Em outubro de 2026 fizemos exatamente isso: aplicamos na
        TimeLabs o mesmo teste que fazemos para os clientes do Grifo.
      </p>

      <h2 className="hl-gloock hl-mid">O teste</h2>
      <p>
        Escrevemos 8 perguntas que um cliente real faria sobre consultoria de
        IA e software sob encomenda em Belo Horizonte, como &ldquo;qual a melhor
        consultoria de IA e desenvolvimento de software sob encomenda em Belo
        Horizonte?&rdquo;. Fizemos cada pergunta ao ChatGPT (com busca na web)
        e ao resumo de IA do Google, em uma rodada por pergunta.
      </p>
      <p>
        Ao todo, 12 respostas foram válidas. As outras 4, do Google, falharam por
        um erro técnico do provedor de dados. É uma amostra pequena, de um único
        teste: serve como retrato, não como veredito.
      </p>

      <h2 className="hl-gloock hl-mid">O resultado</h2>
      <p>
        A TimeLabs apareceu em <strong>0 das 12 respostas</strong>.
      </p>
      <p>
        Duas leituras ajudam. A primeira: 61 empresas diferentes foram
        recomendadas nessas 12 respostas, e a mais citada apareceu em apenas 5
        delas. Nenhuma domina, então o mercado de Belo Horizonte está aberto. A
        segunda: nas perguntas de categoria, as IAs citam sobretudo sites de
        terceiros (listas e comparativos), e não o site da própria empresa.
      </p>

      <h2 className="hl-gloock hl-mid">Por que não aparecemos</h2>
      <p>
        O rastreamento do nosso site mostrou que, do lado técnico, estava tudo
        certo: os robôs das IAs conseguem acessar, o robots.txt libera, o
        sitemap está publicado e os dados estruturados existem. O problema era
        de conteúdo:
      </p>
      <ul>
        <li>Não havia blog, então as IAs não tinham texto nosso para citar.</li>
        <li>
          5 das 8 perguntas não tinham nenhuma página no site que as
          respondesse (logística, saúde suplementar, pequenas empresas, indústria
          e laboratórios, redução de custos).
        </li>
        <li>
          A página inicial não trazia a cidade no título, e as perguntas todas
          falavam de Belo Horizonte.
        </li>
      </ul>

      <h2 className="hl-gloock hl-mid">O que estamos mudando</h2>
      <p>
        Transformamos o plano de ações do radar em tarefas do próprio site: uma
        página para cada pergunta sem resposta, este blog, a cidade no título da
        página inicial e perguntas frequentes com dados estruturados. Fora do
        site, vêm o cadastro no Bing Webmaster Tools (a busca do ChatGPT usa
        principalmente o índice do Bing), o perfil no Google e a presença em
        listas de terceiros.
      </p>
      <p>
        A ideia é repetir o teste depois que essas mudanças estiverem no ar, com
        as mesmas perguntas, e comparar. Se o resultado for ruim, também
        contamos.
      </p>
    </ArtigoLayout>
  );
}
