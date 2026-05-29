<template>
  <div
    class="qpv-password"
    :class="{ 'qpv-password--fluid': fluid, 'qpv-password--disabled': disabled }"
  >
    <q-input
      :model-value="modelValue"
      :type="maskVisible ? 'text' : 'password'"
      :placeholder="placeholder"
      :disabled="disabled"
      :dense="dense"
      outlined
      class="qpv-password__input"
      v-bind="$attrs"
      @update:model-value="$emit('update:modelValue', $event)"
      @focus="handleFocus"
      @blur="handleBlur"
    >
      <template v-if="toggleMask" #append>
        <q-btn
          flat
          round
          dense
          :icon="maskVisible ? 'visibility_off' : 'visibility'"
          class="qpv-password__toggle"
          tabindex="-1"
          @click.stop="maskVisible = !maskVisible"
          @mousedown.prevent
        />
      </template>
    </q-input>

    <div v-if="feedback && isFocused && modelValue" class="qpv-password__panel">
      <slot name="header" />
      <slot name="content">
        <div class="qpv-password__meter">
          <div class="qpv-password__meter-bar">
            <div
              class="qpv-password__meter-fill"
              :class="`qpv-password__meter-fill--${strength}`"
              :style="{ width: strengthWidth }"
            />
          </div>
          <span class="qpv-password__meter-label">{{ strengthLabel }}</span>
        </div>
      </slot>
      <slot name="footer" />
    </div>
  </div>
</template>

<script>
import { QInput, QBtn } from 'quasar';

// PrimeVue-compatible Password. Quasar's QInput has no built-in strength meter
// or mask toggle. Built on QInput with an optional append button and a
// floating strength panel. API mirrors PrimeVue's `Password`.
export default {
  name: 'PvPassword',
  components: { QInput, QBtn },
  inheritAttrs: false,
  props: {
    // v-model
    modelValue: { type: String, default: null },
    toggleMask: { type: Boolean, default: false },
    feedback: { type: Boolean, default: true },
    placeholder: { type: String, default: null },
    disabled: { type: Boolean, default: false },
    fluid: { type: Boolean, default: false },
    dense: { type: Boolean, default: false },
    promptLabel: { type: String, default: 'Enter a password' },
    weakLabel: { type: String, default: 'Weak' },
    mediumLabel: { type: String, default: 'Medium' },
    strongLabel: { type: String, default: 'Strong' },
  },
  emits: ['update:modelValue', 'focus', 'blur'],
  data() {
    return {
      maskVisible: false,
      isFocused: false,
    };
  },
  computed: {
    strength() {
      const val = this.modelValue || '';
      if (!val) return 'weak';
      if (val.length < 8) return 'weak';
      const hasLower = /[a-z]/.test(val);
      const hasUpper = /[A-Z]/.test(val);
      const hasDigit = /[0-9]/.test(val);
      const hasSpecial = /[^A-Za-z0-9]/.test(val);
      const score = [hasLower, hasUpper, hasDigit, hasSpecial].filter(Boolean).length;
      if (score >= 3) return 'strong';
      if (score >= 2) return 'medium';
      return 'weak';
    },
    strengthLabel() {
      if (this.strength === 'strong') return this.strongLabel;
      if (this.strength === 'medium') return this.mediumLabel;
      return this.weakLabel;
    },
    strengthWidth() {
      if (this.strength === 'strong') return '100%';
      if (this.strength === 'medium') return '66%';
      return '33%';
    },
  },
  methods: {
    handleFocus(event) {
      this.isFocused = true;
      this.$emit('focus', event);
    },
    handleBlur(event) {
      this.isFocused = false;
      this.$emit('blur', event);
    },
  },
};
</script>
