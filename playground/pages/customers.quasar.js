/*
 * Customers page — Quasar (with or without the Aura theme).
 *
 * Quasar equivalent of PrimeVue's CustomersApp. Registered on window.DASH_Q.
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

  const COLUMNS = [
    { name: 'name', label: 'Name', field: 'name', align: 'left' },
    { name: 'title', label: 'Title', field: 'title', align: 'left' },
    { name: 'company', label: 'Company Name', field: 'company', align: 'left' },
    { name: 'email', label: 'Email Address', field: 'email', align: 'left' },
    { name: 'lead', label: 'Lead Source', field: 'lead', align: 'left' },
    { name: 'status', label: 'Status', field: 'status', align: 'left' },
    { name: 'more', label: 'More', field: '', align: 'right' },
  ];

  (window.DASH_Q = window.DASH_Q || {}).Customers = {
    name: 'CustomersQ',
    data() {
      return {
        search: '',
        tableData: TABLE_DATA,
        columns: COLUMNS,
        selectedRows: [],
        pagination: { rowsPerPage: 10 },
      };
    },
    template: `
      <div class="customers-shell">
        <div class="customers-head">
          <div>
            <div class="customers-head-title">Customers</div>
            <div class="customers-head-sub">The analysis list here shows all users</div>
          </div>
          <q-btn outline no-caps color="grey-7" style="font-size:.8rem">
              <q-icon name="circle" style="color:var(--p-green-500,#22c55e);margin-right:6px;font-size:10px" />
              950 Active User
            </q-btn>
        </div>
          <div class="customers-toolbar">
          <q-input v-model="search" outlined dense placeholder="Search" style="min-width:200px">
            <template #prepend><q-icon name="search" /></template>
          </q-input>
          <div class="customers-toolbar-right">
            <q-btn icon="filter_alt" flat dense color="grey-7" size="sm" />
            <q-separator vertical spaced="xs" />
            <q-btn icon="refresh" flat dense color="grey-7" size="sm" />
            <q-btn label="1 of 15" flat dense no-caps color="grey-7" size="sm" />
            <q-btn icon="chevron_left" flat dense color="grey-7" size="sm" />
            <q-btn icon="chevron_right" flat dense color="grey-7" size="sm" />
          </div>
        </div>
        <div class="customers-table-wrap">
          <q-table flat :rows="tableData" :columns="columns" row-key="id"
            v-model:selected="selectedRows" selection="multiple"
            v-model:pagination="pagination" :rows-per-page-options="[10, 20]"
            hide-bottom
            :filter="search">
            <template #body-cell-name="props">
              <q-td :props="props">
                <div style="display:flex;align-items:center;gap:12px">
                  <div style="position:relative;display:inline-flex">
                    <q-avatar size="32px"
                      :color="!props.row.image ? 'deep-purple-2' : undefined"
                      :text-color="!props.row.image ? 'deep-purple-10' : undefined"
                      style="border-radius:6px;font-weight:500">
                      <img v-if="props.row.image" :src="props.row.image" style="border-radius:6px"
                        @error="e => { e.target.style.display='none'; e.target.nextElementSibling && (e.target.nextElementSibling.style.display='') }" />
                      <span :style="props.row.image ? 'display:none;font-size:.75rem' : 'font-size:.75rem'">{{ props.row.capName }}</span>
                    </q-avatar>
                    <q-badge
                      v-if="props.row.active !== undefined"
                      :color="props.row.active ? 'positive' : 'negative'"
                      floating rounded
                      style="width:10px;height:10px;min-width:0;padding:0" />
                  </div>
                  <span style="font-weight:500;color:var(--p-text-color,#1e293b)">{{ props.row.name }}</span>
                </div>
              </q-td>
            </template>
            <template #body-cell-status="props">
              <q-td :props="props">
                <q-badge
                  :color="props.row.status === 'Active' ? 'positive' : props.row.status === 'Inactive' ? 'negative' : 'info'"
                  :label="props.row.status"
                  style="font-weight:500" />
              </q-td>
            </template>
            <template #body-cell-more="props">
              <q-td :props="props" style="text-align:right">
                <q-btn icon="search" round flat color="grey-7" size="sm">
                  <q-menu>
                    <div style="padding:8px;display:flex;gap:8px">
                      <q-btn label="Details" flat size="sm" no-caps color="grey-7" v-close-popup />
                      <q-btn label="Delete" flat size="sm" no-caps color="negative" v-close-popup />
                    </div>
                  </q-menu>
                </q-btn>
              </q-td>
            </template>
          </q-table>
        </div>
      </div>
    `,
  };
})();
