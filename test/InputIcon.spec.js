import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import InputIcon from '../src/components/InputIcon.vue';

describe('InputIcon', () => {
  it('renders as span wrapper', () => {
    const wrapper = mount(InputIcon);
    expect(wrapper.element.tagName).toBe('SPAN');
  });

  it('renders slot content', () => {
    const wrapper = mount(InputIcon, {
      slots: { default: '<i class="icon">search</i>' },
    });
    expect(wrapper.find('.icon').exists()).toBe(true);
  });

  it('uses component class', () => {
    const wrapper = mount(InputIcon);
    expect(wrapper.classes()).toContain('qpv-inputicon');
  });
});
