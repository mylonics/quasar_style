import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import OrgChart from '../src/components/OrgChart.vue';

const value = {
  key: 'ceo',
  label: 'CEO',
  children: [{ key: 'cto', label: 'CTO' }],
};

describe('OrgChart', () => {
  it('renders node labels', () => {
    const wrapper = mount(OrgChart, { props: { value } });
    expect(wrapper.text()).toContain('CEO');
    expect(wrapper.text()).toContain('CTO');
  });

  it('emits selection updates in single mode', () => {
    const wrapper = mount(OrgChart, { props: { value, selectionMode: 'single' } });
    wrapper.vm.toggleSelect(value);
    expect(wrapper.emitted('update:selectionKeys')?.[0]).toEqual([{ ceo: true }]);
    expect(wrapper.emitted('node-select')).toBeTruthy();
  });

  it('emits unselect when clicking an active node again', () => {
    const wrapper = mount(OrgChart, { props: { value, selectionMode: 'single', selectionKeys: { ceo: true } } });
    wrapper.vm.toggleSelect(value);
    expect(wrapper.emitted('node-unselect')).toBeTruthy();
  });

  it('preserves other selections in multiple mode when adding a node', () => {
    const wrapper = mount(OrgChart, {
      props: { value, selectionMode: 'multiple', selectionKeys: { ceo: true } },
    });
    const cto = value.children[0];
    wrapper.vm.toggleSelect(cto);
    expect(wrapper.emitted('update:selectionKeys')?.[0]).toEqual([{ ceo: true, cto: true }]);
  });

  it('preserves other selections in multiple mode when removing a node', () => {
    const wrapper = mount(OrgChart, {
      props: { value, selectionMode: 'multiple', selectionKeys: { ceo: true, cto: true } },
    });
    wrapper.vm.toggleSelect(value);
    expect(wrapper.emitted('update:selectionKeys')?.[0]).toEqual([{ cto: true }]);
    expect(wrapper.emitted('node-unselect')).toBeTruthy();
  });
});
