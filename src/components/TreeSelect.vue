<template>
  <div class="qpv-treeselect" :class="{ 'qpv-treeselect--fluid': fluid, 'qpv-treeselect--disabled': disabled }">
    <div
      class="qpv-treeselect__trigger"
      tabindex="0"
      @click="toggle"
      @focus="$emit('focus', $event)"
      @blur="$emit('blur', $event)"
    >
      <span :class="{ 'qpv-treeselect__placeholder': !displayLabel }">{{ displayLabel || placeholder }}</span>
      <q-icon name="expand_more" />
    </div>

    <q-menu ref="menu" class="qpv-treeselect__menu" @show="$emit('show')" @hide="$emit('hide')">
      <div class="qpv-treeselect__panel">
        <div v-if="normalizedNodes.length === 0" class="qpv-treeselect__empty">{{ emptyMessage }}</div>
        <q-tree
          v-else
          :nodes="normalizedNodes"
          node-key="key"
          :selected="selectedKey"
          :ticked="tickedKeys"
          :tick-strategy="selectionMode === 'checkbox' ? 'leaf' : 'none'"
          @update:selected="onSelectedChange"
          @update:ticked="onTickedChange"
        />
      </div>
    </q-menu>
  </div>
</template>

<script>
import { QMenu, QTree, QIcon } from 'quasar';

// PrimeVue-compatible TreeSelect. Displays a QTree inside a dropdown menu and
// mirrors PrimeVue's single / multiple / checkbox selection models.
// API mirrors PrimeVue's `TreeSelect`.
export default {
  name: 'PvTreeSelect',
  components: { QMenu, QTree, QIcon },
  props: {
    modelValue: { type: [Object, Array, String], default: null },
    options: { type: Array, default: () => [] },
    selectionMode: {
      type: String,
      default: 'single',
      validator: (value) => ['single', 'multiple', 'checkbox'].includes(value),
    },
    placeholder: { type: String, default: 'Select' },
    disabled: { type: Boolean, default: false },
    fluid: { type: Boolean, default: false },
    emptyMessage: { type: String, default: 'No options found' },
  },
  emits: ['update:modelValue', 'change', 'node-select', 'node-unselect', 'show', 'hide', 'focus', 'blur'],
  computed: {
    normalizedNodes() {
      return this.normalizeNodes(this.options);
    },
    selectedKey() {
      return this.selectionMode === 'single' ? this.modelValue : null;
    },
    tickedKeys() {
      if (this.selectionMode === 'single' || !this.modelValue) {
        return [];
      }
      return Array.isArray(this.modelValue) ? this.modelValue : Object.keys(this.modelValue).filter((key) => this.modelValue[key]);
    },
    displayLabel() {
      const labels = [];
      const selectedKeys = this.selectionMode === 'single'
        ? [this.selectedKey].filter(Boolean)
        : this.tickedKeys;
      selectedKeys.forEach((key) => {
        const node = this.findNodeByKey(this.normalizedNodes, key);
        if (node) {
          labels.push(node.label);
        }
      });
      return labels.join(', ');
    },
  },
  methods: {
    toggle() {
      if (!this.disabled) {
        this.$refs.menu.toggle();
      }
    },
    normalizeNodes(nodes = []) {
      return nodes.map((node, index) => ({
        ...node,
        key: node.key ?? node.value ?? node.label ?? `node-${index}`,
        label: node.label ?? node.name ?? node.title ?? '',
        children: this.normalizeNodes(node.children || node.items || []),
      }));
    },
    findNodeByKey(nodes, key) {
      for (const node of nodes) {
        if (node.key === key) {
          return node;
        }
        const nested = this.findNodeByKey(node.children || [], key);
        if (nested) {
          return nested;
        }
      }
      return null;
    },
    onSelectedChange(key) {
      const node = this.findNodeByKey(this.normalizedNodes, key);
      this.$emit('update:modelValue', key);
      this.$emit('change', { value: key, node });
      this.$emit('node-select', node);
      this.$refs.menu.hide();
    },
    onTickedChange(keys) {
      const value = Object.fromEntries(keys.map((key) => [key, true]));
      this.$emit('update:modelValue', value);
      this.$emit('change', { value, keys });
      this.$emit('node-select', keys.map((key) => this.findNodeByKey(this.normalizedNodes, key)));
    },
  },
};
</script>
