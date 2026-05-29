import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import DataView from '../src/components/DataView.vue';

const value = Array.from({ length: 7 }, (_, i) => ({ id: i, name: `Item ${i}` }));

describe('DataView', () => {
  it('renders the list slot with the current page items', () => {
    const wrapper = mount(DataView, {
      props: { value },
      slots: {
        list: `<template #list="{ items }"><span class="item" v-for="it in items" :key="it.id">{{ it.name }}</span></template>`,
      },
    });
    expect(wrapper.findAll('.item')).toHaveLength(7);
  });

  it('paginates when paginator + rows are set', () => {
    const wrapper = mount(DataView, {
      props: { value, paginator: true, rows: 3 },
      slots: {
        list: `<template #list="{ items }"><span class="item" v-for="it in items" :key="it.id">{{ it.name }}</span></template>`,
      },
    });
    expect(wrapper.findAll('.item')).toHaveLength(3);
    expect(wrapper.find('.qpv-dataview__paginator').exists()).toBe(true);
  });

  it('emits page + update:first when navigating', async () => {
    const wrapper = mount(DataView, {
      props: { value, paginator: true, rows: 3 },
      slots: {
        list: `<template #list="{ items }"><span class="item" v-for="it in items" :key="it.id">{{ it.name }}</span></template>`,
      },
    });
    wrapper.vm.onPage(2);
    await wrapper.vm.$nextTick();
    expect(wrapper.emitted('update:first').at(-1)).toEqual([3]);
    expect(wrapper.emitted('page').at(-1)[0]).toMatchObject({ first: 3, rows: 3, page: 1 });
  });

  it('shows the empty slot when there are no records', () => {
    const wrapper = mount(DataView, {
      props: { value: [] },
      slots: { empty: '<div class="none">Nothing</div>' },
    });
    expect(wrapper.find('.none').exists()).toBe(true);
  });

  it('renders the grid slot in grid layout', () => {
    const wrapper = mount(DataView, {
      props: { value, layout: 'grid' },
      slots: {
        grid: `<template #grid="{ items }"><span class="cell" v-for="it in items" :key="it.id" /></template>`,
      },
    });
    expect(wrapper.classes()).toContain('qpv-dataview--grid');
    expect(wrapper.findAll('.cell')).toHaveLength(7);
  });
});
