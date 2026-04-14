# SETUP — continuando o site do zero

Guia pra quem vai editar ou expandir este site, incluindo as ferramentas de IA (MCPs) usadas durante a construção inicial.

---

## 1. Stack do projeto

- **HTML, CSS, JavaScript vanilla** — sem framework, sem build step
- **Python 3** — servidor local de desenvolvimento (qualquer servidor estático serve)
- **Git / GitHub** — versionamento
- **Claude Code** — agente de IA usado pra escrever/editar o código
- **MCPs (Model Context Protocol)** — integrações que o Claude Code usa pra gerar assets

Nenhum runtime JS no servidor. Tudo é servido como arquivo estático.

---

## 2. Ambiente de dev

### Requisitos

- Python 3.8+
- Git
- Navegador moderno (Firefox, Chrome, Edge recente)
- (opcional) Node.js 20+ se for adicionar build step depois

### Clonar e rodar

```bash
git clone https://github.com/enzoofs/tl-site.git
cd tl-site
python3 -m http.server 8765
```

Abrir http://localhost:8765/

Qualquer outro servidor estático funciona:
```bash
# alternativas
npx serve .
caddy file-server --listen :8765
php -S localhost:8765
```

### Estrutura

```
.
├── index.html              # markup das 6 secoes
├── css/                    # 5 arquivos modulares
│   ├── tokens.css          # @font-face, paleta, spacing, dark mode
│   ├── typography.css      # hierarquia tipografica
│   ├── layout.css          # grids e responsivo
│   ├── components.css      # btn, badge, etc
│   └── animations.css      # hex mesh, halo, reveal
├── js/main.js              # hex mesh generator + interacoes
├── fonts/                  # 8 TTFs self-hosted
└── assets/                 # SVGs da marca
```

Ao editar CSS/JS, `Ctrl+Shift+R` no navegador pra limpar cache.

---

## 3. Claude Code

O site foi construído usando [Claude Code](https://claude.com/product/claude-code), o CLI da Anthropic.

### Instalar

```bash
# via npm (requer Node 20+)
npm install -g @anthropic-ai/claude-code

# ou via binario (macOS/Linux)
curl -fsSL https://claude.ai/install | sh
```

Rodar dentro do projeto:
```bash
cd tl-site
claude
```

Primeira vez pede login (OAuth ou API key). Documentação: https://docs.claude.com/claude-code

### Arquivos de contexto

Claude Code lê automaticamente:
- `~/.claude/CLAUDE.md` — instruções globais do usuário
- `./CLAUDE.md` (raiz do projeto, se existir) — instruções específicas do projeto

Recomendo criar um `CLAUDE.md` no root do projeto com:
- Stack e convenções do time
- Padrões de commit
- Quais MCPs estão instalados
- Decisões de design já tomadas

---

## 4. MCPs usados na construção

Três servidores MCP foram usados pra gerar assets de apoio durante o build. **Nenhum é necessário pra rodar o site** — eles só ajudam quando você quer regenerar mockups, imagens ou componentes.

### 4.1 nano-banana (Google Gemini — geração de imagens)

**Uso no projeto**: gerar imagens editoriais (alquimista, texturas, mercúrio). No final, rate-limit do free tier do Gemini estourou e os resultados foram substituídos por SVGs placeholder que depois também foram removidos (o site atual não usa imagens raster além dos mockups stitch, também removidos).

Útil pra: fotos/ilustrações de hero, texturas de fundo, imagens editoriais.

**Instalar:**
```bash
# precisa de uma API key do Google AI Studio: https://aistudio.google.com/apikey
export GEMINI_API_KEY="sua-chave-aqui"
claude mcp add nano-banana npx @nano-banana/mcp-server
```

**Configuração manual** (em `~/.claude.json` ou equivalente):
```json
{
  "mcpServers": {
    "nano-banana": {
      "command": "npx",
      "args": ["-y", "@nano-banana/mcp-server"],
      "env": { "GEMINI_API_KEY": "sua-chave" }
    }
  }
}
```

**Como usar** (dentro do Claude Code):
> "Gere uma imagem de [descrição]. Salve em assets/imagens/nome.png, aspect 3:4, qualidade alta."

**Rate limits** (free tier): ~50 req/dia pro `gemini-3-pro-image`. Upgrade pra tier pago se for uso contínuo.

**Prompts usados no projeto** (arquivados caso queiram regerar):
- Hero alquimista: portrait editorial de alquimista moderno, estilo xilogravura sobre pergaminho
- Textura pergaminho: bg envelhecido cream com watermark hexagonal sutil
- Fluxo de mercúrio: líquido dourado fluindo em hexágonos pretos

### 4.2 stitch (Google — geração de telas de UI)

**Uso no projeto**: gerar mockups de dashboard interno TimeLabs e post de Instagram. Também removidos do site final mas mantidos como referência na história.

Útil pra: mockups rápidos de telas, hi-fi designs a partir de prompt.

**Instalar:**
```bash
claude mcp add stitch npx @stitch/mcp-server
# autenticar na primeira chamada via browser
```

A autenticação é OAuth via conta Google. O MCP pede pra abrir uma URL na primeira vez.

**Como usar:**
> "Crie um projeto stitch chamado 'TL Mockups' e gere uma tela de dashboard com paleta TimeLabs (paper #EFE9DA, ink #2B2520, mercury #E0B03A)."

Stitch gera HTML + imagem PNG. O MCP retorna URLs de download.

**Dica**: descreva o design com tipografia, paleta, layout específicos. Quanto mais detalhe, mais fiel.

### 4.3 magic — 21st.dev (componentes React)

**Uso no projeto**: tentamos gerar 4 componentes (CTA button, stat card, nav pill, status badge). O MCP retornou apenas instruções (sem código utilizável), então os componentes foram codados à mão em `css/components.css`.

Útil pra: scaffold rápido de componentes React/Tailwind baseado em shadcn/ui.

**Instalar:**
```bash
# precisa de API key do 21st.dev
claude mcp add magic npx @21st-dev/magic-mcp
```

Configuração:
```json
{
  "mcpServers": {
    "magic": {
      "command": "npx",
      "args": ["-y", "@21st-dev/magic-mcp"],
      "env": { "TWENTY_FIRST_API_KEY": "sua-chave" }
    }
  }
}
```

Cadastro: https://21st.dev/magic

**Como usar:**
> "Use magic pra gerar um componente Button em React com shadcn/ui seguindo a paleta TimeLabs."

### 4.4 Verificar MCPs instalados

```bash
claude mcp list
```

Remover:
```bash
claude mcp remove nome-do-mcp
```

---

## 5. Convenções de código

### HTML
- Semântico (`header`, `main`, `section`, `article`, `footer`)
- `aria-label` / `aria-hidden` em SVGs decorativos
- Uma seção = uma ideia

### CSS
- Todas as cores via `var(--token)` definido em `tokens.css`
- Sem `border-radius` nos componentes da marca (filosofia visual é geometria rígida)
- Sem gradientes coloridos (tons sutis paper/paper-alt OK)
- Mobile-first (breakpoints 640 e 1024)
- `prefers-reduced-motion` respeitado em toda animação

### JS
- Vanilla, sem framework
- IIFE no topo pra escopo isolado
- IntersectionObserver pra scroll-triggered
- SVG gerado com `document.createElementNS` (evita problemas de namespace)

### Commits
- Mensagens em inglês, padrão: `<tipo>: <descrição>` (feat, fix, refactor, docs, chore, perf, ci)
- Sempre por conta `@enzoofs`
- Nunca commit direto na `main` sem PR/revisão (exceção: commit inicial ou fix emergencial)

---

## 6. Fluxo pra editar com Claude Code

1. `cd tl-site && claude`
2. Descreva o que quer mudar: "Ajuste o hero pra ter o CTA primário à direita, não à esquerda"
3. Claude Code propõe mudanças — revisa o diff
4. Testa localmente (`python3 -m http.server 8765`)
5. Commit e push

Comandos úteis dentro do Claude Code:
- `/help` — lista comandos
- `/mcp` — status dos MCPs
- `/clear` — limpa contexto
- `/compact` — compacta conversa longa

---

## 7. Deploy

O site é 100% estático. Pode ir em qualquer CDN:

### GitHub Pages (mais simples, grátis)
```bash
gh api -X POST repos/enzoofs/tl-site/pages -f source.branch=main -f source.path=/
```
URL: https://enzoofs.github.io/tl-site/

### Netlify / Vercel / Cloudflare Pages
Conectar o repo, definir como "static site", publish directory = raiz. Sem comando de build.

### Domínio custom
Apontar CNAME/A record pro host escolhido. HTTPS automático em todos os provedores modernos.

---

## 8. Otimizações pendentes

- [ ] Converter TTFs pra WOFF2 (reduz ~70% — usar [cloudconvert](https://cloudconvert.com/ttf-to-woff2) ou `pyftsubset`)
- [ ] Minificar CSS e JS pra produção (opcional — arquivos já são pequenos)
- [ ] Gerar favicon (hex dourado com fundo paper)
- [ ] OG image pra compartilhamento em redes sociais
- [ ] Integrar form real (Cal.com, HubSpot, Formspree)
- [ ] Analytics privacy-friendly (Plausible ou Simple Analytics)
- [ ] Lighthouse audit (alvo: 95+ em todas as métricas)

---

## 9. Referências

- **Claude Code**: https://docs.claude.com/claude-code
- **MCP protocol**: https://modelcontextprotocol.io/
- **Fontes**: [Gloock](https://fonts.google.com/specimen/Gloock), [Instrument Serif](https://fonts.google.com/specimen/Instrument+Serif), [IBM Plex](https://fonts.google.com/?query=IBM+Plex)
- **Brand book completo**: repositório `design-system` (privado) contém filosofia visual, brand guidelines e experimentos de logo

---

## 10. Dúvidas

Dúvidas de implementação ou decisão de design: abrir issue no repo ou chamar o Enzo direto.
