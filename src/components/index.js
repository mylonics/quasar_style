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
import AutoComplete from './AutoComplete.vue';
import ConfirmPopup from './ConfirmPopup.vue';
import Image from './Image.vue';
import DeferredContent from './DeferredContent.vue';
import FocusTrap from './FocusTrap.vue';
import IconField from './IconField.vue';
import InputIcon from './InputIcon.vue';
import IftaLabel from './IftaLabel.vue';
import InputMask from './InputMask.vue';
import InputOtp from './InputOtp.vue';
import CascadeSelect from './CascadeSelect.vue';
import TreeSelect from './TreeSelect.vue';
import ConfirmDialog from './ConfirmDialog.vue';
import DynamicDialog from './DynamicDialog.vue';
import TieredMenu from './TieredMenu.vue';
import PanelMenu from './PanelMenu.vue';
import MegaMenu from './MegaMenu.vue';
import Dock from './Dock.vue';
import Galleria from './Galleria.vue';
import ImageCompare from './ImageCompare.vue';
import TreeTable from './TreeTable.vue';
import OrgChart from './OrgChart.vue';
import Terminal from './Terminal.vue';

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
  AutoComplete,
  ConfirmPopup,
  Image,
  DeferredContent,
  FocusTrap,
  IconField,
  InputIcon,
  IftaLabel,
  InputMask,
  InputOtp,
  CascadeSelect,
  TreeSelect,
  ConfirmDialog,
  DynamicDialog,
  TieredMenu,
  PanelMenu,
  MegaMenu,
  Dock,
  Galleria,
  ImageCompare,
  TreeTable,
  OrgChart,
  Terminal,
};

export { MeterGroup, Fieldset, Inplace, DataView, OrderList, PickList, Password, BlockUI, Popover, AutoComplete, ConfirmPopup, Image, DeferredContent, FocusTrap, IconField, InputIcon, IftaLabel, InputMask, InputOtp, CascadeSelect, TreeSelect, ConfirmDialog, DynamicDialog, TieredMenu, PanelMenu, MegaMenu, Dock, Galleria, ImageCompare, TreeTable, OrgChart, Terminal };

export default {
  install(app) {
    for (const [name, component] of Object.entries(components)) {
      // Registered globally as <MeterGroup>, <Fieldset>, ... and the kebab-case
      // equivalents Vue derives automatically.
      app.component(name, component);
    }
  },
};
