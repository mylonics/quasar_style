<template>
  <div class="qpv-treetable">
    <div v-if="loading" class="qpv-treetable__loading">Loading...</div>
    <q-markup-table v-else class="qpv-treetable__table" flat bordered>
      <thead>
        <tr>
          <th v-for="column in columns" :key="column.field" :style="column.style" :class="column.class">
            {{ column.header }}
          </th>
        </tr>
      </thead>
      <tbody v-if="rows.length">
        <tr
          v-for="row in rows"
          :key="row.node.key"
          class="qpv-treetable__row"
          :class="{ 'qpv-treetable__row--selected': isSelected(row.node) }"
          @click="toggleSelection(row.node)"
        >
          <td
            v-for="(column, columnIndex) in columns"
            :key="`${row.node.key}-${column.field}`"
            :style="column.style"
            :class="column.class"
          >
            <div class="qpv-treetable__cell" :style="columnIndex === expanderColumnIndex ? { paddingLeft: `${row.level * 1.25}rem` } : null">
              <button
                v-if="column.expander && hasChildren(row.node)"
                type="button"
                class="qpv-treetable__toggler"
                @click.stop="toggleNode(row.node)"
              >
                {{ isExpanded(row.node) ? '−' : '+' }}
              </button>
              <span>{{ row.node.data?.[column.field] ?? row.node[column.field] ?? '' }}</span>
            </div>
          </td>
        </tr>
      </tbody>
      <tbody v-else>
        <tr>
          <td :colspan="columns.length || 1" class="qpv-treetable__empty">{{ emptyMessage }}</td>
        </tr>
      </tbody>
    </q-markup-table>
  </div>
</template>

<script>
import { QMarkupTable } from 'quasar';

// PrimeVue-compatible TreeTable. Flattens visible tree nodes into rows while
// keeping expander state and selection state compatible with PrimeVue.
// API mirrors PrimeVue's `TreeTable`.
export default {
  name: 'PvTreeTable',
  components: { QMarkupTable },
  props: {
    value: { type: Array, default: () => [] },
    columns: { type: Array, default: () => [] },
    expandedKeys: { type: Object, default: () => ({}) },
    selectionMode: { type: String, default: null },
    selectionKeys: { type: Object, default: () => ({}) },
    loading: { type: Boolean, default: false },
    emptyMessage: { type: String, default: 'No records found' },
    resizableColumns: { type: Boolean, default: false },
    scrollable: { type: Boolean, default: false },
    scrollHeight: { type: String, default: null },
  },
  emits: ['update:expandedKeys', 'update:selectionKeys', 'node-select', 'node-unselect', 'node-expand', 'node-collapse', 'column-resize-end'],
  computed: {
    expanderColumnIndex() {
      const index = this.columns.findIndex((column) => column.expander);
      return index === -1 ? 0 : index;
    },
    rows() {
      return this.flattenNodes(this.value);
    },
  },
  methods: {
    flattenNodes(nodes, level = 0, rows = []) {
      nodes.forEach((node) => {
        rows.push({ node, level });
        if (this.hasChildren(node) && this.isExpanded(node)) {
          this.flattenNodes(node.children, level + 1, rows);
        }
      });
      return rows;
    },
    hasChildren(node) {
      return Array.isArray(node.children) && node.children.length > 0;
    },
    isExpanded(node) {
      return Boolean(this.expandedKeys[node.key]);
    },
    toggleNode(node) {
      const next = { ...this.expandedKeys };
      if (next[node.key]) {
        delete next[node.key];
        this.$emit('node-collapse', node);
      }
      else {
        next[node.key] = true;
        this.$emit('node-expand', node);
      }
      this.$emit('update:expandedKeys', next);
    },
    isSelected(node) {
      return Boolean(this.selectionKeys[node.key]);
    },
    toggleSelection(node) {
      if (!this.selectionMode) {
        return;
      }

      let next = this.selectionMode === 'single' ? {} : { ...this.selectionKeys };
      if (this.isSelected(node)) {
        delete next[node.key];
        this.$emit('node-unselect', node);
      }
      else {
        next[node.key] = true;
        this.$emit('node-select', node);
      }
      this.$emit('update:selectionKeys', next);
    },
  },
};
</script>
