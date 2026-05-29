<template>
  <fieldset
    class="qpv-fieldset"
    :class="{ 'qpv-fieldset--toggleable': toggleable }"
  >
    <legend class="qpv-fieldset__legend">
      <component
        :is="toggleable ? 'button' : 'span'"
        :type="toggleable ? 'button' : undefined"
        class="qpv-fieldset__legend-inner"
        :aria-expanded="toggleable ? !isCollapsed : undefined"
        @click="toggleable && toggle($event)"
      >
        <q-icon
          v-if="toggleable"
          :name="isCollapsed ? expandIcon : collapseIcon"
          class="qpv-fieldset__toggler"
        />
        <slot name="legend" :collapsed="isCollapsed">
          <span class="qpv-fieldset__legend-text">{{ legend }}</span>
        </slot>
      </component>
    </legend>

    <q-slide-transition>
      <div v-show="!isCollapsed" class="qpv-fieldset__content-wrap">
        <div class="qpv-fieldset__content">
          <slot />
        </div>
      </div>
    </q-slide-transition>
  </fieldset>
</template>

<script>
import { QIcon, QSlideTransition } from 'quasar';

// PrimeVue-compatible Fieldset. Quasar has no titled/legend group with an
// optional collapse toggle. Built on QSlideTransition for the Quasar-native
// expand animation. API mirrors PrimeVue's `Fieldset`.
export default {
  name: 'PvFieldset',
  components: { QIcon, QSlideTransition },
  props: {
    legend: { type: String, default: '' },
    toggleable: { type: Boolean, default: false },
    // v-model:collapsed
    collapsed: { type: Boolean, default: false },
    collapseIcon: { type: String, default: 'expand_more' },
    expandIcon: { type: String, default: 'chevron_right' },
  },
  emits: ['update:collapsed', 'toggle'],
  data() {
    return { innerCollapsed: this.collapsed };
  },
  computed: {
    isCollapsed() {
      return this.innerCollapsed;
    },
  },
  watch: {
    collapsed(val) {
      this.innerCollapsed = val;
    },
  },
  methods: {
    toggle(event) {
      const next = !this.isCollapsed;
      this.innerCollapsed = next;
      this.$emit('update:collapsed', next);
      this.$emit('toggle', { originalEvent: event, value: next });
    },
  },
};
</script>
