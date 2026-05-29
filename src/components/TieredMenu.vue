<template>
  <div class="qpv-tieredmenu" :class="{ 'qpv-tieredmenu--popup': popup }" @focusin="$emit('focus', $event)" @focusout="$emit('blur', $event)">
    <q-menu v-if="popup" ref="menu" class="qpv-tieredmenu__popup" @show="$emit('show')" @hide="$emit('hide')">
      <div class="qpv-tieredmenu__panel">
        <tiered-menu-branch :items="model" @item-command="executeItem" />
      </div>
    </q-menu>
    <div v-else class="qpv-tieredmenu__panel">
      <tiered-menu-branch :items="model" @item-command="executeItem" />
    </div>
  </div>
</template>

<script>
import { h } from 'vue';
import { QMenu, QList, QItem, QItemSection, QIcon } from 'quasar';

const TieredMenuBranch = {
  name: 'TieredMenuBranch',
  props: {
    items: { type: Array, default: () => [] },
  },
  emits: ['item-command'],
  methods: {
    onItemClick(item, event) {
      if (item.disabled || item.separator) {
        return;
      }
      this.$emit('item-command', { item, event });
    },
  },
  render() {
    return h(QList, { dense: true, class: 'qpv-tieredmenu__list' }, () =>
      this.items.map((item, index) => {
        if (item.separator) {
          return h('div', { key: `sep-${index}`, class: 'qpv-tieredmenu__separator' });
        }

        return h('div', { key: item.label || index, class: 'qpv-tieredmenu__entry' }, [
          h(QItem, {
            clickable: !item.disabled,
            disable: item.disabled,
            class: 'qpv-tieredmenu__item',
            onClick: (event) => this.onItemClick(item, event),
          }, () => [
            item.icon ? h(QItemSection, { side: true }, () => h(QIcon, { name: item.icon })) : null,
            h(QItemSection, null, () => item.label),
            Array.isArray(item.items) && item.items.length
              ? h(QItemSection, { side: true }, () => h(QIcon, { name: 'chevron_right' }))
              : null,
          ]),
          Array.isArray(item.items) && item.items.length
            ? h('div', { class: 'qpv-tieredmenu__submenu' }, [
                h(TieredMenuBranch, {
                  items: item.items,
                  onItemCommand: (payload) => this.$emit('item-command', payload),
                }),
              ])
            : null,
        ]);
      })
    );
  },
};

// PrimeVue-compatible TieredMenu. Renders nested menu structures with optional
// popup behavior and exposes show / hide / toggle imperative methods.
// API mirrors PrimeVue's `TieredMenu`.
export default {
  name: 'PvTieredMenu',
  components: { QMenu, TieredMenuBranch },
  props: {
    model: { type: Array, default: () => [] },
    popup: { type: Boolean, default: false },
  },
  emits: ['show', 'hide', 'focus', 'blur'],
  methods: {
    show(event) {
      if (this.popup) {
        this.$refs.menu.show(event);
      }
    },
    hide() {
      if (this.popup) {
        this.$refs.menu.hide();
      }
    },
    toggle(event) {
      if (this.popup) {
        this.$refs.menu.toggle(event);
      }
    },
    executeItem({ item, event }) {
      if (typeof item.command === 'function') {
        item.command({ originalEvent: event, item });
      }
    },
  },
};
</script>
