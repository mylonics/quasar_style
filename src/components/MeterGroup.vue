<template>
  <div
    class="qpv-metergroup"
    :class="`qpv-metergroup--${orientation}`"
    role="meter"
    :aria-valuemin="min"
    :aria-valuemax="max"
    :aria-valuenow="totalPercent"
  >
    <slot name="start" :value="value" :total-percent="totalPercent" />

    <!-- Label at start position (above meters for horizontal, left for vertical) -->
    <slot
      v-if="labelPosition === 'start' && ($slots.label || showLabels)"
      name="label"
      :value="value"
      :total-percent="totalPercent"
    >
      <ol class="qpv-metergroup__labels">
        <li
          v-for="(item, index) in value"
          :key="index"
          class="qpv-metergroup__label"
        >
          <span
            class="qpv-metergroup__label-marker"
            :style="{ backgroundColor: itemColor(item, index) }"
          />
          <q-icon v-if="item.icon" :name="item.icon" class="qpv-metergroup__label-icon" />
          <span class="qpv-metergroup__label-text">{{ item.label }}</span>
        </li>
      </ol>
    </slot>

    <div class="qpv-metergroup__meters">
      <template v-for="(item, index) in meters" :key="index">
        <span
          class="qpv-metergroup__meter"
          :style="meterStyle(item)"
          :title="item.label"
        />
      </template>
    </div>

    <slot name="end" :value="value" :total-percent="totalPercent" />

    <!-- Label at end position (below meters for horizontal, right for vertical) -->
    <slot
      v-if="labelPosition !== 'start' && ($slots.label || showLabels)"
      name="label"
      :value="value"
      :total-percent="totalPercent"
    >
      <ol class="qpv-metergroup__labels">
        <li
          v-for="(item, index) in value"
          :key="index"
          class="qpv-metergroup__label"
        >
          <span
            class="qpv-metergroup__label-marker"
            :style="{ backgroundColor: itemColor(item, index) }"
          />
          <q-icon v-if="item.icon" :name="item.icon" class="qpv-metergroup__label-icon" />
          <span class="qpv-metergroup__label-text">{{ item.label }}</span>
        </li>
      </ol>
    </slot>
  </div>
</template>

<script>
import { QIcon } from 'quasar';

// PrimeVue-compatible MeterGroup. Quasar has no equivalent multi-segment meter.
// API mirrors PrimeVue's `MeterGroup` (value/min/max/orientation/labelPosition).
export default {
  name: 'PvMeterGroup',
  components: { QIcon },
  props: {
    value: { type: Array, default: () => [] },
    min: { type: Number, default: 0 },
    max: { type: Number, default: 100 },
    orientation: {
      type: String,
      default: 'horizontal',
      validator: (v) => ['horizontal', 'vertical'].includes(v),
    },
    labelPosition: {
      type: String,
      default: 'end',
      validator: (v) => ['start', 'end'].includes(v),
    },
    showLabels: { type: Boolean, default: true },
  },
  computed: {
    range() {
      return Math.max(this.max - this.min, 0);
    },
    totalPercent() {
      if (this.range === 0) return 0;
      const sum = this.value.reduce((acc, item) => acc + (Number(item.value) || 0), 0);
      return Math.min(Math.round((sum / this.range) * 100), 100);
    },
    meters() {
      let offset = 0;
      return this.value.map((item, index) => {
        const size = this.range === 0 ? 0 : ((Number(item.value) || 0) / this.range) * 100;
        const meter = { item, index, size, offset, color: this.itemColor(item, index) };
        offset += size;
        return meter;
      });
    },
  },
  methods: {
    itemColor(item, index) {
      if (item && item.color) return item.color;
      const palette = [
        'var(--p-primary-color)',
        'var(--p-text-muted-color, #64748b)',
        'var(--p-content-border-color, #cbd5e1)',
      ];
      return palette[index % palette.length];
    },
    meterStyle(meter) {
      const dim = this.orientation === 'vertical' ? 'height' : 'width';
      return {
        backgroundColor: meter.color,
        [dim]: `${meter.size}%`,
      };
    },
  },
};
</script>
