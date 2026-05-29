import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import Password from '../src/components/Password.vue';

describe('Password', () => {
  it('renders a password input by default', () => {
    const wrapper = mount(Password, { props: { modelValue: '' } });
    expect(wrapper.find('input[type="password"]').exists()).toBe(true);
  });

  it('does not render a toggle button by default', () => {
    const wrapper = mount(Password, { props: { modelValue: '' } });
    expect(wrapper.find('.qpv-password__toggle').exists()).toBe(false);
  });

  it('renders a toggle button when toggleMask is true', () => {
    const wrapper = mount(Password, {
      props: { modelValue: 'secret', toggleMask: true },
    });
    expect(wrapper.find('.qpv-password__toggle').exists()).toBe(true);
  });

  it('switches to text type when the toggle is clicked', async () => {
    const wrapper = mount(Password, {
      props: { modelValue: 'secret', toggleMask: true },
    });
    await wrapper.find('.qpv-password__toggle').trigger('click');
    expect(wrapper.find('input[type="text"]').exists()).toBe(true);
    expect(wrapper.find('input[type="password"]').exists()).toBe(false);
  });

  it('shows the strength panel on focus when feedback is enabled', async () => {
    const wrapper = mount(Password, { props: { modelValue: 'hello123A' } });
    expect(wrapper.find('.qpv-password__panel').exists()).toBe(false);
    await wrapper.vm.handleFocus({});
    expect(wrapper.find('.qpv-password__panel').exists()).toBe(true);
  });

  it('reports weak for short passwords', () => {
    const wrapper = mount(Password, { props: { modelValue: 'abc' } });
    expect(wrapper.vm.strength).toBe('weak');
  });

  it('reports medium for moderate passwords', () => {
    const wrapper = mount(Password, { props: { modelValue: 'abcdefGH' } });
    expect(wrapper.vm.strength).toBe('medium');
  });

  it('reports strong for complex passwords', () => {
    const wrapper = mount(Password, { props: { modelValue: 'Abcdef1!' } });
    expect(wrapper.vm.strength).toBe('strong');
  });

  it('emits update:modelValue when the input changes', async () => {
    const wrapper = mount(Password, { props: { modelValue: '' } });
    await wrapper.find('input').setValue('newpass');
    expect(wrapper.emitted('update:modelValue')).toBeTruthy();
  });

  it('emits focus and blur events', async () => {
    const wrapper = mount(Password, { props: { modelValue: '' } });
    await wrapper.vm.handleFocus({ type: 'focus' });
    await wrapper.vm.handleBlur({ type: 'blur' });
    expect(wrapper.emitted('focus')).toHaveLength(1);
    expect(wrapper.emitted('blur')).toHaveLength(1);
  });
});
