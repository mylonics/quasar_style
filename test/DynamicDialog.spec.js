import { describe, it, expect, vi } from 'vitest';
import { h } from 'vue';
import { mount } from '@vue/test-utils';
import DynamicDialog from '../src/components/DynamicDialog.vue';

const DemoChild = {
  props: { message: { type: String, default: '' } },
  render() {
    return h('div', { class: 'demo-child' }, this.message);
  },
};

describe('DynamicDialog', () => {
  it('shows a dynamic component', () => {
    const wrapper = mount(DynamicDialog);
    wrapper.vm.show({ component: DemoChild, props: { message: 'Hello' } });
    expect(wrapper.vm.visible).toBe(true);
    expect(wrapper.vm.renderedComponent).toBe(DemoChild);
  });

  it('emits close when hide is called', () => {
    const wrapper = mount(DynamicDialog);
    wrapper.vm.hide({ ok: true });
    expect(wrapper.emitted('close')?.[0]).toEqual([{ ok: true }]);
  });

  it('invokes onClose callback', () => {
    const onClose = vi.fn();
    const wrapper = mount(DynamicDialog);
    wrapper.vm.show({ component: DemoChild, onClose, data: { ok: true } });
    wrapper.vm.hide({ ok: true });
    expect(onClose).toHaveBeenCalledWith({ ok: true });
  });
});
