import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import Terminal from '../src/components/Terminal.vue';

describe('Terminal', () => {
  it('renders the welcome message', () => {
    const wrapper = mount(Terminal, { props: { welcomeMessage: 'Welcome' } });
    expect(wrapper.text()).toContain('Welcome');
  });

  it('emits a command on submit', async () => {
    const wrapper = mount(Terminal, { props: { prompt: '>' } });
    wrapper.vm.commandText = 'help';
    await wrapper.find('form').trigger('submit');
    expect(wrapper.emitted('command')?.[0]).toEqual([{ value: 'help' }]);
  });

  it('stores responses in the output buffer', async () => {
    const wrapper = mount(Terminal);
    wrapper.vm.addResponse('pong');
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.lines).toContain('pong');
  });

  it('navigates command history', async () => {
    const wrapper = mount(Terminal);
    wrapper.vm.commandText = 'first';
    wrapper.vm.submitCommand();
    wrapper.vm.navigateHistory(1);
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.commandText).toBe('first');
  });
});
