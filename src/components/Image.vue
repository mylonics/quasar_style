<template>
  <span class="qpv-image" :class="{ 'qpv-image--preview': preview }">
    <q-img
      v-bind="imgProps"
      class="qpv-image__img"
      @click="onImageClick"
    >
      <template v-for="(_, name) in $slots" #[name]="slotProps">
        <slot :name="name" v-bind="slotProps ?? {}" />
      </template>
    </q-img>

    <button
      v-if="preview"
      type="button"
      class="qpv-image__preview-btn"
      aria-label="Preview"
      @click.stop="openPreview"
    >
      <q-icon name="zoom_in" class="qpv-image__preview-icon" />
    </button>

    <!-- Full-screen preview overlay -->
    <teleport to="body">
      <transition name="qpv-image-preview">
        <div
          v-if="previewVisible"
          class="qpv-image__mask"
          role="dialog"
          aria-modal="true"
          @click.self="closePreview"
          @keydown.esc="closePreview"
        >
          <div class="qpv-image__preview-toolbar">
            <q-btn
              flat
              round
              icon="zoom_out"
              class="qpv-image__toolbar-btn"
              :disable="scale <= 0.5"
              @click="scale -= 0.25"
            />
            <q-btn
              flat
              round
              icon="zoom_in"
              class="qpv-image__toolbar-btn"
              :disable="scale >= 3"
              @click="scale += 0.25"
            />
            <q-btn
              flat
              round
              icon="rotate_left"
              class="qpv-image__toolbar-btn"
              @click="rotate -= 90"
            />
            <q-btn
              flat
              round
              icon="rotate_right"
              class="qpv-image__toolbar-btn"
              @click="rotate += 90"
            />
            <q-btn
              flat
              round
              icon="close"
              class="qpv-image__toolbar-btn"
              @click="closePreview"
            />
          </div>
          <div class="qpv-image__preview-image-wrap">
            <img
              :src="src"
              :alt="alt"
              class="qpv-image__preview-img"
              :style="{
                transform: `scale(${scale}) rotate(${rotate}deg)`,
                transition: 'transform 0.15s ease',
              }"
            />
          </div>
        </div>
      </transition>
    </teleport>
  </span>
</template>

<script>
import { QImg, QBtn, QIcon } from 'quasar';

// PrimeVue-compatible Image. Quasar's QImg lacks the preview/zoom overlay that
// PrimeVue Image provides. This thin wrapper passes all props to QImg and adds
// an optional full-screen preview with zoom + rotate controls.
// API mirrors PrimeVue's `Image`.
export default {
  name: 'PvImage',
  components: { QImg, QBtn, QIcon },
  props: {
    src: { type: String, default: null },
    alt: { type: String, default: null },
    width: { type: [String, Number], default: null },
    height: { type: [String, Number], default: null },
    preview: { type: Boolean, default: false },
    imageStyle: { type: [String, Object], default: null },
    imageClass: { type: [String, Object, Array], default: null },
  },
  emits: ['show', 'hide', 'error'],
  data() {
    return {
      previewVisible: false,
      scale: 1,
      rotate: 0,
    };
  },
  computed: {
    imgProps() {
      const props = { src: this.src, alt: this.alt };
      if (this.width) props.width = String(this.width);
      if (this.height) props.height = String(this.height);
      if (this.imageStyle) props.imgStyle = this.imageStyle;
      if (this.imageClass) props.imgClass = this.imageClass;
      return props;
    },
  },
  methods: {
    onImageClick() {
      if (this.preview) this.openPreview();
    },
    openPreview() {
      this.scale = 1;
      this.rotate = 0;
      this.previewVisible = true;
      this.$emit('show');
      this.$nextTick(() => {
        document.addEventListener('keydown', this.onKeydown);
      });
    },
    closePreview() {
      this.previewVisible = false;
      this.$emit('hide');
      document.removeEventListener('keydown', this.onKeydown);
    },
    onKeydown(e) {
      if (e.key === 'Escape') this.closePreview();
    },
  },
  beforeUnmount() {
    document.removeEventListener('keydown', this.onKeydown);
  },
};
</script>
