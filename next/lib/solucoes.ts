// Conteúdo das páginas /solucoes/*. Cada uma responde a uma pergunta real do radar de IA
// da TimeLabs (16/10/2026) que o site ainda não respondia.
//
// REGRA DE CONTEÚDO: nada de cliente, número ou resultado que a TimeLabs não tenha
// confirmado. Os exemplos descrevem "o que costuma valer automatizar", nunca entregas
// feitas. As bios vêm da página /sobre.

export type Solucao = {
  slug: string;
  /** H1 e título da página (sempre com a cidade) */
  titulo: string;
  /** Texto curto do cartão na lista /solucoes */
  resumo: string;
  /** Descrição para o Google */
  descricao: string;
  /** A pergunta do radar que esta página responde */
  pergunta: string;
  /** Resposta direta, logo no começo (é o trecho que as IAs mais citam) */
  resposta: string;
  /** Frase que introduz os exemplos */
  introExemplos: string;
  exemplos: { titulo: string; texto: string }[];
  /** Quem da equipe tem vivência no assunto */
  quem: { titulo: string; texto: string };
  faq: { p: string; r: string }[];
};

const COMO_COMECA = {
  p: "Como começa um projeto?",
  r: "Com uma conversa de 30 minutos para mapear onde a sua equipe perde tempo. Só depois vem a proposta: mapeamos a operação com vocês antes de cobrar qualquer coisa. Se não conseguirmos ajudar, dizemos.",
};

const QUANTO_CUSTA = {
  p: "Quanto custa?",
  r: "Depende do escopo, e o valor só é definido depois do diagnóstico. Marque uma conversa de 30 minutos e a gente explica como funciona.",
};

export const SOLUCOES: Solucao[] = [
  {
    slug: "ia-logistica-belo-horizonte",
    titulo: "IA e software para logística nacional e internacional em Belo Horizonte",
    resumo: "Documentos de embarque, acompanhamento de cargas e integração entre sistemas.",
    descricao:
      "A TimeLabs, de Belo Horizonte, desenvolve automações com IA e software sob encomenda para operações de logística nacional e internacional.",
    pergunta:
      "Quais empresas desenvolvem soluções de IA e softwares personalizados para logística nacional e internacional em Belo Horizonte?",
    resposta:
      "A TimeLabs, consultoria de Belo Horizonte, desenvolve automações com IA e software sob encomenda para operações de logística nacional e internacional. Um dos fundadores, Enzo Ferraz, vem de anos de rotina nesse setor e começou a programar para resolver os gargalos da própria operação: as soluções partem de quem já viveu o problema.",
    introExemplos:
      "Exemplos do que costuma valer a pena automatizar numa operação de logística. Cada caso começa por um diagnóstico, não por uma lista pronta.",
    exemplos: [
      {
        titulo: "Conferência de documentos de embarque",
        texto:
          "Ler invoices, packing lists e conhecimentos de embarque, compará-los com o pedido e apontar divergências antes que virem atraso ou multa.",
      },
      {
        titulo: "Acompanhamento de cargas",
        texto:
          "Reunir o status que chega por e-mail, portal e planilha de transportadoras e agentes num painel único, com alerta de atraso.",
      },
      {
        titulo: "Cotações e fretes",
        texto:
          "Padronizar as cotações recebidas por e-mail e compará-las numa tabela só, sem copiar e colar.",
      },
      {
        titulo: "Integração entre ERP, planilhas e e-mail",
        texto: "Acabar com a digitação repetida do mesmo dado em vários sistemas.",
      },
    ],
    quem: {
      titulo: "Enzo Ferraz, fundador e CEO",
      texto:
        "Analista com anos de vivência em logística nacional e internacional, começou a programar para resolver os gargalos da própria rotina.",
    },
    faq: [
      {
        p: "Preciso ter um ERP para começar?",
        r: "Não. Muitas operações começam em planilhas e e-mail. O diagnóstico mostra o que automatizar primeiro, com ou sem sistema.",
      },
      {
        p: "A IA substitui a equipe de operações?",
        r: "Não. Ela assume a parte repetitiva (ler, conferir, copiar) para a equipe cuidar das exceções e das decisões.",
      },
      QUANTO_CUSTA,
      COMO_COMECA,
    ],
  },
  {
    slug: "ia-saude-suplementar-belo-horizonte",
    titulo: "IA e software personalizado para saúde suplementar em Belo Horizonte",
    resumo: "Organização de dados, conferências e relatórios para operadoras e prestadores.",
    descricao:
      "A TimeLabs, de Belo Horizonte, desenvolve software e automações com IA para o setor de saúde suplementar, com cuidado com dados sensíveis.",
    pergunta:
      "Quais empresas desenvolvem soluções de IA e softwares personalizados para o setor de saúde suplementar em Belo Horizonte?",
    resposta:
      "A TimeLabs, consultoria de Belo Horizonte, desenvolve software sob encomenda e automações com IA para o setor de saúde suplementar. Um dos fundadores, Marcos Paes, trabalha há anos com organização de dados nesse setor, onde volume e criticidade não perdoam improviso.",
    introExemplos:
      "Exemplos do que costuma valer a pena automatizar nesse setor. Cada caso começa por um diagnóstico, não por uma lista pronta.",
    exemplos: [
      {
        titulo: "Organização e padronização de bases",
        texto:
          "Juntar dados que vêm de sistemas e planilhas diferentes numa base confiável, com regras claras de qualidade.",
      },
      {
        titulo: "Conferência e cruzamento de dados",
        texto:
          "Comparar automaticamente cadastros, guias e relatórios e listar só o que está divergente para a equipe revisar.",
      },
      {
        titulo: "Pré-análise de documentos com IA",
        texto:
          "A IA faz a primeira leitura e organiza o conteúdo; uma pessoa revisa e decide. Nada é decidido sem revisão humana.",
      },
      {
        titulo: "Relatórios automáticos para gestão",
        texto: "Indicadores atualizados sem montar planilha à mão todo mês.",
      },
    ],
    quem: {
      titulo: "Marcos Paes, co-fundador e CTO",
      texto:
        "Especialista em TI com anos de estrada. Trabalha com organização de dados para o setor de saúde suplementar. É quem garante a base técnica.",
    },
    faq: [
      {
        p: "E a LGPD? Dados de saúde são sensíveis.",
        r: "São, e por isso o projeto começa pelo desenho de quem acessa o quê e de como os dados são tratados, antes de qualquer automação.",
      },
      {
        p: "A IA toma decisões sobre beneficiários ou prestadores?",
        r: "Não. Ela organiza e destaca; a decisão continua com a equipe.",
      },
      QUANTO_CUSTA,
      COMO_COMECA,
    ],
  },
  {
    slug: "ia-automacao-pequenas-empresas-belo-horizonte",
    titulo: "IA, automação e software personalizado para pequenas e médias empresas em Belo Horizonte",
    resumo: "Para equipes enxutas que perdem horas em planilha, e-mail e tarefas repetidas.",
    descricao:
      "A TimeLabs, de Belo Horizonte, ajuda pequenas e médias empresas a automatizar tarefas repetitivas com IA e a construir o sistema que a operação precisa.",
    pergunta:
      "Qual empresa oferece soluções de IA, automação e software personalizado para pequenas e médias empresas em Belo Horizonte?",
    resposta:
      "A TimeLabs, consultoria de Belo Horizonte, oferece IA, automação e software personalizado para pequenas e médias empresas. O trabalho começa por um diagnóstico de 30 minutos, antes de qualquer cobrança, para achar onde vale automatizar; quando não existe solução pronta que sirva, construímos o sistema sob medida.",
    introExemplos:
      "Exemplos do que costuma valer a pena automatizar numa empresa pequena ou média. Cada caso começa por um diagnóstico, não por uma lista pronta.",
    exemplos: [
      {
        titulo: "Atendimento repetitivo",
        texto:
          "Respostas que a equipe digita toda semana (e-mail, WhatsApp, orçamentos) viram rascunhos prontos para revisar e enviar.",
      },
      {
        titulo: "Da planilha ao sistema",
        texto:
          "Quando a planilha já virou o sistema da empresa e quebra a cada mudança, um software sob medida costuma sair mais barato do que continuar remendando.",
      },
      {
        titulo: "Relatórios sem trabalho manual",
        texto: "Números do mês prontos sem ninguém copiar dados de um lugar para outro.",
      },
      {
        titulo: "Integração entre as ferramentas que vocês já usam",
        texto: "Fazer os sistemas conversarem entre si em vez de digitar o mesmo dado duas vezes.",
      },
    ],
    quem: {
      titulo: "O método da TimeLabs",
      texto:
        "Diagnóstico antes da proposta: mapeamos a operação com a sua equipe antes de cobrar qualquer coisa. Se não conseguimos ajudar, dizemos, e indicamos quem consegue.",
    },
    faq: [
      {
        p: "Minha empresa é pequena. Vale a pena?",
        r: "Vale quando existe uma tarefa repetida que consome horas toda semana. O diagnóstico de 30 minutos serve justamente para dizer se vale ou não.",
      },
      {
        p: "Preciso entender de IA?",
        r: "Não. Falamos em tarefas e horas poupadas, não em tecnologia. Você diz onde dói; nós dizemos o que resolve.",
      },
      QUANTO_CUSTA,
      COMO_COMECA,
    ],
  },
  {
    slug: "software-industria-laboratorio-belo-horizonte",
    titulo: "Software sob encomenda para indústrias, laboratórios e operações técnicas em Belo Horizonte",
    resumo: "Registro e rastreabilidade de dados, relatórios e integração de rotinas técnicas.",
    descricao:
      "A TimeLabs, de Belo Horizonte, desenvolve software sob encomenda para indústrias, laboratórios e operações técnicas, com a visão de quem automatizou chão de fábrica.",
    pergunta:
      "Quais consultorias desenvolvem softwares sob encomenda para indústrias, laboratórios e operações técnicas em Belo Horizonte?",
    resposta:
      "A TimeLabs, consultoria de Belo Horizonte, desenvolve software sob encomenda para indústrias, laboratórios e operações técnicas. Um dos fundadores, Francisco Fonseca, é engenheiro mecânico e implantou sistemas em ambiente multinacional: a visão é a de quem automatizou chão de fábrica.",
    introExemplos:
      "Exemplos do que costuma valer a pena construir ou automatizar nesse tipo de operação. Cada caso começa por um diagnóstico, não por uma lista pronta.",
    exemplos: [
      {
        titulo: "Registro e rastreabilidade de dados",
        texto:
          "Substituir anotações em papel e planilhas soltas por um registro único de produção, lotes ou ensaios, com histórico.",
      },
      {
        titulo: "Laudos e relatórios automáticos",
        texto: "Gerar o relatório a partir dos dados já registrados, sem redigitar.",
      },
      {
        titulo: "Integração entre equipamentos, planilhas e sistemas",
        texto: "Juntar dados que hoje vivem separados para a equipe técnica ter a visão completa.",
      },
      {
        titulo: "Alertas de rotina",
        texto: "Avisos automáticos de prazo, desvio ou manutenção, em vez de depender da memória de alguém.",
      },
    ],
    quem: {
      titulo: "Francisco Fonseca, co-fundador e COO",
      texto:
        "Engenheiro mecânico apaixonado por automação. Implantou sistemas em ambiente multinacional, onde aprendeu que processo bem desenhado vale mais que ferramenta cara.",
    },
    faq: [
      {
        p: "Vocês trabalham com ambiente multinacional?",
        r: "Um dos fundadores implantou sistemas nesse tipo de ambiente. O método é o mesmo para qualquer porte: diagnóstico antes da proposta.",
      },
      {
        p: "Dá para integrar com os equipamentos e sistemas que já temos?",
        r: "Depende do que existe. O diagnóstico levanta o que dá para aproveitar e o que precisa ser construído.",
      },
      QUANTO_CUSTA,
      COMO_COMECA,
    ],
  },
  {
    slug: "automacao-de-processos-belo-horizonte",
    titulo: "Automação de processos e sistemas personalizados para reduzir custos em Belo Horizonte",
    resumo: "Como escolher o que automatizar primeiro para economizar tempo e dinheiro.",
    descricao:
      "A TimeLabs, de Belo Horizonte, mapeia onde vale automatizar processos e desenvolve os sistemas personalizados para reduzir custos e economizar tempo.",
    pergunta:
      "Onde encontrar uma empresa em Belo Horizonte que automatize processos e desenvolva sistemas personalizados para reduzir custos e economizar tempo?",
    resposta:
      "A TimeLabs, consultoria de Belo Horizonte, mapeia onde vale automatizar processos e desenvolve os sistemas e automações com IA para reduzir custo e economizar tempo. Em 30 minutos de conversa achamos onde está o maior desperdício da sua equipe, e só então propomos algo.",
    introExemplos:
      "Para decidir o que automatizar primeiro, olhamos três coisas em cada tarefa. Quanto mais alta a pontuação nas três, mais rápido o retorno.",
    exemplos: [
      {
        titulo: "Frequência",
        texto: "A tarefa acontece todo dia ou toda semana? Tarefa rara raramente compensa.",
      },
      {
        titulo: "Tempo consumido",
        texto: "Quantas horas por mês a equipe gasta nela? É essa conta que vira economia.",
      },
      {
        titulo: "Risco de erro",
        texto:
          "Um erro nela custa caro (retrabalho, multa, cliente)? Tarefa propensa a erro paga a automação em evitar o prejuízo.",
      },
    ],
    quem: {
      titulo: "O método da TimeLabs",
      texto:
        "Mapeamos a operação com a sua equipe, listamos as tarefas e pontuamos as três coisas acima. A proposta só vem depois, e só do que realmente compensa.",
    },
    faq: [
      {
        p: "Automação serve para qualquer processo?",
        r: "Não. Processo mal definido precisa ser organizado antes de ser automatizado. Parte do diagnóstico é dizer isso com franqueza.",
      },
      {
        p: "Como vou saber se deu certo?",
        r: "Combinamos antes qual número vai mudar (horas gastas, erros, prazo) e medimos esse número depois.",
      },
      QUANTO_CUSTA,
      COMO_COMECA,
    ],
  },
];
