// Global test setup: install Quasar so the new components (which build on
// Quasar primitives such as QBtn, QList, QPagination) render in @vue/test-utils.
import { config } from '@vue/test-utils';
import { Quasar } from 'quasar';

config.global.plugins = [[Quasar, {}]];
