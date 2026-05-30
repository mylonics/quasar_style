/*
 * Cards page — Quasar (with or without the Aura theme).
 *
 * Quasar equivalent of PrimeVue's CardsApp. Registered on window.DASH_Q.
 */
(function () {
  (window.DASH_Q = window.DASH_Q || {}).Cards = {
    name: 'CardsQ',
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
        otp: ['', '', '', ''],
        paymentType: 'card',
        paymentOptions: [
          { icon: 'credit_card', value: 'card' },
          { icon: 'account_balance', value: 'bank' },
          { icon: 'account_balance_wallet', value: 'wallet' },
        ],
        donationAmount: 50,
        selectedAmount: '$10',
        amountOptions: ['$10', '$25', '$50', '$100'],
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
              <div style="position:relative;display:inline-flex">
                <q-avatar size="40px" style="border-radius:8px;overflow:hidden">
                  <img src="https://www.primefaces.org/cdn/primevue/images/landing/apps/main-avatar.png" />
                </q-avatar>
                <q-badge color="negative" floating rounded style="width:10px;height:10px;min-width:0;padding:0" />
              </div>
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
              Meet Jacob Jones, the whimsical adventurer on a quest for life's quirks.
            </p>
            <div class="card-profile-mutual">
              <span style="font-size:.85rem;font-weight:500">Mutual Friends</span>
              <div style="display:flex">
                <q-avatar v-for="img in ['avatar1.png','avatar9.jpg','avatar11.jpg','avatar13.jpg']" :key="img"
                  size="28px" style="border-radius:6px;overflow:hidden;margin-right:-6px">
                  <img :src="'https://www.primefaces.org/cdn/primevue/images/landing/apps/' + img" />
                </q-avatar>
                <q-avatar size="28px" color="grey-3" text-color="grey-8" style="border-radius:6px;font-size:.7rem;font-weight:500">+99</q-avatar>
              </div>
            </div>
            <q-btn-toggle v-model="selectedFollow" spread no-caps
              toggle-color="primary" color="grey-7" outline
              :options="followOptions.map(o=>({label:o,value:o}))"
              style="width:100%" />
            <div style="display:flex;flex-direction:column;gap:8px;margin-top:8px">
              <div v-for="u in [{img:'main-avatar.png',name:'Jacob Jones',email:'hi@jacobjones.co'},{img:'avatar9.jpg',name:'Courtney Henry',email:'cou.henry41@courtney.co'}]"
                :key="u.name"
                style="padding:8px;border-radius:12px;display:flex;align-items:center;gap:10px;background:var(--p-surface-100,#f1f5f9)">
                <div style="position:relative;display:inline-flex">
                  <q-avatar size="40px" style="border-radius:8px;overflow:hidden">
                    <img :src="'https://www.primefaces.org/cdn/primevue/images/landing/apps/' + u.img" />
                  </q-avatar>
                  <q-badge color="negative" floating rounded style="width:10px;height:10px;min-width:0;padding:0" />
                </div>
                <div style="flex:1">
                  <div style="font-size:.875rem;font-weight:500">{{ u.name }}</div>
                  <div style="font-size:.75rem;color:var(--p-text-muted-color,#64748b)">{{ u.email }}</div>
                </div>
                <q-btn label="Join" no-caps dense color="primary" size="sm" />
              </div>
            </div>
          </div>

          <!-- Account menu card -->
          <div class="card-box">
            <div style="display:flex;align-items:center;gap:12px;padding:12px;border:1px solid var(--p-content-border-color,#e2e8f0);border-radius:12px">
              <q-avatar size="56px" style="border-radius:8px;overflow:hidden">
                <img src="https://www.primefaces.org/cdn/primevue/images/landing/apps/main-avatar.png" />
              </q-avatar>
              <div style="flex:1">
                <div style="font-weight:500">Jacob Jones</div>
                <div style="font-size:.875rem;color:var(--p-text-muted-color,#64748b);margin-top:4px">hi@jacobjones.co</div>
              </div>
              <q-btn icon="notifications" flat round dense />
            </div>
            <div style="margin-top:16px;display:flex;flex-direction:column;gap:4px">
              <div v-for="item in [{icon:'mail_outline',label:'Messages'},{icon:'settings',label:'Settings'},{icon:'sync',label:'Switch Accounts'},{icon:'login',label:'Log out'}]"
                :key="item.label"
                class="card-menu-row">
                <q-icon :name="item.icon" size="sm" style="width:28px;text-align:center" />
                <span style="font-weight:500;flex:1">{{ item.label }}</span>
              </div>
            </div>
            <q-separator style="margin:12px 0" />
            <div class="card-menu-row" style="padding:8px">
              <q-icon :name="darkMode ? 'light_mode' : 'dark_mode'" size="sm" style="width:28px;text-align:center" />
              <span style="font-weight:500;flex:1">Switch to {{ darkMode ? 'Light' : 'Dark' }}</span>
              <q-toggle v-model="darkMode" dense />
            </div>
          </div>

          <!-- Job listing card -->
          <div class="card-box" style="display:flex;flex-direction:column;gap:16px">
            <div style="display:flex;align-items:flex-start;justify-content:space-between;gap:8px">
              <div>
                <div style="font-size:1.4rem;font-weight:500">Data Analyst</div>
                <div style="margin-top:8px">Data Insights Ltd.</div>
              </div>
              <q-btn @click="jobBookmarked = !jobBookmarked"
                :icon="jobBookmarked ? 'bookmark' : 'bookmark_border'"
                outline round dense color="grey-7" size="sm" />
            </div>
            <div style="display:flex;flex-wrap:wrap;gap:12px">
              <span v-for="m in [{icon:'group',t:'Senior'},{icon:'timer',t:'Full-Time'},{icon:'payments',t:'$80,000'}]"
                :key="m.t" style="display:flex;align-items:center;gap:6px;color:var(--p-text-muted-color,#64748b)">
                <q-icon :name="m.icon" size="xs" /><span>{{ m.t }}</span>
              </span>
            </div>
            <p style="color:var(--p-text-muted-color,#64748b);margin:0;line-height:1.6">
              Expert in data analysis? Join Data Insights Ltd. as a senior data analyst. Lead in the world of data with us!
            </p>
            <div style="display:flex;flex-wrap:wrap;gap:8px">
              <q-badge v-for="t in ['Data Analysis','Analytics','Big Data']" :key="t"
                :label="t" color="grey-3" text-color="grey-8" rounded style="font-weight:400;padding:4px 10px" />
            </div>
            <div style="padding:16px;border-radius:16px;background:var(--p-surface-100,#f1f5f9);display:flex;align-items:center;justify-content:space-between">
              <div style="display:flex">
                <q-avatar v-for="(img,i) in ['avatar11.jpg','avatar10.jpg','avatar12.jpg','avatar9.jpg']" :key="i"
                  size="28px" shape="circle" style="overflow:hidden;margin-right:-8px">
                  <img :src="'https://www.primefaces.org/cdn/primevue/images/landing/apps/' + img" />
                </q-avatar>
              </div>
              <span style="font-size:.875rem;font-weight:500">12 Applied</span>
              <q-btn label="Apply Now" no-caps dense color="primary" size="sm" />
            </div>
          </div>

          <!-- Payment form card -->
          <div class="card-box">
            <div style="font-weight:600;font-size:1rem;margin-bottom:16px">Payment Details</div>
            <q-btn-toggle v-model="paymentType" spread no-caps
              toggle-color="primary" color="grey-7" outline
              :options="paymentOptions.map(o=>({icon:o.icon,value:o.value}))"
              style="width:100%;margin-bottom:16px" />
            <div style="display:flex;flex-direction:column;gap:12px">
              <div>
                <label style="font-size:.85rem;font-weight:500;display:block;margin-bottom:6px">Card Number</label>
                <q-input v-model="cardNumber" outlined dense placeholder="1234 5678 9012 3456" style="width:100%" />
              </div>
              <div>
                <label style="font-size:.85rem;font-weight:500;display:block;margin-bottom:6px">Card Holder</label>
                <q-input v-model="cardName" outlined dense placeholder="Jacob Jones" style="width:100%" />
              </div>
              <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px">
                <div>
                  <label style="font-size:.85rem;font-weight:500;display:block;margin-bottom:6px">Expiry</label>
                  <q-input v-model="expiry" outlined dense placeholder="MM / YY" style="width:100%" />
                </div>
                <div>
                  <label style="font-size:.85rem;font-weight:500;display:block;margin-bottom:6px">CVV</label>
                  <q-input v-model="cvv" outlined dense placeholder="•••" style="width:100%" />
                </div>
              </div>
              <div>
                <label style="font-size:.85rem;font-weight:500;display:block;margin-bottom:10px">OTP</label>
                <div style="display:flex;gap:8px">
                  <q-input v-for="i in 4" :key="i" v-model="otp[i-1]" outlined dense maxlength="1"
                    style="width:48px;flex-shrink:0" input-style="text-align:center;font-size:1.2rem" />
                </div>
              </div>
            </div>
            <q-btn label="Pay Now" no-caps color="primary" style="width:100%;margin-top:16px" />
          </div>

          <!-- Donation / slider card -->
          <div class="card-box">
            <div style="font-weight:600;font-size:1rem;margin-bottom:4px">Donate</div>
            <p style="font-size:.875rem;color:var(--p-text-muted-color,#64748b);margin:0 0 16px">Support a cause with a one-time donation.</p>
            <q-btn-toggle v-model="selectedAmount" spread no-caps
              toggle-color="primary" color="grey-7" outline
              :options="amountOptions.map(o=>({label:o,value:o}))"
              style="width:100%;margin-bottom:16px" />
            <label style="font-size:.85rem;font-weight:500;display:block;margin-bottom:10px">Custom Amount</label>
            <q-slider v-model="donationAmount" :min="0" :max="200" color="primary" style="margin-bottom:16px" />
            <q-input v-model.number="donationAmount" outlined dense prefix="$" type="number" style="width:100%;margin-bottom:16px" />
            <q-btn label="Donate Now" no-caps color="primary" style="width:100%" />
          </div>

          <!-- Delivery options card -->
          <div class="card-box">
            <div style="font-weight:600;font-size:1rem;margin-bottom:16px">Shipping Options</div>
            <div style="display:flex;flex-direction:column;gap:8px">
              <div v-for="d in deliveries" :key="d.label"
                @click="selectedDelivery = d.label"
                :style="selectedDelivery === d.label ? 'border-color:var(--p-primary-color,#6366f1)' : ''"
                class="card-delivery-row">
                <q-radio :val="d.label" v-model="selectedDelivery" dense />
                <div style="flex:1">
                  <div style="font-weight:500">{{ d.label }}</div>
                  <div style="font-size:.8rem;color:var(--p-text-muted-color,#64748b)">{{ d.sub }}</div>
                </div>
                <span style="font-weight:600">{{ d.price }}</span>
              </div>
            </div>
            <q-separator style="margin:12px 0" />
            <div>
              <label style="font-size:.85rem;font-weight:500;display:block;margin-bottom:8px">Budget Range</label>
              <q-slider v-model="budget" :min="0" :max="200" color="primary" style="margin-bottom:8px" />
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
