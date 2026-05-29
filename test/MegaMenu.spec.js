import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import MegaMenu from '../src/components/MegaMenu.vue';

const model = [
  {
    label: 'Products',
    items: [[{ label: 'Suite', items: [{ label: 'CRM', command: vi.fn() }] }]],
  },
];

describe('MegaMenu', () => {
  it('renders root menu items', () => {
    const wrapper = mount(MegaMenu, { props: { model } });
    expect(wrapper.text()).toContain('Products');
  });

  it('applies vertical orientation class', () => {
    const wrapper = mount(MegaMenu, { props: { model, orientation: 'vertical' } });
    expect(wrapper.classes()).toContain('qpv-megamenu--vertical');
  });

  it('executes child item commands', () => {
    const wrapper = mount(MegaMenu, { props: { model } });
    wrapper.vm.executeItem(model[0].items[0][0].items[0], { type: 'click' });
    expect(model[0].items[0][0].items[0].command).toHaveBeenCalled();
  });
});
