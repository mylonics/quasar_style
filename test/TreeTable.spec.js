import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import TreeTable from '../src/components/TreeTable.vue';

const columns = [
  { field: 'name', header: 'Name', expander: true },
  { field: 'size', header: 'Size' },
];
const value = [
  {
    key: '0',
    data: { name: 'Documents', size: '25kb' },
    children: [{ key: '0-0', data: { name: 'Resume.pdf', size: '10kb' } }],
  },
];

describe('TreeTable', () => {
  it('renders table headers', () => {
    const wrapper = mount(TreeTable, { props: { value, columns } });
    expect(wrapper.text()).toContain('Name');
    expect(wrapper.text()).toContain('Size');
  });

  it('emits expanded key updates when toggling a node', () => {
    const wrapper = mount(TreeTable, { props: { value, columns } });
    wrapper.vm.toggleNode(value[0]);
    expect(wrapper.emitted('update:expandedKeys')?.[0]).toEqual([{ 0: true }]);
    expect(wrapper.emitted('node-expand')).toBeTruthy();
  });

  it('emits selection updates in single selection mode', () => {
    const wrapper = mount(TreeTable, { props: { value, columns, selectionMode: 'single' } });
    wrapper.vm.toggleSelection(value[0]);
    expect(wrapper.emitted('update:selectionKeys')?.[0]).toEqual([{ 0: true }]);
    expect(wrapper.emitted('node-select')).toBeTruthy();
  });

  it('shows empty message with no rows', () => {
    const wrapper = mount(TreeTable, { props: { value: [], columns } });
    expect(wrapper.text()).toContain('No records found');
  });
});
