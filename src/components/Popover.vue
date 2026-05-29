<template>
  <q-menu
    ref="menu"
    class="qpv-popover"
    :persistent="!dismissable"
    @show="onShow"
    @hide="onHide"
  >
    <div class="qpv-popover__content">
      <slot :close-callback="hide" />
    </div>
  </q-menu>
</template>

<script>
import { QMenu } from 'quasar';

// PrimeVue-compatible Popover (formerly OverlayPanel). Quasar's QMenu / QPopupProxy
// do not expose a standalone `toggle(event)` API that can be called from a
// separate trigger. This wrapper exposes `toggle`, `show`, and `hide` instance
// methods matching PrimeVue's `Popover` API, delegating to QMenu internally.
// API mirrors PrimeVue's `Popover`.
export default {
  name: 'PvPopover',
  components: { QMenu },
  props: {
    dismissable: { type: Boolean, default: true },
    closeOnEscape: { type: Boolean, default: true },
  },
  emits: ['show', 'hide'],
  data() {
    return { isVisible: false };
  },
  methods: {
    toggle(event) {
      if (this.isVisible) {
        this.$refs.menu.hide(event);
      } else {
        this.$refs.menu.show(event);
      }
    },
    show(event) {
      this.$refs.menu.show(event);
    },
    hide(event) {
      this.$refs.menu.hide(event);
    },
    onShow(event) {
      this.isVisible = true;
      this.$emit('show', event);
    },
    onHide(event) {
      this.isVisible = false;
      this.$emit('hide', event);
    },
  },
};
</script>
