import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import IftaLabel from '../src/components/IftaLabel.vue';

describe('IftaLabel', () => {
  it('renders wrapper class', () => {
    const wrapper = mount(IftaLabel);
    expect(wrapper.classes()).toContain('qpv-iftalabel');
  });

  it('renders input and label slot content', () => {
    const wrapper = mount(IftaLabel, {
      slots: { default: '<label>Email</label><input value="a@b.com" />' },
    });
    expect(wrapper.find('label').text()).toBe('Email');
    expect(wrapper.find('input').exists()).toBe(true);
  });

  it('keeps multiple slotted elements', () => {
    const wrapper = mount(IftaLabel, {
      slots: { default: '<label>Name</label><input /><small>Helper</small>' },
    });
    expect(wrapper.find('small').exists()).toBe(true);
  });
});
