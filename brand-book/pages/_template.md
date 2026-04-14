# Template de pagina do Brand Book

## Dimensoes
- viewBox: `0 0 1600 1100` (16:11 landscape, seguro para A4 landscape + Letter + telas)
- Margens seguras: 90px

## Paleta
- Papel: `#EFE9DA`
- Tinta: `#2B2520`
- Tinta secundaria: `#6B6258`
- Mercurio (ouro): `#E0B03A`

## Fontes
- Serif display: `Gloock`
- Serif body: `IBM Plex Serif`
- Italic editorial: `Instrument Serif`
- Mono tecnica: `IBM Plex Mono`

## Grid de cabecalho/rodape (todas paginas seguem)
- Header top Y=50: "TIMELABS · CODEX OPERANDI" (esq, mono 11pt, letter-spacing 4)
- Header top Y=50 (dir): "FOLIO XX / YY" (mono 11pt)
- Linha fina Y=72 de x=90 a x=1510, stroke #2B2520 0.4

- Footer Y=1050 (esq): "timelabsbr.com" (mono 11pt)
- Footer Y=1050 (dir): numero da pagina romano (serif italic 14pt)
- Linha fina Y=1030 de x=90 a x=1510, stroke #2B2520 0.4

## Filter de papel (incluir em cada pagina)
```xml
<filter id="paper" x="0" y="0" width="100%" height="100%">
  <feTurbulence type="fractalNoise" baseFrequency="1.7" numOctaves="2" seed="{N}"/>
  <feColorMatrix values="0 0 0 0 0.14  0 0 0 0 0.11  0 0 0 0 0.08  0 0 0 0.05 0"/>
</filter>
```

## Paginas
1. Capa
2. Manifesto + Arquetipo
3. Logotipo principal (wordmark)
4. Selo institucional
5. Logo tecnico (blueprint)
6. Paleta de cores
7. Tipografia
8. Glifos operacionais
9. Motif + construcao hex
10. Colofon
