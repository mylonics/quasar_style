<template>
  <q-menu
    ref="menu"
    class="qpv-confirmpopup"
    :persistent="true"
    @show="onShow"
    @hide="onHide"
  >
    <div class="qpv-confirmpopup__content">
      <div class="qpv-confirmpopup__icon" v-if="icon || showIcon">
        <q-icon :name="icon || 'help'" class="qpv-confirmpopup__icon-el" />
      </div>
      <div class="qpv-confirmpopup__message">
        <slot>{{ message }}</slot>
      </div>
      <div class="qpv-confirmpopup__footer">
        <q-btn
          flat
          dense
          :label="rejectLabel"
          :icon="rejectIcon"
          class="qpv-confirmpopup__reject-btn"
          @click="onReject"
        />
        <q-btn
          flat
          dense
          :label="acceptLabel"
          :icon="acceptIcon"
          class="qpv-confirmpopup__accept-btn"
          @click="onAccept"
        />
      </div>
    </div>
  </q-menu>
</template>

<script>
import { QMenu, QBtn, QIcon } from 'quasar';

// PrimeVue-compatible ConfirmPopup. Quasar has no built-in inline confirm
// anchored to an arbitrary trigger. This component wraps QMenu to show a small
// confirm/cancel panel next to the triggering element, matching PrimeVue's
// `ConfirmPopup` API (`show(event)`, `@accept`, `@reject`).
// API mirrors PrimeVue's `ConfirmPopup`.
export default {
  name: 'PvConfirmPopup',
  components: { QMenu, QBtn, QIcon },
  props: {
    message: { type: String, default: 'Are you sure?' },
    icon: { type: String, default: null },
    showIcon: { type: Boolean, default: true },
    acceptLabel: { type: String, default: 'Yes' },
    rejectLabel: { type: String, default: 'No' },
    acceptIcon: { type: String, default: null },
    rejectIcon: { type: String, default: null },
  },
  emits: ['accept', 'reject', 'show', 'hide'],
  data() {
    return { isVisible: false };
  },
  methods: {
    show(event) {
      this.$refs.menu.show(event);
    },
    hide() {
      this.$refs.menu.hide();
    },
    onAccept() {
      this.$emit('accept');
      this.hide();
    },
    onReject() {
      this.$emit('reject');
      this.hide();
    },
    onShow(event) {
      this.isVisible = true;
      this.$emit('show', event);
    },
    onHide(event) {
      this.isVisible = false;
      this.$emit('hide', event);
    },
  },
};
</script>
