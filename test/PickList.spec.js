import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import PickList from '../src/components/PickList.vue';

function mountPick(props = {}) {
  return mount(PickList, {
    props: {
      modelValue: [['A', 'B', 'C'], ['X']],
      selection: [[], []],
      ...props,
    },
  });
}

describe('PickList', () => {
  it('renders source and target items', () => {
    const wrapper = mountPick();
    const source = wrapper.find('.qpv-picklist__source');
    const target = wrapper.find('.qpv-picklist__target');
    expect(source.findAll('.qpv-picklist__item')).toHaveLength(3);
    expect(target.findAll('.qpv-picklist__item')).toHaveLength(1);
  });

  it('moves selected source items to the target', () => {
    const wrapper = mountPick({ selection: [['B'], []] });
    wrapper.vm.moveToTarget();
    expect(wrapper.emitted('update:modelValue').at(-1)).toEqual([[['A', 'C'], ['X', 'B']]]);
    expect(wrapper.emitted('move-to-target')).toHaveLength(1);
  });

  it('moves all source items to the target', () => {
    const wrapper = mountPick();
    wrapper.vm.moveAllToTarget();
    expect(wrapper.emitted('update:modelValue').at(-1)).toEqual([[[], ['X', 'A', 'B', 'C']]]);
  });

  it('moves selected target items back to the source', () => {
    const wrapper = mountPick({ selection: [[], ['X']] });
    wrapper.vm.moveToSource();
    expect(wrapper.emitted('update:modelValue').at(-1)).toEqual([[['A', 'B', 'C', 'X'], []]]);
  });

  it('moves all target items back to the source', () => {
    const wrapper = mountPick();
    wrapper.vm.moveAllToSource();
    expect(wrapper.emitted('update:modelValue').at(-1)).toEqual([[['A', 'B', 'C', 'X'], []]]);
  });

  it('selects items per-list on click', async () => {
    const wrapper = mountPick();
    const firstSource = wrapper.find('.qpv-picklist__source').findAll('.qpv-picklist__item')[0];
    await firstSource.trigger('click');
    expect(wrapper.emitted('update:selection').at(-1)).toEqual([[['A'], []]]);
  });
});
