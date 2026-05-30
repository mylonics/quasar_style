/*
 * Overview page — real PrimeVue v4 Aura components.
 *
 * Mirrors PrimeVue's OverviewApp landing sample. Registered on the shared page
 * registry (window.DASH_PV) and rendered by the dashboard shell. Chart data and
 * the switchable primary palette come from window.DASHBOARD (dashboard-data.js).
 */
(function () {
  const D = window.DASHBOARD;
  (window.DASH_PV = window.DASH_PV || {}).Overview = {
    name: 'OverviewPV',
    data() {
      return {
        selectedTime: 'Monthly',
        timeOptions: D.TIME_OPTIONS,
        dates: null,
        menuItems: D.MENU_ITEMS,
        tableData: D.TABLE_DATA,
        metersData: D.METERS_DATA,
        chart: null,
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
        this.chart = new Chart(ctx, {
          type: 'bar',
          data: D.buildChartData(this.selectedTime),
          options: D.buildChartOptions(),
        });
      },
      rebuildChart() {
        this.renderChart();
      },
      toggle(event) {
        this.$refs.menu.toggle(event);
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
            <IconField>
              <InputIcon class="pi pi-search" />
              <InputText placeholder="Search" />
            </IconField>
            <Button severity="secondary" variant="outlined">
              <OverlayBadge severity="danger" :pt="{ pcbadge: { root: { class: '!min-w-0 !w-2.5 !h-2.5' } } }">
                <i class="pi pi-bell" />
              </OverlayBadge>
            </Button>
          </div>
        </div>

        <div class="dash-toolbar">
          <SelectButton v-model="selectedTime" :options="timeOptions" :allowEmpty="false" @change="rebuildChart" />
          <div class="dash-toolbar-actions">
            <Button label="Download" icon="pi pi-download" iconPos="right" />
            <DatePicker v-model="dates" selectionMode="range" :manualInput="false" showIcon iconDisplay="input" placeholder="06/11/2024 - 06/22/2024" />
          </div>
        </div>

        <div class="dash-body">
          <div class="dash-card">
            <div class="dash-card-head">
              <div class="dash-card-title">Crypto Analytics</div>
              <div class="dash-legend">
                <div v-for="(item, index) in chart?.data?.datasets || []" :key="index" class="dash-legend-item">
                  <div class="dash-dot" :style="{ backgroundColor: item.backgroundColor }"></div>
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
                <Button type="button" icon="pi pi-ellipsis-h" severity="secondary" text @click="toggle" aria-haspopup="true" aria-controls="overlay_menu" />
                <Menu ref="menu" id="overlay_menu" :model="menuItems" :popup="true" />
              </div>
              <DataTable :value="tableData" paginator :rows="5" dataKey="id"
                paginatorTemplate="PrevPageLink PageLinks NextPageLink CurrentPageReport RowsPerPageDropdown"
                currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries">
                <Column header="Id">
                  <template #body="slotProps"><div class="dash-muted">{{ slotProps.data.id }}</div></template>
                </Column>
                <Column header="Name">
                  <template #body="slotProps">
                    <div class="dash-cell-name">
                      <Avatar :label="slotProps.data.name.label" class="mr-2" style="background-color:#ece9fc;color:#2a1261;font-size:.75rem;font-weight:500" shape="circle" />
                      <div class="dash-muted">{{ slotProps.data.name.text }}</div>
                    </div>
                  </template>
                </Column>
                <Column header="Coin">
                  <template #body="slotProps">
                    <i v-if="slotProps.data.coin === 'btc'" class="pi pi-bitcoin dash-coin-btc"></i>
                    <span v-else class="dash-coin-eth"><i class="pi pi-ethereum"></i></span>
                  </template>
                </Column>
                <Column header="Date">
                  <template #body="slotProps"><div class="dash-muted">{{ slotProps.data.date }}</div></template>
                </Column>
                <Column header="Process">
                  <template #body="slotProps"><Tag :severity="slotProps.data.process.type" :value="slotProps.data.process.value" /></template>
                </Column>
                <Column header="Amount">
                  <template #body="slotProps"><div class="dash-muted dash-amount">{{ slotProps.data.amount }}</div></template>
                </Column>
              </DataTable>
            </div>

            <div class="dash-card dash-wallet">
              <div>
                <div class="dash-card-head">
                  <div class="dash-card-title">My Wallet</div>
                  <Button type="button" icon="pi pi-ellipsis-h" severity="secondary" text @click="toggle" aria-haspopup="true" aria-controls="overlay_menu" />
                </div>
                <MeterGroup :value="metersData" labelPosition="end">
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
              <Button label="Show All" variant="outlined" style="margin-top:24px" />
            </div>
          </div>
        </div>
      </div>
    `,
  };
})();
