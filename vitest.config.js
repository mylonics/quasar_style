import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vitest/config';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      // Force the browser build; under Vitest's SSR transform the default
      // `node` export condition resolves to Quasar's SSR build, which throws
      // on install in a happy-dom (non-SSR) context.
      quasar: fileURLToPath(new URL('./node_modules/quasar/dist/quasar.client.js', import.meta.url)),
    },
  },
  test: {
    environment: 'happy-dom',
    globals: true,
    server: { deps: { inline: ['quasar'] } },
    setupFiles: [fileURLToPath(new URL('./test/setup.js', import.meta.url))],
    include: ['test/**/*.spec.js'],
  },
});
