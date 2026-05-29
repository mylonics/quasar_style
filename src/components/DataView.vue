<template>
  <div class="qpv-dataview" :class="`qpv-dataview--${layout}`">
    <div v-if="$slots.header" class="qpv-dataview__header">
      <slot name="header" />
    </div>

    <div class="qpv-dataview__content">
      <template v-if="pageItems.length">
        <slot v-if="layout === 'grid'" name="grid" :items="pageItems" />
        <slot v-else name="list" :items="pageItems" />
      </template>
      <div v-else class="qpv-dataview__empty">
        <slot name="empty">No records found.</slot>
      </div>
    </div>

    <div v-if="paginator && pageCount > 1" class="qpv-dataview__paginator">
      <slot name="paginatorstart" />
      <q-pagination
        :model-value="currentPage"
        :max="pageCount"
        :max-pages="6"
        boundary-numbers
        direction-links
        @update:model-value="onPage"
      />
      <slot name="paginatorend" />
    </div>

    <div v-if="$slots.footer" class="qpv-dataview__footer">
      <slot name="footer" />
    </div>
  </div>
</template>

<script>
import { QPagination } from 'quasar';

// PrimeVue-compatible DataView. Quasar's QTable is grid/table-only; DataView
// provides list/grid layouts with a paginator over arbitrary item templates.
// API mirrors PrimeVue's `DataView`.
export default {
  name: 'PvDataView',
  components: { QPagination },
  props: {
    value: { type: Array, default: () => [] },
    layout: {
      type: String,
      default: 'list',
      validator: (v) => ['list', 'grid'].includes(v),
    },
    rows: { type: Number, default: 0 },
    first: { type: Number, default: 0 },
    paginator: { type: Boolean, default: false },
  },
  emits: ['update:first', 'page'],
  data() {
    return { innerFirst: this.first };
  },
  computed: {
    pageSize() {
      return this.rows > 0 ? this.rows : this.value.length || 1;
    },
    pageCount() {
      if (!this.paginator || this.rows <= 0) return 1;
      return Math.max(Math.ceil(this.value.length / this.rows), 1);
    },
    currentPage() {
      return Math.floor(this.innerFirst / this.pageSize) + 1;
    },
    pageItems() {
      if (!this.paginator || this.rows <= 0) return this.value;
      return this.value.slice(this.innerFirst, this.innerFirst + this.rows);
    },
  },
  watch: {
    first(val) {
      this.innerFirst = val;
    },
  },
  methods: {
    onPage(page) {
      const first = (page - 1) * this.pageSize;
      this.innerFirst = first;
      this.$emit('update:first', first);
      this.$emit('page', { first, rows: this.pageSize, page: page - 1, pageCount: this.pageCount });
    },
  },
};
</script>
