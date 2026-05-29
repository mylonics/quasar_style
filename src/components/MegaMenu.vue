<template>
  <div class="qpv-megamenu" :class="[`qpv-megamenu--${orientation}`]" @focusin="$emit('focus', $event)" @focusout="$emit('blur', $event)">
    <q-toolbar class="qpv-megamenu__toolbar">
      <q-btn-dropdown
        v-for="item in model"
        :key="item.label"
        flat
        no-caps
        :label="item.label"
        :icon="item.icon"
        class="qpv-megamenu__trigger"
      >
        <div class="qpv-megamenu__panel">
          <div
            v-for="(column, columnIndex) in item.items || []"
            :key="`${item.label}-${columnIndex}`"
            class="qpv-megamenu__column"
          >
            <div
              v-for="group in column"
              :key="group.label"
              class="qpv-megamenu__group"
            >
              <div class="qpv-megamenu__group-title">{{ group.label }}</div>
              <q-list dense>
                <q-item
                  v-for="child in group.items || []"
                  :key="child.label"
                  clickable
                  :disable="child.disabled"
                  @click="executeItem(child, $event)"
                >
                  <q-item-section>{{ child.label }}</q-item-section>
                </q-item>
              </q-list>
            </div>
          </div>
        </div>
      </q-btn-dropdown>
    </q-toolbar>
  </div>
</template>

<script>
import { QToolbar, QBtnDropdown, QList, QItem, QItemSection } from 'quasar';

// PrimeVue-compatible MegaMenu. Uses QBtnDropdown per root item and renders the
// grouped column layout inside each dropdown panel.
// API mirrors PrimeVue's `MegaMenu`.
export default {
  name: 'PvMegaMenu',
  components: { QToolbar, QBtnDropdown, QList, QItem, QItemSection },
  props: {
    model: { type: Array, default: () => [] },
    orientation: {
      type: String,
      default: 'horizontal',
      validator: (value) => ['horizontal', 'vertical'].includes(value),
    },
  },
  emits: ['focus', 'blur'],
  methods: {
    executeItem(item, event) {
      item.command?.({ originalEvent: event, item });
    },
  },
};
</script>
