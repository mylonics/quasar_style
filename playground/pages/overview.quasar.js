/*
 * Overview page — Quasar (with or without the Aura theme).
 *
 * Quasar equivalent of PrimeVue's OverviewApp. Registered on window.DASH_Q and
 * rendered by the dashboard shell. Chart data and the switchable primary palette
 * come from window.DASHBOARD (dashboard-data.js).
 */
(function () {
  const D = window.DASHBOARD;
  (window.DASH_Q = window.DASH_Q || {}).Overview = {
    name: 'OverviewQ',
    data() {
      return {
        selectedTime: 'Monthly',
        timeOptions: D.TIME_OPTIONS.map((t) => ({ label: t, value: t })),
        dates: null,
        menuItems: D.MENU_ITEMS,
        tableColumns: [
          { name: 'id', label: 'Id', field: 'id', align: 'left' },
          { name: 'name', label: 'Name', field: (r) => r.name.text, align: 'left' },
          { name: 'coin', label: 'Coin', field: 'coin', align: 'left' },
          { name: 'date', label: 'Date', field: 'date', align: 'left' },
          { name: 'process', label: 'Process', field: (r) => r.process.value, align: 'left' },
          { name: 'amount', label: 'Amount', field: 'amount', align: 'right' },
        ],
        tableData: D.TABLE_DATA,
        pagination: { rowsPerPage: 5 },
        metersData: D.METERS_DATA,
        chart: null,
        legend: [],
      };
    },
    mounted() {
      this.renderChart();
      window.__dashChart = this;
    },
    beforeUnmount() {
      if (this.chart) this.chart.destroy();
      if (window.__dashChart === this) window.__dashChart = null;
    },
    methods: {
      renderChart() {
        const ctx = this.$refs.chart;
        if (!ctx) return;
        if (this.chart) this.chart.destroy();
        const data = D.buildChartData(this.selectedTime);
        this.chart = new Chart(ctx, { type: 'bar', data, options: D.buildChartOptions() });
        this.legend = data.datasets.map((d) => ({ label: d.label, color: d.backgroundColor }));
      },
      rebuildChart() {
        this.renderChart();
      },
    },
    template: `
      <div class="dash">
        <div class="dash-head">
          <div style="flex:1">
            <div class="dash-eyebrow">Overview</div>
            <div class="dash-title">Welcome to PrimeVue</div>
          </div>
          <div class="dash-head-actions">
            <q-input outlined dense placeholder="Search">
              <template #prepend><q-icon name="search" /></template>
            </q-input>
            <q-btn outline color="grey-7" icon="notifications" class="notif-btn">
              <q-badge floating rounded color="negative" class="notif-badge" />
            </q-btn>
          </div>
        </div>

        <div class="dash-toolbar">
          <q-btn-toggle v-model="selectedTime" :options="timeOptions" no-caps unelevated
            toggle-color="primary" color="white" text-color="grey-8" @update:model-value="rebuildChart" />
          <div class="dash-toolbar-actions">
            <q-btn color="primary" no-caps label="Download" icon-right="download" />
            <q-input outlined dense readonly v-model="dates" placeholder="06/11/2024 - 06/22/2024" style="min-width:230px">
              <template #append>
                <q-icon name="event" class="cursor-pointer">
                  <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                    <q-date v-model="dates" range />
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>
          </div>
        </div>

        <div class="dash-body">
          <div class="dash-card">
            <div class="dash-card-head">
              <div class="dash-card-title">Crypto Analytics</div>
              <div class="dash-legend">
                <div v-for="(item, index) in legend" :key="index" class="dash-legend-item">
                  <div class="dash-dot" :style="{ backgroundColor: item.color }"></div>
                  <span class="dash-legend-label">{{ item.label }}</span>
                </div>
              </div>
            </div>
            <div class="dash-chart"><canvas ref="chart"></canvas></div>
          </div>

          <div class="dash-bottom">
            <div class="dash-card dash-transactions">
              <div class="dash-card-head tight">
                <div class="dash-card-title">Transactions</div>
                <q-btn flat round color="grey-7" icon="more_horiz">
                  <q-menu>
                    <q-list style="min-width:140px">
                      <q-item v-for="item in menuItems" :key="item.label" clickable v-close-popup>
                        <q-item-section avatar><q-icon :name="item.icon === 'pi pi-refresh' ? 'refresh' : 'upload'" /></q-item-section>
                        <q-item-section>{{ item.label }}</q-item-section>
                      </q-item>
                    </q-list>
                  </q-menu>
                </q-btn>
              </div>
              <q-table flat :rows="tableData" :columns="tableColumns" row-key="id"
                v-model:pagination="pagination" :rows-per-page-options="[5]">
                <template #body-cell-id="props">
                  <q-td :props="props"><span class="dash-muted">{{ props.row.id }}</span></q-td>
                </template>
                <template #body-cell-name="props">
                  <q-td :props="props">
                    <div class="dash-cell-name">
                      <q-avatar size="32px" class="q-mr-sm" style="background-color:#ece9fc;color:#2a1261;font-weight:500"><span style="font-size:.75rem">{{ props.row.name.label }}</span></q-avatar>
                      <span class="dash-muted">{{ props.row.name.text }}</span>
                    </div>
                  </q-td>
                </template>
                <template #body-cell-coin="props">
                  <q-td :props="props">
                    <i v-if="props.row.coin === 'btc'" class="pi pi-bitcoin dash-coin-btc"></i>
                    <span v-else class="dash-coin-eth"><i class="pi pi-ethereum"></i></span>
                  </q-td>
                </template>
                <template #body-cell-date="props">
                  <q-td :props="props"><span class="dash-muted">{{ props.row.date }}</span></q-td>
                </template>
                <template #body-cell-process="props">
                  <q-td :props="props">
                    <q-badge :color="props.row.process.type === 'success' ? 'positive' : 'negative'" :label="props.row.process.value" />
                  </q-td>
                </template>
                <template #body-cell-amount="props">
                  <q-td :props="props"><span class="dash-muted">{{ props.row.amount }}</span></q-td>
                </template>
                <template #bottom="scope">
                  <div class="q-table__bottom-row" style="display:flex;align-items:center;justify-content:space-between;width:100%;padding:0 8px">
                    <span class="dash-muted" style="font-size:.875rem">
                      Showing {{ (scope.pagination.page - 1) * scope.pagination.rowsPerPage + 1 }}
                      to {{ Math.min(scope.pagination.page * scope.pagination.rowsPerPage, tableData.length) }}
                      of {{ tableData.length }} entries
                    </span>
                    <div style="display:flex;align-items:center;gap:2px">
                      <q-btn flat round dense icon="chevron_left" size="sm" color="grey-7"
                        :disable="scope.isFirstPage" @click="scope.prevPage" />
                      <q-btn v-for="p in scope.pagesNumber" :key="p" flat round dense :label="String(p)" size="sm"
                        :style="p === scope.pagination.page
                          ? 'background:var(--p-primary-color,#6366f1);color:var(--p-primary-contrast-color,#fff);border-radius:4px'
                          : 'color:var(--p-text-muted-color,#64748b)'"
                        @click="pagination.page = p" />
                      <q-btn flat round dense icon="chevron_right" size="sm" color="grey-7"
                        :disable="scope.isLastPage" @click="scope.nextPage" />
                    </div>
                  </div>
                </template>
              </q-table>
            </div>

            <div class="dash-card dash-wallet">
              <div>
                <div class="dash-card-head">
                  <div class="dash-card-title">My Wallet</div>
                  <q-btn flat round color="grey-7" icon="more_horiz" />
                </div>
                <MeterGroup :value="metersData" label-position="end">
                  <template #label="{ value }">
                    <div class="dash-meter-labels">
                      <div v-for="val of value" :key="val.label" class="dash-meter-row">
                        <div class="dash-dot" :style="{ backgroundColor: val.color }"></div>
                        <div class="dash-meter-name">{{ val.label }} <span class="dash-muted">({{ val.value }}%)</span></div>
                        <div class="dash-meter-value">{{ val.text }}</div>
                      </div>
                    </div>
                  </template>
                </MeterGroup>
              </div>
              <q-btn outline no-caps color="primary" label="Show All" style="margin-top:24px" />
            </div>
          </div>
        </div>
      </div>
    `,
  };
})();
