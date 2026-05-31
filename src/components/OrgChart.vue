<template>
  <div class="qpv-orgchart">
    <org-chart-node
      v-if="value"
      :node="value"
      :selection-mode="selectionMode"
      :selection-keys="selectionKeys"
      :slot-renderer="$slots.default"
      @toggle-select="toggleSelect"
    />
  </div>
</template>

<script>
import { h } from 'vue';

const OrgChartNode = {
  name: 'OrgChartNode',
  props: {
    node: { type: Object, required: true },
    selectionMode: { type: String, default: null },
    selectionKeys: { type: Object, default: () => ({}) },
    slotRenderer: { type: Function, default: null },
  },
  emits: ['toggle-select'],
  methods: {
    onClick() {
      this.$emit('toggle-select', this.node);
    },
  },
  render() {
    const selected = Boolean(this.selectionKeys[this.node.key]);
    const content = this.slotRenderer
      ? this.slotRenderer({ node: this.node })
      : [h('span', this.node.label)];

    return h('div', { class: 'qpv-orgchart__branch' }, [
      h('div', {
        class: ['qpv-orgchart__node', selected && 'qpv-orgchart__node--selected'],
        onClick: this.onClick,
      }, content),
      Array.isArray(this.node.children) && this.node.children.length
        ? h('div', { class: 'qpv-orgchart__children' },
            this.node.children.map((child) => h(OrgChartNode, {
              key: child.key,
              node: child,
              selectionMode: this.selectionMode,
              selectionKeys: this.selectionKeys,
              slotRenderer: this.slotRenderer,
              onToggleSelect: (node) => this.$emit('toggle-select', node),
            }))
          )
        : null,
    ]);
  },
};

// PrimeVue-compatible OrgChart. Recursively renders organization nodes with a
// simple line-based layout and optional single-node selection.
// API mirrors PrimeVue's `OrgChart`.
export default {
  name: 'PvOrgChart',
  components: { OrgChartNode },
  props: {
    value: { type: Object, default: null },
    selectionMode: { type: String, default: null },
    selectionKeys: { type: Object, default: () => ({}) },
  },
  emits: ['update:selectionKeys', 'node-select', 'node-unselect'],
  methods: {
    toggleSelect(node) {
      if (!this.selectionMode) {
        return;
      }

      const next = this.selectionMode === 'multiple' ? { ...this.selectionKeys } : {};
      if (!this.selectionKeys[node.key]) {
        next[node.key] = true;
        this.$emit('node-select', node);
      }
      else {
        delete next[node.key];
        this.$emit('node-unselect', node);
      }
      this.$emit('update:selectionKeys', next);
    },
  },
};
</script>
