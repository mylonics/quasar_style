<template>
  <div
    class="qpv-iconfield"
    :class="[`qpv-iconfield--${iconPosition}`]"
  >
    <slot />
  </div>
</template>

<script>
// PrimeVue-compatible IconField. Provides a positioning wrapper so an icon can
// sit inside an input field. API mirrors PrimeVue's `IconField`.
export default {
  name: 'PvIconField',
  props: {
    iconPosition: {
      type: String,
      default: 'left',
      validator: (value) => ['left', 'right'].includes(value),
    },
  },
};
</script>
