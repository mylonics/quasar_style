<template>
  <div class="qpv-inplace" :class="{ 'qpv-inplace--disabled': disabled }">
    <div
      v-if="!isActive"
      class="qpv-inplace__display"
      role="button"
      tabindex="0"
      :aria-disabled="disabled"
      @click="open($event)"
      @keydown.enter.prevent="open($event)"
      @keydown.space.prevent="open($event)"
    >
      <slot name="display" />
    </div>

    <div v-else class="qpv-inplace__content">
      <slot name="content" :close-callback="close" />
      <q-btn
        v-if="closable"
        flat
        round
        dense
        class="qpv-inplace__close"
        :icon="closeIcon"
        :aria-label="closeAriaLabel"
        @click="close($event)"
      />
    </div>
  </div>
</template>

<script>
import { QBtn } from 'quasar';

// PrimeVue-compatible Inplace (click-to-edit container). Quasar's QPopupEdit is
// popover-based; Inplace swaps inline display/editor content. API mirrors
// PrimeVue's `Inplace`.
export default {
  name: 'PvInplace',
  components: { QBtn },
  props: {
    // v-model:active
    active: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
    closable: { type: Boolean, default: false },
    closeIcon: { type: String, default: 'close' },
    closeAriaLabel: { type: String, default: 'Close' },
  },
  emits: ['update:active', 'open', 'close'],
  data() {
    return { innerActive: this.active };
  },
  computed: {
    isActive() {
      return this.innerActive;
    },
  },
  watch: {
    active(val) {
      this.innerActive = val;
    },
  },
  methods: {
    open(event) {
      if (this.disabled) return;
      this.innerActive = true;
      this.$emit('update:active', true);
      this.$emit('open', event);
    },
    close(event) {
      this.innerActive = false;
      this.$emit('update:active', false);
      this.$emit('close', event);
    },
  },
};
</script>
