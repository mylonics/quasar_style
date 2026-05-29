import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import Galleria from '../src/components/Galleria.vue';

const items = [
  { src: 'one.jpg', thumbnailImageSrc: 'one-thumb.jpg', title: 'One' },
  { src: 'two.jpg', thumbnailImageSrc: 'two-thumb.jpg', title: 'Two' },
];

describe('Galleria', () => {
  it('renders thumbnails when enabled', () => {
    const wrapper = mount(Galleria, { props: { value: items, showThumbnails: true } });
    expect(wrapper.findAll('.qpv-galleria__thumb')).toHaveLength(2);
  });

  it('emits update:activeIndex when changing slides', () => {
    const wrapper = mount(Galleria, { props: { value: items } });
    wrapper.vm.updateIndex(1);
    expect(wrapper.emitted('update:activeIndex')?.[0]).toEqual([1]);
  });

  it('emits update:visible when opening fullscreen', () => {
    const wrapper = mount(Galleria, { props: { value: items, fullScreen: true } });
    wrapper.vm.openFullScreen();
    expect(wrapper.emitted('update:visible')?.[0]).toEqual([true]);
  });

  it('limits visible thumbnails by numVisible', () => {
    const wrapper = mount(Galleria, { props: { value: items, numVisible: 1 } });
    expect(wrapper.vm.visibleThumbnails).toHaveLength(1);
  });
});
