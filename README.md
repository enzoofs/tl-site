# tl-site

Landing page institucional da **TimeLabs** — automação empresarial.

Single-page estática, sem build step, sem framework. Vanilla HTML + CSS + JS + SVGs.

## Rodar localmente

```bash
python3 -m http.server 8765
# abrir http://localhost:8765/
```

Ou qualquer outro servidor estático (nginx, Caddy, `npx serve`).

## Deploy

Pode ir direto pra qualquer host estático: Netlify, Vercel, Cloudflare Pages, GitHub Pages, S3.

Nenhum asset externo é requisitado em runtime — fontes, SVGs e JS são todos self-hosted.

## Estrutura

```
.
├── index.html              # 6 seções: hero, problema, operações, método, resultados, CTA+footer
├── css/
│   ├── tokens.css          # @font-face, paleta, spacing, dark mode
│   ├── typography.css      # escala editorial
│   ├── layout.css          # grids e responsivo
│   ├── components.css      # btn, stat-card, nav-pill, badge
│   └── animations.css      # hex mesh, halo, reveal
├── js/main.js              # hex mesh generator, dark toggle, halo mouse, reveal
├── fonts/                  # 8 TTFs (Gloock, Instrument Serif, IBM Plex Serif, IBM Plex Mono)
├── assets/
│   ├── selo.svg            # selo da marca (referência)
│   └── selo-hero.svg       # selo simplificado usado no hero
└── README.md
```

## Paleta

| Token | Hex |
|-------|-----|
| `--paper` | `#EFE9DA` |
| `--paper-alt` | `#FAF8F2` |
| `--ink` | `#2B2520` |
| `--ink-soft` | `#6B6258` |
| `--mercury` | `#E0B03A` |

Editar em `css/tokens.css`. Dark mode inverte papel/tinta preservando o dourado.

## Tipografia

- **Gloock** — display/títulos (didone alto contraste)
- **Instrument Serif Italic** — taglines
- **IBM Plex Serif** — body
- **IBM Plex Mono** — metadata, labels, badges

Todas self-hosted via `@font-face` com `font-display: swap`.

## Interações

- **Hex mesh** gerado via JS em cada seção: grid de hexágonos pointy-top, ~12% sombreados, ~10 células douradas conectadas por path que segue linhas retas/diagonais pelos centros do grid, pulso de luz percorrendo o caminho
- **Halo dourado** seguindo o cursor (mix-blend multiply)
- **Dark mode** toggle no header (persiste em `localStorage`)
- **Reveal** sutil ao scroll
- Tudo respeita `prefers-reduced-motion`

## Acessibilidade

- HTML semântico
- Contraste WCAG AA+
- `:focus-visible` com outline dourado
- `aria-hidden` em SVGs decorativos
- `prefers-reduced-motion` desliga pulsos e breathe

## Responsivo

Breakpoints em 640 e 1024. Mobile-first. Wordmark escala com `clamp()`. Nav do header colapsa em mobile.

## TODO

- [ ] Converter TTFs pra WOFF2 (reduz ~70% do peso de fonte)
- [ ] Favicon com hex dourado
- [ ] OG image pra compartilhamento
- [ ] Form real: integrar com Cal.com / HubSpot / etc.
- [ ] Analytics (Plausible ou similar)
