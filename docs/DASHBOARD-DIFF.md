# Dashboard Diff: Quasar + Aura Theme vs PrimeVue Aura Reference

Side-by-side analysis of every dashboard page, refreshed from a full screenshot
comparison of all six pages (Overview, Chat, Inbox, Cards, Customers, Movies)
rendered through `tools/screenshot.mjs` / the playground.

Each issue has a short ID, a description, its **current** status (verified from the
screenshots, not aspirational), and the fix applied or the reason it is deferred.

## How to reproduce the comparison

```bash
npm run playground      # build the static playground (git-ignored vendor/)
npm run screenshots     # writes docs/screenshots/dashboard-*.png
```

`docs/screenshots/dashboard-quasar-aura.png` and `dashboard-primevue.png` capture
the **Overview** page. Every page is also captured individually as
`dashboard-<page>-quasar-aura.png` and `dashboard-<page>-primevue.png` (overview,
chat, inbox, cards, customers, movies) so each page can be diffed image-to-image.
`tools/screenshot.mjs` walks the shared `.dash-nav-item` sidebar buttons to reach
each page; both dashboards switch pages with the same nav.

> **Palette note.** Both dashboards share `playground/dashboard-data.js`, whose
> `DEFAULT_PALETTE` is `noir`. The primary colour therefore renders as the Aura
> *noir* grey on **both** sides, so the comparison is apples-to-apples. (Earlier
> committed screenshots were emerald because the default used to be `emerald`;
> they were stale and have been regenerated.)

Status legend: ✅ matches · 🔧 fixed in this pass · ⚠️ partial / minor gap ·
⛔ component gap (no Quasar built-in equivalent) · 🌐 offline-asset artifact.

---

## Latest review pass — full per-page image analysis

A fresh screenshot of **all six pages** (captured individually, not just the
Overview landing) surfaced three genuine theme bugs that the previous pass had
only partially closed. All three are now fixed and re-verified from the
regenerated per-page screenshots.

| Fix | Where | What changed |
|-----|-------|--------------|
| Dense toggle crescent (CH5/CA8) | `src/css/components/_toggle.scss` | The Chat (Notification/Sound/Save) and Cards (Switch to Dark) switches use `q-toggle … dense`. Quasar's `.q-toggle--dense` rules (higher specificity) reset the inner track to `.8em×.5em` and pin the thumb to top-left, so the Aura-sized `0.667em` handle overhung the collapsed track as a **dark crescent**. Added `.q-toggle--dense` overrides that re-apply the Aura track + thumb geometry, so a dense `q-toggle` now renders as a proper Aura switch. |
| Empty floating badge dot (OV2/CU2) | `src/css/components/_badge.scss` | An empty floating `q-badge` (unread / status dot) inherited `min-height: var(--p-badge-height)` (1.5 rem) from the Aura Badge rule, stretching the dot into a **tall red pill**. This showed on the Overview notification bell and every Customers status dot. Added `.q-badge--floating:empty` (min-height/min-width 0, `--p-badge-dot-size`) to collapse content-less floating badges to a round dot. |
| SelectButton `outline` variant (CA1/CA2/CA6) | `playground/dashboard.css` | The Cards Follow/Message, payment-type and donate-amount toggles use the `outline` prop, which draws a per-button border via `.q-btn--outline::before`. That produced a **doubled outer border + inter-segment dividers** PrimeVue's single-pill SelectButton lacks. Extended the divider-hiding rule to `.q-btn-toggle .q-btn--outline:before`. |

---

## Previous cross-cutting fixes

| Fix | Where | What changed |
|-----|-------|--------------|
| Tag parity | `dashboard.css` | `q-badge color="positive/negative/info"` rendered as a **solid** filled Material badge. PrimeVue `Tag` uses a soft tinted background + saturated text. Added `.q-badge.bg-positive/.bg-negative/.bg-info` rules (soft `--p-*-100` background, `--p-*-700` text, 6 px radius). Affects Buy/Sell (Overview) and Active/Inactive/Prospect (Customers). |
| SelectButton parity | `dashboard.css` | `q-btn-toggle` rendered as segmented buttons with a **solid primary fill** on the selected option. PrimeVue `SelectButton` is one `surface-100` pill whose selected option is a raised `surface-0` chip. Restyled `.q-btn-toggle` (container + selected `.bg-primary` override + removed inner dividers). Affects the Weekly/Monthly/Yearly filter, Chat/Call & media tabs, payment-type / donate-amount toggles, and the Movies grid/list switch. |
| Overlay count badge | `movies.quasar.js` | The "want" count badge used `color="negative"` (red); PrimeVue's `OverlayBadge` count is neutral. Changed to `color="grey-3" text-color="grey-8"`. |
| Notification button + badge (OV2) | `overview.quasar.js`, `dashboard.css` | Removed `round` from the bell button; added `.notif-btn` (rounded-square, 2.25 rem) and `.notif-badge` (10×10 px dot). |
| Trial bar colour (IN9) | `inbox.quasar.js`, `dashboard.css` | Added `.inbox-trial-bar` class; `dashboard.css` forces `var(--p-red-600)` fill to match PrimeVue's fixed danger colour. |
| Active-user dot colour (CU1) | `customers.quasar.js` | Replaced `icon-color="positive"` (overridden by button's outline colour) with an explicit `<q-icon>` using `color:var(--p-green-500)`. |
| Customers bottom paginator (CU7) | `customers.quasar.js` | Added `hide-bottom` prop to the customers `q-table`; removes the extra "Records per page" bar PrimeVue does not show. |
| Radio inner dot (CA7) | `src/css/components/_radio.scss` | Removed the `.q-radio__check { color: white }` rule — white dot on white background was invisible. Inner dot now inherits primary colour from `.q-radio__inner--truthy`, giving a solid filled-circle appearance. |
| Toggle crescent artifact (CA8) | `src/css/components/_toggle.scss` | Added `.q-toggle__thumb:before { display:none }`. Quasar's Material ripple circle is always at `scale(2)`, bleeding outside the Aura pill track as a crescent ghost. |

---

## Shell / Sidebar

| ID | Area | Quasar | PrimeVue | Status |
|----|------|--------|----------|--------|
| S1 | Collapse button | Hidden when sidebar collapsed via `.dash-sidebar--collapsed .dash-collapse-btn{display:none}` | Not present when collapsed | ✅ |
| S2 | User avatar | `q-avatar size="40px"` | `Avatar shape="circle"` | ✅ Aura normalises both |

---

## Overview page

| ID | Area | Quasar | PrimeVue | Status |
|----|------|--------|----------|--------|
| OV1 | Search input | `q-input outlined dense` + `#prepend` | `IconField + InputIcon + InputText` | ✅ |
| OV2 | Notification button | `q-btn … round` + floating `q-badge` | `Button variant="outlined"` (rounded **square**) + small `OverlayBadge` dot | 🔧 Fixed — button is a rounded-square (`notif-btn`); badge is now a round dot. The empty floating badge previously stretched to a tall red pill because it inherited the Aura Badge `min-height`; `.q-badge--floating:empty` in `_badge.scss` collapses it to `--p-badge-dot-size`. |
| OV3 | Weekly/Monthly/Yearly | `q-btn-toggle` | `SelectButton` | 🔧 Fixed — `q-btn-toggle` now renders as an Aura SelectButton pill with a raised chip for the selected option (was a solid primary fill). |
| OV4 | Download button | `q-btn color="primary"` | `Button` | ✅ |
| OV5 | Date picker | `q-input` + `q-date` popup | `DatePicker showIcon iconDisplay="input"` | ⛔ No Quasar built-in DatePicker equivalent. |
| OV6 | Table pagination | `q-table` "Records per page / 1-5 of 10 / ‹ ›" | `DataTable` "‹ 1 2 › Showing 1 to 5 of 10 entries" | ⚠️ Quasar's built-in paginator (rows-per-page select) differs from PrimeVue's numbered paginator. |
| OV7 | Buy/Sell tag | `q-badge color="positive/negative"` | `Tag severity` | 🔧 Fixed — soft tinted pill (green/red) instead of solid fill. |
| OV8 | Overflow menu | `q-btn` + `q-menu > q-list` | `Button text` + `Menu popup` | ⚠️ Material popover vs compact floating list. |
| OV9 | My Wallet MeterGroup | aura `MeterGroup` | `MeterGroup` | ✅ Component parity. |
| OV10 | Show All button | `q-btn outline` | `Button variant="outlined"` | ✅ |
| OV11 | Transactions avatars | `q-avatar size="32px"` | `Avatar` | ✅ Both render at 32 px with identical inline colour/font styles. |

---

## Chat page

| ID | Area | Quasar | PrimeVue | Status |
|----|------|--------|----------|--------|
| CH1 | Chat / Call tabs | `q-btn-toggle` | `SelectButton` | 🔧 Fixed by the SelectButton pass. |
| CH2 | Chat-list avatars | `q-avatar size="40px"` | `Avatar size="large"` | 🌐 Both use the same primefaces CDN images; offline they fall back to broken-image glyphs on both sides. |
| CH3 | Unread-count badge | `q-badge color="grey-8"` | `Badge severity="contrast"` | ✅ Dark contrast badge. |
| CH4 | Message textarea | `q-input autogrow` | `Textarea autoResize` | ✅ |
| CH5 | Toggle switches | `q-toggle` | `ToggleSwitch` | 🔧 Fixed — the `dense` toggles rendered as a dark crescent (Quasar's `.q-toggle--dense` geometry overrode the Aura sizing); `_toggle.scss` now re-applies the Aura track/thumb geometry for the dense variant. |
| CH6 | Media type tabs | `q-btn-toggle` | `SelectButton` | 🔧 Fixed by the SelectButton pass. |
| CH7 | Send button | `q-btn icon="send"` (square radius) | `Button icon="pi pi-send"` | ✅ |
| CH8 | Member chevron | `q-icon chevron_right` | `pi pi-chevron-right` | ✅ |
| CH9 | Header overflow menu | `q-menu > q-list` | `Menu popup` | ⚠️ Same popover gap as OV8. |

---

## Inbox page

| ID | Area | Quasar | PrimeVue | Status |
|----|------|--------|----------|--------|
| IN1 | Toolbar icon buttons | `q-btn outline` | `Button variant="outlined" severity="secondary"` | ✅ Comparable size. The "tag" toolbar icon renders filled in Quasar vs outlined in PrimeVue (minor). |
| IN2 | Vertical divider | `q-separator vertical` | `Divider layout="vertical"` | ✅ Zero-margin / 1 px. |
| IN3 | Storage progress bar | `q-linear-progress` | `ProgressBar` | ✅ |
| IN4 | Checkbox | `q-checkbox` | `Checkbox` | ✅ Aura square radius. |
| IN5 | Bookmark icon | `q-icon bookmark/bookmark_border` | `pi pi-bookmark(-fill)` | ✅ |
| IN6 | Type tag | `q-badge color="grey-3"` | `Tag severity="secondary"` | ✅ surface-100 pill. |
| IN7 | Row avatar + unread dot | `q-avatar` + floating `q-badge` | `OverlayBadge + Avatar` | 🌐 Avatar images come from the primefaces CDN; offline the Quasar `q-avatar` collapses to just the red unread dot while PrimeVue shows a broken-image glyph. Driven by the missing asset, not the theme. |
| IN8 | Upgrade button | `q-btn outline` | `Button variant="outlined"` | ✅ |
| IN9 | "4 days left" bar | `q-linear-progress` (primary/noir) | red bar | 🔧 Fixed — added `.inbox-trial-bar` class; `dashboard.css` forces `var(--p-red-600)` fill. |

---

## Cards page

| ID | Area | Quasar | PrimeVue | Status |
|----|------|--------|----------|--------|
| CA1 | Follow / Message | `q-btn-toggle spread` | `SelectButton` | 🔧 Fixed by the SelectButton pass; the `outline`-variant per-button border is now hidden so it matches the single-pill SelectButton. |
| CA2 | Payment-type toggle | `q-btn-toggle` icon-only | `SelectButton #option` | 🔧 Fixed by the SelectButton pass (outline border removed). |
| CA3 | OTP input | 4 × `q-input` | `InputOtp :length="4"` | ⚠️ Manual workaround; visually close, no built-in paste/auto-advance semantics. |
| CA4 | Slider | `q-slider` | `Slider` | ✅ Aura track/thumb tokens. |
| CA5 | Custom Amount | `q-input type=number` | `InputNumber showButtons` | ⛔ `q-input` has no +/- spinner buttons. |
| CA6 | Donate amount toggle | `q-btn-toggle spread` | `SelectButton` | 🔧 Fixed by the SelectButton pass (outline border removed). |
| CA7 | Radio (delivery) | `q-radio` | `RadioButton` | 🔧 Fixed — removed the white `q-radio__check` colour override in `_radio.scss`; inner dot now inherits primary colour and is clearly visible against a light background. |
| CA8 | Dark-mode toggle | `q-toggle` | `ToggleSwitch` | 🔧 Fixed — the dense toggle rendered as a crescent; `_toggle.scss` now re-applies the Aura geometry to `.q-toggle--dense` (in addition to the earlier `.q-toggle__thumb:before { display:none }`). |
| CA9 | Divider | `q-separator` | `Divider` | ✅ |
| CA10 | AvatarGroup | overlapping `q-avatar` | `AvatarGroup` | ✅ |
| CA11 | Job bookmark button | `q-btn outline round` | `Button rounded variant="outlined"` | ✅ |

---

## Customers page

| ID | Area | Quasar | PrimeVue | Status |
|----|------|--------|----------|--------|
| CU1 | "950 Active User" | `q-btn icon="circle"` | `Button` + green pt icon | 🔧 Fixed — replaced `icon-color="positive"` (overridden by btn colour) with an explicit inline `q-icon` using `color:var(--p-green-500)`. |
| CU2 | Status tag | `q-badge positive/negative/info` | `Tag success/danger/info` | 🔧 Fixed — soft tinted pills (green/red/blue). The per-row avatar **status dot** (empty floating badge) also stretched to a tall pill until `.q-badge--floating:empty` collapsed it to a round dot. |
| CU3 | DataTable header | `q-table` sticky-header wrap | `DataTable` sticky thead | ✅ |
| CU4 | Row checkboxes | `q-table selection="multiple"` | `Column selectionMode` | ✅ |
| CU5 | More/Details popover | per-row `q-menu` | shared `Popover` | ✅ Functional parity. |
| CU6 | Toolbar divider | `q-separator vertical` | `Divider layout="vertical"` | ✅ |
| CU7 | Bottom paginator | `q-table` "Records per page / 1-10 of 11" bar | none (top arrows only) | 🔧 Fixed — added `hide-bottom` prop to the customers `q-table`; extra bottom bar no longer shown. |
| CU8 | Row avatars | `q-avatar` + status dot | `Avatar` + status dot | 🌐 CDN avatar images fail offline; Quasar rows show only the status dot. |

---

## Movies page

| ID | Area | Quasar | PrimeVue | Status |
|----|------|--------|----------|--------|
| MO1 | View-mode toggle | `q-btn-toggle` icon-only | `SelectButton` | 🔧 Fixed by the SelectButton pass. |
| MO2 | Search | `q-input outlined dense` | `IconField` | ✅ |
| MO3 | Carousel nav buttons | `q-btn round outline` | `Button rounded variant="outlined" size="small"` | ✅ |
| MO4 | Row ProgressBar | `q-linear-progress` | `ProgressBar` | ✅ |
| MO5 | Director avatar | `q-avatar size="24px"` | `Avatar size="small"` | 🌐 CDN image (offline fallback). |
| MO6 | Watched count badge | `q-badge` floating | `OverlayBadge` over bookmark | 🔧 Fixed — neutral grey badge instead of red. |
| MO7 | New Movie button | `q-btn icon="add" size="sm"` | `Button size="small"` | ✅ |

---

## Open items (not yet addressed)

These are the remaining real gaps that cannot be closed without new built-in
components or are explicitly deferred:

1. **OV6 paginator** — `q-table`'s built-in "Records per page" row differs from
   PrimeVue's numbered paginator. Visually close enough for most uses; a full
   match would require a custom paginator component.
2. **IN1 tag icon** — `q-btn icon="label"` (filled) vs PrimeVue's `pi pi-tag`
   (outlined). The standard Material Icons font does not include outlined
   variants; minor glyph difference only.

## Deferred — component gaps (no Quasar built-in equivalent)

| ID | Reason |
|----|--------|
| OV5 | DatePicker — no equivalent Quasar built-in. |
| CA5 | InputNumber with spinners — `q-input` lacks +/- buttons. |
| CA3 | InputOtp — manual multi-input workaround. |
| OV8 / CH9 | `q-menu`/`q-list` popover styling vs PrimeVue `Menu`. |

## Offline-asset note (🌐)

The chat/inbox/customers/movies rows pull avatar and poster images from the
primefaces CDN. The screenshot tool runs headless and offline, so those images
fail to load on **both** dashboards. The visible difference (PrimeVue shows a
broken-image glyph; Quasar's `q-avatar` collapses to its overlay dot) is an
artifact of the missing asset, not of the Aura theme.
