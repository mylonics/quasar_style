# Tooling

Scripts that maintain generated artifacts in this repo. Run them from the repo
root after `npm install`.

## `generate-tokens.mjs` — regenerate the token layers

```bash
npm run generate:tokens
```

Emits one token partial per preset from PrimeVue's own theming engine
(`@primeuix/themes` / `@primeuix/styled`): `src/css/primevue/_tokens.scss`
(Aura), `_tokens-material.scss`, `_tokens-lara.scss` and `_tokens-nora.scss`.
Run it when bumping the PrimeVue dependency. Do not hand-edit these files.

## Screenshots — the comparison images in the README

The README compares three renders of the same component gallery:

| File | Page | What it shows |
| --- | --- | --- |
| `docs/screenshots/quasar-plain.png` | `playground/index.html` | Plain Quasar (Material look), no theme |
| `docs/screenshots/quasar-aura.png` | `playground/index.html` + theme | Quasar with this extension's Aura theme |
| `docs/screenshots/primevue.png` | `playground/primevue.html` | The real PrimeVue v4 Aura components, for reference |

A second set captures the Overview dashboard playground (PrimeVue's OverviewApp
sample) the same three ways:

| File | Page | What it shows |
| --- | --- | --- |
| `docs/screenshots/dashboard-quasar-plain.png` | `playground/dashboard.html` | Plain Quasar dashboard, no theme |
| `docs/screenshots/dashboard-quasar-aura.png` | `playground/dashboard.html` + theme | Quasar dashboard with the Aura theme |
| `docs/screenshots/dashboard-primevue.png` | `playground/dashboard.primevue.html` | The real PrimeVue dashboard, for reference |

A third set captures **every dashboard page in every preset** as a single
side-by-side image — Quasar + theme on the left, real PrimeVue on the right.
That is 6 pages × 4 presets = **24 images**, named
`dashboard-<page>-<preset>.png` (`page` ∈ overview/chat/inbox/cards/customers/movies,
`preset` ∈ aura/material/lara/nora). `screenshot.mjs` selects the preset on the
shared `<select id="theme-select">`, walks the `.dash-nav-item` sidebar buttons
to reach each page, captures both dashboards, and composes the two full-page
PNGs into one image by screenshotting a flex-row HTML page (so the tool needs no
image library).

The dashboard pages share `playground/dashboard.css` (the OverviewApp layout) and
`playground/dashboard-data.js` (sample data + the Chart.js bar chart), and both
draw the chart on a `<canvas>` so the three renders line up. The nav's **Theme**
dropdown switches the preset (Aura / Material / Lara / Nora) and the **Primary**
dropdown switches the primary palette.

`index.html` and `primevue.html` render the **same** gallery so the three
images line up section by section. `quasar-plain` and `quasar-aura` come from
the identical Quasar page — the only difference is that the compiled theme
(`playground/primevue-aura.css`) is attached for the Aura shot, exactly how the
extension applies it in a real app. The nav's **Theme** dropdown swaps the
attached stylesheet (Quasar page) or calls `usePreset` (PrimeVue page) to switch
between all four presets live.

### Regenerating the screenshots

```bash
# 1. install dependencies (once)
npm install

# 2. install the headless browser used to capture the pages (once)
npx playwright install chromium

# 3. build the static playground: copies Vue/Quasar/PrimeVue UMD builds, the
#    Material Icons + PrimeIcons fonts, the PrimeVue preset bundles, and compiles
#    every theme (primevue-<preset>.css) into playground/ (these are git-ignored,
#    recreate them anytime)
npm run playground

# 4. render the three screenshots into docs/screenshots/
npm run screenshots
```

`screenshot.mjs` serves the `playground/` folder over a local HTTP server,
loads each page in headless Chromium at a 2× device scale, waits for fonts to
settle, and writes a full-page PNG. Re-run steps 3–4 after changing the theme or
the playground markup.

> **Gotcha — don't reuse Quasar utility class names in the playground.** Quasar
> ships global utility classes such as `.block` (`display:block`). The gallery
> markup therefore uses namespaced class names (e.g. `.demo-block`) for its own
> layout; using a bare `.block` rule would leak into Quasar's internals (it sits
> on every `q-btn` label) and silently inflate component sizing, making the
> Quasar shots look taller / less dense than they really are.

### Previewing the playground by hand

```bash
npm run playground
npx serve playground        # then open http://localhost:3000
```

- `index.html` shows plain Quasar; use the nav **Theme** dropdown (or attach a
  `primevue-<preset>.css` via devtools / a `<link>`) to preview a theme.
- `primevue.html` shows upstream PrimeVue for comparison, with the same **Theme**
  dropdown to switch presets live.
