import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import ConfirmDialog from '../src/components/ConfirmDialog.vue';

describe('ConfirmDialog', () => {
  it('exposes show and hide methods', () => {
    const wrapper = mount(ConfirmDialog);
    expect(typeof wrapper.vm.show).toBe('function');
    expect(typeof wrapper.vm.hide).toBe('function');
  });

  it('shows with override options', async () => {
    const wrapper = mount(ConfirmDialog);
    wrapper.vm.show({ message: 'Delete item?' });
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.visible).toBe(true);
    expect(wrapper.vm.resolvedMessage).toBe('Delete item?');
  });

  it('emits accept and closes', () => {
    const wrapper = mount(ConfirmDialog);
    wrapper.vm.visible = true;
    wrapper.vm.onAccept();
    expect(wrapper.emitted('accept')).toBeTruthy();
    expect(wrapper.vm.visible).toBe(false);
  });

  it('emits reject and closes', () => {
    const wrapper = mount(ConfirmDialog);
    wrapper.vm.visible = true;
    wrapper.vm.onReject();
    expect(wrapper.emitted('reject')).toBeTruthy();
    expect(wrapper.vm.visible).toBe(false);
  });
});
