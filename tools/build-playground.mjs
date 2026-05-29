/**
 * Prepares the static playground used for the comparison screenshots. It:
 *   1. copies the Vue + Quasar UMD builds (and Quasar's base CSS), Quasar's SVG
 *      icon set, the PrimeVue UMD build, the PrimeVue Aura preset and the
 *      PrimeIcons font from node_modules into playground/vendor/
 *   2. compiles the Aura theme to playground/primevue-aura.css
 *
 * Run it, then serve the folder (e.g. `npx serve playground`) and open:
 *   - index.html    -> plain Quasar (the Aura theme is attached at runtime)
 *   - primevue.html -> the real PrimeVue v4 Aura components, for reference
 *
 *     node tools/build-playground.mjs
 *
 * The screenshots in docs/screenshots are produced from this playground by
 * `node tools/screenshot.mjs` (see tools/README.md).
 */
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import * as sass from 'sass';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const vendor = path.join(root, 'playground', 'vendor');

fs.mkdirSync(vendor, { recursive: true });

const assets = [
  // Vue + Quasar (plain + Aura screenshots)
  ['vue/dist/vue.global.prod.js', 'vue.global.prod.js'],
  ['quasar/dist/quasar.umd.prod.js', 'quasar.umd.prod.js'],
  ['quasar/dist/quasar.prod.css', 'quasar.prod.css'],
  // Quasar's default Material Icons webfont, so `icon="name"` renders
  ['@quasar/extras/material-icons/material-icons.css', 'material-icons/material-icons.css'],
  ['@quasar/extras/material-icons/web-font/flUhRq6tzZclQEJ-Vdg-IuiaDsNcIhQ8tQ.woff2', 'material-icons/web-font/flUhRq6tzZclQEJ-Vdg-IuiaDsNcIhQ8tQ.woff2'],
  ['@quasar/extras/material-icons/web-font/flUhRq6tzZclQEJ-Vdg-IuiaDsNa.woff', 'material-icons/web-font/flUhRq6tzZclQEJ-Vdg-IuiaDsNa.woff'],
  // Real PrimeVue v4 + Aura preset (reference screenshot)
  ['primevue/umd/primevue.min.js', 'primevue.min.js'],
  ['@primeuix/themes/umd/aura.js', 'primeuix-aura.js'],
  ['primeicons/primeicons.css', 'primeicons/primeicons.css'],
  ['primeicons/fonts/primeicons.woff2', 'primeicons/fonts/primeicons.woff2'],
  ['primeicons/fonts/primeicons.woff', 'primeicons/fonts/primeicons.woff'],
  ['primeicons/fonts/primeicons.ttf', 'primeicons/fonts/primeicons.ttf'],
];

for (const [pkgPath, dest] of assets) {
  const src = path.join(root, 'node_modules', pkgPath);
  const destPath = path.join(vendor, dest);
  fs.mkdirSync(path.dirname(destPath), { recursive: true });
  fs.copyFileSync(src, destPath);
  console.log(`copied ${dest}`);
}

execFileSync(
  'npx',
  [
    'sass',
    '--no-source-map',
    path.join('src', 'css', 'primevue-aura.scss'),
    path.join('playground', 'primevue-aura.css'),
  ],
  { cwd: root, stdio: 'inherit', shell: true },
);

console.log('Playground ready. Serve it with: npx serve playground');
