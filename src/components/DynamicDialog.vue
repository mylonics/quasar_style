<template>
  <q-dialog v-model="visible" class="qpv-dynamicdialog" @hide="handleHide">
    <q-card class="qpv-dynamicdialog__card">
      <q-card-section v-if="renderedComponent" class="qpv-dynamicdialog__content">
        <component :is="renderedComponent" v-bind="renderedProps" />
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>
import { markRaw } from 'vue';
import { QDialog, QCard, QCardSection } from 'quasar';

// PrimeVue-compatible DynamicDialog. Stores a component definition at runtime
// and renders it inside a QDialog when `show()` is called.
// API mirrors PrimeVue's `DynamicDialog`.
export default {
  name: 'PvDynamicDialog',
  components: { QDialog, QCard, QCardSection },
  emits: ['close'],
  data() {
    return {
      visible: false,
      renderedComponent: null,
      renderedProps: {},
      dialogData: null,
      onClose: null,
    };
  },
  methods: {
    show(options = {}) {
      this.renderedComponent = options.component ? markRaw(options.component) : null;
      this.renderedProps = {
        ...(options.props || {}),
        dialogData: options.data,
      };
      this.dialogData = options.data;
      this.onClose = typeof options.onClose === 'function' ? options.onClose : null;
      this.visible = true;
    },
    hide(payload = this.dialogData) {
      this.visible = false;
      if (this.onClose) {
        this.onClose(payload);
      }
      this.$emit('close', payload);
    },
    handleHide() {
      this.renderedComponent = null;
      this.renderedProps = {};
    },
  },
};
</script>
