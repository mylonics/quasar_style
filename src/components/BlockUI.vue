<template>
  <div
    class="qpv-blockui"
    :class="{ 'qpv-blockui--blocked': blocked, 'qpv-blockui--full-page': fullPage }"
  >
    <slot />
    <transition name="qpv-blockui-fade">
      <div v-if="blocked" class="qpv-blockui__mask">
        <slot name="overlay">
          <q-spinner class="qpv-blockui__spinner" size="2rem" />
        </slot>
      </div>
    </transition>
  </div>
</template>

<script>
import { QSpinner } from 'quasar';

// PrimeVue-compatible BlockUI. Quasar's QInnerLoading is close but lacks the
// API surface (blocked/fullPage props) and styling tokens. Built as a thin
// wrapper that positions an overlay mask over the default slot content.
// API mirrors PrimeVue's `BlockUI`.
export default {
  name: 'PvBlockUI',
  components: { QSpinner },
  props: {
    blocked: { type: Boolean, default: false },
    fullPage: { type: Boolean, default: false },
  },
};
</script>
