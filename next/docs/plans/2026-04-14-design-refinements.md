# Design Refinements — TimeLabs Landing Page

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Fix all design issues identified in the expert review — broken links, wordmark accessibility, motion excess, conversion UX, typography, spacing, and mobile polish.

**Architecture:** All changes are in-place edits to existing components under `components/` and `app/globals.css`. No new files needed except potentially a Calendly embed. Changes grouped by priority (P0 → P3) and by blast radius.

**Tech Stack:** Next.js 16, React, Framer Motion, CSS custom properties, Tailwind v4

---

### Task 1: Fix broken footer links and placeholder data

**Priority:** P0 — Credibility

**Files:**
- Modify: `components/layout/footer.tsx`

**Step 1:** Remove the "Sobre" and "Casos" links that point to non-existent `#sobre` and `#casos` anchors. Replace the "Empresa" column with just the brand tagline or remove it. Also update the placeholder phone number and CNPJ if real ones are available (ask user).

**Step 2:** Verify the footer renders cleanly with 3 columns instead of 4. Adjust grid if needed.

**Step 3:** Visual check in browser at desktop and mobile widths.

---

### Task 2: Replace SVG wordmark with real HTML/CSS

**Priority:** P0 — SEO + Accessibility

**Files:**
- Modify: `components/sections/hero.tsx`
- Modify: `app/globals.css` (add wordmark styles if needed)

**Step 1:** Remove the entire `<svg className="wordmark-svg">` block inside the `<h1>`. Replace with real text nodes:
- `t` as text
- `ı` (dotless i) as text
- A small inline SVG hexagon (just the diamond shape, ~0.22em) as the dot
- `meLabs` as text

The h1 should use `font-family: var(--font-display)`, `font-size: clamp(52px, 8vw, 96px)`, `line-height: 1.02`, `letter-spacing: var(--track-display)` — the original values that were removed.

**Step 2:** Ensure the hex diamond is vertically aligned as the "dot" above the `ı`, using `display: inline-block`, `vertical-align: middle`, small margins.

**Step 3:** Test text selection works. Test browser zoom. Test screen reader reads "TimeLabs".

---

### Task 3: Tame hero seal animation

**Priority:** P1 — Focus

**Files:**
- Modify: `components/sections/hero.tsx`

**Step 1:** Change the seal `<motion.img>` animation from `repeat: Infinity` to a single gentle entrance animation. Options:
- Fade in + slight scale from 0.95 to 1, duration 1.2s
- Or a single float-up of ~12px then settle, no repeat

**Step 2:** Verify the seal is static after initial load.

---

### Task 4: Reduce hex-mesh usage

**Priority:** P1 — Visual clarity

**Files:**
- Modify: `components/sections/problema.tsx` — remove HexMesh
- Modify: `components/sections/metodo.tsx` — remove HexMesh
- Modify: `components/sections/resultados.tsx` — remove HexMesh

Keep HexMesh in: Hero (brand intro), Operacoes (dark section, high impact), CtaFinal (dark section, closing). That's 3 out of 6 — the three sections where it adds contrast value.

**Step 1:** Remove the `<HexMesh />` component and its import from Problema, Metodo, and Resultados.

**Step 2:** Visual check — these sections should feel cleaner with just their solid backgrounds.

---

### Task 5: Fix CTA copy and conversion flow

**Priority:** P1 — Conversion

**Files:**
- Modify: `components/sections/cta-final.tsx`

**Step 1:** Change the form copy to match what actually happens (email capture, not scheduling):
- Button text: "Agendar conversa" → "Enviar"
- Add a line below the input: "Respondemos em até um dia útil para agendar."
- Or, if user prefers, integrate a Calendly/Cal.com link instead of the email form.

**Step 2:** Add minimal form states:
- Loading state on submit button (disable + "Enviando...")
- The success message is already there, just verify it works.

**Step 3:** Verify the form flow makes sense end-to-end.

---

### Task 6: Reduce vertical padding

**Priority:** P2 — Scroll rhythm

**Files:**
- Modify: `app/globals.css` — change `--sp-8` value
- Or modify individual sections to use `--sp-7` instead of `--sp-8`

**Step 1:** The cleaner approach: change each section that uses `padding: var(--sp-8)` to use `var(--sp-7)` (96px) instead of var(--sp-8) (128px). Don't change the token itself since it might be used elsewhere intentionally.

**Files to touch:**
- `hero.tsx` — padding
- `problema.tsx` — padding
- `operacoes.tsx` — padding
- `metodo.tsx` — padding
- `resultados.tsx` — padding
- `cta-final.tsx` — padding

Also update the mobile override in `globals.css` to use `--sp-5` (48px) instead of `--sp-6` (64px).

**Step 2:** Scroll through entire page, verify rhythm feels tighter but not cramped.

---

### Task 7: Fix AnimatedCounter typography

**Priority:** P2 — Consistency

**Files:**
- Modify: `components/sections/resultados.tsx`

**Step 1:** Add `fontFamily: "var(--font-display)"` to the counter wrapper div (the one with `fontSize: clamp(64px, 7vw, 120px)`). Numbers in Gloock will feel more intentional than inheriting IBM Plex Serif.

**Step 2:** Visual check — the numbers should look bolder and more display-like.

---

### Task 8: Replace opacity with explicit colors

**Priority:** P2 — Legibility

**Files:**
- Modify: `components/sections/operacoes.tsx` — card body text `opacity: 0.82` → explicit color
- Modify: `app/globals.css` — add `--paper-soft: #c9c3b5` token (paper at ~80% against ink)

**Step 1:** Add a new CSS variable `--paper-soft` in `:root` and use it for secondary text on dark backgrounds instead of `opacity: 0.82`.

**Step 2:** Update the Operacoes card body text to use `color: var(--paper-soft)` with `opacity: 1`.

**Step 3:** Also check cta-final.tsx body text (`opacity: 0.85`) and update similarly.

**Step 4:** Check dark mode contrast ratios mentally — `#c9c3b5` on `#2B2520` should be well above 4.5:1.

---

### Task 9: Improve Integracoes section

**Priority:** P3 — Credibility

**Files:**
- Modify: `components/sections/integracoes.tsx`

**Step 1:** Group tools by category and add category labels:
- Automacao: Zapier, Make, n8n
- Comunicacao: WhatsApp API, Slack
- CRM & Vendas: Salesforce, HubSpot
- Dados: Google Sheets, Power BI
- ERP: SAP

**Step 2:** Replace the infinite marquee with a static grid or grouped layout. The marquee adds motion without information value. A clean grid with category headers gives more credibility.

**Step 3:** Visual check at desktop and mobile.

---

### Task 10: Increase header touch targets

**Priority:** P3 — Mobile usability

**Files:**
- Modify: `components/layout/header.tsx`

**Step 1:** Increase header height from 50px to 56px. Update the `minHeight` or `height` in the header style.

**Step 2:** Increase hamburger button padding from 8px to 12px for a larger touch area (~44px).

**Step 3:** Update `main` padding-top in `app/page.tsx` from `pt-[50px]` to `pt-[56px]`.

**Step 4:** Update mobile menu overlay `top: 50` to `top: 56`.

**Step 5:** Test hamburger is easy to tap on mobile viewport.

---

## Execution Order

Tasks are ordered by priority. After each task, verify in browser before moving to the next.

| Batch | Tasks | Theme |
|-------|-------|-------|
| A | 1, 2 | Critical fixes (P0) |
| B | 3, 4 | Motion cleanup (P1) |
| C | 5 | Conversion (P1) |
| D | 6, 7, 8 | Typography & spacing (P2) |
| E | 9, 10 | Polish (P3) |
