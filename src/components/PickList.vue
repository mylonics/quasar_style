<template>
  <div class="qpv-picklist">
    <div class="qpv-picklist__list-wrap qpv-picklist__source">
      <div v-if="$slots.sourceheader" class="qpv-picklist__header">
        <slot name="sourceheader" />
      </div>
      <q-list class="qpv-picklist__list">
        <q-item
          v-for="(item, index) in source"
          :key="keyOf(item, index)"
          clickable
          :active="isSelected(item, 0)"
          class="qpv-picklist__item"
          @click="onItemClick(0, item, $event)"
        >
          <q-item-section>
            <slot name="item" :item="item" :index="index">{{ item }}</slot>
          </q-item-section>
        </q-item>
      </q-list>
    </div>

    <div class="qpv-picklist__controls">
      <q-btn flat round dense icon="chevron_right" aria-label="Move to target"
        :disable="!selection[0].length" @click="moveToTarget" />
      <q-btn flat round dense icon="keyboard_double_arrow_right" aria-label="Move all to target"
        :disable="!source.length" @click="moveAllToTarget" />
      <q-btn flat round dense icon="chevron_left" aria-label="Move to source"
        :disable="!selection[1].length" @click="moveToSource" />
      <q-btn flat round dense icon="keyboard_double_arrow_left" aria-label="Move all to source"
        :disable="!target.length" @click="moveAllToSource" />
    </div>

    <div class="qpv-picklist__list-wrap qpv-picklist__target">
      <div v-if="$slots.targetheader" class="qpv-picklist__header">
        <slot name="targetheader" />
      </div>
      <q-list class="qpv-picklist__list">
        <q-item
          v-for="(item, index) in target"
          :key="keyOf(item, index)"
          clickable
          :active="isSelected(item, 1)"
          class="qpv-picklist__item"
          @click="onItemClick(1, item, $event)"
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

// PrimeVue-compatible PickList (dual transfer list). Quasar has no equivalent.
// Built on QList/QItem + QBtn. modelValue is `[source, target]` and selection is
// `[sourceSelection, targetSelection]`, matching PrimeVue's `PickList`.
export default {
  name: 'PvPickList',
  components: { QBtn, QList, QItem, QItemSection },
  props: {
    modelValue: { type: Array, default: () => [[], []] },
    selection: { type: Array, default: () => [[], []] },
    dataKey: { type: String, default: null },
    metaKeySelection: { type: Boolean, default: false },
  },
  emits: [
    'update:modelValue',
    'update:selection',
    'reorder',
    'selection-change',
    'move-to-target',
    'move-to-source',
    'move-all-to-target',
    'move-all-to-source',
  ],
  computed: {
    source() {
      return this.modelValue[0] || [];
    },
    target() {
      return this.modelValue[1] || [];
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
    isSelected(item, listIndex) {
      return (this.selection[listIndex] || []).some((s) => this.sameItem(s, item));
    },
    onItemClick(listIndex, item, event) {
      const current = this.selection[listIndex] || [];
      const selected = this.isSelected(item, listIndex);
      const additive = this.metaKeySelection ? event.metaKey || event.ctrlKey : true;
      let listSel;
      if (selected) {
        listSel = current.filter((s) => !this.sameItem(s, item));
      } else if (additive) {
        listSel = [...current, item];
      } else {
        listSel = [item];
      }
      const next = listIndex === 0 ? [listSel, this.selection[1] || []] : [this.selection[0] || [], listSel];
      this.$emit('update:selection', next);
      this.$emit('selection-change', { originalEvent: event, value: next });
    },
    commit(source, target, selection, eventName, event) {
      this.$emit('update:modelValue', [source, target]);
      this.$emit('update:selection', selection);
      this.$emit(eventName, { originalEvent: event, value: [source, target] });
    },
    moveToTarget(event) {
      const moving = this.selection[0] || [];
      if (!moving.length) return;
      const source = this.source.filter((i) => !moving.some((m) => this.sameItem(m, i)));
      const target = [...this.target, ...this.source.filter((i) => moving.some((m) => this.sameItem(m, i)))];
      this.commit(source, target, [[], this.selection[1] || []], 'move-to-target', event);
    },
    moveAllToTarget(event) {
      if (!this.source.length) return;
      this.commit([], [...this.target, ...this.source], [[], this.selection[1] || []], 'move-all-to-target', event);
    },
    moveToSource(event) {
      const moving = this.selection[1] || [];
      if (!moving.length) return;
      const target = this.target.filter((i) => !moving.some((m) => this.sameItem(m, i)));
      const source = [...this.source, ...this.target.filter((i) => moving.some((m) => this.sameItem(m, i)))];
      this.commit(source, target, [this.selection[0] || [], []], 'move-to-source', event);
    },
    moveAllToSource(event) {
      if (!this.target.length) return;
      this.commit([...this.source, ...this.target], [], [this.selection[0] || [], []], 'move-all-to-source', event);
    },
  },
};
</script>
