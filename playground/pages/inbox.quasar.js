/*
 * Inbox page — Quasar (with or without the Aura theme).
 *
 * Quasar equivalent of PrimeVue's InboxApp. Registered on window.DASH_Q.
 */
(function () {
  const TABLE_DATA = [
    { id: 1, bookmarked: false, image: 'https://www.primefaces.org/cdn/primevue/images/landing/apps/avatar12.jpg', name: 'Brook Simmons', type: 'Security', time: '3:24 PM', title: 'Important Account Update', message: "Dear customer, we've made updates to enhance your account security." },
    { id: 2, bookmarked: false, image: 'https://www.primefaces.org/cdn/primevue/images/landing/apps/avatar2.png', name: 'Dianne Russell', type: 'Update', time: '11:24 AM', title: 'Weekly Project Update', message: 'Hi team, attached is the weekly project update.' },
    { id: 3, bookmarked: true, image: 'https://www.primefaces.org/cdn/primevue/images/landing/apps/avatar13.jpg', name: 'Amy Elsner', type: 'Security', time: '9:24 AM', title: 'Urgent: Security Alert', message: 'Dear user, we detected unauthorized access to your account.' },
    { id: 4, bookmarked: false, image: 'https://www.primefaces.org/cdn/primevue/images/landing/apps/main-avatar.png', name: 'Jacob Jones', type: 'Marketing', time: 'Jan 21', title: 'Exclusive Offer Inside', message: "Greetings, check out our exclusive offer!" },
    { id: 5, bookmarked: false, image: '', capName: 'CW', name: 'Cameron Watson', type: 'HR', time: 'Jan 15', title: 'Employee Appreciation Event', message: 'Hello team, mark your calendars.' },
    { id: 6, bookmarked: true, image: '', capName: 'WW', name: 'Wade Warren', type: 'Invoice', time: 'Jan 12', title: 'Your Recent Purchase', message: 'Secure your spot at the XYZ Conference.' },
    { id: 7, bookmarked: false, image: 'https://www.primefaces.org/cdn/primevue/images/landing/apps/avatar7.png', name: 'Guy Hawkins', type: 'Events', time: 'Jan 11', title: 'Early Bird Registration Open', message: 'Attention users, system maintenance scheduled.' },
    { id: 8, bookmarked: false, image: 'https://www.primefaces.org/cdn/primevue/images/landing/apps/avatar8.png', name: 'Annette Black', type: '', time: 'Jan 8', title: 'Upcoming System Maintenance', message: "As a token of appreciation, exclusive discounts available." },
    { id: 9, bookmarked: true, image: 'https://www.primefaces.org/cdn/primevue/images/landing/apps/avatar10.jpg', name: 'Darrell Steward', type: 'Discount', time: 'Jan 4', title: 'Special Discounts for VIP Customers', message: 'Stay updated with our latest news.' },
    { id: 10, bookmarked: true, image: '', capName: 'JB', name: 'Jerome Bell', type: 'Newsletter', time: 'Jan 2', title: 'Monthly Newsletter - January Edition', message: "We've updated our Terms of Service." },
    { id: 11, bookmarked: false, image: 'https://www.primefaces.org/cdn/primevue/images/landing/apps/avatar11.jpg', name: 'Onyama Limba', type: '', time: 'Jan 2', title: 'Exclusive Travel Packages', message: 'Explore our exclusive travel packages.' },
    { id: 12, bookmarked: false, image: '', capName: 'RF', name: 'Robert Fox', type: 'Invitation', time: '12.12.2023', title: 'Invitation to Amsterdam', message: "You're invited to our upcoming webinar." },
  ];

  (window.DASH_Q = window.DASH_Q || {}).Inbox = {
    name: 'InboxQ',
    data() {
      return {
        search: '',
        checked: false,
        activeInboxNav: 'Inbox',
        inboxNavs: [
          { title: 'Navigation', navs: [
            { name: 'Inbox', icon: 'inbox' },
            { name: 'Starry', icon: 'star' },
            { name: 'Drafts', icon: 'drafts' },
            { name: 'Important', icon: 'label_important' },
            { name: 'Sent', icon: 'send' },
            { name: 'Archive', icon: 'archive' },
            { name: 'Spam', icon: 'report' },
            { name: 'Trash', icon: 'delete' },
          ]},
          { title: 'Other', navs: [
            { name: 'Security', icon: 'label' },
            { name: 'Update', icon: 'label' },
            { name: 'Marketing', icon: 'label' },
            { name: 'HR', icon: 'label' },
          ]},
        ],
        tableData: TABLE_DATA.map(r => ({ ...r })),
        selectedRows: [],
        storageUsed: 75,
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
            <q-btn icon="add" round flat dense />
          </div>
          <div class="inbox-nav-body">
            <div>
              <div v-for="section in inboxNavs" :key="section.title" class="inbox-nav-section">
                <div class="inbox-nav-section-title">{{ section.title }}</div>
                <button
                  v-for="nav in section.navs" :key="nav.name"
                  class="inbox-nav-btn" :class="{ active: activeInboxNav === nav.name }"
                  @click="activeInboxNav = nav.name">
                  <q-icon :name="nav.icon" size="xs" /> {{ nav.name }}
                </button>
              </div>
            </div>
            <div>
              <div class="inbox-upgrade-box">
                <div class="inbox-upgrade-title">Free Version</div>
                <q-linear-progress :value="storageUsed / 100" color="negative" style="height:12px;border-radius:6px">
                  <div style="position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);font-size:.7rem;white-space:nowrap;color:#fff">4 days left</div>
                </q-linear-progress>
              </div>
              <q-btn label="Upgrade to PRO 🚀" outline no-caps color="primary" style="width:100%" />
            </div>
          </div>
        </div>

        <!-- Main table -->
        <div class="inbox-main">
          <div class="inbox-toolbar">
            <div class="inbox-toolbar-left">
              <q-checkbox v-model="checked" dense @update:model-value="onSelectionChange" />
              <q-btn icon="mail_outline" outline dense color="grey-7" />
              <q-btn icon="error_outline" outline dense color="grey-7" />
              <q-btn icon="label" outline dense color="grey-7" />
              <q-btn label="Archive" icon="inbox" outline dense no-caps color="grey-7" />
              <q-btn label="Trash" icon="delete" outline dense no-caps color="grey-7" />
            </div>
            <div class="inbox-toolbar-right">
              <q-input v-model="search" outlined dense placeholder="Search" style="min-width:180px">
                <template #prepend><q-icon name="search" /></template>
              </q-input>
              <q-btn icon="filter_alt" outline dense color="grey-7" />
              <q-separator vertical spaced="xs" />
              <q-btn icon="refresh" outline dense color="grey-7" />
              <q-btn label="1 of 15" outline dense no-caps color="grey-7" style="white-space:nowrap" />
              <q-btn icon="chevron_left" outline dense color="grey-7" />
              <q-btn icon="chevron_right" outline dense color="grey-7" />
            </div>
          </div>
          <div class="inbox-table-wrap">
            <div v-for="row in tableData" :key="row.id" class="inbox-row">
              <q-checkbox v-model="selectedRows" :val="row" dense />
              <div class="inbox-row-bookmark" @click.stop="row.bookmarked = !row.bookmarked">
                <q-icon :name="row.bookmarked ? 'bookmark' : 'bookmark_border'" />
              </div>
              <div class="inbox-row-avatar">
                <q-avatar size="32px"
                  :color="!row.image ? 'deep-purple-2' : undefined"
                  :text-color="!row.image ? 'deep-purple-10' : undefined"
                  style="border-radius:6px;overflow:hidden;font-size:.75rem;font-weight:500">
                  <img v-if="row.image" :src="row.image" />
                  <template v-else>{{ row.capName }}</template>
                  <q-badge v-if="row.type" color="negative" floating rounded />
                </q-avatar>
              </div>
              <div class="inbox-row-name">{{ row.name }}</div>
              <div class="inbox-row-subject" style="flex:1;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">
                <span style="font-weight:500;color:var(--p-text-color,#1e293b);margin-right:6px">{{ row.title }}</span>
                <span style="font-size:.875rem;color:var(--p-text-muted-color,#64748b)">{{ row.message }}</span>
              </div>
              <q-badge v-if="row.type" color="grey-3" text-color="grey-8" :label="row.type" style="font-weight:500;white-space:nowrap" />
              <div class="inbox-row-time">{{ row.time }}</div>
            </div>
          </div>
        </div>
      </div>
    `,
  };
})();
