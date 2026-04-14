# TimeLabs — Sistema "Codex Operandi"

Filosofia completa em `../../docs/design-philosophy.md`.

**Tese:** TimeLabs nao eh mais um SaaS — eh uma instituicao de conhecimento.
A identidade funde iluminura medieval + blueprint tecnico + Swiss minimal.
Cada peca parece lavrada por um tipografo que passou semanas calibrando.

## Artefatos finais

Cada SVG exportado para PNG 1600px com fontes reais renderizadas (Gloock,
IBM Plex Serif, IBM Plex Mono, Instrument Serif — todas instaladas em
`~/.fonts/timelabs/`).

### A — Selo Alquimico `A-selo-alquimico.{svg,png}`
Insignia circular com texto orbital top+bot ("TIMELABS · CODEX OPERANDI"
e "A ALQUIMIA DO TEMPO · MMXXVI"), 6 glifos customizados nos vertices
do hex (transmutar, integrar, otimizar, analisar, ciclar, registrar),
hex central como reator com gota de mercurio + monograma TL em Gloock.
Textura de papel aplicada via filter. Wordmark TIMELABS abaixo.

**Uso:** assinatura de propostas, footer de site, favicon-como-selo,
carimbo em materiais institucionais. Projeta autoridade.

### B — Wordmark Sigilo `B-wordmark-sigilo.{svg,png}`
Wordmark principal. "timelabs" em Gloock/IBM Plex Serif lowercase, com
ponto do "i" substituido por micro-hexagono amarelo (detalhe alquimico).
Tagline em italico Instrument Serif. Sigilo nested (circulo+hex+mercurio)
no canto direito. Metadata catalogados em mono rodape. Moldura dupla fina.

**Uso:** cabecalho de site, documentos, apresentacoes. Wordmark canonico.

### C — Blueprint Cotado `C-blueprint-cotado.{svg,png}`
Logo como prancha de engenheiro: hex com cotas (R=120, h=208, 60°),
diagonais de construcao tracejadas, header tecnico preto com titulo
+ revisao, rodape com metadados (escala, material, folha). TL inscrito
no hex + gota de mercurio. Grid blueprint sutil no fundo.

**Uso:** cover de whitepaper tecnico, abertura de slides de produto,
separadores de secao em documentacao. Storytelling "engenharia precisa".

### D — Capitular Codex `D-capitular-codex.{svg,png}`
Abertura estilo manuscrito iluminado. T gigante serif num bloco bordado,
hexagonos miudos como iluminura ao redor, hex dourado destacado no canto.
"ime labs" continuando em serif + tagline italic + metadata mono.

**Uso:** abertura de propostas premium, capa editorial, convites,
materiais impressos. Posiciona como instituicao literaria.

## Como usar como sistema

| Contexto | Peca |
|----------|------|
| Site header, cabecalhos padrao | **B** |
| Assinatura de documentos, footer, favicon | **A** |
| Material tecnico (whitepaper, specs) | **C** |
| Propostas premium, capas editoriais | **D** |

Juntos, formam uma **linguagem** — nao um logo. Todas compartilham
paleta (#EFE9DA papel / #2B2520 tinta / #E0B03A mercurio), fontes e
motifs (hex, mercurio, catalogacao), mas cada uma ocupa um registro
comunicacional distinto.

## Preview consolidado
`ZZ-sistema-preview.png` — as 4 pecas em grid 2x2.

## Arquivos-fonte
- SVGs sao editaveis. Abra em Inkscape/Figma/VS Code para iterar.
- Fontes em `~/.fonts/timelabs/` (Gloock, IBM Plex Serif/Mono, Instrument Serif).
- Script `../../scripts/gen-orbital.py` gera texto em arco (workaround
  pro rsvg-convert nao renderizar textPath).

## Iteracoes descartadas (historico)
- V1 (`../logo-v1/`): wordmark + hex ingenuo
- V2 (`../logo-v2/`): letras construidas com arestas de hex — feedback
  do Enzo: "100% eficacia, 0% criatividade"
- V3 (este): recomeco com filosofia Codex Operandi
