import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import PanelMenu from '../src/components/PanelMenu.vue';

const model = [
  { key: 'reports', label: 'Reports', items: [{ label: 'Sales', command: vi.fn() }] },
];

describe('PanelMenu', () => {
  it('renders top-level panels', () => {
    const wrapper = mount(PanelMenu, { props: { model } });
    expect(wrapper.text()).toContain('Reports');
  });

  it('emits expanded key updates when opening a panel', () => {
    const wrapper = mount(PanelMenu, { props: { model } });
    wrapper.vm.togglePanel(model[0], true);
    expect(wrapper.emitted('update:expandedKeys')?.[0]).toEqual([{ reports: true }]);
    expect(wrapper.emitted('panel-open')).toBeTruthy();
  });

  it('emits close events when collapsing a panel', () => {
    const wrapper = mount(PanelMenu, { props: { model, expandedKeys: { reports: true } } });
    wrapper.vm.togglePanel(model[0], false);
    expect(wrapper.emitted('panel-close')).toBeTruthy();
  });

  it('runs nested item commands', () => {
    const wrapper = mount(PanelMenu, { props: { model } });
    wrapper.vm.executeItem({ item: model[0].items[0], event: { type: 'click' } });
    expect(model[0].items[0].command).toHaveBeenCalled();
  });
});
