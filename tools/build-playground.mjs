/**
 * Prepares the static playground used for before/after theme screenshots:
 *   1. copies the Quasar + Vue UMD builds (and Quasar's base CSS) from
 *      node_modules into playground/vendor/
 *   2. compiles the Aura theme to playground/primevue-aura.css
 *
 * Run it, then serve the folder (e.g. `npx serve playground`) and open
 * index.html. The page renders plain Quasar; the theme is applied by attaching
 * playground/primevue-aura.css.
 *
 *     node tools/build-playground.mjs
 */
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const vendor = path.join(root, 'playground', 'vendor');

fs.mkdirSync(vendor, { recursive: true });

const assets = [
  ['vue/dist/vue.global.prod.js', 'vue.global.prod.js'],
  ['quasar/dist/quasar.umd.prod.js', 'quasar.umd.prod.js'],
  ['quasar/dist/quasar.prod.css', 'quasar.prod.css'],
];

for (const [pkgPath, dest] of assets) {
  const src = path.join(root, 'node_modules', pkgPath);
  fs.copyFileSync(src, path.join(vendor, dest));
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
  { cwd: root, stdio: 'inherit' },
);

console.log('Playground ready. Serve it with: npx serve playground');
