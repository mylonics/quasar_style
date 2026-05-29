import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import ImageCompare from '../src/components/ImageCompare.vue';

describe('ImageCompare', () => {
  it('renders both slotted images', () => {
    const wrapper = mount(ImageCompare, {
      slots: { default: '<img class="before" src="one.jpg" /><img class="after" src="two.jpg" />' },
    });
    expect(wrapper.html()).toContain('before');
    expect(wrapper.html()).toContain('after');
  });

  it('starts dragging on handle interaction', () => {
    const wrapper = mount(ImageCompare, {
      attachTo: document.body,
      slots: { default: '<img src="one.jpg" /><img src="two.jpg" />' },
    });
    wrapper.vm.$el.getBoundingClientRect = () => ({ left: 0, width: 200 });
    wrapper.vm.startDrag({ preventDefault() {}, clientX: 100 });
    expect(wrapper.vm.dragging).toBe(true);
    wrapper.vm.stopDrag();
    wrapper.unmount();
  });

  it('updates the slider position', () => {
    const wrapper = mount(ImageCompare, {
      slots: { default: '<img src="one.jpg" /><img src="two.jpg" />' },
    });
    wrapper.vm.$el.getBoundingClientRect = () => ({ left: 0, width: 100 });
    wrapper.vm.updatePosition(25);
    expect(wrapper.vm.position).toBe(25);
  });
});
