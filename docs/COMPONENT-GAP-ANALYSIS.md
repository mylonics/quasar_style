# Phase 3 — Component gap analysis

This document audits the [PrimeVue v4](https://primevue.org/) component catalog
against [Quasar](https://quasar.dev/)'s built-in components to decide, for each
PrimeVue component, whether Quasar already ships an equivalent (which this
extension can simply **restyle** through the Aura theme layer) or whether it is
**missing** and has to be **built** as a new component on top of Quasar
primitives (Phase 4).

## Legend

- **In Quasar?**
  - ✅ **Yes** — Quasar ships a directly-equivalent component.
  - ✅ **Built** — no Quasar equivalent; component was built in Phase 4 (`src/components/`).
  - 🟡 **Partial** — Quasar covers the core behaviour but lacks notable
    PrimeVue features (documented in _Notes_).
  - ❌ **No** — no Quasar equivalent; must be built.
- **Action**
  - _Restyle_ — covered by the Phase 2 theme layer (`src/css/components/*`); no
    new component code.
  - _Build_ — a new component is added under `src/components/` (Phase 4).
  - _Build (thin)_ — a thin PrimeVue-API wrapper over an existing Quasar
    component to align prop/slot/event names.
  - _✅ Done_ — already implemented; see _Notes_ for the source file.
- **Priority** — relative ordering for the iterative Phase 4 rollout.
  - **P1** high — common, genuinely missing, good ROI.
  - **P2** medium.
  - **P3** low / niche.
  - **—** already covered (restyle only).

## Form

| PrimeVue | In Quasar? | Quasar equivalent | Action | Priority | Notes |
| --- | --- | --- | --- | --- | --- |
| InputText | ✅ Yes | QInput | Restyle | — | |
| Textarea | ✅ Yes | QInput `type="textarea"` | Restyle | — | |
| Select (Dropdown) | ✅ Yes | QSelect | Restyle | — | |
| MultiSelect | ✅ Yes | QSelect `multiple` | Restyle | — | |
| Checkbox | ✅ Yes | QCheckbox | Restyle | — | |
| RadioButton | ✅ Yes | QRadio | Restyle | — | |
| ToggleSwitch | ✅ Yes | QToggle | Restyle | — | |
| Slider | ✅ Yes | QSlider / QRange | Restyle | — | |
| Listbox | ✅ Yes | QList / QSelect | Restyle | — | |
| Knob | ✅ Yes | QKnob | Restyle | — | Verified — Quasar has it. |
| Rating | ✅ Yes | QRating | Restyle | — | Verified — Quasar has it. |
| ColorPicker | ✅ Yes | QColor | Restyle | — | |
| DatePicker (Calendar) | ✅ Yes | QDate / QTime | Restyle | — | |
| Editor | ✅ Yes | QEditor | Restyle | — | |
| InputNumber | 🟡 Partial | QInput `type="number"` | Restyle | P3 | No spinner buttons / locale formatting. |
| SelectButton | 🟡 Partial | QBtnToggle | Restyle | P3 | |
| ToggleButton | 🟡 Partial | QBtnToggle (single) | Restyle | P3 | |
| FloatLabel | 🟡 Partial | QInput floating `label` | Restyle | — | |
| InputGroup / InputGroupAddon | 🟡 Partial | QInput slots / QField | Restyle | P3 | |
| **AutoComplete** | ❌ No | QSelect `use-input` (close) | **Build (thin)** | **P1** | Multi-select chips + dropdown + completion events. |
| CascadeSelect | ❌ No | — | Build | P2 | Nested option groups in a single popover. |
| TreeSelect | ❌ No | QSelect + QTree | Build | P2 | Tree picker inside a popover. |
| InputMask | ❌ No | QInput `mask` (close) | Build (thin) | P2 | Quasar masks differ from PrimeVue token syntax. |
| Password | ✅ Built | QInput `type="password"` | ✅ Done | P2 | `src/components/Password.vue` — strength meter + mask toggle. |
| InputOtp | ❌ No | — | Build | P3 | Segmented one-time-code input. |
| IconField / InputIcon | ❌ No | QInput slots | Build (thin) | P3 | |
| IftaLabel | ❌ No | — | Build | P3 | In-field top-aligned label. |

## Button

| PrimeVue | In Quasar? | Quasar equivalent | Action | Priority | Notes |
| --- | --- | --- | --- | --- | --- |
| Button | ✅ Yes | QBtn | Restyle | — | |
| SplitButton | ✅ Yes | QBtnDropdown `split` | Restyle | — | |
| SpeedDial | ✅ Yes | QFab / QFabAction | Restyle | — | |
| ButtonGroup | ✅ Yes | QBtnGroup | Restyle | — | |

## Data

| PrimeVue | In Quasar? | Quasar equivalent | Action | Priority | Notes |
| --- | --- | --- | --- | --- | --- |
| DataTable | 🟡 Partial | QTable | Restyle | P2 | Column/row grouping & frozen columns need custom slots. |
| Paginator | ✅ Yes | QPagination | Restyle | — | |
| Timeline | ✅ Yes | QTimeline | Restyle | — | Verified — Quasar has it; parity OK. |
| Tree | ✅ Yes | QTree | Restyle | — | |
| VirtualScroller | ✅ Yes | QVirtualScroll | Restyle | — | |
| **DataView** | ✅ Built | QTable is grid-only | ✅ Done | P1 | `src/components/DataView.vue` — list/grid layout + paginator. |
| **OrderList** | ✅ Built | — | ✅ Done | P1 | `src/components/OrderList.vue` — reorderable list. |
| **PickList** | ✅ Built | — | ✅ Done | P1 | `src/components/PickList.vue` — dual transfer list. |
| TreeTable | ❌ No | QTree + QMarkupTable | Build | P2 | Hierarchical rows with columns. |
| OrgChart | ❌ No | — | Build | P3 | |

## Panel

| PrimeVue | In Quasar? | Quasar equivalent | Action | Priority | Notes |
| --- | --- | --- | --- | --- | --- |
| Card | ✅ Yes | QCard (+ sections/actions) | Restyle | — | header/footer via QCardSection. |
| Divider | ✅ Yes | QSeparator | Restyle | — | |
| Accordion | ✅ Yes | QExpansionItem | Restyle | — | |
| Panel | 🟡 Partial | QCard / QExpansionItem | Restyle | P2 | Toggleable panel with header actions. |
| Splitter | ✅ Yes | QSplitter | Restyle | — | Verified — Quasar has it. |
| ScrollPanel | ✅ Yes | QScrollArea | Restyle | — | |
| Tabs / TabPanels | ✅ Yes | QTabs / QTabPanels | Restyle | — | |
| Toolbar | ✅ Yes | QToolbar | Restyle | — | |
| Stepper | ✅ Yes | QStepper | Restyle | — | Verified parity. |
| **Fieldset** | ✅ Built | — | ✅ Done | P1 | `src/components/Fieldset.vue` — bordered group w/ legend + collapse. |
| DeferredContent | ❌ No | QIntersection | Build (thin) | P3 | Render on scroll-into-view. |

## Overlay

| PrimeVue | In Quasar? | Quasar equivalent | Action | Priority | Notes |
| --- | --- | --- | --- | --- | --- |
| Dialog | ✅ Yes | QDialog | Restyle | — | |
| Drawer (Sidebar) | ✅ Yes | QDrawer | Restyle | — | |
| Tooltip | ✅ Yes | QTooltip | Restyle | — | |
| ConfirmDialog | 🟡 Partial | Quasar `$q.dialog` | Restyle | P2 | |
| Popover (OverlayPanel) | ✅ Built | QMenu / QPopupProxy | ✅ Done | P2 | `src/components/Popover.vue` — standalone `toggle(event)` API. |
| **ConfirmPopup** | ❌ No | QMenu | **Build** | **P2** | Inline confirm anchored to a target. |
| DynamicDialog | ❌ No | `$q.dialog` (close) | Build | P3 | |

## Menu

| PrimeVue | In Quasar? | Quasar equivalent | Action | Priority | Notes |
| --- | --- | --- | --- | --- | --- |
| Menu | ✅ Yes | QMenu + QList | Restyle | — | |
| Menubar | 🟡 Partial | QToolbar + QBtnDropdown | Restyle | P2 | |
| ContextMenu | ✅ Yes | QMenu `context-menu` | Restyle | — | |
| TieredMenu | 🟡 Partial | QMenu (nested) | Build | P3 | |
| Breadcrumb | ✅ Yes | QBreadcrumbs | Restyle | — | Verified — Quasar has it. |
| Steps | ✅ Yes | QStepper (header) | Restyle | — | |
| TabMenu | ✅ Yes | QTabs `QRouteTab` | Restyle | — | |
| PanelMenu | 🟡 Partial | QExpansionItem + QList | Build | P3 | |
| Dock | ❌ No | — | Build | P3 | macOS-style dock. |
| MegaMenu | ❌ No | QBtnDropdown + grid | Build | P3 | |

## Media

| PrimeVue | In Quasar? | Quasar equivalent | Action | Priority | Notes |
| --- | --- | --- | --- | --- | --- |
| Carousel | ✅ Yes | QCarousel | Restyle | — | |
| Image | ✅ Built | QImg | ✅ Done | P2 | `src/components/Image.vue` — preview/zoom overlay added. |
| Galleria | ❌ No | QCarousel + thumbnails | Build | P3 | |
| ImageCompare | ❌ No | — | Build | P3 | |

## File / Messages

| PrimeVue | In Quasar? | Quasar equivalent | Action | Priority | Notes |
| --- | --- | --- | --- | --- | --- |
| FileUpload | ✅ Yes | QUploader / QFile | Restyle | — | |
| Message | ✅ Yes | QBanner | Restyle | — | |
| Toast | ✅ Yes | Quasar `$q.notify` | Restyle | — | |

## Misc

| PrimeVue | In Quasar? | Quasar equivalent | Action | Priority | Notes |
| --- | --- | --- | --- | --- | --- |
| Avatar | ✅ Yes | QAvatar | Restyle | — | |
| Badge | ✅ Yes | QBadge | Restyle | — | |
| Chip | ✅ Yes | QChip | Restyle | — | |
| ProgressBar | ✅ Yes | QLinearProgress | Restyle | — | |
| ProgressSpinner | ✅ Yes | QSpinner / QCircularProgress | Restyle | — | |
| Skeleton | ✅ Yes | QSkeleton | Restyle | — | Verified — Quasar has it. |
| ScrollTop | ✅ Yes | QPageScroller | Restyle | — | |
| Ripple | ✅ Yes | `v-ripple` directive | Restyle | — | |
| Tag | ✅ Yes | QChip / QBadge | Restyle | — | Tag tokens already generated. |
| **MeterGroup** | ✅ Built | — | ✅ Done | P1 | `src/components/MeterGroup.vue` — multi-segment meter with labels/legend. |
| **Inplace** | ✅ Built | QPopupEdit (close) | ✅ Done | P1 | `src/components/Inplace.vue` — click-to-edit display→editor swap. |
| BlockUI | ✅ Built | QInnerLoading (close) | ✅ Done | P2 | `src/components/BlockUI.vue` — overlay mask over a region/page. |
| Terminal | ❌ No | — | Build | P3 | |
| FocusTrap | 🟡 Partial | QDialog internal | Build (thin) | P3 | |

## Phase 4 — implemented components

Each component ships as a Vue SFC under `src/components/`, an Aura theme partial
under `src/css/components/`, a unit-test spec under `test/`, and a demo on the
playground components page (`playground/components.html`).

### Iteration 1 — P1 items

1. **MeterGroup** (Misc)
2. **Fieldset** (Panel)
3. **Inplace** (Misc)
4. **DataView** (Data)
5. **OrderList** (Data)
6. **PickList** (Data)

### Iteration 2 — additional P2 items

7. **Password** (Form)
8. **BlockUI** (Misc)
9. **Popover** (Overlay)

### Iteration 3 — remaining P1 + further P2

10. **AutoComplete** (Form)
11. **ConfirmPopup** (Overlay)
12. **Image** (Media)

### Remaining work (not yet built)

Items still tracked for future iterations (P2/P3):

- Form: CascadeSelect, TreeSelect, InputMask, InputOtp, IconField/InputIcon, IftaLabel
- Data: TreeTable, OrgChart
- Panel: DeferredContent
- Overlay: ConfirmDialog, DynamicDialog
- Menu: TieredMenu, PanelMenu, Dock, MegaMenu
- Media: Galleria, ImageCompare
- Misc: Terminal, FocusTrap
