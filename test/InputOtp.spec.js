import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import InputOtp from '../src/components/InputOtp.vue';

describe('InputOtp', () => {
  it('renders the configured number of inputs', () => {
    const wrapper = mount(InputOtp, { props: { length: 6 } });
    expect(wrapper.findAll('input')).toHaveLength(6);
  });

  it('emits concatenated value on input', () => {
    const wrapper = mount(InputOtp, { props: { length: 4 } });
    wrapper.vm.values = ['1', '2', '', ''];
    wrapper.vm.onInput(2, { target: { value: '3' } });
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['123']);
  });

  it('filters non-digits when integerOnly is enabled', () => {
    const wrapper = mount(InputOtp, { props: { integerOnly: true } });
    expect(wrapper.vm.sanitize('a')).toBe('');
    expect(wrapper.vm.sanitize('8')).toBe('8');
  });

  it('supports pasting across all fields', () => {
    const wrapper = mount(InputOtp, { props: { length: 4 } });
    wrapper.vm.onPaste({
      preventDefault() {},
      clipboardData: { getData: () => '9876' },
    });
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['9876']);
  });
});
