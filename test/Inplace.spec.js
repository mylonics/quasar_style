import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import Inplace from '../src/components/Inplace.vue';

describe('Inplace', () => {
  const slots = {
    display: '<span class="disp">Click to edit</span>',
    content: '<input class="edit" />',
  };

  it('shows the display slot when inactive', () => {
    const wrapper = mount(Inplace, { slots });
    expect(wrapper.find('.disp').exists()).toBe(true);
    expect(wrapper.find('.edit').exists()).toBe(false);
  });

  it('activates on display click and emits open + update:active', async () => {
    const wrapper = mount(Inplace, { slots });
    await wrapper.find('.qpv-inplace__display').trigger('click');
    expect(wrapper.find('.edit').exists()).toBe(true);
    expect(wrapper.emitted('open')).toHaveLength(1);
    expect(wrapper.emitted('update:active')[0]).toEqual([true]);
  });

  it('does not activate when disabled', async () => {
    const wrapper = mount(Inplace, { slots, props: { disabled: true } });
    await wrapper.find('.qpv-inplace__display').trigger('click');
    expect(wrapper.find('.edit').exists()).toBe(false);
    expect(wrapper.emitted('open')).toBeUndefined();
  });

  it('renders a close button when closable and closes on click', async () => {
    const wrapper = mount(Inplace, {
      slots,
      props: { active: true, closable: true },
    });
    expect(wrapper.find('.qpv-inplace__close').exists()).toBe(true);
    await wrapper.find('.qpv-inplace__close').trigger('click');
    expect(wrapper.emitted('close')).toHaveLength(1);
    expect(wrapper.emitted('update:active').at(-1)).toEqual([false]);
  });
});
