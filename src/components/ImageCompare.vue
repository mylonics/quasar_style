<script>
import { h, cloneVNode, Comment } from 'vue';

// PrimeVue-compatible ImageCompare. Accepts two default-slot images and renders
// a draggable divider that reveals more or less of the second image.
// API mirrors PrimeVue's `ImageCompare`.
export default {
  name: 'PvImageCompare',
  props: {
    pt: { type: Object, default: null },
  },
  data() {
    return {
      position: 50,
      dragging: false,
    };
  },
  methods: {
    getSlotNodes() {
      return (this.$slots.default ? this.$slots.default() : []).filter((node) => node.type !== Comment);
    },
    updatePosition(clientX) {
      const rect = this.$el.getBoundingClientRect();
      const next = ((clientX - rect.left) / rect.width) * 100;
      this.position = Math.min(100, Math.max(0, next));
    },
    onPointerMove(event) {
      if (this.dragging) {
        this.updatePosition(event.clientX);
      }
    },
    stopDrag() {
      this.dragging = false;
      document.removeEventListener('mousemove', this.onPointerMove);
      document.removeEventListener('mouseup', this.stopDrag);
    },
    startDrag(event) {
      event.preventDefault();
      this.dragging = true;
      this.updatePosition(event.clientX);
      document.addEventListener('mousemove', this.onPointerMove);
      document.addEventListener('mouseup', this.stopDrag);
    },
  },
  beforeUnmount() {
    this.stopDrag();
  },
  render() {
    const nodes = this.getSlotNodes();
    const beforeImage = nodes[0] ? cloneVNode(nodes[0], { class: ['qpv-imagecompare__image', nodes[0].props?.class] }) : h('div');
    const afterImage = nodes[1] ? cloneVNode(nodes[1], { class: ['qpv-imagecompare__image', nodes[1].props?.class] }) : h('div');

    return h('div', { class: 'qpv-imagecompare' }, [
      h('div', { class: 'qpv-imagecompare__before' }, [beforeImage]),
      h('div', {
        class: 'qpv-imagecompare__after',
        style: { width: `${this.position}%` },
      }, [afterImage]),
      h('button', {
        type: 'button',
        class: 'qpv-imagecompare__handle',
        style: { left: `${this.position}%` },
        onMousedown: this.startDrag,
      }, '↔'),
    ]);
  },
};
</script>
