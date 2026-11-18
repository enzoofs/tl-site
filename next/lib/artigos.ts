// Lista dos artigos do blog (a ordem aqui é a ordem na página /blog, do mais novo ao mais antigo).
// O texto de cada artigo fica na própria página em app/blog/<slug>/page.tsx.

export type Artigo = {
  slug: string;
  titulo: string;
  descricao: string;
  /** AAAA-MM-DD */
  data: string;
  autor: string;
};

export const ARTIGOS: Artigo[] = [
  {
    slug: "testamos-a-nossa-empresa-no-chatgpt",
    titulo: "Testamos a nossa própria empresa no ChatGPT: apareceu em 0 de 12 respostas",
    descricao:
      "Fizemos com a TimeLabs o mesmo teste que fazemos para clientes. O resultado, o que descobrimos e o que estamos mudando.",
    data: "2026-11-19",
    autor: "Enzo Ferraz",
  },
  {
    slug: "chatgpt-confunde-empresas-com-nome-parecido",
    titulo: "Por que o ChatGPT confunde a sua empresa com outra de nome parecido",
    descricao:
      "Quando perguntamos direto pela TimeLabs, a IA falou de outra empresa em 3 de 4 respostas. Por que isso acontece e como reduzir o problema.",
    data: "2026-11-19",
    autor: "Enzo Ferraz",
  },
];
