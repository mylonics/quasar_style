import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import DeferredContent from '../src/components/DeferredContent.vue';

describe('DeferredContent', () => {
  it('does not render slot content before load', () => {
    const wrapper = mount(DeferredContent, {
      slots: { default: '<span class="payload">Loaded</span>' },
    });
    expect(wrapper.find('.payload').exists()).toBe(false);
  });

  it('renders slot content after visibility becomes true', async () => {
    const wrapper = mount(DeferredContent, {
      slots: { default: '<span class="payload">Loaded</span>' },
    });
    wrapper.vm.onVisibility(true);
    await wrapper.vm.$nextTick();
    expect(wrapper.find('.payload').exists()).toBe(true);
  });

  it('emits load only once', () => {
    const wrapper = mount(DeferredContent);
    wrapper.vm.onVisibility(true);
    wrapper.vm.onVisibility(true);
    expect(wrapper.emitted('load')).toHaveLength(1);
  });

  it('ignores false visibility events', () => {
    const wrapper = mount(DeferredContent);
    wrapper.vm.onVisibility(false);
    expect(wrapper.emitted('load')).toBeFalsy();
  });
});
