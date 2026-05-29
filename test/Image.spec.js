import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import Image from '../src/components/Image.vue';

describe('Image', () => {
  it('renders a q-img', () => {
    const wrapper = mount(Image, { props: { src: 'https://example.com/img.png' } });
    expect(wrapper.find('.q-img').exists()).toBe(true);
  });

  it('does not show preview button when preview is false', () => {
    const wrapper = mount(Image, { props: { src: 'https://example.com/img.png', preview: false } });
    expect(wrapper.find('.qpv-image__preview-btn').exists()).toBe(false);
  });

  it('shows preview button when preview is true', () => {
    const wrapper = mount(Image, { props: { src: 'https://example.com/img.png', preview: true } });
    expect(wrapper.find('.qpv-image__preview-btn').exists()).toBe(true);
  });

  it('opens preview overlay when preview button is clicked', async () => {
    const wrapper = mount(Image, {
      props: { src: 'https://example.com/img.png', preview: true },
      attachTo: document.body,
    });
    expect(wrapper.vm.previewVisible).toBe(false);
    await wrapper.find('.qpv-image__preview-btn').trigger('click');
    expect(wrapper.vm.previewVisible).toBe(true);
    expect(wrapper.emitted('show')).toBeTruthy();
    wrapper.unmount();
  });

  it('closePreview sets previewVisible to false', async () => {
    const wrapper = mount(Image, {
      props: { src: 'https://example.com/img.png', preview: true },
      attachTo: document.body,
    });
    await wrapper.vm.openPreview();
    wrapper.vm.closePreview();
    expect(wrapper.vm.previewVisible).toBe(false);
    expect(wrapper.emitted('hide')).toBeTruthy();
    wrapper.unmount();
  });

  it('zoom and rotate state changes work', async () => {
    const wrapper = mount(Image, {
      props: { src: 'https://example.com/img.png', preview: true },
    });
    await wrapper.vm.openPreview();
    expect(wrapper.vm.scale).toBe(1);
    wrapper.vm.scale += 0.25;
    expect(wrapper.vm.scale).toBe(1.25);
    wrapper.vm.rotate += 90;
    expect(wrapper.vm.rotate).toBe(90);
    wrapper.unmount();
  });
});
