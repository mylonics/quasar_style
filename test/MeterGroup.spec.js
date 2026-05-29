import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import MeterGroup from '../src/components/MeterGroup.vue';

describe('MeterGroup', () => {
  const value = [
    { label: 'Apps', value: 16, color: '#34d399' },
    { label: 'Messages', value: 8, color: '#fbbf24' },
  ];

  it('renders one meter segment per value entry', () => {
    const wrapper = mount(MeterGroup, { props: { value } });
    expect(wrapper.findAll('.qpv-metergroup__meter')).toHaveLength(2);
  });

  it('sizes segments as a percentage of the min/max range', () => {
    const wrapper = mount(MeterGroup, { props: { value, min: 0, max: 100 } });
    const meters = wrapper.findAll('.qpv-metergroup__meter');
    expect(meters[0].attributes('style')).toContain('width: 16%');
    expect(meters[1].attributes('style')).toContain('width: 8%');
  });

  it('exposes the aggregate percentage via aria-valuenow', () => {
    const wrapper = mount(MeterGroup, { props: { value, max: 100 } });
    expect(wrapper.attributes('aria-valuenow')).toBe('24');
  });

  it('renders a label per entry by default', () => {
    const wrapper = mount(MeterGroup, { props: { value } });
    expect(wrapper.findAll('.qpv-metergroup__label')).toHaveLength(2);
    expect(wrapper.text()).toContain('Apps');
  });

  it('switches to vertical layout', () => {
    const wrapper = mount(MeterGroup, { props: { value, orientation: 'vertical' } });
    expect(wrapper.classes()).toContain('qpv-metergroup--vertical');
    expect(wrapper.find('.qpv-metergroup__meter').attributes('style')).toContain('height');
  });
});
