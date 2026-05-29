# Tooling

Scripts that maintain generated artifacts in this repo. Run them from the repo
root after `npm install`.

## `generate-tokens.mjs` — regenerate the Aura token layer

```bash
npm run generate:tokens
```

Emits `src/css/primevue/_tokens.scss` from PrimeVue's own theming engine
(`@primeuix/themes` / `@primeuix/styled`). Run it when bumping the PrimeVue
dependency. Do not hand-edit `_tokens.scss`.

## Screenshots — the comparison images in the README

The README compares three renders of the same component gallery:

| File | Page | What it shows |
| --- | --- | --- |
| `docs/screenshots/quasar-plain.png` | `playground/index.html` | Plain Quasar (Material look), no theme |
| `docs/screenshots/quasar-aura.png` | `playground/index.html` + theme | Quasar with this extension's Aura theme |
| `docs/screenshots/primevue.png` | `playground/primevue.html` | The real PrimeVue v4 Aura components, for reference |

`index.html` and `primevue.html` render the **same** gallery so the three
images line up section by section. `quasar-plain` and `quasar-aura` come from
the identical Quasar page — the only difference is that the compiled theme
(`playground/primevue-aura.css`) is attached for the Aura shot, exactly how the
extension applies it in a real app.

### Regenerating the screenshots

```bash
# 1. install dependencies (once)
npm install

# 2. install the headless browser used to capture the pages (once)
npx playwright install chromium

# 3. build the static playground: copies Vue/Quasar/PrimeVue UMD builds, the
#    Material Icons + PrimeIcons fonts, and compiles the Aura theme into
#    playground/ (these are git-ignored, recreate them anytime)
npm run playground

# 4. render the three screenshots into docs/screenshots/
npm run screenshots
```

`screenshot.mjs` serves the `playground/` folder over a local HTTP server,
loads each page in headless Chromium at a 2× device scale, waits for fonts to
settle, and writes a full-page PNG. Re-run steps 3–4 after changing the theme or
the playground markup.

### Previewing the playground by hand

```bash
npm run playground
npx serve playground        # then open http://localhost:3000
```

- `index.html` shows plain Quasar; attach `primevue-aura.css` (via devtools or
  a `<link>`) to preview the Aura theme.
- `primevue.html` shows upstream PrimeVue for comparison.
