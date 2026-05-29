<template>
  <div class="qpv-panelmenu">
    <q-expansion-item
      v-for="item in model"
      :key="item.key || item.label"
      :label="item.label"
      :icon="item.icon"
      :model-value="isExpanded(item)"
      class="qpv-panelmenu__panel"
      @update:model-value="togglePanel(item, $event)"
    >
      <div class="qpv-panelmenu__content">
        <panel-menu-list :items="item.items || []" @item-command="executeItem" />
      </div>
    </q-expansion-item>
  </div>
</template>

<script>
import { h } from 'vue';
import { QExpansionItem, QList, QItem, QItemSection } from 'quasar';

const PanelMenuList = {
  name: 'PanelMenuList',
  props: {
    items: { type: Array, default: () => [] },
  },
  emits: ['item-command'],
  render() {
    return h(QList, { dense: true, class: 'qpv-panelmenu__list' }, () =>
      this.items.map((item) => h('div', { key: item.key || item.label, class: 'qpv-panelmenu__item-wrap' }, [
        h(QItem, {
          clickable: !item.disabled,
          disable: item.disabled,
          class: 'qpv-panelmenu__item',
          onClick: (event) => {
            if (typeof item.command === 'function') {
              this.$emit('item-command', { item, event });
            }
          },
        }, () => h(QItemSection, null, () => item.label)),
        Array.isArray(item.items) && item.items.length
          ? h('div', { class: 'qpv-panelmenu__nested' }, [
              h(PanelMenuList, {
                items: item.items,
                onItemCommand: (payload) => this.$emit('item-command', payload),
              }),
            ])
          : null,
      ]))
    );
  },
};

// PrimeVue-compatible PanelMenu. Wraps QExpansionItem for top-level sections and
// uses nested lists for child menu items.
// API mirrors PrimeVue's `PanelMenu`.
export default {
  name: 'PvPanelMenu',
  components: { QExpansionItem, PanelMenuList },
  props: {
    model: { type: Array, default: () => [] },
    multiple: { type: Boolean, default: false },
    expandedKeys: { type: Object, default: () => ({}) },
  },
  emits: ['update:expandedKeys', 'panel-open', 'panel-close'],
  methods: {
    isExpanded(item) {
      return Boolean(this.expandedKeys[item.key || item.label]);
    },
    togglePanel(item, value) {
      const key = item.key || item.label;
      const next = this.multiple ? { ...this.expandedKeys } : {};
      if (value) {
        next[key] = true;
        this.$emit('panel-open', item);
      }
      else {
        delete next[key];
        this.$emit('panel-close', item);
      }
      this.$emit('update:expandedKeys', next);
    },
    executeItem({ item, event }) {
      item.command?.({ originalEvent: event, item });
    },
  },
};
</script>
