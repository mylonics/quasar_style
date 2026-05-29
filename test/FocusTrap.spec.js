import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import FocusTrap from '../src/components/FocusTrap.vue';

describe('FocusTrap', () => {
  it('renders slot content', () => {
    const wrapper = mount(FocusTrap, {
      slots: { default: '<button class="first">One</button>' },
    });
    expect(wrapper.find('.first').exists()).toBe(true);
  });

  it('emits update:active when tabbing while active', async () => {
    const wrapper = mount(FocusTrap, {
      attachTo: document.body,
      slots: { default: '<button class="first">One</button><button class="last">Two</button>' },
    });
    await wrapper.find('.first').element.focus();
    await wrapper.trigger('keydown.tab');
    expect(wrapper.emitted('update:active')).toBeTruthy();
    wrapper.unmount();
  });

  it('cycles focus backwards with shift+tab', async () => {
    const wrapper = mount(FocusTrap, {
      attachTo: document.body,
      slots: { default: '<button class="first">One</button><button class="last">Two</button>' },
    });
    await wrapper.find('.first').element.focus();
    await wrapper.trigger('keydown', { key: 'Tab', shiftKey: true });
    expect(document.activeElement).toBe(wrapper.find('.last').element);
    wrapper.unmount();
  });

  it('does nothing when disabled', () => {
    const wrapper = mount(FocusTrap, {
      props: { disabled: true },
      slots: { default: '<button>One</button>' },
    });
    wrapper.vm.onTab({ shiftKey: false, preventDefault() {} });
    expect(wrapper.emitted('update:active')).toBeFalsy();
  });
});
