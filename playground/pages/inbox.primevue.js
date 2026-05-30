/*
 * Inbox page — real PrimeVue v4 Aura components.
 *
 * Mirrors PrimeVue's InboxApp landing sample. Registered on window.DASH_PV.
 */
(function () {
  const TABLE_DATA = [
    { id: 1, bookmarked: false, image: 'https://www.primefaces.org/cdn/primevue/images/landing/apps/avatar12.jpg', name: 'Brook Simmons', type: 'Security', time: '3:24 PM', title: 'Important Account Update', message: "Dear customer, we've made updates to enhance your account security." },
    { id: 2, bookmarked: false, image: 'https://www.primefaces.org/cdn/primevue/images/landing/apps/avatar2.png', name: 'Dianne Russell', type: 'Update', time: '11:24 AM', title: 'Weekly Project Update', message: 'Hi team, attached is the weekly project update.' },
    { id: 3, bookmarked: true, image: 'https://www.primefaces.org/cdn/primevue/images/landing/apps/avatar13.jpg', name: 'Amy Elsner', type: 'Security', time: '9:24 AM', title: 'Urgent: Security Alert - Account Compromise', message: 'Dear user, we detected unauthorized access to your account.' },
    { id: 4, bookmarked: false, image: 'https://www.primefaces.org/cdn/primevue/images/landing/apps/main-avatar.png', name: 'Jacob Jones', type: 'Marketing', time: 'Jan 21', title: 'Exclusive Offer Inside - Limited Time Only', message: "Greetings, check out our exclusive offer!" },
    { id: 5, bookmarked: false, image: '', capName: 'CW', name: 'Cameron Watson', type: 'HR', time: 'Jan 15', title: 'Employee Appreciation Event - Save the Date', message: 'Hello team, mark your calendars for our upcoming event.' },
    { id: 6, bookmarked: true, image: '', capName: 'WW', name: 'Wade Warren', type: 'Invoice', time: 'Jan 12', title: 'Your Recent Purchase - Order Confirmation', message: 'Secure your spot at the XYZ Conference 2024.' },
    { id: 7, bookmarked: false, image: 'https://www.primefaces.org/cdn/primevue/images/landing/apps/avatar7.png', name: 'Guy Hawkins', type: 'Events', time: 'Jan 11', title: 'Early Bird Registration Open - XYZ Conference 2024', message: 'Attention users, we have scheduled system maintenance.' },
    { id: 8, bookmarked: false, image: 'https://www.primefaces.org/cdn/primevue/images/landing/apps/avatar8.png', name: 'Annette Black', type: '', time: 'Jan 8', title: 'Upcoming System Maintenance Notice', message: "As a token of appreciation, we're offering exclusive discounts." },
    { id: 9, bookmarked: true, image: 'https://www.primefaces.org/cdn/primevue/images/landing/apps/avatar10.jpg', name: 'Darrell Steward', type: 'Discount', time: 'Jan 4', title: 'Special Discounts for VIP Customers', message: 'Stay updated with our latest news.' },
    { id: 10, bookmarked: true, image: '', capName: 'JB', name: 'Jerome Bell', type: 'Newsletter', time: 'Jan 2', title: 'Monthly Newsletter - January Edition', message: "We've updated our Terms of Service." },
    { id: 11, bookmarked: false, image: 'https://www.primefaces.org/cdn/primevue/images/landing/apps/avatar11.jpg', name: 'Onyama Limba', type: '', time: 'Jan 2', title: 'Exclusive Travel Packages for You', message: 'Explore our exclusive travel packages.' },
    { id: 12, bookmarked: false, image: '', capName: 'RF', name: 'Robert Fox', type: 'Invitation', time: '12.12.2023', title: 'Invitation to Amsterdam', message: "You're invited to our upcoming webinar." },
  ];

  (window.DASH_PV = window.DASH_PV || {}).Inbox = {
    name: 'InboxPV',
    data() {
      return {
        search: '',
        checked: false,
        activeInboxNav: 'Inbox',
        inboxNavs: [
          { title: 'Navigation', navs: [
            { name: 'Inbox', icon: 'pi pi-inbox' },
            { name: 'Starry', icon: 'pi pi-star' },
            { name: 'Drafts', icon: 'pi pi-file-o' },
            { name: 'Important', icon: 'pi pi-file-import' },
            { name: 'Sent', icon: 'pi pi-send' },
            { name: 'Archive', icon: 'pi pi-inbox' },
            { name: 'Spam', icon: 'pi pi-info-circle' },
            { name: 'Trash', icon: 'pi pi-trash' },
          ]},
          { title: 'Other', navs: [
            { name: 'Security', icon: 'pi pi-tag' },
            { name: 'Update', icon: 'pi pi-tag' },
            { name: 'Marketing', icon: 'pi pi-tag' },
            { name: 'HR', icon: 'pi pi-tag' },
          ]},
        ],
        tableData: TABLE_DATA.map(r => ({ ...r })),
        selectedRows: [],
      };
    },
    methods: {
      onSelectionChange(v) {
        this.selectedRows = v ? [...this.tableData] : [];
      },
    },
    template: `
      <div class="inbox-shell">
        <!-- Left nav -->
        <div class="inbox-nav">
          <div class="inbox-nav-header">
            <h2>Mails</h2>
            <Button icon="pi pi-plus" style="width:32px;height:32px" />
          </div>
          <div class="inbox-nav-body">
            <div>
              <div v-for="section in inboxNavs" :key="section.title" class="inbox-nav-section">
                <div class="inbox-nav-section-title">{{ section.title }}</div>
                <button
                  v-for="nav in section.navs" :key="nav.name"
                  class="inbox-nav-btn" :class="{ active: activeInboxNav === nav.name }"
                  @click="activeInboxNav = nav.name">
                  <i :class="nav.icon"></i> {{ nav.name }}
                </button>
              </div>
            </div>
            <div>
              <div class="inbox-upgrade-box">
                <div class="inbox-upgrade-title">Free Version</div>
                <ProgressBar :value="75" :pt="{ value: { style: 'background:var(--p-red-600,#dc2626)' } }">
                  <span style="position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);font-size:.75rem;white-space:nowrap;color:#fff">4 days left</span>
                </ProgressBar>
              </div>
              <Button label="Upgrade to PRO 🚀" variant="outlined" style="width:100%" />
            </div>
          </div>
        </div>

        <!-- Main table -->
        <div class="inbox-main">
          <div class="inbox-toolbar">
            <div class="inbox-toolbar-left">
              <Checkbox v-model="checked" :binary="true" @update:modelValue="onSelectionChange" />
              <Button icon="pi pi-envelope" variant="outlined" severity="secondary" />
              <Button icon="pi pi-exclamation-circle" variant="outlined" severity="secondary" />
              <Button icon="pi pi-tag" variant="outlined" severity="secondary" />
              <Button icon="pi pi-inbox" label="Archive" variant="outlined" severity="secondary" />
              <Button icon="pi pi-trash" label="Trash" variant="outlined" severity="secondary" />
            </div>
            <div class="inbox-toolbar-right">
              <IconField>
                <InputIcon class="pi pi-search" />
                <InputText v-model="search" placeholder="Search" />
              </IconField>
              <Button icon="pi pi-filter" variant="outlined" severity="secondary" />
              <Divider layout="vertical" style="margin:0" />
              <Button icon="pi pi-refresh" variant="outlined" severity="secondary" />
              <Button label="1 of 15" variant="outlined" severity="secondary" style="white-space:nowrap" />
              <Button icon="pi pi-chevron-left" variant="outlined" severity="secondary" />
              <Button icon="pi pi-chevron-right" variant="outlined" severity="secondary" />
            </div>
          </div>
          <div class="inbox-table-wrap">
            <div v-for="row in tableData" :key="row.id" class="inbox-row">
              <Checkbox v-model="selectedRows" :value="row" />
              <div class="inbox-row-bookmark" @click.stop="row.bookmarked = !row.bookmarked">
                <i :class="row.bookmarked ? 'pi pi-bookmark-fill' : 'pi pi-bookmark'"></i>
              </div>
              <div class="inbox-row-avatar">
                <OverlayBadge severity="danger">
                  <Avatar
                    v-bind="row.image ? { image: row.image } : { label: row.capName }"
                    :style="!row.image ? 'background-color:#ede9fe;color:#2e1065;font-size:.75rem;font-weight:500' : ''"
                    style="border-radius:6px;overflow:hidden" />
                </OverlayBadge>
              </div>
              <div class="inbox-row-name">{{ row.name }}</div>
              <div class="inbox-row-subject" style="flex:1;overflow:hidden">
                <span class="inbox-row-subject title">{{ row.title }}</span>
                <span class="inbox-row-subject preview">{{ row.message }}</span>
              </div>
              <Tag v-if="row.type" severity="secondary" :value="row.type" style="font-weight:500;white-space:nowrap" />
              <div class="inbox-row-time">{{ row.time }}</div>
            </div>
          </div>
        </div>
      </div>
    `,
  };
})();
