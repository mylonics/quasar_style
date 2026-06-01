/**
 * Renders the playground in headless Chromium and writes the comparison
 * screenshots to docs/screenshots:
 *
 * Component gallery (README):
 *   - quasar-plain.png  index.html, plain Quasar (Material look)
 *   - quasar-aura.png   index.html with the compiled Aura theme attached
 *   - primevue.png      primevue.html, the real PrimeVue v4 Aura components
 *
 * Overview dashboard trio (README):
 *   - dashboard-quasar-plain.png / dashboard-quasar-aura.png / dashboard-primevue.png
 *
 * Per-page theme comparison (24 = 6 pages × 4 presets): a single side-by-side
 * image per page/preset with the Quasar + theme render on the left and the real
 * PrimeVue render on the right:
 *   - dashboard-<page>-<preset>.png  (page ∈ overview/chat/inbox/cards/customers/movies,
 *                                     preset ∈ aura/material/lara/nora)
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

// Preset names: the Quasar dashboard's <select id="theme-select"> uses the
// lowercase value, the PrimeVue dashboard uses the capitalised value.
const PRESETS = [
  { key: 'aura', quasar: 'aura', primevue: 'Aura' },
  { key: 'material', quasar: 'material', primevue: 'Material' },
  { key: 'lara', quasar: 'lara', primevue: 'Lara' },
  { key: 'nora', quasar: 'nora', primevue: 'Nora' },
];

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

// Capture full-page PNG buffers for every dashboard page at a given preset.
// `presetValue` is selected on the page's <select id="theme-select"> (lowercase
// for the Quasar dashboard, capitalised for the PrimeVue dashboard).
async function captureDashboardPages(page, url, presetValue) {
  await page.goto(url, { waitUntil: 'networkidle' });
  await page.addStyleTag({
    content: '#dev-nav{display:none!important}body{padding-top:0!important}',
  });
  await page.evaluate(() => document.fonts && document.fonts.ready);
  // Switch the preset and let the swapped stylesheet / usePreset() settle.
  await page.evaluate((value) => {
    const sel = document.getElementById('theme-select');
    if (sel) {
      sel.value = value;
      sel.dispatchEvent(new Event('change'));
    }
  }, presetValue);
  await page.waitForTimeout(SETTLE_MS);

  const buffers = {};
  for (let i = 0; i < DASHBOARD_PAGES.length; i++) {
    await page.evaluate((index) => {
      const items = document.querySelectorAll('.dash-nav-item');
      if (items[index]) items[index].click();
    }, i);
    await page.waitForTimeout(SETTLE_MS);
    buffers[DASHBOARD_PAGES[i]] = await page.screenshot({ fullPage: true });
  }
  return buffers;
}

// Compose two full-page PNG buffers into one side-by-side image. We do this by
// loading a tiny HTML page that lays the two screenshots out in a flex row and
// screenshotting it, which keeps the tool dependency-free (no image library).
async function composeSideBySide(browser, leftBuf, rightBuf, leftLabel, rightLabel, file) {
  const page = await browser.newPage({ deviceScaleFactor: 1 });
  const left = `data:image/png;base64,${leftBuf.toString('base64')}`;
  const right = `data:image/png;base64,${rightBuf.toString('base64')}`;
  const html = `<!doctype html><html><head><meta charset="utf-8"><style>
    *{margin:0;box-sizing:border-box}
    body{background:#fff;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif}
    .row{display:flex;align-items:flex-start}
    .col{flex:1;min-width:0}
    .col+.col{border-left:2px solid #cbd5e1}
    .label{font-size:20px;font-weight:700;color:#0f172a;padding:10px 14px;background:#f8fafc;border-bottom:1px solid #e2e8f0}
    img{display:block;width:100%}
  </style></head><body>
    <div class="row">
      <div class="col"><div class="label">${leftLabel}</div><img src="${left}"></div>
      <div class="col"><div class="label">${rightLabel}</div><img src="${right}"></div>
    </div>
  </body></html>`;
  await page.setContent(html, { waitUntil: 'networkidle' });
  // Size the viewport to the natural composed width so fullPage captures crisply.
  const dims = await page.evaluate(() => {
    const row = document.querySelector('.row');
    return { w: row.scrollWidth, h: row.scrollHeight };
  });
  await page.setViewportSize({ width: Math.ceil(dims.w), height: Math.ceil(dims.h) });
  const target = path.join(outDir, file);
  await page.screenshot({ path: target, fullPage: true });
  await page.close();
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

  // Overview dashboard playground (mirrors PrimeVue's OverviewApp sample). A
  // wider viewport keeps the Transactions/My Wallet row side by side like the
  // upstream sample.
  const dash = await browser.newPage({ viewport: DASHBOARD_VIEWPORT, deviceScaleFactor: 2 });
  await shoot(dash, `${base}/dashboard.html`, 'dashboard-quasar-plain.png');
  await shoot(dash, `${base}/dashboard.html`, 'dashboard-quasar-aura.png', { theme: true });
  await shoot(dash, `${base}/dashboard.primevue.html`, 'dashboard-primevue.png');

  // Per-page, per-preset side-by-side comparison (24 images). For each preset we
  // capture all six Quasar pages and all six PrimeVue pages, then compose each
  // page into one Quasar-vs-PrimeVue image so every page/theme can be reviewed
  // at a glance.
  const qPage = await browser.newPage({ viewport: DASHBOARD_VIEWPORT, deviceScaleFactor: 2 });
  const pPage = await browser.newPage({ viewport: DASHBOARD_VIEWPORT, deviceScaleFactor: 2 });
  for (const preset of PRESETS) {
    const qBuffers = await captureDashboardPages(qPage, `${base}/dashboard.html`, preset.quasar);
    const pBuffers = await captureDashboardPages(pPage, `${base}/dashboard.primevue.html`, preset.primevue);
    const label = preset.key.charAt(0).toUpperCase() + preset.key.slice(1);
    for (const name of DASHBOARD_PAGES) {
      await composeSideBySide(
        browser,
        qBuffers[name],
        pBuffers[name],
        `Quasar + ${label}`,
        `PrimeVue ${label}`,
        `dashboard-${name}-${preset.key}.png`,
      );
    }
  }
} finally {
  await browser.close();
  server.close();
}
