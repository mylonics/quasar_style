<template>
  <div class="qpv-terminal">
    <div ref="output" class="qpv-terminal__output">
      <div v-for="(line, index) in lines" :key="index" class="qpv-terminal__line">{{ line }}</div>
    </div>
    <form class="qpv-terminal__prompt" @submit.prevent="submitCommand">
      <span class="qpv-terminal__prompt-label">{{ prompt }}</span>
      <input
        v-model="commandText"
        class="qpv-terminal__input"
        type="text"
        @keydown.up.prevent="navigateHistory(-1)"
        @keydown.down.prevent="navigateHistory(1)"
      />
    </form>
  </div>
</template>

<script>
// PrimeVue-compatible Terminal. Provides a simple terminal-style history area,
// command prompt, and imperative addResponse method.
// API mirrors PrimeVue's `Terminal`.
export default {
  name: 'PvTerminal',
  props: {
    welcomeMessage: { type: String, default: '' },
    prompt: { type: String, default: '$' },
  },
  emits: ['command'],
  data() {
    return {
      lines: this.welcomeMessage ? this.welcomeMessage.split('\n') : [],
      history: [],
      historyIndex: -1,
      commandText: '',
    };
  },
  methods: {
    submitCommand() {
      const value = this.commandText;
      this.lines.push(`${this.prompt} ${value}`);
      this.history.unshift(value);
      this.historyIndex = -1;
      this.commandText = '';
      this.$emit('command', { value });
    },
    addResponse(text) {
      this.lines.push(...String(text).split('\n'));
      this.$nextTick(() => {
        if (this.$refs.output) {
          this.$refs.output.scrollTop = this.$refs.output.scrollHeight;
        }
      });
    },
    navigateHistory(direction) {
      if (this.history.length === 0) {
        return;
      }

      const next = Math.min(this.history.length - 1, Math.max(-1, this.historyIndex + direction));
      this.historyIndex = next;
      this.commandText = next < 0 ? '' : (this.history[next] || '');
    },
  },
};
</script>
