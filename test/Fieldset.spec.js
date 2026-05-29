import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import Fieldset from '../src/components/Fieldset.vue';

describe('Fieldset', () => {
  it('renders the legend and default content', () => {
    const wrapper = mount(Fieldset, {
      props: { legend: 'Profile' },
      slots: { default: '<p class="body">Body</p>' },
    });
    expect(wrapper.find('.qpv-fieldset__legend-text').text()).toBe('Profile');
    expect(wrapper.find('.body').exists()).toBe(true);
  });

  it('is not toggleable by default (no button)', () => {
    const wrapper = mount(Fieldset, { props: { legend: 'Static' } });
    expect(wrapper.find('button').exists()).toBe(false);
  });

  it('renders a toggle button when toggleable', () => {
    const wrapper = mount(Fieldset, { props: { legend: 'X', toggleable: true } });
    expect(wrapper.find('button').exists()).toBe(true);
  });

  it('toggles collapsed state and emits events on click', async () => {
    const wrapper = mount(Fieldset, { props: { legend: 'X', toggleable: true } });
    await wrapper.find('button').trigger('click');
    expect(wrapper.emitted('update:collapsed')[0]).toEqual([true]);
    expect(wrapper.emitted('toggle')[0][0].value).toBe(true);
  });

  it('respects an initial collapsed prop and stays in sync', async () => {
    const wrapper = mount(Fieldset, {
      props: { legend: 'X', toggleable: true, collapsed: true },
    });
    expect(wrapper.vm.isCollapsed).toBe(true);
    await wrapper.setProps({ collapsed: false });
    expect(wrapper.vm.isCollapsed).toBe(false);
  });
});
