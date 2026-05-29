<template>
  <div class="qpv-dock" :class="[`qpv-dock--${position}`, { 'qpv-dock--magnify': magnification }]" @focusin="$emit('focus', $event)" @focusout="$emit('blur', $event)">
    <q-btn
      v-for="item in model"
      :key="item.label"
      flat
      round
      :icon="item.icon"
      :class="['qpv-dock__item', item.class]"
      @click="executeItem(item, $event)"
    >
      <q-tooltip>{{ item.label }}</q-tooltip>
    </q-btn>
  </div>
</template>

<script>
import { QBtn, QTooltip } from 'quasar';

// PrimeVue-compatible Dock. Provides a fixed-position launcher bar with hover
// magnification styling and item command callbacks.
// API mirrors PrimeVue's `Dock`.
export default {
  name: 'PvDock',
  components: { QBtn, QTooltip },
  props: {
    model: { type: Array, default: () => [] },
    position: {
      type: String,
      default: 'bottom',
      validator: (value) => ['bottom', 'top', 'left', 'right'].includes(value),
    },
    magnification: { type: Boolean, default: true },
  },
  emits: ['focus', 'blur'],
  methods: {
    executeItem(item, event) {
      item.command?.({ originalEvent: event, item });
    },
  },
};
</script>
