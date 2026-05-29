<template>
  <div
    class="qpv-focustrap"
    :class="{ 'qpv-focustrap--disabled': disabled, 'qpv-focustrap--active': isActive }"
    tabindex="-1"
    @keydown.tab.prevent="onTab"
  >
    <slot />
  </div>
</template>

<script>
// PrimeVue-compatible FocusTrap. Quasar does not expose a standalone focus trap,
// so this wrapper cycles Tab / Shift+Tab within its focusable descendants.
// API mirrors PrimeVue's `FocusTrap`.
export default {
  name: 'PvFocusTrap',
  props: {
    disabled: { type: Boolean, default: false },
    active: { type: Boolean, default: true },
  },
  emits: ['update:active'],
  computed: {
    isActive() {
      return this.disabled === false && this.active === true;
    },
  },
  methods: {
    setActive(value) {
      this.$emit('update:active', value);
    },
    getFocusableElements() {
      return Array.from(
        this.$el.querySelectorAll(
          'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
        )
      ).filter((el) => el.offsetParent !== null || el === document.activeElement);
    },
    onTab(event) {
      if (this.isActive === false) {
        return;
      }

      const focusables = this.getFocusableElements();
      if (focusables.length === 0) {
        return;
      }

      this.setActive(true);
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      const current = document.activeElement;

      if (event.shiftKey) {
        if (current === first || this.$el === current) {
          last.focus();
        }
        else {
          focusables[Math.max(focusables.indexOf(current) - 1, 0)].focus();
        }
      }
      else if (current === last) {
        first.focus();
      }
      else {
        focusables[Math.min(focusables.indexOf(current) + 1, focusables.length - 1)].focus();
      }
    },
  },
};
</script>
