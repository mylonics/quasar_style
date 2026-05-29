import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import IconField from '../src/components/IconField.vue';

describe('IconField', () => {
  it('renders slot content', () => {
    const wrapper = mount(IconField, {
      slots: { default: '<span class="inner">Inside</span>' },
    });
    expect(wrapper.find('.inner').exists()).toBe(true);
  });

  it('uses left position by default', () => {
    const wrapper = mount(IconField);
    expect(wrapper.classes()).toContain('qpv-iconfield--left');
  });

  it('supports right icon position', () => {
    const wrapper = mount(IconField, { props: { iconPosition: 'right' } });
    expect(wrapper.classes()).toContain('qpv-iconfield--right');
  });
});
