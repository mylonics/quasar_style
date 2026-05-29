import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import InputMask from '../src/components/InputMask.vue';

describe('InputMask', () => {
  it('translates PrimeVue mask tokens to Quasar mask tokens', () => {
    const wrapper = mount(InputMask, { props: { mask: '99/aa-*' } });
    expect(wrapper.vm.quasarMask).toBe('##/AA-X');
  });

  it('emits update:modelValue on input', () => {
    const wrapper = mount(InputMask, { props: { mask: '99/99/9999' } });
    wrapper.vm.onInput('12/12/2024');
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['12/12/2024']);
  });

  it('emits complete when the mask is fully filled', () => {
    const wrapper = mount(InputMask, { props: { mask: '99/99', slotChar: '_' } });
    wrapper.vm.onInput('12/34');
    expect(wrapper.emitted('complete')).toBeTruthy();
  });

  it('clears incomplete value on blur when autoClear is true', () => {
    const wrapper = mount(InputMask, { props: { mask: '99/99', modelValue: '12/_', slotChar: '_' } });
    wrapper.vm.innerValue = '12/_';
    wrapper.vm.onBlur({ type: 'blur' });
    expect(wrapper.emitted('update:modelValue')?.pop()).toEqual(['']);
  });
});
