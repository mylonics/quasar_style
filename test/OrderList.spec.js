import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import OrderList from '../src/components/OrderList.vue';

const items = ['A', 'B', 'C', 'D'];

function mountList(props = {}) {
  return mount(OrderList, {
    props: { modelValue: [...items], selection: [], ...props },
  });
}

describe('OrderList', () => {
  it('renders one item per model entry', () => {
    const wrapper = mountList();
    expect(wrapper.findAll('.qpv-orderlist__item')).toHaveLength(4);
  });

  it('toggles selection on item click', async () => {
    const wrapper = mountList();
    await wrapper.findAll('.qpv-orderlist__item')[1].trigger('click');
    expect(wrapper.emitted('update:selection').at(-1)).toEqual([['B']]);
  });

  it('moves a selected item up', () => {
    const wrapper = mountList({ selection: ['C'] });
    wrapper.vm.moveUp();
    expect(wrapper.emitted('update:modelValue').at(-1)).toEqual([['A', 'C', 'B', 'D']]);
  });

  it('moves a selected item down', () => {
    const wrapper = mountList({ selection: ['B'] });
    wrapper.vm.moveDown();
    expect(wrapper.emitted('update:modelValue').at(-1)).toEqual([['A', 'C', 'B', 'D']]);
  });

  it('moves selected items to the top preserving order', () => {
    const wrapper = mountList({ selection: ['C', 'D'] });
    wrapper.vm.moveTop();
    expect(wrapper.emitted('update:modelValue').at(-1)).toEqual([['C', 'D', 'A', 'B']]);
  });

  it('moves selected items to the bottom preserving order', () => {
    const wrapper = mountList({ selection: ['A', 'B'] });
    wrapper.vm.moveBottom();
    expect(wrapper.emitted('update:modelValue').at(-1)).toEqual([['C', 'D', 'A', 'B']]);
  });

  it('does not move past the top boundary', () => {
    const wrapper = mountList({ selection: ['A'] });
    wrapper.vm.moveUp();
    expect(wrapper.emitted('update:modelValue')).toBeUndefined();
  });
});
