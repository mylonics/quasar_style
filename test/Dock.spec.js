import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import Dock from '../src/components/Dock.vue';

const model = [{ label: 'Home', icon: 'home', command: vi.fn() }];

describe('Dock', () => {
  it('renders dock items', () => {
    const wrapper = mount(Dock, { props: { model } });
    expect(wrapper.findAll('.qpv-dock__item')).toHaveLength(1);
  });

  it('applies the position modifier', () => {
    const wrapper = mount(Dock, { props: { model, position: 'top' } });
    expect(wrapper.classes()).toContain('qpv-dock--top');
  });

  it('runs item commands', () => {
    const wrapper = mount(Dock, { props: { model } });
    wrapper.vm.executeItem(model[0], { type: 'click' });
    expect(model[0].command).toHaveBeenCalled();
  });
});
