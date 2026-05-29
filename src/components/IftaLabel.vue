<template>
  <div class="qpv-iftalabel">
    <slot />
  </div>
</template>

<script>
// PrimeVue-compatible IftaLabel. Wraps an input and positions any nested label
// in an in-field top-aligned layout. API mirrors PrimeVue's `IftaLabel`.
export default {
  name: 'PvIftaLabel',
};
</script>
