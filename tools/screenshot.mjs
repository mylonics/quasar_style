/**
 * Renders the playground in headless Chromium and writes the three comparison
 * screenshots to docs/screenshots:
 *
 *   - quasar-plain.png  index.html, plain Quasar (Material look)
 *   - quasar-aura.png   index.html with the compiled Aura theme attached
 *   - primevue.png      primevue.html, the real PrimeVue v4 Aura components
 *
 * Prerequisites (see tools/README.md):
 *   npm install
 *   npx playwright install chromium
 *   node tools/build-playground.mjs
 *
 * Usage:
 *   node tools/screenshot.mjs
 */
import fs from 'node:fs';
import http from 'node:http';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const playground = path.join(root, 'playground');
const outDir = path.join(root, 'docs', 'screenshots');

const themeCss = path.join(playground, 'primevue-aura.css');
if (!fs.existsSync(themeCss) || !fs.existsSync(path.join(playground, 'vendor'))) {
  console.error('Playground not built. Run: node tools/build-playground.mjs');
  process.exit(1);
}

fs.mkdirSync(outDir, { recursive: true });

const MIME = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
};

// Serve the playground over HTTP so relative asset URLs resolve consistently.
const server = http.createServer((req, res) => {
  const urlPath = decodeURIComponent(req.url.split('?')[0]);
  const filePath = path.join(playground, urlPath === '/' ? 'index.html' : urlPath);
  if (!filePath.startsWith(playground) || !fs.existsSync(filePath)) {
    res.statusCode = 404;
    res.end('not found');
    return;
  }
  res.setHeader('Content-Type', MIME[path.extname(filePath)] || 'application/octet-stream');
  fs.createReadStream(filePath).pipe(res);
});

const VIEWPORT = { width: 1040, height: 1400 };
const SETTLE_MS = 600;

async function shoot(page, url, file, { theme = false } = {}) {
  await page.goto(url, { waitUntil: 'networkidle' });
  if (theme) {
    await page.addStyleTag({ url: 'primevue-aura.css' });
  }
  await page.evaluate(() => document.fonts && document.fonts.ready);
  await page.waitForTimeout(SETTLE_MS);
  const target = path.join(outDir, file);
  await page.screenshot({ path: target, fullPage: true });
  console.log(`wrote ${path.relative(root, target)}`);
}

await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
const { port } = server.address();
const base = `http://127.0.0.1:${port}`;

const browser = await chromium.launch();
try {
  const page = await browser.newPage({ viewport: VIEWPORT, deviceScaleFactor: 2 });
  await shoot(page, `${base}/index.html`, 'quasar-plain.png');
  await shoot(page, `${base}/index.html`, 'quasar-aura.png', { theme: true });
  await shoot(page, `${base}/primevue.html`, 'primevue.png');
} finally {
  await browser.close();
  server.close();
}
