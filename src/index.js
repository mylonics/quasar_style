/**
 * Quasar App Extension index script.
 *
 * Injects the PrimeVue v4 "Aura" theme stylesheet into the host Quasar app so
 * that Quasar's components adopt the Aura look. Runs at dev/build time.
 *
 * See: https://quasar.dev/app-extensions/development-guide/index-api
 */
module.exports = function (api) {
  // This extension targets the Vue 3 line of Quasar. Quasar v3 is API-compatible
  // for App Extensions; widen this range once v3 is released.
  api.compatibleWith('quasar', '>=2.0.0 <4.0.0');

  if (api.hasVite) {
    api.compatibleWith('@quasar/app-vite', '>=1.0.0 <3.0.0');
  } else {
    api.compatibleWith('@quasar/app-webpack', '>=3.0.0 <5.0.0');
  }

  // Register the theme stylesheet. The `~` prefix resolves to node_modules,
  // letting Quasar's build compile the SCSS (and its `--p-*` token layer).
  api.extendQuasarConf((conf) => {
    const css = '~quasar-app-extension-primevue-aura/src/css/primevue-aura.scss';
    if (!conf.css.includes(css)) {
      conf.css.push(css);
    }
  });
};
