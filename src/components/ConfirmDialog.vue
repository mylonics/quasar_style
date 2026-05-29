<template>
  <q-dialog v-model="visible" :persistent="blockScroll" class="qpv-confirmdialog" @show="emitShow" @hide="emitHide">
    <q-card class="qpv-confirmdialog__card">
      <q-card-section class="qpv-confirmdialog__header">
        <div class="qpv-confirmdialog__title">
          <q-icon v-if="resolvedIcon" :name="resolvedIcon" class="qpv-confirmdialog__header-icon" />
          <span>{{ resolvedHeader }}</span>
        </div>
      </q-card-section>
      <q-card-section class="qpv-confirmdialog__content">
        {{ resolvedMessage }}
      </q-card-section>
      <q-card-actions align="right">
        <q-btn flat :label="resolvedRejectLabel" :icon="resolvedRejectIcon" @click="onReject" />
        <q-btn unelevated color="primary" :label="resolvedAcceptLabel" :icon="resolvedAcceptIcon" @click="onAccept" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import { QDialog, QCard, QCardSection, QCardActions, QBtn, QIcon } from 'quasar';

// PrimeVue-compatible ConfirmDialog. Wraps QDialog with accept / reject actions
// and exposes imperative show / hide methods.
// API mirrors PrimeVue's `ConfirmDialog`.
export default {
  name: 'PvConfirmDialog',
  components: { QDialog, QCard, QCardSection, QCardActions, QBtn, QIcon },
  props: {
    group: { type: String, default: null },
    message: { type: String, default: 'Are you sure?' },
    header: { type: String, default: 'Confirmation' },
    icon: { type: String, default: 'help' },
    acceptLabel: { type: String, default: 'Yes' },
    rejectLabel: { type: String, default: 'No' },
    acceptIcon: { type: String, default: null },
    rejectIcon: { type: String, default: null },
    blockScroll: { type: Boolean, default: true },
    draggable: { type: Boolean, default: true },
  },
  emits: ['accept', 'reject', 'show', 'hide'],
  data() {
    return {
      visible: false,
      overrides: {},
    };
  },
  computed: {
    resolvedMessage() { return this.overrides.message ?? this.message; },
    resolvedHeader() { return this.overrides.header ?? this.header; },
    resolvedIcon() { return this.overrides.icon ?? this.icon; },
    resolvedAcceptLabel() { return this.overrides.acceptLabel ?? this.acceptLabel; },
    resolvedRejectLabel() { return this.overrides.rejectLabel ?? this.rejectLabel; },
    resolvedAcceptIcon() { return this.overrides.acceptIcon ?? this.acceptIcon; },
    resolvedRejectIcon() { return this.overrides.rejectIcon ?? this.rejectIcon; },
  },
  methods: {
    show(options = {}) {
      this.overrides = options;
      this.visible = true;
    },
    hide() {
      this.visible = false;
    },
    onAccept() {
      this.$emit('accept', this.overrides);
      this.hide();
    },
    onReject() {
      this.$emit('reject', this.overrides);
      this.hide();
    },
    emitShow(event) {
      this.$emit('show', event);
    },
    emitHide(event) {
      this.$emit('hide', event);
    },
  },
};
</script>
