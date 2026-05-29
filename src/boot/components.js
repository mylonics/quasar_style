// Quasar App Extension boot file: registers the Aura component library
// (the PrimeVue components Quasar lacks) globally in the host app. Wired up by
// src/index.js via `api.extendQuasarConf`.
import components from '../components/index.js';

export default ({ app }) => {
  app.use(components);
};
