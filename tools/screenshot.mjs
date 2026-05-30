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
const DASHBOARD_VIEWPORT = { width: 1280, height: 1600 };
const SETTLE_MS = 600;

// The dashboard sidebar exposes one `.dash-nav-item` button per page, in this
// order. Both the Quasar and PrimeVue dashboards share the same nav markup, so
// the same index switches the same page on either side.
const DASHBOARD_PAGES = ['overview', 'chat', 'inbox', 'cards', 'customers', 'movies'];

async function shoot(page, url, file, { theme = false } = {}) {
  await page.goto(url, { waitUntil: 'networkidle' });
  // index.html ships with the Aura theme link enabled by default; toggle it to
  // match the requested capture so "plain" is genuine Material and "aura" is themed.
  if (theme) {
    await page.addStyleTag({ url: 'primevue-aura.css' });
  } else {
    await page.evaluate(() => {
      const link = document.getElementById('aura-theme');
      if (link) link.remove();
    });
  }
  // Hide the playground's developer nav bar (and its top offset) so the
  // comparison screenshots show only the component gallery.
  await page.addStyleTag({
    content: '#dev-nav{display:none!important}body{padding-top:24px!important}',
  });
  await page.evaluate(() => document.fonts && document.fonts.ready);
  await page.waitForTimeout(SETTLE_MS);
  const target = path.join(outDir, file);
  await page.screenshot({ path: target, fullPage: true });
  console.log(`wrote ${path.relative(root, target)}`);
}

// Walk every dashboard page (via the shared `.dash-nav-item` sidebar buttons)
// and capture a full-page screenshot of each. `prefix` distinguishes the two
// renders, e.g. `dashboard-chat-quasar-aura.png`.
async function shootDashboardPages(page, url, prefix, { theme = false } = {}) {
  await page.goto(url, { waitUntil: 'networkidle' });
  if (theme) {
    await page.addStyleTag({ url: 'primevue-aura.css' });
  } else {
    await page.evaluate(() => {
      const link = document.getElementById('aura-theme');
      if (link) link.remove();
    });
  }
  await page.addStyleTag({
    content: '#dev-nav{display:none!important}body{padding-top:24px!important}',
  });
  await page.evaluate(() => document.fonts && document.fonts.ready);

  for (let i = 0; i < DASHBOARD_PAGES.length; i++) {
    await page.evaluate((index) => {
      const items = document.querySelectorAll('.dash-nav-item');
      if (items[index]) items[index].click();
    }, i);
    await page.waitForTimeout(SETTLE_MS);
    const file = `dashboard-${DASHBOARD_PAGES[i]}-${prefix}.png`;
    const target = path.join(outDir, file);
    await page.screenshot({ path: target, fullPage: true });
    console.log(`wrote ${path.relative(root, target)}`);
  }
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

  // Overview dashboard playground (mirrors PrimeVue's OverviewApp sample). A
  // wider viewport keeps the Transactions/My Wallet row side by side like the
  // upstream sample.
  const dash = await browser.newPage({ viewport: DASHBOARD_VIEWPORT, deviceScaleFactor: 2 });
  await shoot(dash, `${base}/dashboard.html`, 'dashboard-quasar-plain.png');
  await shoot(dash, `${base}/dashboard.html`, 'dashboard-quasar-aura.png', { theme: true });
  await shoot(dash, `${base}/dashboard.primevue.html`, 'dashboard-primevue.png');

  // Per-page captures for the full Aura-vs-PrimeVue review. Each dashboard page
  // is reached through the shared sidebar nav and written as a separate PNG so
  // every page can be diffed image-to-image, not just the Overview landing.
  await shootDashboardPages(dash, `${base}/dashboard.html`, 'quasar-aura', { theme: true });
  await shootDashboardPages(dash, `${base}/dashboard.primevue.html`, 'primevue');
} finally {
  await browser.close();
  server.close();
}
