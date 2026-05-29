// PrimeVue-style component library for the Quasar Aura extension.
//
// These are the components Quasar lacks (see docs/COMPONENT-GAP-ANALYSIS.md),
// built on Quasar primitives and themed by the Aura layer. They are exposed as
// a Vue plugin so a host app can `app.use(QuasarPrimeVueComponents)` (or use the
// bundled Quasar App Extension boot file, which does this automatically).
import MeterGroup from './MeterGroup.vue';
import Fieldset from './Fieldset.vue';
import Inplace from './Inplace.vue';
import DataView from './DataView.vue';
import OrderList from './OrderList.vue';
import PickList from './PickList.vue';
import Password from './Password.vue';
import BlockUI from './BlockUI.vue';
import Popover from './Popover.vue';

export const components = {
  MeterGroup,
  Fieldset,
  Inplace,
  DataView,
  OrderList,
  PickList,
  Password,
  BlockUI,
  Popover,
};

export { MeterGroup, Fieldset, Inplace, DataView, OrderList, PickList, Password, BlockUI, Popover };

export default {
  install(app) {
    for (const [name, component] of Object.entries(components)) {
      // Registered globally as <MeterGroup>, <Fieldset>, ... and the kebab-case
      // equivalents Vue derives automatically.
      app.component(name, component);
    }
  },
};
