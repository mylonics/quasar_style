<template>
  <div class="qpv-orderlist">
    <div class="qpv-orderlist__controls">
      <slot name="controlsstart" />
      <q-btn flat round dense icon="keyboard_arrow_up" aria-label="Move up"
        :disable="!canMove" @click="moveUp" />
      <q-btn flat round dense icon="keyboard_double_arrow_up" aria-label="Move to top"
        :disable="!canMove" @click="moveTop" />
      <q-btn flat round dense icon="keyboard_arrow_down" aria-label="Move down"
        :disable="!canMove" @click="moveDown" />
      <q-btn flat round dense icon="keyboard_double_arrow_down" aria-label="Move to bottom"
        :disable="!canMove" @click="moveBottom" />
      <slot name="controlsend" />
    </div>

    <div class="qpv-orderlist__list-wrap">
      <div v-if="$slots.header" class="qpv-orderlist__header">
        <slot name="header" />
      </div>
      <q-list class="qpv-orderlist__list">
        <q-item
          v-for="(item, index) in modelValue"
          :key="keyOf(item, index)"
          clickable
          :active="isSelected(item)"
          class="qpv-orderlist__item"
          @click="onItemClick(item, $event)"
        >
          <q-item-section>
            <slot name="item" :item="item" :index="index">{{ item }}</slot>
          </q-item-section>
        </q-item>
      </q-list>
    </div>
  </div>
</template>

<script>
import { QBtn, QList, QItem, QItemSection } from 'quasar';

// PrimeVue-compatible OrderList. Quasar has no reorderable list with controls.
// Built on QList/QItem + QBtn. API mirrors PrimeVue's `OrderList`.
export default {
  name: 'PvOrderList',
  components: { QBtn, QList, QItem, QItemSection },
  props: {
    modelValue: { type: Array, default: () => [] },
    selection: { type: Array, default: () => [] },
    dataKey: { type: String, default: null },
    metaKeySelection: { type: Boolean, default: false },
  },
  emits: ['update:modelValue', 'update:selection', 'reorder', 'selection-change'],
  computed: {
    canMove() {
      return this.selection.length > 0;
    },
  },
  methods: {
    keyOf(item, index) {
      if (this.dataKey && item && typeof item === 'object') return item[this.dataKey];
      return index;
    },
    sameItem(a, b) {
      if (this.dataKey && a && b && typeof a === 'object' && typeof b === 'object') {
        return a[this.dataKey] === b[this.dataKey];
      }
      return a === b;
    },
    indexOf(item, list = this.modelValue) {
      return list.findIndex((i) => this.sameItem(i, item));
    },
    isSelected(item) {
      return this.selection.some((s) => this.sameItem(s, item));
    },
    selectedIndices() {
      return this.selection
        .map((s) => this.indexOf(s))
        .filter((i) => i >= 0)
        .sort((a, b) => a - b);
    },
    onItemClick(item, event) {
      const selected = this.isSelected(item);
      let next;
      const additive = this.metaKeySelection ? event.metaKey || event.ctrlKey : true;
      if (selected) {
        next = this.selection.filter((s) => !this.sameItem(s, item));
      } else if (additive) {
        next = [...this.selection, item];
      } else {
        next = [item];
      }
      this.$emit('update:selection', next);
      this.$emit('selection-change', { originalEvent: event, value: next });
    },
    emitReorder(value, event) {
      this.$emit('update:modelValue', value);
      this.$emit('reorder', { originalEvent: event, value, direction: event });
    },
    moveUp(event) {
      const idxs = this.selectedIndices();
      if (!idxs.length || idxs[0] === 0) return;
      const value = [...this.modelValue];
      for (const idx of idxs) {
        const tmp = value[idx - 1];
        value[idx - 1] = value[idx];
        value[idx] = tmp;
      }
      this.emitReorder(value, event);
    },
    moveDown(event) {
      const idxs = this.selectedIndices().sort((a, b) => b - a);
      if (!idxs.length || idxs[0] === this.modelValue.length - 1) return;
      const value = [...this.modelValue];
      for (const idx of idxs) {
        const tmp = value[idx + 1];
        value[idx + 1] = value[idx];
        value[idx] = tmp;
      }
      this.emitReorder(value, event);
    },
    moveTop(event) {
      const idxs = this.selectedIndices();
      if (!idxs.length) return;
      const selected = idxs.map((i) => this.modelValue[i]);
      const rest = this.modelValue.filter((_, i) => !idxs.includes(i));
      this.emitReorder([...selected, ...rest], event);
    },
    moveBottom(event) {
      const idxs = this.selectedIndices();
      if (!idxs.length) return;
      const selected = idxs.map((i) => this.modelValue[i]);
      const rest = this.modelValue.filter((_, i) => !idxs.includes(i));
      this.emitReorder([...rest, ...selected], event);
    },
  },
};
</script>
