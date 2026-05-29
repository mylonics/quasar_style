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
  - 🟡 **Partial** — Quasar covers the core behaviour but lacks notable
    PrimeVue features (documented in _Notes_).
  - ❌ **No** — no Quasar equivalent; must be built.
- **Action**
  - _Restyle_ — covered by the Phase 2 theme layer (`src/css/components/*`); no
    new component code.
  - _Build_ — a new component is added under `src/components/` (Phase 4).
  - _Build (thin)_ — a thin PrimeVue-API wrapper over an existing Quasar
    component to align prop/slot/event names.
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
| AutoComplete | ❌ No | QSelect `use-input` (close) | Build (thin) | **P1** | Multi-select chips + dropdown + completion events. |
| CascadeSelect | ❌ No | — | Build | P2 | Nested option groups in a single popover. |
| TreeSelect | ❌ No | QSelect + QTree | Build | P2 | Tree picker inside a popover. |
| InputMask | ❌ No | QInput `mask` (close) | Build (thin) | P2 | Quasar masks differ from PrimeVue token syntax. |
| Password | ❌ No | QInput `type="password"` | Build | P2 | Strength meter + show/hide toggle. |
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
| **DataView** | ❌ No | QTable is grid-only | **Build** | **P1** | List/grid layout switch + paginator + sorting. |
| **OrderList** | ❌ No | — | **Build** | **P1** | Reorderable list with up/down/top/bottom controls. |
| **PickList** | ❌ No | — | **Build** | **P1** | Dual transfer list (source ⇄ target). |
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
| **Fieldset** | ❌ No | — | **Build** | **P1** | Bordered group w/ legend; optional toggle. |
| DeferredContent | ❌ No | QIntersection | Build (thin) | P3 | Render on scroll-into-view. |

## Overlay

| PrimeVue | In Quasar? | Quasar equivalent | Action | Priority | Notes |
| --- | --- | --- | --- | --- | --- |
| Dialog | ✅ Yes | QDialog | Restyle | — | |
| Drawer (Sidebar) | ✅ Yes | QDrawer | Restyle | — | |
| Tooltip | ✅ Yes | QTooltip | Restyle | — | |
| ConfirmDialog | 🟡 Partial | Quasar `$q.dialog` | Restyle | P2 | |
| Popover (OverlayPanel) | 🟡 Partial | QMenu / QPopupProxy | Build (thin) | P2 | PrimeVue `toggle(event)` API. |
| ConfirmPopup | ❌ No | QMenu | Build | P2 | Inline confirm anchored to a target. |
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
| Image | 🟡 Partial | QImg | Build (thin) | P2 | Add preview/zoom overlay. |
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
| **MeterGroup** | ❌ No | — | **Build** | **P1** | Multi-segment meter with labels/legend. |
| **Inplace** | ❌ No | QPopupEdit (close) | **Build** | **P1** | Click-to-edit display→editor swap. |
| BlockUI | ❌ No | QInnerLoading (close) | Build | P2 | Mask a region/page. |
| Terminal | ❌ No | — | Build | P3 | |
| FocusTrap | 🟡 Partial | QDialog internal | Build (thin) | P3 | |

## Phase 4 — first iteration

The components selected for the first Phase 4 iteration are the **P1, build-new**
items that are genuinely absent from Quasar and self-contained (buildable on
Quasar primitives without new heavy dependencies):

1. **MeterGroup** (Misc)
2. **Fieldset** (Panel)
3. **Inplace** (Misc)
4. **DataView** (Data)
5. **OrderList** (Data)
6. **PickList** (Data)

Each ships as a Vue SFC under `src/components/`, an Aura theme partial under
`src/css/components/`, a unit-test spec under `test/`, and a demo on the
playground components page (`playground/components.html`). Remaining rows are
tracked here for subsequent iterations.
