import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import { QMenu } from 'quasar';
import Popover from '../src/components/Popover.vue';

// QMenu teleports its content to document.body only when shown, and its
// props/refs are readonly in this test environment. Tests cover the
// Popover-specific API: visibility tracking, event emission, and delegation.

describe('Popover', () => {
  it('mounts a QMenu as its root element', () => {
    const wrapper = mount(Popover);
    expect(wrapper.findComponent(QMenu).exists()).toBe(true);
  });

  it('applies the qpv-popover class to the root QMenu', () => {
    const wrapper = mount(Popover);
    // QMenu teleports its content so .classes()/.element are unavailable in
    // the test environment. Check the vnode props on the component's subTree.
    expect(wrapper.vm.$.subTree.props?.class).toContain('qpv-popover');
  });

  it('exposes show, hide, and toggle methods', () => {
    const wrapper = mount(Popover);
    expect(typeof wrapper.vm.show).toBe('function');
    expect(typeof wrapper.vm.hide).toBe('function');
    expect(typeof wrapper.vm.toggle).toBe('function');
  });

  it('tracks visibility state after show/hide calls', async () => {
    const wrapper = mount(Popover);
    wrapper.vm.onShow({});
    expect(wrapper.vm.isVisible).toBe(true);
    wrapper.vm.onHide({});
    expect(wrapper.vm.isVisible).toBe(false);
  });

  it('emits show and hide events', () => {
    const wrapper = mount(Popover);
    wrapper.vm.onShow({ type: 'show' });
    wrapper.vm.onHide({ type: 'hide' });
    expect(wrapper.emitted('show')).toHaveLength(1);
    expect(wrapper.emitted('hide')).toHaveLength(1);
  });

  it('toggle calls QMenu.hide when already visible', () => {
    const wrapper = mount(Popover);
    const hideSpy = vi.spyOn(wrapper.vm.$refs.menu, 'hide').mockImplementation(() => {});
    wrapper.vm.isVisible = true;
    wrapper.vm.toggle({});
    expect(hideSpy).toHaveBeenCalledOnce();
  });

  it('toggle calls QMenu.show when not visible', () => {
    const wrapper = mount(Popover);
    const showSpy = vi.spyOn(wrapper.vm.$refs.menu, 'show').mockImplementation(() => {});
    wrapper.vm.isVisible = false;
    wrapper.vm.toggle({});
    expect(showSpy).toHaveBeenCalledOnce();
  });

  it('show delegates to the underlying QMenu', () => {
    const wrapper = mount(Popover);
    const showSpy = vi.spyOn(wrapper.vm.$refs.menu, 'show').mockImplementation(() => {});
    wrapper.vm.show({ type: 'click' });
    expect(showSpy).toHaveBeenCalledOnce();
  });

  it('hide delegates to the underlying QMenu', () => {
    const wrapper = mount(Popover);
    const hideSpy = vi.spyOn(wrapper.vm.$refs.menu, 'hide').mockImplementation(() => {});
    wrapper.vm.hide({});
    expect(hideSpy).toHaveBeenCalledOnce();
  });
});
