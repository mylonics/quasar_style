/*
 * Shared data + helpers for the dashboard playground pages.
 *
 * Both dashboard.primevue.html (real PrimeVue) and dashboard.html (Quasar, with
 * or without the Aura theme) read from this single source so the three renders
 * line up section by section. The sample mirrors PrimeVue's OverviewApp landing
 * sample:
 * https://github.com/primefaces/primevue/blob/master/apps/showcase/components/landing/samples/OverviewApp.vue
 *
 * Loaded as a plain <script> (no modules) so the static UMD playground can use
 * it; everything hangs off window.DASHBOARD.
 */
(function () {
  // Aura primitive palettes (50..950). Aura is the only supported preset, but
  // the primary colour can be switched between these. Values match the Aura
  // token layer in src/css/primevue/_tokens.scss.
  const PALETTES = {
    noir:    { 50: '#fafafa', 100: '#f5f5f5', 200: '#e5e5e5', 300: '#d4d4d4', 400: '#a3a3a3', 500: '#737373', 600: '#525252', 700: '#404040', 800: '#262626', 900: '#171717', 950: '#0a0a0a' },
    emerald: { 50: '#ecfdf5', 100: '#d1fae5', 200: '#a7f3d0', 300: '#6ee7b7', 400: '#34d399', 500: '#10b981', 600: '#059669', 700: '#047857', 800: '#065f46', 900: '#064e3b', 950: '#022c22' },
    green:   { 50: '#f0fdf4', 100: '#dcfce7', 200: '#bbf7d0', 300: '#86efac', 400: '#4ade80', 500: '#22c55e', 600: '#16a34a', 700: '#15803d', 800: '#166534', 900: '#14532d', 950: '#052e16' },
    blue:    { 50: '#eff6ff', 100: '#dbeafe', 200: '#bfdbfe', 300: '#93c5fd', 400: '#60a5fa', 500: '#3b82f6', 600: '#2563eb', 700: '#1d4ed8', 800: '#1e40af', 900: '#1e3a8a', 950: '#172554' },
    indigo:  { 50: '#eef2ff', 100: '#e0e7ff', 200: '#c7d2fe', 300: '#a5b4fc', 400: '#818cf8', 500: '#6366f1', 600: '#4f46e5', 700: '#4338ca', 800: '#3730a3', 900: '#312e81', 950: '#1e1b4b' },
    violet:  { 50: '#f5f3ff', 100: '#ede9fe', 200: '#ddd6fe', 300: '#c4b5fd', 400: '#a78bfa', 500: '#8b5cf6', 600: '#7c3aed', 700: '#6d28d9', 800: '#5b21b6', 900: '#4c1d95', 950: '#2e1065' },
    purple:  { 50: '#faf5ff', 100: '#f3e8ff', 200: '#e9d5ff', 300: '#d8b4fe', 400: '#c084fc', 500: '#a855f7', 600: '#9333ea', 700: '#7e22ce', 800: '#6b21a8', 900: '#581c87', 950: '#3b0764' },
    fuchsia: { 50: '#fdf4ff', 100: '#fae8ff', 200: '#f5d0fe', 300: '#f0abfc', 400: '#e879f9', 500: '#d946ef', 600: '#c026d3', 700: '#a21caf', 800: '#86198f', 900: '#701a75', 950: '#4a044e' },
    pink:    { 50: '#fdf2f8', 100: '#fce7f3', 200: '#fbcfe8', 300: '#f9a8d4', 400: '#f472b6', 500: '#ec4899', 600: '#db2777', 700: '#be185d', 800: '#9d174d', 900: '#831843', 950: '#500724' },
    rose:    { 50: '#fff1f2', 100: '#ffe4e6', 200: '#fecdd3', 300: '#fda4af', 400: '#fb7185', 500: '#f43f5e', 600: '#e11d48', 700: '#be123c', 800: '#9f1239', 900: '#881337', 950: '#4c0519' },
    red:     { 50: '#fef2f2', 100: '#fee2e2', 200: '#fecaca', 300: '#fca5a5', 400: '#f87171', 500: '#ef4444', 600: '#dc2626', 700: '#b91c1c', 800: '#991b1b', 900: '#7f1d1d', 950: '#450a0a' },
    orange:  { 50: '#fff7ed', 100: '#ffedd5', 200: '#fed7aa', 300: '#fdba74', 400: '#fb923c', 500: '#f97316', 600: '#ea580c', 700: '#c2410c', 800: '#9a3412', 900: '#7c2d12', 950: '#431407' },
    amber:   { 50: '#fffbeb', 100: '#fef3c7', 200: '#fde68a', 300: '#fcd34d', 400: '#fbbf24', 500: '#f59e0b', 600: '#d97706', 700: '#b45309', 800: '#92400e', 900: '#78350f', 950: '#451a03' },
    yellow:  { 50: '#fefce8', 100: '#fef9c3', 200: '#fef08a', 300: '#fde047', 400: '#facc15', 500: '#eab308', 600: '#ca8a04', 700: '#a16207', 800: '#854d0e', 900: '#713f12', 950: '#422006' },
    lime:    { 50: '#f7fee7', 100: '#ecfccb', 200: '#d9f99d', 300: '#bef264', 400: '#a3e635', 500: '#84cc16', 600: '#65a30d', 700: '#4d7c0f', 800: '#3f6212', 900: '#365314', 950: '#1a2e05' },
    teal:    { 50: '#f0fdfa', 100: '#ccfbf1', 200: '#99f6e4', 300: '#5eead4', 400: '#2dd4bf', 500: '#14b8a6', 600: '#0d9488', 700: '#0f766e', 800: '#115e59', 900: '#134e4a', 950: '#042f2e' },
    cyan:    { 50: '#ecfeff', 100: '#cffafe', 200: '#a5f3fc', 300: '#67e8f9', 400: '#22d3ee', 500: '#06b6d4', 600: '#0891b2', 700: '#0e7490', 800: '#155e75', 900: '#164e63', 950: '#083344' },
    sky:     { 50: '#f0f9ff', 100: '#e0f2fe', 200: '#bae6fd', 300: '#7dd3fc', 400: '#38bdf8', 500: '#0ea5e9', 600: '#0284c7', 700: '#0369a1', 800: '#075985', 900: '#0c4a6e', 950: '#082f49' },
    slate:   { 50: '#f8fafc', 100: '#f1f5f9', 200: '#e2e8f0', 300: '#cbd5e1', 400: '#94a3b8', 500: '#64748b', 600: '#475569', 700: '#334155', 800: '#1e293b', 900: '#0f172a', 950: '#020617' },
  };
  const PALETTE_NAMES = Object.keys(PALETTES);
  const DEFAULT_PALETTE = 'noir';

  // Bar chart datasets per time range, mirroring OverviewApp.createDatasets().
  const CHART_DATASETS = {
    Weekly: {
      labels: ['6 May', '13 May', '20 May', '27 May', '3 June', '10 June', '17 June', '24 June', '1 July', '8 July', '15 July', '22 July'],
      data: [
        [9000, 3000, 13000, 3000, 5000, 17000, 11000, 4000, 15000, 4000, 11000, 5000],
        [1800, 7600, 11100, 6800, 3300, 5800, 3600, 7200, 4300, 8100, 6800, 3700],
        [3800, 4800, 2100, 6600, 1000, 3800, 6500, 4200, 4300, 7000, 6800, 3700],
      ],
    },
    Monthly: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      data: [
        [4000, 10000, 15000, 4000, 16000, 8000, 12000, 14000, 17000, 5000, 12000, 6000],
        [2100, 8400, 2400, 7500, 3700, 6500, 7400, 8000, 4800, 9000, 7600, 4200],
        [4100, 5200, 2400, 7400, 2300, 4100, 7200, 8000, 4800, 9000, 7600, 4200],
      ],
    },
    Yearly: {
      labels: ['2019', '2020', '2021', '2022', '2023', '2024'],
      data: [
        [4500, 10500, 15500, 4500, 16500, 8500],
        [2250, 8700, 2550, 7650, 3850, 6650],
        [4350, 5450, 2650, 7650, 2550, 4350],
      ],
    },
  };

  const TIME_OPTIONS = ['Weekly', 'Monthly', 'Yearly'];

  const MENU_ITEMS = [
    { label: 'Refresh', icon: 'pi pi-refresh' },
    { label: 'Export', icon: 'pi pi-upload' },
  ];

  // Transaction table rows, matching OverviewApp.sampleAppsTableDatas.
  const TABLE_DATA = [
    { id: '#1254', name: { text: 'Amy Yelsner', label: 'AY' }, coin: 'btc', date: 'May 5th', process: { type: 'success', value: 'Buy' }, amount: '3.005 BTC' },
    { id: '#2355', name: { text: 'Anna Fali', label: 'AF' }, coin: 'eth', date: 'Mar 17th', process: { type: 'success', value: 'Buy' }, amount: '0.050 ETH' },
    { id: '#1235', name: { text: 'Stepen Shaw', label: 'SS' }, coin: 'btc', date: 'May 24th', process: { type: 'danger', value: 'Sell' }, amount: '3.050 BTC' },
    { id: '#2356', name: { text: 'Anna Fali', label: 'AF' }, coin: 'eth', date: 'Mar 17th', process: { type: 'danger', value: 'Sell' }, amount: '0.050 ETH' },
    { id: '#2357', name: { text: 'Anna Fali', label: 'AF' }, coin: 'eth', date: 'Mar 17th', process: { type: 'danger', value: 'Sell' }, amount: '0.050 ETH' },
    { id: '#7896', name: { text: 'John Doe', label: 'JD' }, coin: 'btc', date: 'Jun 12th', process: { type: 'success', value: 'Buy' }, amount: '2.500 BTC' },
    { id: '#5648', name: { text: 'Jane Smith', label: 'JS' }, coin: 'eth', date: 'Feb 23rd', process: { type: 'success', value: 'Buy' }, amount: '1.200 ETH' },
    { id: '#3265', name: { text: 'Michael Johnson', label: 'MJ' }, coin: 'btc', date: 'Apr 30th', process: { type: 'danger', value: 'Sell' }, amount: '4.000 BTC' },
    { id: '#1423', name: { text: 'Emily Davis', label: 'ED' }, coin: 'btc', date: 'Jan 15th', process: { type: 'danger', value: 'Sell' }, amount: '5.050 LTC' },
    { id: '#6854', name: { text: 'Robert Brown', label: 'RB' }, coin: 'eth', date: 'Dec 2nd', process: { type: 'success', value: 'Buy' }, amount: '0.300 ETH' },
  ];

  // My Wallet meter segments, matching OverviewApp.metersData.
  const METERS_DATA = [
    { label: 'BTC', color: '#F59E0B', value: 15, text: '27.215' },
    { label: 'ETH', color: '#717179', value: 5, text: '4.367' },
    { label: 'GBP', color: '#22C55E', value: 25, text: '£ 147.562,32' },
    { label: 'EUR', color: '#84CC16', value: 11, text: '€ 137.457,25' },
    { label: 'USD', color: '#14B8A6', value: 29, text: '$ 133.364,12' },
    { label: 'XAU', color: '#EAB308', value: 29, text: '200 g' },
  ];

  // Resolve a CSS custom property from :root (with a fallback).
  function cssVar(name, fallback) {
    const value = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
    return value || fallback;
  }

  // Build the Chart.js config from the current Aura tokens, so the bar colours
  // follow the selected primary palette exactly like OverviewApp.setChartData().
  function buildChartData(timeUnit) {
    const set = CHART_DATASETS[timeUnit] || CHART_DATASETS.Monthly;
    const primary200 = cssVar('--p-primary-200', '#a7f3d0');
    const primary300 = cssVar('--p-primary-300', '#6ee7b7');
    const primary400 = cssVar('--p-primary-400', '#34d399');
    const primary500 = cssVar('--p-primary-500', '#10b981');
    const primary600 = cssVar('--p-primary-600', '#059669');

    return {
      labels: set.labels,
      datasets: [
        { type: 'bar', label: 'Personal Wallet', backgroundColor: primary400, hoverBackgroundColor: primary600, data: set.data[0], barThickness: 32 },
        { type: 'bar', label: 'Corporate Wallet', backgroundColor: primary300, hoverBackgroundColor: primary500, data: set.data[1], barThickness: 32 },
        { type: 'bar', label: 'Investment Wallet', backgroundColor: primary200, hoverBackgroundColor: primary400, data: set.data[2], borderRadius: { topLeft: 8, topRight: 8 }, borderSkipped: true, barThickness: 32 },
      ],
    };
  }

  function buildChartOptions() {
    const darkMode = document.body.classList.contains('body--dark') || document.documentElement.classList.contains('app-dark');
    const surface100 = cssVar('--p-surface-100', '#f1f5f9');
    const surface900 = cssVar('--p-surface-900', '#0f172a');
    const surface400 = cssVar('--p-surface-400', '#94a3b8');
    const surface500 = cssVar('--p-surface-500', '#64748b');

    return {
      maintainAspectRatio: false,
      aspectRatio: 0.8,
      animation: false,
      plugins: { legend: { display: false } },
      scales: {
        x: {
          stacked: true,
          ticks: { color: darkMode ? surface500 : surface400 },
          grid: { display: false },
          border: { display: false },
        },
        y: {
          beginAtZero: true,
          stacked: true,
          ticks: { color: darkMode ? surface500 : surface400 },
          grid: { display: true, color: darkMode ? surface900 : surface100 },
          border: { display: false },
        },
      },
    };
  }

  // Apply a primary palette by overriding the Aura --p-primary-* tokens on
  // :root. Works for the Quasar pages (the Aura layer reads these vars). The
  // PrimeVue page additionally calls updatePrimaryPalette() so its runtime
  // theme stays in sync; see dashboard.primevue.html.
  function applyPrimaryPalette(name) {
    const palette = PALETTES[name] || PALETTES[DEFAULT_PALETTE];
    const root = document.documentElement.style;
    Object.keys(palette).forEach((shade) => {
      root.setProperty(`--p-primary-${shade}`, palette[shade]);
    });
  }

  window.DASHBOARD = {
    PALETTES,
    PALETTE_NAMES,
    DEFAULT_PALETTE,
    TIME_OPTIONS,
    MENU_ITEMS,
    TABLE_DATA,
    METERS_DATA,
    buildChartData,
    buildChartOptions,
    applyPrimaryPalette,
  };
})();
