<template>
  <div class="qpv-galleria">
    <q-carousel
      animated
      swipeable
      :arrows="showItemNavigators"
      :navigation="showIndicators"
      :infinite="circular"
      :model-value="activeIndex"
      class="qpv-galleria__carousel"
      @update:model-value="updateIndex"
      @click="fullScreen && openFullScreen()"
    >
      <q-carousel-slide
        v-for="(entry, index) in value"
        :key="index"
        :name="index"
        class="qpv-galleria__slide"
      >
        <slot name="item" :item="entry">
          <img :src="entry.itemImageSrc || entry.src" :alt="entry.alt || entry.title || `Item ${index + 1}`" class="qpv-galleria__image" />
        </slot>
        <div v-if="$slots.caption" class="qpv-galleria__caption">
          <slot name="caption" :item="entry" />
        </div>
      </q-carousel-slide>
    </q-carousel>

    <div v-if="showThumbnails" class="qpv-galleria__thumbnails">
      <button
        v-for="(entry, index) in visibleThumbnails"
        :key="index"
        type="button"
        class="qpv-galleria__thumb"
        :class="{ 'qpv-galleria__thumb--active': thumbnailIndex(index) === activeIndex }"
        @click="updateIndex(thumbnailIndex(index))"
      >
        <slot name="thumbnail" :item="entry.item">
          <img :src="entry.item.thumbnailImageSrc || entry.item.src || entry.item.itemImageSrc" :alt="entry.item.alt || entry.item.title || `Thumbnail ${index + 1}`" class="qpv-galleria__thumb-image" />
        </slot>
      </button>
    </div>

    <q-dialog v-model="dialogVisible" maximized>
      <div class="qpv-galleria__fullscreen">
        <q-carousel
          animated
          swipeable
          :arrows="showItemNavigators"
          :navigation="showIndicators"
          :infinite="circular"
          :model-value="activeIndex"
          class="qpv-galleria__carousel qpv-galleria__carousel--fullscreen"
          @update:model-value="updateIndex"
        >
          <q-carousel-slide v-for="(entry, index) in value" :key="`full-${index}`" :name="index">
            <slot name="item" :item="entry">
              <img :src="entry.itemImageSrc || entry.src" :alt="entry.alt || entry.title || `Item ${index + 1}`" class="qpv-galleria__image" />
            </slot>
          </q-carousel-slide>
        </q-carousel>
      </div>
    </q-dialog>
  </div>
</template>

<script>
import { QCarousel, QCarouselSlide, QDialog } from 'quasar';

// PrimeVue-compatible Galleria. Uses QCarousel for the main viewer, a thumbnail
// strip for quick navigation, and an optional fullscreen dialog.
// API mirrors PrimeVue's `Galleria`.
export default {
  name: 'PvGalleria',
  components: { QCarousel, QCarouselSlide, QDialog },
  props: {
    value: { type: Array, default: () => [] },
    activeIndex: { type: Number, default: 0 },
    numVisible: { type: Number, default: 3 },
    showThumbnails: { type: Boolean, default: true },
    showIndicators: { type: Boolean, default: false },
    circular: { type: Boolean, default: false },
    showItemNavigators: { type: Boolean, default: false },
    fullScreen: { type: Boolean, default: false },
    visible: { type: Boolean, default: false },
  },
  emits: ['update:activeIndex', 'update:visible'],
  computed: {
    dialogVisible: {
      get() {
        return this.visible;
      },
      set(value) {
        this.$emit('update:visible', value);
      },
    },
    visibleThumbnails() {
      return this.value.slice(0, this.numVisible).map((item, index) => ({ item, index }));
    },
  },
  methods: {
    thumbnailIndex(index) {
      return this.visibleThumbnails[index]?.index ?? index;
    },
    updateIndex(index) {
      this.$emit('update:activeIndex', index);
    },
    openFullScreen() {
      this.$emit('update:visible', true);
    },
  },
};
</script>
