<template>
  <div class="qpv-cascadeselect" :class="{ 'qpv-cascadeselect--fluid': fluid, 'qpv-cascadeselect--disabled': disabled }">
    <q-btn
      ref="trigger"
      outline
      no-caps
      unelevated
      class="qpv-cascadeselect__trigger"
      :disable="disabled"
      :label="displayLabel || placeholder"
      @click="$refs.menu.toggle()"
      @focus="$emit('focus', $event)"
      @blur="$emit('blur', $event)"
    />

    <q-menu ref="menu" class="qpv-cascadeselect__menu" @show="$emit('show')" @hide="$emit('hide')">
      <div class="qpv-cascadeselect__panels">
        <div
          v-for="(panelOptions, level) in panels"
          :key="level"
          class="qpv-cascadeselect__panel"
        >
          <q-list dense>
            <q-item
              v-for="option in panelOptions"
              :key="getOptionKey(option, level)"
              clickable
              :disable="option.disabled"
              class="qpv-cascadeselect__item"
              @click="onOptionClick(option, level)"
            >
              <q-item-section>{{ getLabel(option) }}</q-item-section>
              <q-item-section v-if="getChildren(option, level).length" side>
                <q-icon name="chevron_right" />
              </q-item-section>
            </q-item>
          </q-list>
        </div>
      </div>
    </q-menu>
  </div>
</template>

<script>
import { QBtn, QMenu, QList, QItem, QItemSection, QIcon } from 'quasar';

// PrimeVue-compatible CascadeSelect. Uses a single QMenu with adjacent panels
// to navigate nested option groups and emit selection changes.
// API mirrors PrimeVue's `CascadeSelect`.
export default {
  name: 'PvCascadeSelect',
  components: { QBtn, QMenu, QList, QItem, QItemSection, QIcon },
  props: {
    modelValue: { type: null, default: null },
    options: { type: Array, default: () => [] },
    optionLabel: { type: String, default: 'label' },
    optionValue: { type: String, default: 'value' },
    optionGroupLabel: { type: String, default: 'label' },
    optionGroupChildren: { type: [String, Array], default: 'items' },
    placeholder: { type: String, default: 'Select' },
    disabled: { type: Boolean, default: false },
    fluid: { type: Boolean, default: false },
  },
  emits: ['update:modelValue', 'change', 'group-change', 'focus', 'blur', 'hide', 'show'],
  data() {
    return {
      activePath: [],
    };
  },
  computed: {
    panels() {
      const panels = [this.options];
      this.activePath.forEach((option, level) => {
        const children = this.getChildren(option, level);
        if (children.length) {
          panels.push(children);
        }
      });
      return panels;
    },
    displayLabel() {
      const match = this.findSelected(this.options);
      return match ? this.getLabel(match) : '';
    },
  },
  methods: {
    getChildrenKey(level) {
      return Array.isArray(this.optionGroupChildren)
        ? this.optionGroupChildren[level] || this.optionGroupChildren[this.optionGroupChildren.length - 1]
        : this.optionGroupChildren;
    },
    getChildren(option, level = 0) {
      const key = this.getChildrenKey(level);
      return Array.isArray(option?.[key]) ? option[key] : [];
    },
    getLabel(option) {
      return option?.[this.optionLabel] ?? option?.[this.optionGroupLabel] ?? '';
    },
    getValue(option) {
      return option?.[this.optionValue] ?? this.getLabel(option);
    },
    getOptionKey(option, level) {
      return `${level}-${this.getValue(option)}`;
    },
    findSelected(options) {
      for (const option of options) {
        if (this.getValue(option) === this.modelValue) {
          return option;
        }
        const match = this.findSelected(this.getChildren(option));
        if (match) {
          return match;
        }
      }
      return null;
    },
    onOptionClick(option, level) {
      const children = this.getChildren(option, level);
      this.activePath = this.activePath.slice(0, level);

      if (children.length) {
        this.activePath.push(option);
        this.$emit('group-change', { originalEvent: null, value: option, level });
        return;
      }

      const value = this.getValue(option);
      this.$emit('update:modelValue', value);
      this.$emit('change', { originalEvent: null, value, option });
      this.$refs.menu.hide();
    },
  },
};
</script>
