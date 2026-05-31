import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import AutoComplete from '../src/components/AutoComplete.vue';

describe('AutoComplete', () => {
  it('renders a QSelect', () => {
    const wrapper = mount(AutoComplete, { props: { modelValue: null, suggestions: [] } });
    expect(wrapper.find('.q-select').exists()).toBe(true);
  });

  it('emits complete event when input is entered', async () => {
    const wrapper = mount(AutoComplete, {
      props: { modelValue: null, suggestions: [], minLength: 1, delay: 0 },
    });
    // Trigger the filter callback with a query
    await wrapper.vm.onFilter('app', (fn) => fn());
    // Wait for the debounce timer (delay=0 in tests)
    await new Promise((r) => setTimeout(r, 10));
    expect(wrapper.emitted('complete')).toBeTruthy();
    expect(wrapper.emitted('complete')[0][0].query).toBe('app');
  });

  it('does not emit complete when query is shorter than minLength', async () => {
    const wrapper = mount(AutoComplete, {
      props: { modelValue: null, suggestions: [], minLength: 3, delay: 0 },
    });
    await wrapper.vm.onFilter('ab', (fn) => fn());
    await new Promise((r) => setTimeout(r, 10));
    expect(wrapper.emitted('complete')).toBeFalsy();
  });

  it('maps string suggestions into label/value pairs', () => {
    const wrapper = mount(AutoComplete, {
      props: { modelValue: null, suggestions: ['Apple', 'Banana'] },
    });
    const mapped = wrapper.vm.mapSuggestions(['Apple', 'Banana']);
    expect(mapped[0]).toEqual({ label: 'Apple', value: 'Apple' });
  });

  it('maps object suggestions using field prop', () => {
    const wrapper = mount(AutoComplete, {
      props: { modelValue: null, suggestions: [], field: 'name' },
    });
    const mapped = wrapper.vm.mapSuggestions([{ name: 'Alice', id: 1 }]);
    expect(mapped[0].label).toBe('Alice');
  });

  it('emits item-select on value change', async () => {
    const wrapper = mount(AutoComplete, {
      props: { modelValue: null, suggestions: ['Apple'] },
    });
    await wrapper.vm.onSelect('Apple');
    expect(wrapper.emitted('item-select')).toBeTruthy();
  });

  it('clear() resets single value to null', async () => {
    const wrapper = mount(AutoComplete, {
      props: { modelValue: 'Apple', suggestions: [] },
    });
    wrapper.vm.clear();
    expect(wrapper.emitted('update:modelValue')[0][0]).toBeNull();
    expect(wrapper.emitted('clear')).toBeTruthy();
  });

  it('clear() resets multiple value to empty array', async () => {
    const wrapper = mount(AutoComplete, {
      props: { modelValue: ['Apple'], suggestions: [], multiple: true },
    });
    wrapper.vm.clear();
    expect(wrapper.emitted('update:modelValue')[0][0]).toEqual([]);
  });

  it('emits item-unselect when removing an item in multiple mode', async () => {
    const wrapper = mount(AutoComplete, {
      props: { modelValue: ['Apple', 'Banana'], suggestions: [], multiple: true },
    });
    await wrapper.vm.onSelect(['Apple']);
    expect(wrapper.emitted('item-unselect')).toBeTruthy();
    expect(wrapper.emitted('item-unselect')[0][0].value).toBe('Banana');
  });

  it('emits item-select when adding an item in multiple mode', async () => {
    const wrapper = mount(AutoComplete, {
      props: { modelValue: ['Apple'], suggestions: [], multiple: true },
    });
    await wrapper.vm.onSelect(['Apple', 'Banana']);
    expect(wrapper.emitted('item-select')).toBeTruthy();
    expect(wrapper.emitted('item-select')[0][0].value).toBe('Banana');
  });
});
