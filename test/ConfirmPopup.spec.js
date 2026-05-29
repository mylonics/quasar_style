import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import { QMenu } from 'quasar';
import ConfirmPopup from '../src/components/ConfirmPopup.vue';

// QMenu teleports its content to document.body only when shown and props are
// readonly in the test environment. Tests cover the ConfirmPopup-specific API:
// props, event emission, and method delegation to the underlying QMenu.

describe('ConfirmPopup', () => {
  it('mounts a QMenu as its root element', () => {
    const wrapper = mount(ConfirmPopup);
    expect(wrapper.findComponent(QMenu).exists()).toBe(true);
  });

  it('exposes show and hide methods', () => {
    const wrapper = mount(ConfirmPopup);
    expect(typeof wrapper.vm.show).toBe('function');
    expect(typeof wrapper.vm.hide).toBe('function');
  });

  it('emits accept when onAccept is called', () => {
    const wrapper = mount(ConfirmPopup);
    const hideSpy = vi.spyOn(wrapper.vm.$refs.menu, 'hide').mockImplementation(() => {});
    wrapper.vm.onAccept();
    expect(wrapper.emitted('accept')).toBeTruthy();
    expect(hideSpy).toHaveBeenCalledOnce();
  });

  it('emits reject when onReject is called', () => {
    const wrapper = mount(ConfirmPopup);
    const hideSpy = vi.spyOn(wrapper.vm.$refs.menu, 'hide').mockImplementation(() => {});
    wrapper.vm.onReject();
    expect(wrapper.emitted('reject')).toBeTruthy();
    expect(hideSpy).toHaveBeenCalledOnce();
  });

  it('emits show and hide events via handlers', () => {
    const wrapper = mount(ConfirmPopup);
    wrapper.vm.onShow({ type: 'show' });
    wrapper.vm.onHide({ type: 'hide' });
    expect(wrapper.emitted('show')).toHaveLength(1);
    expect(wrapper.emitted('hide')).toHaveLength(1);
  });

  it('tracks visibility state via onShow/onHide', () => {
    const wrapper = mount(ConfirmPopup);
    wrapper.vm.onShow({});
    expect(wrapper.vm.isVisible).toBe(true);
    wrapper.vm.onHide({});
    expect(wrapper.vm.isVisible).toBe(false);
  });

  it('show delegates to the underlying QMenu', () => {
    const wrapper = mount(ConfirmPopup);
    const showSpy = vi.spyOn(wrapper.vm.$refs.menu, 'show').mockImplementation(() => {});
    wrapper.vm.show({ type: 'click' });
    expect(showSpy).toHaveBeenCalledOnce();
  });

  it('accepts custom message prop via vm', () => {
    const wrapper = mount(ConfirmPopup, { props: { message: 'Delete this item?' } });
    expect(wrapper.vm.message).toBe('Delete this item?');
  });
});
