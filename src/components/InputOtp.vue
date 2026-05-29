<template>
  <div class="qpv-inputotp" :class="{ 'qpv-inputotp--disabled': disabled }">
    <input
      v-for="(_, index) in inputCount"
      :key="index"
      ref="inputs"
      class="qpv-inputotp__input"
      :type="mask ? 'password' : 'text'"
      :value="values[index]"
      :disabled="disabled"
      maxlength="1"
      autocomplete="one-time-code"
      @input="onInput(index, $event)"
      @keydown="onKeydown(index, $event)"
      @paste="onPaste($event)"
      @focus="$emit('focus', $event)"
      @blur="$emit('blur', $event)"
    />
  </div>
</template>

<script>
// PrimeVue-compatible InputOtp. Splits an OTP value into individual inputs with
// auto-advance, backspace navigation, and paste support.
// API mirrors PrimeVue's `InputOtp`.
export default {
  name: 'PvInputOtp',
  props: {
    modelValue: { type: [String, Array], default: null },
    length: { type: Number, default: 4 },
    mask: { type: Boolean, default: false },
    integerOnly: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
  },
  emits: ['update:modelValue', 'change', 'focus', 'blur'],
  data() {
    return {
      values: this.normalizeValue(this.modelValue),
    };
  },
  computed: {
    inputCount() {
      return Array.from({ length: this.length });
    },
  },
  watch: {
    modelValue(value) {
      this.values = this.normalizeValue(value);
    },
    length() {
      this.values = this.normalizeValue(this.modelValue);
    },
  },
  methods: {
    normalizeValue(value) {
      const chars = Array.isArray(value)
        ? value.join('').split('')
        : String(value || '').split('');

      return Array.from({ length: this.length }, (_, index) => chars[index] || '');
    },
    emitValue() {
      const value = this.values.join('');
      this.$emit('update:modelValue', value);
      this.$emit('change', value);
    },
    focusInput(index) {
      const target = this.$refs.inputs?.[index];
      if (target) {
        target.focus();
        target.select?.();
      }
    },
    sanitize(char) {
      if (!char) {
        return '';
      }

      return this.integerOnly ? char.replace(/\D/g, '') : char.slice(0, 1);
    },
    onInput(index, event) {
      const next = this.sanitize(event.target.value);
      this.values.splice(index, 1, next);
      this.emitValue();

      if (next && index < this.length - 1) {
        this.$nextTick(() => this.focusInput(index + 1));
      }
    },
    onKeydown(index, event) {
      if (event.key === 'Backspace' && !this.values[index] && index > 0) {
        this.focusInput(index - 1);
      }
    },
    onPaste(event) {
      event.preventDefault();
      const raw = (event.clipboardData?.getData('text') || '').split('');
      const chars = this.integerOnly ? raw.filter((char) => /\d/.test(char)) : raw;
      this.values = Array.from({ length: this.length }, (_, index) => chars[index] || '');
      this.emitValue();
      this.$nextTick(() => this.focusInput(Math.min(chars.length, this.length - 1)));
    },
  },
};
</script>
