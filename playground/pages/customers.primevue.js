/*
 * Customers page — real PrimeVue v4 Aura components.
 *
 * Mirrors PrimeVue's CustomersApp landing sample. Registered on window.DASH_PV.
 */
(function () {
  const TABLE_DATA = [
    { id: 1, image: 'https://www.primefaces.org/cdn/primevue/images/landing/apps/avatar2.png', active: true, name: 'Brook Simmons', title: 'Sales Executive', company: 'Mistranet', email: 'hi@brooksmmns.co', lead: 'Linkedin', status: 'Active' },
    { id: 2, image: 'https://www.primefaces.org/cdn/primevue/images/landing/apps/avatar9.jpg', active: true, name: 'Dianne Russell', title: 'CEO', company: 'BriteMank', email: 'hi@diannerussell.com', lead: 'Website', status: 'Inactive' },
    { id: 3, image: 'https://www.primefaces.org/cdn/primevue/images/landing/apps/avatar13.jpg', active: undefined, name: 'Amy Elsner', title: 'Product Manager', company: 'ZenTrailMs', email: 'hi@amyelsner.com', lead: 'Cold Call', status: 'Prospect' },
    { id: 4, image: 'https://www.primefaces.org/cdn/primevue/images/landing/apps/avatar11.jpg', active: true, name: 'Jacob Jones', title: 'Manager', company: 'Streamlinz', email: 'jacobjones@gmail.com', lead: 'Partner', status: 'Prospect' },
    { id: 5, image: '', capName: 'CW', active: false, name: 'Cameron Watson', title: 'Product Manager', company: 'BriteMank', email: 'hi@cameronwilliamson', lead: 'Social Media', status: 'Active' },
    { id: 6, image: '', capName: 'WW', active: true, name: 'Wade Warren', title: 'Director', company: 'Streamlinz', email: 'hi@annetteblack.com', lead: 'Cold Call', status: 'Inactive' },
    { id: 7, image: 'https://www.primefaces.org/cdn/primevue/images/landing/apps/avatar7.png', active: true, name: 'Guy Hawkins', title: 'Director', company: 'Wavelength', email: 'hi@darrellsteward.com', lead: 'Linkedin', status: 'Active' },
    { id: 8, image: 'https://www.primefaces.org/cdn/primevue/images/landing/apps/avatar8.png', active: true, name: 'Annette Black', title: 'Manager', company: 'Wavelength', email: 'jeromebell@gmail.com', lead: 'Website', status: 'Inactive' },
    { id: 9, image: 'https://www.primefaces.org/cdn/primevue/images/landing/apps/avatar10.jpg', active: undefined, name: 'Darrell Steward', title: 'Product Manager', company: 'ZenTrailMs', email: 'hi@onyamalimba.co', lead: 'Website', status: 'Active' },
    { id: 10, image: '', capName: 'JB', active: true, name: 'Jerome Bell', title: 'Marketing Manager', company: 'Mistranet', email: 'hi@courtneyhenry', lead: 'Social Media', status: 'Active' },
    { id: 11, image: 'https://www.primefaces.org/cdn/primevue/images/landing/apps/avatar12.jpg', active: undefined, name: 'Onyama Limba', title: 'Sales Executive', company: 'BriteMank', email: 'hi@arlenemccoy.com', lead: 'Social Media', status: 'Active' },
  ];

  (window.DASH_PV = window.DASH_PV || {}).Customers = {
    name: 'CustomersPV',
    data() {
      return {
        search: '',
        tableData: TABLE_DATA,
        selectedRows: [],
      };
    },
    methods: {
      showPopover(event) {
        this.hidePopover();
        this.$nextTick(() => { this.$refs.op.show(event); });
      },
      hidePopover() {
        this.$refs.op.hide();
      },
    },
    template: `
      <div class="customers-shell">
        <div class="customers-head">
          <div>
            <div class="customers-head-title">Customers</div>
            <div class="customers-head-sub">The analysis list here shows all users</div>
          </div>
          <Button icon="pi pi-circle-fill" label="950 Active User" variant="outlined" severity="secondary"
            :pt="{ icon: { style: 'color:var(--p-green-500,#22c55e)' } }" />
        </div>
        <div class="customers-toolbar">
          <IconField>
            <InputIcon class="pi pi-search" />
            <InputText v-model="search" placeholder="Search" />
          </IconField>
          <div class="customers-toolbar-right">
            <Button icon="pi pi-filter" variant="outlined" severity="secondary" />
            <Divider layout="vertical" style="margin:0" />
            <Button icon="pi pi-refresh" variant="outlined" severity="secondary" />
            <Button label="1 of 15" variant="outlined" severity="secondary" />
            <Button icon="pi pi-chevron-left" variant="outlined" severity="secondary" />
            <Button icon="pi pi-chevron-right" variant="outlined" severity="secondary" />
          </div>
        </div>
        <div class="customers-table-wrap">
          <DataTable v-model:selection="selectedRows" :value="tableData" :rows="10"
            :pt="{ root: { style: 'width:100%' }, thead: { style: 'position:sticky;top:0;z-index:1' } }">
            <template #empty>There are no customers.</template>
            <Column selectionMode="multiple" headerStyle="width:1rem" style="width:1rem" />
            <Column field="name" header="Name">
              <template #body="{ data }">
                <div style="display:flex;align-items:center">
                  <OverlayBadge :severity="data.active === undefined ? 'contrast' : data.active ? 'success' : 'danger'">
                    <Avatar
                      v-bind="data.image ? { image: data.image } : { label: data.capName }"
                      :style="!data.image ? 'background-color:#ede9fe;color:#2e1065;font-size:.75rem;font-weight:500' : ''"
                      style="border-radius:6px;overflow:hidden" />
                  </OverlayBadge>
                  <span style="margin-left:12px;font-weight:500;color:var(--p-text-color,#1e293b)">{{ data.name }}</span>
                </div>
              </template>
            </Column>
            <Column field="title" header="Title">
              <template #body="{ data }">
                <span style="color:var(--p-text-muted-color,#64748b)">{{ data.title }}</span>
              </template>
            </Column>
            <Column field="company" header="Company Name">
              <template #body="{ data }">
                <span style="color:var(--p-surface-600,#475569)">{{ data.company }}</span>
              </template>
            </Column>
            <Column field="email" header="Email Address">
              <template #body="{ data }">
                <span style="color:var(--p-text-muted-color,#64748b)">{{ data.email }}</span>
              </template>
            </Column>
            <Column field="lead" header="Lead Source">
              <template #body="{ data }">
                <span style="color:var(--p-text-muted-color,#64748b)">{{ data.lead }}</span>
              </template>
            </Column>
            <Column field="status" header="Status">
              <template #body="{ data }">
                <Tag :severity="data.status === 'Active' ? 'success' : data.status === 'Inactive' ? 'danger' : 'info'"
                  :value="data.status" style="font-weight:500" />
              </template>
            </Column>
            <Column header="More">
              <template #body>
                <div style="display:flex;justify-content:flex-end">
                  <Button icon="pi pi-search" rounded variant="outlined" severity="secondary" @click="showPopover($event)" />
                </div>
              </template>
            </Column>
          </DataTable>
          <Popover ref="op">
            <div style="display:flex;gap:8px">
              <Button label="Details" size="small" variant="outlined" @click="hidePopover" />
              <Button label="Delete" severity="danger" size="small" variant="outlined" @click="hidePopover" />
            </div>
          </Popover>
        </div>
      </div>
    `,
  };
})();
