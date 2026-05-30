/*
 * Cards page — real PrimeVue v4 Aura components.
 *
 * Mirrors PrimeVue's CardsApp landing sample. Registered on window.DASH_PV.
 * Shows a collection of UI card patterns: profile card, account menu, job listing,
 * payment form, and file upload.
 */
(function () {
  (window.DASH_PV = window.DASH_PV || {}).Cards = {
    name: 'CardsPV',
    data() {
      return {
        selectedFollow: 'Follow',
        followOptions: ['Follow', 'Message'],
        darkMode: false,
        jobBookmarked: false,
        cardNumber: '',
        cardName: '',
        expiry: '',
        cvv: '',
        otp: null,
        paymentType: 'card',
        paymentOptions: [
          { icon: 'pi pi-credit-card', value: 'card' },
          { icon: 'pi pi-building-columns', value: 'bank' },
          { icon: 'pi pi-wallet', value: 'wallet' },
        ],
        donationAmount: 50,
        selectedAmount: '$10',
        amountOptions: ['$10', '$25', '$50', '$100'],
        priceRange: [20, 80],
        budget: 40,
        deliveries: [
          { label: 'Standard', sub: '3-5 Days', price: '$0' },
          { label: 'Express', sub: '1-2 Days', price: '$15' },
          { label: 'Next Day', sub: 'By tomorrow', price: '$25' },
        ],
        selectedDelivery: 'Standard',
      };
    },
    template: `
      <div class="cards-shell">
        <div class="cards-head">
          <div class="cards-head-title">Cards</div>
          <div class="cards-head-sub">You can make cards using Aura like below 👇</div>
        </div>

        <div class="cards-grid">
          <!-- Profile card -->
          <div class="card-box">
            <div class="card-profile-top">
              <OverlayBadge severity="danger">
                <Avatar image="https://www.primefaces.org/cdn/primevue/images/landing/apps/main-avatar.png"
                  size="large" style="border-radius:8px;overflow:hidden;display:flex" />
              </OverlayBadge>
              <div>
                <div class="card-profile-name">Jacob Jones</div>
                <div class="card-profile-email">hi@jacobjones.co</div>
              </div>
            </div>
            <div class="card-profile-stats">
              <span><b>14.k</b> <span style="color:var(--p-text-muted-color,#64748b)">Followers</span></span>
              <span><b>359</b> <span style="color:var(--p-text-muted-color,#64748b)">Following</span></span>
            </div>
            <p style="font-size:.85rem;color:var(--p-text-muted-color,#64748b);margin:0">
              Meet Jacob Jones, the whimsical adventurer on a quest for life's quirks. Join him for a laughter-filled journey!
            </p>
            <div class="card-profile-mutual">
              <span style="font-size:.85rem;font-weight:500">Mutual Friends</span>
              <AvatarGroup>
                <Avatar image="https://www.primefaces.org/cdn/primevue/images/landing/apps/avatar1.png" size="small" style="border-radius:6px;overflow:hidden" />
                <Avatar image="https://www.primefaces.org/cdn/primevue/images/landing/apps/avatar9.jpg" size="small" style="border-radius:6px;overflow:hidden" />
                <Avatar image="https://www.primefaces.org/cdn/primevue/images/landing/apps/avatar11.jpg" size="small" style="border-radius:6px;overflow:hidden" />
                <Avatar image="https://www.primefaces.org/cdn/primevue/images/landing/apps/avatar13.jpg" size="small" style="border-radius:6px;overflow:hidden" />
                <Avatar label="+99" size="small" style="border-radius:6px;overflow:hidden;font-size:.7rem" />
              </AvatarGroup>
            </div>
            <SelectButton v-model="selectedFollow" :options="followOptions"
              :pt="{ root: { style: 'width:100%' }, pcbutton: { root: { style: 'flex:1' } } }" />
            <div style="display:flex;flex-direction:column;gap:8px;margin-top:4px">
              <div v-for="u in [{img:'main-avatar.png',name:'Jacob Jones',email:'hi@jacobjones.co'},{img:'avatar9.jpg',name:'Courtney Henry',email:'cou.henry41@courtney.co'}]"
                :key="u.name"
                style="padding:8px;border-radius:12px;display:flex;align-items:center;gap:10px;background:var(--p-surface-100,#f1f5f9)">
                <OverlayBadge severity="danger">
                  <Avatar :image="'https://www.primefaces.org/cdn/primevue/images/landing/apps/' + u.img"
                    style="border-radius:8px;overflow:hidden;width:40px;height:40px;display:flex" />
                </OverlayBadge>
                <div style="flex:1">
                  <div style="font-size:.875rem;font-weight:500">{{ u.name }}</div>
                  <div style="font-size:.75rem;color:var(--p-text-muted-color,#64748b)">{{ u.email }}</div>
                </div>
                <Button label="Join" size="small" />
              </div>
            </div>
          </div>

          <!-- Account menu card -->
          <div class="card-box">
            <div style="display:flex;align-items:center;gap:12px;padding:12px;border:1px solid var(--p-content-border-color,#e2e8f0);border-radius:12px">
              <Avatar image="https://www.primefaces.org/cdn/primevue/images/landing/apps/main-avatar.png"
                style="border-radius:8px;overflow:hidden;width:56px;height:56px" />
              <div style="flex:1">
                <div style="font-weight:500">Jacob Jones</div>
                <div style="font-size:.875rem;color:var(--p-text-muted-color,#64748b);margin-top:4px">hi@jacobjones.co</div>
              </div>
              <Button icon="pi pi-bell" severity="contrast" text />
            </div>
            <div style="margin-top:16px;display:flex;flex-direction:column;gap:4px">
              <div v-for="item in [{icon:'pi pi-envelope',label:'Messages'},{icon:'pi pi-cog',label:'Settings'},{icon:'pi pi-sync',label:'Switch Accounts'},{icon:'pi pi-sign-in',label:'Log out'}]"
                :key="item.label"
                class="card-menu-row">
                <i :class="item.icon" style="font-size:1.1rem;width:28px;text-align:center"></i>
                <span style="font-weight:500;flex:1">{{ item.label }}</span>
              </div>
            </div>
            <Divider />
            <div class="card-menu-row" style="padding:8px">
              <i :class="darkMode ? 'pi pi-sun' : 'pi pi-moon'" style="font-size:1.1rem;width:28px;text-align:center"></i>
              <span style="font-weight:500;flex:1">Switch to {{ darkMode ? 'Light' : 'Dark' }}</span>
              <ToggleSwitch v-model="darkMode" />
            </div>
          </div>

          <!-- Job listing card -->
          <div class="card-box" style="display:flex;flex-direction:column;gap:16px">
            <div style="display:flex;align-items:flex-start;justify-content:space-between;gap:8px">
              <div>
                <div style="font-size:1.4rem;font-weight:500">Data Analyst</div>
                <div style="margin-top:8px">Data Insights Ltd.</div>
              </div>
              <Button @click="jobBookmarked = !jobBookmarked"
                :icon="jobBookmarked ? 'pi pi-bookmark-fill' : 'pi pi-bookmark'"
                severity="secondary" variant="outlined" rounded />
            </div>
            <div style="display:flex;flex-wrap:wrap;gap:12px">
              <span v-for="m in [{icon:'pi pi-users',t:'Senior'},{icon:'pi pi-stopwatch',t:'Full-Time'},{icon:'pi pi-money-bill',t:'$80,000'}]"
                :key="m.t" style="display:flex;align-items:center;gap:6px;color:var(--p-text-muted-color,#64748b)">
                <i :class="m.icon"></i><span>{{ m.t }}</span>
              </span>
            </div>
            <p style="color:var(--p-text-muted-color,#64748b);margin:0;line-height:1.6">
              Expert in data analysis? Join Data Insights Ltd. as a senior data analyst. Lead in the world of data with us!
            </p>
            <div style="display:flex;flex-wrap:wrap;gap:8px">
              <Tag v-for="t in ['Data Analysis','Analytics','Big Data']" :key="t" :value="t" rounded style="font-weight:400" />
            </div>
            <div style="padding:16px;border-radius:16px;background:var(--p-surface-100,#f1f5f9);display:flex;align-items:center;justify-content:space-between">
              <div style="display:flex">
                <Avatar v-for="(img,i) in ['avatar11.jpg','avatar10.jpg','avatar12.jpg','avatar9.jpg']" :key="i"
                  :image="'https://www.primefaces.org/cdn/primevue/images/landing/apps/' + img"
                  shape="circle" size="small" style="margin-right:-8px" />
              </div>
              <span style="font-size:.875rem;font-weight:500">12 Applied</span>
              <Button label="Apply Now" size="small" />
            </div>
          </div>

          <!-- Payment form card -->
          <div class="card-box">
            <div style="font-weight:600;font-size:1rem;margin-bottom:16px">Payment Details</div>
            <SelectButton v-model="paymentType" :options="paymentOptions" optionValue="value"
              :pt="{ root: { style: 'width:100%;margin-bottom:16px' }, pcbutton: { root: { style: 'flex:1' } } }">
              <template #option="{ option }"><i :class="option.icon" /></template>
            </SelectButton>
            <div style="display:flex;flex-direction:column;gap:12px">
              <div>
                <label style="font-size:.85rem;font-weight:500;display:block;margin-bottom:6px">Card Number</label>
                <InputText v-model="cardNumber" placeholder="1234 5678 9012 3456" style="width:100%" />
              </div>
              <div>
                <label style="font-size:.85rem;font-weight:500;display:block;margin-bottom:6px">Card Holder</label>
                <InputText v-model="cardName" placeholder="Jacob Jones" style="width:100%" />
              </div>
              <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px">
                <div>
                  <label style="font-size:.85rem;font-weight:500;display:block;margin-bottom:6px">Expiry</label>
                  <InputText v-model="expiry" placeholder="MM / YY" style="width:100%" />
                </div>
                <div>
                  <label style="font-size:.85rem;font-weight:500;display:block;margin-bottom:6px">CVV</label>
                  <InputText v-model="cvv" placeholder="•••" style="width:100%" />
                </div>
              </div>
              <div>
                <label style="font-size:.85rem;font-weight:500;display:block;margin-bottom:10px">OTP</label>
                <InputOtp v-model="otp" :length="4" style="gap:8px" />
              </div>
            </div>
            <Button label="Pay Now" style="width:100%;margin-top:16px" />
          </div>

          <!-- Donation / slider card -->
          <div class="card-box">
            <div style="font-weight:600;font-size:1rem;margin-bottom:4px">Donate</div>
            <p style="font-size:.875rem;color:var(--p-text-muted-color,#64748b);margin:0 0 16px">Support a cause with a one-time donation.</p>
            <SelectButton v-model="selectedAmount" :options="amountOptions"
              :pt="{ root: { style: 'width:100%;margin-bottom:16px' }, pcbutton: { root: { style: 'flex:1' } } }" />
            <label style="font-size:.85rem;font-weight:500;display:block;margin-bottom:10px">Custom Amount</label>
            <Slider v-model="donationAmount" :min="0" :max="200" class="w-full" style="margin-bottom:16px" />
            <InputNumber v-model="donationAmount" prefix="$" showButtons style="width:100%;margin-bottom:16px" />
            <Button label="Donate Now" style="width:100%" />
          </div>

          <!-- Delivery options card -->
          <div class="card-box">
            <div style="font-weight:600;font-size:1rem;margin-bottom:16px">Shipping Options</div>
            <div style="display:flex;flex-direction:column;gap:8px">
              <div v-for="d in deliveries" :key="d.label"
                @click="selectedDelivery = d.label"
                :style="selectedDelivery === d.label ? 'border-color:var(--p-primary-color,#6366f1)' : ''"
                class="card-delivery-row">
                <RadioButton :value="d.label" v-model="selectedDelivery" />
                <div style="flex:1">
                  <div style="font-weight:500">{{ d.label }}</div>
                  <div style="font-size:.8rem;color:var(--p-text-muted-color,#64748b)">{{ d.sub }}</div>
                </div>
                <span style="font-weight:600">{{ d.price }}</span>
              </div>
            </div>
            <Divider />
            <div>
              <label style="font-size:.85rem;font-weight:500;display:block;margin-bottom:8px">Budget Range</label>
              <Slider v-model="budget" :min="0" :max="200" style="margin-bottom:8px" />
              <div style="display:flex;justify-content:space-between;font-size:.8rem;color:var(--p-text-muted-color,#64748b)">
                <span>$0</span><span>$200</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    `,
  };
})();
