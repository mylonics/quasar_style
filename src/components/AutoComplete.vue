<template>
  <q-select
    ref="select"
    v-model="innerValue"
    class="qpv-autocomplete"
    :class="{ 'qpv-autocomplete--fluid': fluid, 'qpv-autocomplete--disabled': disabled }"
    :options="filteredSuggestions"
    :multiple="multiple"
    :use-input="true"
    :input-debounce="0"
    :placeholder="placeholder"
    :disabled="disabled"
    :dense="dense"
    outlined
    use-chips
    emit-value
    map-options
    option-label="label"
    option-value="value"
    v-bind="$attrs"
    @filter="onFilter"
    @update:model-value="onSelect"
    @blur="$emit('blur', $event)"
    @focus="$emit('focus', $event)"
  >
    <template v-for="(_, name) in $slots" #[name]="slotProps">
      <slot :name="name" v-bind="slotProps ?? {}" />
    </template>
  </q-select>
</template>

<script>
import { QSelect } from 'quasar';

// PrimeVue-compatible AutoComplete. Quasar's QSelect `use-input` + `use-chips`
// covers most of the behaviour, but lacks PrimeVue's `@complete` event (fired
// with the current query) and the `suggestions` prop. This thin wrapper bridges
// that gap so consumers can drive filtering externally, matching PrimeVue's API.
// API mirrors PrimeVue's `AutoComplete`.
export default {
  name: 'PvAutoComplete',
  components: { QSelect },
  inheritAttrs: false,
  props: {
    // v-model — single value (object/string) or array when multiple
    modelValue: { type: [String, Number, Object, Array], default: null },
    suggestions: { type: Array, default: () => [] },
    field: { type: String, default: null },
    multiple: { type: Boolean, default: false },
    placeholder: { type: String, default: null },
    disabled: { type: Boolean, default: false },
    fluid: { type: Boolean, default: false },
    dense: { type: Boolean, default: false },
    completeOnFocus: { type: Boolean, default: false },
    forceSelection: { type: Boolean, default: false },
    minLength: { type: Number, default: 1 },
    delay: { type: Number, default: 300 },
    dropdownMode: {
      type: String,
      default: 'blank',
      validator: (v) => ['blank', 'current', 'disabled'].includes(v),
    },
  },
  emits: ['update:modelValue', 'complete', 'item-select', 'item-unselect', 'focus', 'blur', 'clear'],
  data() {
    return {
      query: '',
      filteredSuggestions: [],
      completeTimer: null,
    };
  },
  computed: {
    innerValue: {
      get() {
        return this.modelValue;
      },
      set(val) {
        this.$emit('update:modelValue', val);
      },
    },
  },
  watch: {
    suggestions(val) {
      this.filteredSuggestions = this.mapSuggestions(val);
    },
  },
  methods: {
    mapSuggestions(arr) {
      if (!arr || !arr.length) return [];
      return arr.map((item) => {
        if (typeof item === 'object' && item !== null) {
          return this.field
            ? { label: item[this.field], value: item }
            : { label: String(item.label ?? item.name ?? JSON.stringify(item)), value: item };
        }
        return { label: String(item), value: item };
      });
    },
    onFilter(inputVal, doneFn) {
      this.query = inputVal;
      // Map current suggestions synchronously if already populated
      doneFn(() => {
        this.filteredSuggestions = this.mapSuggestions(this.suggestions);
      });
      // Also fire @complete so the parent can re-populate suggestions
      if (inputVal.length >= this.minLength || (this.completeOnFocus && inputVal === '')) {
        clearTimeout(this.completeTimer);
        this.completeTimer = setTimeout(() => {
          this.$emit('complete', { originalEvent: null, query: inputVal });
        }, this.delay);
      }
    },
    onSelect(val) {
      if (!this.multiple) {
        this.$emit('item-select', { value: val });
      } else {
        const prev = Array.isArray(this.modelValue) ? this.modelValue : [];
        const next = Array.isArray(val) ? val : [];
        if (next.length >= prev.length) {
          const added = next.find((n) => !prev.includes(n));
          this.$emit('item-select', { value: added ?? val });
        } else {
          const removed = prev.find((p) => !next.includes(p));
          this.$emit('item-unselect', { value: removed ?? val });
        }
      }
    },
    clear() {
      this.innerValue = this.multiple ? [] : null;
      this.$emit('clear');
    },
  },
};
</script>
