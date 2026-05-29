import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import BlockUI from '../src/components/BlockUI.vue';

describe('BlockUI', () => {
  it('renders the default slot content', () => {
    const wrapper = mount(BlockUI, {
      props: { blocked: false },
      slots: { default: '<p class="content">Hello</p>' },
    });
    expect(wrapper.find('.content').exists()).toBe(true);
  });

  it('does not show the mask when not blocked', () => {
    const wrapper = mount(BlockUI, {
      props: { blocked: false },
      slots: { default: '<p>Content</p>' },
    });
    expect(wrapper.find('.qpv-blockui__mask').exists()).toBe(false);
  });

  it('shows the mask when blocked is true', () => {
    const wrapper = mount(BlockUI, {
      props: { blocked: true },
      slots: { default: '<p>Content</p>' },
    });
    expect(wrapper.find('.qpv-blockui__mask').exists()).toBe(true);
  });

  it('renders the default spinner inside the mask', () => {
    const wrapper = mount(BlockUI, {
      props: { blocked: true },
      slots: { default: '<p>Content</p>' },
    });
    expect(wrapper.find('.qpv-blockui__spinner').exists()).toBe(true);
  });

  it('renders a custom overlay slot instead of the spinner', () => {
    const wrapper = mount(BlockUI, {
      props: { blocked: true },
      slots: {
        default: '<p>Content</p>',
        overlay: '<span class="custom-overlay">Loading…</span>',
      },
    });
    expect(wrapper.find('.custom-overlay').exists()).toBe(true);
    expect(wrapper.find('.qpv-blockui__spinner').exists()).toBe(false);
  });

  it('adds the full-page modifier class when fullPage is true', () => {
    const wrapper = mount(BlockUI, {
      props: { blocked: true, fullPage: true },
      slots: { default: '<p>Content</p>' },
    });
    expect(wrapper.classes()).toContain('qpv-blockui--full-page');
  });

  it('adds the blocked modifier class when blocked', () => {
    const wrapper = mount(BlockUI, {
      props: { blocked: true },
      slots: { default: '<p>Content</p>' },
    });
    expect(wrapper.classes()).toContain('qpv-blockui--blocked');
  });
});
