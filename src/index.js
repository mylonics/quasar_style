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

  // Register the theme stylesheet and the component-library boot file. The `~`
  // prefix resolves to node_modules, letting Quasar's build compile the SCSS
  // (and its `--p-*` token layer) and bundle the boot file.
  //
  // The preset is chosen at install time (see src/prompts.js); it defaults to
  // Aura. Each preset has its own compiled entry (primevue-<theme>.scss) that
  // shares the same component overrides but swaps the `--p-*` token layer.
  const SUPPORTED_THEMES = ['aura', 'material', 'lara', 'nora'];
  const requested = (api.prompts && api.prompts.theme) || 'aura';
  const theme = SUPPORTED_THEMES.includes(requested) ? requested : 'aura';

  api.extendQuasarConf((conf) => {
    const css = `~quasar-app-extension-primevue-aura/src/css/primevue-${theme}.scss`;
    if (!conf.css.includes(css)) {
      conf.css.push(css);
    }

    // Boot file registers the components Quasar lacks (DataView, Fieldset,
    // MeterGroup, Inplace, OrderList, PickList) globally. See src/components.
    const boot = '~quasar-app-extension-primevue-aura/src/boot/components.js';
    if (!conf.boot.includes(boot)) {
      conf.boot.push(boot);
    }
  });
};
