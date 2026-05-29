import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import CascadeSelect from '../src/components/CascadeSelect.vue';

const options = [
  {
    label: 'Europe',
    items: [
      { label: 'France', value: 'fr' },
      { label: 'Germany', value: 'de' },
    ],
  },
];

describe('CascadeSelect', () => {
  it('renders placeholder by default', () => {
    const wrapper = mount(CascadeSelect, { props: { options } });
    expect(wrapper.text()).toContain('Select');
  });

  it('opens nested groups by updating activePath', () => {
    const wrapper = mount(CascadeSelect, { props: { options } });
    wrapper.vm.onOptionClick(options[0], 0);
    expect(wrapper.vm.activePath).toHaveLength(1);
    expect(wrapper.emitted('group-change')).toBeTruthy();
  });

  it('emits selection changes for leaf options', () => {
    const wrapper = mount(CascadeSelect, { props: { options } });
    const hideSpy = vi.spyOn(wrapper.vm.$refs.menu, 'hide').mockImplementation(() => {});
    wrapper.vm.onOptionClick(options[0].items[0], 1);
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['fr']);
    expect(wrapper.emitted('change')).toBeTruthy();
    expect(hideSpy).toHaveBeenCalled();
  });

  it('computes a display label from the selected value', () => {
    const wrapper = mount(CascadeSelect, { props: { options, modelValue: 'de' } });
    expect(wrapper.vm.displayLabel).toBe('Germany');
  });
});
