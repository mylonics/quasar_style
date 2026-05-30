/*
 * Chat page — Quasar (with or without the Aura theme).
 *
 * Quasar equivalent of PrimeVue's ChatApp. Registered on window.DASH_Q and
 * rendered by the dashboard shell.
 */
(function () {
  (window.DASH_Q = window.DASH_Q || {}).Chat = {
    name: 'ChatQ',
    data() {
      return {
        search: '',
        notification: true,
        sound: false,
        download: false,
        value: 'Chat',
        options: [{ label: 'Chat', value: 'Chat' }, { label: 'Call', value: 'Call' }],
        media: 'Media',
        mediaOptions: [{ label: 'Media', value: 'Media' }, { label: 'Link', value: 'Link' }, { label: 'Docs', value: 'Docs' }],
        activeChat: 'PrimeTek Team',
        menuItems: [
          { label: 'Group Info', icon: 'info' },
          { label: 'Leave group', icon: 'logout' },
        ],
        chats: [
          { image: 'https://www.primefaces.org/cdn/primevue/images/landing/apps/avatar11.jpg', name: 'Cody Fisher', capName: 'CF', active: true, unreadMessageCount: 8, time: '12.30', lastMessage: "Hey there! I've heard about PrimeVue. Any cool tips?" },
          { image: 'https://www.primefaces.org/cdn/primevue/images/landing/apps/avatar-primetek.png', name: 'PrimeTek Team', capName: 'PT', active: undefined, unreadMessageCount: 0, time: '11.15', lastMessage: "Let's implement PrimeVue. Elevating our UI game! 🚀" },
          { image: 'https://www.primefaces.org/cdn/primevue/images/landing/apps/avatar2.png', name: 'Jerome Bell', capName: 'JB', active: true, unreadMessageCount: 4, time: '11.15', lastMessage: "Absolutely! PrimeVue's documentation is gold." },
          { image: 'https://www.primefaces.org/cdn/primevue/images/landing/apps/avatar12.jpg', name: 'Robert Fox', capName: 'RF', active: false, unreadMessageCount: 0, time: '11.15', lastMessage: 'PrimeVue sounds amazing!' },
          { image: 'https://www.primefaces.org/cdn/primevue/images/landing/apps/avatar13.jpg', name: 'Esther Howard', capName: 'EH', active: true, unreadMessageCount: 9, time: '11.15', lastMessage: 'Anyone using PrimeVue for mobile?' },
          { image: 'https://www.primefaces.org/cdn/primevue/images/landing/apps/avatar9.jpg', name: 'Darlene Robertson', capName: 'DR', active: false, unreadMessageCount: 0, time: '11.15', lastMessage: "Those stunning themes! 😍" },
        ],
        chatMessages: [
          { id: 1, type: 'received', image: 'https://www.primefaces.org/cdn/primevue/images/landing/apps/avatar11.jpg', message: "Hi! We've just started using PrimeVue for our new project. It's been amazing so far!" },
          { id: 2, type: 'sent', capName: 'AE', message: "That's great to hear! PrimeVue has been a game-changer for our team too." },
          { id: 3, type: 'received', image: 'https://www.primefaces.org/cdn/primevue/images/landing/apps/avatar2.png', message: "The component library is incredible. Saves so much time!", attachment: 'https://www.primefaces.org/cdn/primevue/images/landing/apps/chat-attachment1.jpeg' },
          { id: 4, type: 'sent', capName: 'AE', message: "Totally agree. The Aura theme especially looks very polished." },
          { id: 5, type: 'received', image: 'https://www.primefaces.org/cdn/primevue/images/landing/apps/avatar-primetek.png', message: "PrimeTek just released v4 — the new theming system is 🔥" },
        ],
        members: [
          { image: 'https://www.primefaces.org/cdn/primevue/images/landing/apps/avatar11.jpg', name: 'Cody Fisher' },
          { image: 'https://www.primefaces.org/cdn/primevue/images/landing/apps/avatar13.jpg', name: 'Esther Howard' },
          { image: 'https://www.primefaces.org/cdn/primevue/images/landing/apps/avatar2.png', name: 'Jerome Bell' },
          { image: '', capName: 'KW', name: 'Kristin Watson' },
          { image: '', capName: 'RR', name: 'Ronald Richards' },
        ],
        chatMedia: [
          'https://www.primefaces.org/cdn/primevue/images/landing/apps/chat-attachment1.jpeg',
          'https://www.primefaces.org/cdn/primevue/images/landing/apps/chat-attachment2.jpeg',
          'https://www.primefaces.org/cdn/primevue/images/landing/apps/chat-attachment3.jpeg',
          'https://www.primefaces.org/cdn/primevue/images/landing/apps/chat-attachment4.jpeg',
          'https://www.primefaces.org/cdn/primevue/images/landing/apps/chat-attachment5.jpeg',
        ],
      };
    },
    template: `
      <div class="chat-shell">
        <!-- Left: chat list -->
        <div class="chat-sidebar">
          <div class="chat-sidebar-header">
            <h2>Chats</h2>
            <q-btn icon="add" flat round dense />
          </div>
          <div class="chat-sidebar-search">
            <q-input v-model="search" outlined dense placeholder="Search">
              <template #prepend><q-icon name="search" /></template>
            </q-input>
          </div>
          <div class="chat-sidebar-tabs">
            <q-btn-toggle v-model="value" :options="options" no-caps unelevated dense
              toggle-color="primary" color="white" text-color="grey-8"
              style="width:100%" />
          </div>
          <div class="chat-list">
            <div v-for="chat in chats" :key="chat.name"
              class="chat-list-item" :class="{ active: chat.name === activeChat }"
              @click="activeChat = chat.name">
              <div class="chat-avatar-wrap">
                <div v-if="chat.active !== undefined"
                  class="chat-status" :class="chat.active ? 'online' : 'offline'"></div>
                <q-avatar size="40px"
                  :color="!chat.image ? 'primary' : undefined"
                  :text-color="!chat.image ? 'white' : undefined">
                  <img v-if="chat.image" :src="chat.image" />
                  <template v-else>{{ chat.capName }}</template>
                </q-avatar>
              </div>
              <div class="chat-list-meta">
                <div class="chat-list-row">
                  <span class="chat-list-name">{{ chat.name }}</span>
                  <span class="chat-list-time">{{ chat.time }}</span>
                </div>
                <div style="display:flex;align-items:center;gap:16px;justify-content:space-between;margin-top:2px">
                  <div class="chat-list-preview">{{ chat.lastMessage }}</div>
                  <q-badge v-if="chat.unreadMessageCount > 0" color="grey-8" :label="chat.unreadMessageCount" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Center: message thread -->
        <div class="chat-main">
          <div class="chat-main-header">
            <q-avatar size="44px"><img src="https://www.primefaces.org/cdn/primevue/images/landing/apps/avatar-primetek.png" /></q-avatar>
            <div class="chat-main-header-info">
              <div class="chat-main-header-name">PrimeTek</div>
              <div class="chat-main-header-members">Cody Fisher, Esther Howard, Jerome Bell, Kristin Watson, Ronald Richards, Darrell Steward</div>
            </div>
            <div class="chat-main-header-actions">
              <q-btn icon="phone" flat round dense />
              <q-btn icon="search" flat round dense />
              <q-btn icon="more_horiz" flat round dense>
                <q-menu>
                  <q-list style="min-width:140px">
                    <q-item v-for="item in menuItems" :key="item.label" clickable v-close-popup>
                      <q-item-section avatar><q-icon :name="item.icon" /></q-item-section>
                      <q-item-section>{{ item.label }}</q-item-section>
                    </q-item>
                  </q-list>
                </q-menu>
              </q-btn>
            </div>
          </div>
          <div class="chat-messages">
            <div v-for="msg in chatMessages" :key="msg.id" class="chat-msg" :class="msg.type">
              <q-avatar size="36px" :color="!msg.image ? 'primary' : undefined" :text-color="!msg.image ? 'white' : undefined" style="flex:0 0 auto">
                <img v-if="msg.image" :src="msg.image" />
                <template v-else>{{ msg.capName }}</template>
              </q-avatar>
              <div class="chat-msg-bubble">
                {{ msg.message }}
                <div v-if="msg.attachment" class="chat-msg-img">
                  <img :src="msg.attachment" alt="attachment" />
                </div>
              </div>
            </div>
          </div>
          <div class="chat-input-row">
            <div class="chat-input-actions">
              <q-btn icon="sentiment_satisfied_alt" flat round dense />
              <q-btn icon="attach_file" flat round dense />
            </div>
            <div class="chat-textarea-wrap">
              <q-input v-model="newMessage" placeholder="Write your message..." dense outlined autogrow style="background:var(--p-surface-100,#f1f5f9);border-radius:6px" />
            </div>
            <q-btn icon="send" color="primary" />
          </div>
        </div>

        <!-- Right: detail panel -->
        <div class="chat-detail">
          <div class="chat-detail-profile">
            <q-avatar size="80px"><img src="https://www.primefaces.org/cdn/primevue/images/landing/apps/avatar-primetek.png" /></q-avatar>
            <div class="chat-detail-name">PrimeTek</div>
            <div class="chat-detail-handle">@primetek</div>
            <div class="chat-detail-actions">
              <q-btn icon="phone" flat round dense color="grey-7" />
              <q-btn icon="videocam" flat round dense color="grey-7" />
              <q-btn icon="login" flat round dense color="grey-7" />
              <q-btn icon="info" flat round dense color="grey-7" />
              <q-btn icon="more_vert" flat round dense color="grey-7" />
            </div>
          </div>
          <div class="chat-detail-section">
            <div class="chat-detail-row">
              <q-icon name="notifications" />
              <span class="chat-detail-row-label">Notification</span>
              <q-toggle v-model="notification" dense />
            </div>
            <div class="chat-detail-row">
              <q-icon name="volume_down" />
              <span class="chat-detail-row-label">Sound</span>
              <q-toggle v-model="sound" dense />
            </div>
            <div class="chat-detail-row">
              <q-icon name="download" />
              <span class="chat-detail-row-label">Save to downloads</span>
              <q-toggle v-model="download" dense />
            </div>
          </div>
          <div class="chat-detail-section">
            <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:12px">
              <span class="chat-detail-section-title">Members</span>
              <q-btn label="See All" flat dense no-caps size="sm" color="grey-7" />
            </div>
            <div v-for="member in members" :key="member.name" class="chat-member-item">
              <q-avatar size="32px" :color="!member.image ? 'orange-3' : undefined" :text-color="!member.image ? 'orange-10' : undefined" style="font-size:.75rem;font-weight:500">
                <img v-if="member.image" :src="member.image" />
                <template v-else>{{ member.capName }}</template>
              </q-avatar>
              <span class="chat-member-name">{{ member.name }}</span>
              <q-icon name="chevron_right" size="xs" color="grey-5" />
            </div>
          </div>
          <div class="chat-detail-section">
            <q-btn-toggle v-model="media" :options="mediaOptions" no-caps unelevated dense
              toggle-color="primary" color="white" text-color="grey-8" style="width:100%" />
            <div class="chat-media-grid">
              <div v-for="(m, i) in chatMedia" :key="i" class="chat-media-cell">
                <img :src="m" alt="media" />
              </div>
              <div class="chat-media-more">99+</div>
            </div>
            <q-btn label="Show more" icon-right="arrow_forward" outline no-caps color="grey-7" style="width:100%" />
          </div>
        </div>
      </div>
    `,
  };
})();
