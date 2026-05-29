<template>
  <div class="qpv-deferredcontent">
    <q-intersection class="qpv-deferredcontent__sentinel" once @visibility="onVisibility" />
    <div v-if="loaded" class="qpv-deferredcontent__content">
      <slot />
    </div>
  </div>
</template>

<script>
import { QIntersection } from 'quasar';

// PrimeVue-compatible DeferredContent. Quasar's QIntersection provides the
// viewport observer; this wrapper renders slot content after the first visible
// intersection. API mirrors PrimeVue's `DeferredContent`.
export default {
  name: 'PvDeferredContent',
  components: { QIntersection },
  emits: ['load'],
  data() {
    return { loaded: false };
  },
  methods: {
    onVisibility(visible) {
      if (visible && this.loaded === false) {
        this.loaded = true;
        this.$emit('load');
      }
    },
  },
};
</script>
