// Vite library build that bundles the Aura component library (src/components)
// into a UMD global for the static playground, which loads Vue and Quasar as
// browser globals (window.Vue / window.Quasar). Invoked by build-playground.mjs.
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [vue()],
  build: {
    outDir: fileURLToPath(new URL('../playground/vendor', import.meta.url)),
    emptyOutDir: false,
    lib: {
      entry: fileURLToPath(new URL('../src/components/index.js', import.meta.url)),
      name: 'QuasarAuraComponents',
      formats: ['umd'],
      fileName: () => 'aura-components.js',
    },
    rollupOptions: {
      external: ['vue', 'quasar'],
      output: {
        globals: { vue: 'Vue', quasar: 'Quasar' },
      },
    },
  },
});
