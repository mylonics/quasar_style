import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import TreeSelect from '../src/components/TreeSelect.vue';

const options = [
  {
    key: 'root',
    label: 'Root',
    children: [{ key: 'child', label: 'Child' }],
  },
];

describe('TreeSelect', () => {
  it('renders placeholder when nothing is selected', () => {
    const wrapper = mount(TreeSelect, { props: { options } });
    expect(wrapper.text()).toContain('Select');
  });

  it('emits update:modelValue when selecting a single node', () => {
    const wrapper = mount(TreeSelect, { props: { options } });
    const hideSpy = vi.spyOn(wrapper.vm.$refs.menu, 'hide').mockImplementation(() => {});
    wrapper.vm.onSelectedChange('child');
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['child']);
    expect(wrapper.emitted('node-select')).toBeTruthy();
    expect(hideSpy).toHaveBeenCalled();
  });

  it('emits object selection in checkbox mode', () => {
    const wrapper = mount(TreeSelect, { props: { options, selectionMode: 'checkbox' } });
    wrapper.vm.onTickedChange(['child']);
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([{ child: true }]);
  });

  it('creates a comma-joined display label', () => {
    const wrapper = mount(TreeSelect, {
      props: { options, selectionMode: 'checkbox', modelValue: { child: true } },
    });
    expect(wrapper.vm.displayLabel).toBe('Child');
  });
});
