<template>
  <div class="qpv-inputmask" :class="{ 'qpv-inputmask--fluid': fluid }">
    <q-input
      :model-value="innerValue"
      :mask="quasarMask"
      :fill-mask="slotChar"
      :placeholder="placeholder"
      :disabled="disabled"
      :dense="dense"
      outlined
      class="qpv-inputmask__input"
      v-bind="$attrs"
      @update:model-value="onInput"
      @focus="$emit('focus', $event)"
      @blur="onBlur"
    />
  </div>
</template>

<script>
import { QInput } from 'quasar';

const MASK_MAP = {
  9: '#',
  a: 'A',
  '*': 'X',
};

// PrimeVue-compatible InputMask. Wraps QInput and translates PrimeVue mask
// tokens to Quasar's mask syntax. API mirrors PrimeVue's `InputMask`.
export default {
  name: 'PvInputMask',
  components: { QInput },
  inheritAttrs: false,
  props: {
    modelValue: { type: String, default: null },
    mask: { type: String, required: true },
    slotChar: { type: String, default: '_' },
    autoClear: { type: Boolean, default: true },
    placeholder: { type: String, default: null },
    disabled: { type: Boolean, default: false },
    fluid: { type: Boolean, default: false },
    dense: { type: Boolean, default: false },
  },
  emits: ['update:modelValue', 'focus', 'blur', 'complete'],
  data() {
    return {
      innerValue: this.modelValue,
    };
  },
  computed: {
    quasarMask() {
      return (this.mask || '')
        .split('')
        .map((char) => MASK_MAP[char] || char)
        .join('');
    },
  },
  watch: {
    modelValue(value) {
      this.innerValue = value;
    },
  },
  methods: {
    isComplete(value) {
      if (!value) {
        return false;
      }

      return value.length === this.mask.length && value.includes(this.slotChar) === false;
    },
    onInput(value) {
      this.innerValue = value;
      this.$emit('update:modelValue', value);

      if (this.isComplete(value)) {
        this.$emit('complete', value);
      }
    },
    onBlur(event) {
      if (this.autoClear && this.innerValue && this.innerValue.includes(this.slotChar)) {
        this.innerValue = '';
        this.$emit('update:modelValue', '');
      }

      this.$emit('blur', event);
    },
  },
};
</script>
