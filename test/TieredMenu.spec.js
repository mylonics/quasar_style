import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import TieredMenu from '../src/components/TieredMenu.vue';

const model = [
  { label: 'File', items: [{ label: 'Open' }] },
  { separator: true },
  { label: 'Exit', command: vi.fn() },
];

describe('TieredMenu', () => {
  it('renders menu labels in inline mode', () => {
    const wrapper = mount(TieredMenu, { props: { model } });
    expect(wrapper.text()).toContain('File');
    expect(wrapper.text()).toContain('Exit');
  });

  it('delegates popup methods to q-menu', () => {
    const wrapper = mount(TieredMenu, { props: { model, popup: true } });
    const showSpy = vi.spyOn(wrapper.vm.$refs.menu, 'show').mockImplementation(() => {});
    const hideSpy = vi.spyOn(wrapper.vm.$refs.menu, 'hide').mockImplementation(() => {});
    const toggleSpy = vi.spyOn(wrapper.vm.$refs.menu, 'toggle').mockImplementation(() => {});
    wrapper.vm.show({});
    wrapper.vm.hide();
    wrapper.vm.toggle({});
    expect(showSpy).toHaveBeenCalled();
    expect(hideSpy).toHaveBeenCalled();
    expect(toggleSpy).toHaveBeenCalled();
  });

  it('runs item commands', () => {
    const wrapper = mount(TieredMenu, { props: { model } });
    wrapper.vm.executeItem({ item: model[2], event: { type: 'click' } });
    expect(model[2].command).toHaveBeenCalled();
  });
});
