/*
 * Chat page — real PrimeVue v4 Aura components.
 *
 * Mirrors PrimeVue's ChatApp landing sample. Registered on the shared page
 * registry (window.DASH_PV) and rendered by the dashboard shell.
 */
(function () {
  (window.DASH_PV = window.DASH_PV || {}).Chat = {
    name: 'ChatPV',
    data() {
      return {
        search: '',
        notification: true,
        sound: false,
        download: false,
        value: 'Chat',
        options: ['Chat', 'Call'],
        media: 'Media',
        mediaOptions: ['Media', 'Link', 'Docs'],
        activeChat: 'PrimeTek Team',
        menuItems: [
          { label: 'Group Info', icon: 'pi pi-info-circle' },
          { label: 'Leave group', icon: 'pi pi-sign-out' },
        ],
        chats: [
          { image: 'https://www.primefaces.org/cdn/primevue/images/landing/apps/avatar11.jpg', name: 'Cody Fisher', capName: 'CF', active: true, unreadMessageCount: 8, time: '12.30', lastMessage: "Hey there! I've heard about PrimeVue. Any cool tips for getting started?" },
          { image: 'https://www.primefaces.org/cdn/primevue/images/landing/apps/avatar-primetek.png', name: 'PrimeTek Team', capName: 'PT', active: undefined, unreadMessageCount: 0, time: '11.15', lastMessage: "Let's implement PrimeVue. Elevating our UI game! 🚀" },
          { image: 'https://www.primefaces.org/cdn/primevue/images/landing/apps/avatar2.png', name: 'Jerome Bell', capName: 'JB', active: true, unreadMessageCount: 4, time: '11.15', lastMessage: "Absolutely! PrimeVue's documentation is gold." },
          { image: 'https://www.primefaces.org/cdn/primevue/images/landing/apps/avatar12.jpg', name: 'Robert Fox', capName: 'RF', active: false, unreadMessageCount: 0, time: '11.15', lastMessage: "Interesting! PrimeVue sounds amazing." },
          { image: 'https://www.primefaces.org/cdn/primevue/images/landing/apps/avatar13.jpg', name: 'Esther Howard', capName: 'EH', active: true, unreadMessageCount: 9, time: '11.15', lastMessage: 'Quick one, team! Anyone using PrimeVue for mobile?' },
          { image: 'https://www.primefaces.org/cdn/primevue/images/landing/apps/avatar9.jpg', name: 'Darlene Robertson', capName: 'DR', active: false, unreadMessageCount: 0, time: '11.15', lastMessage: "Just explored PrimeVue's themes. Those stunning designs! 😍" },
        ],
        chatMessages: [
          { id: 1, type: 'received', image: 'https://www.primefaces.org/cdn/primevue/images/landing/apps/avatar11.jpg', message: "Hi! We've just started using PrimeVue for our new project. It's been amazing so far!" },
          { id: 2, type: 'sent', capName: 'AE', message: "That's great to hear! PrimeVue has been a game-changer for our team too." },
          { id: 3, type: 'received', image: 'https://www.primefaces.org/cdn/primevue/images/landing/apps/avatar2.png', message: "The component library is incredible. Save so much time!", attachment: 'https://www.primefaces.org/cdn/primevue/images/landing/apps/chat-attachment1.jpeg' },
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
    methods: {
      toggle(event) { this.$refs.menu.toggle(event); },
    },
    template: `
      <div class="chat-shell">
        <!-- Left: chat list -->
        <div class="chat-sidebar">
          <div class="chat-sidebar-header">
            <h2>Chats</h2>
            <Button icon="pi pi-plus" text />
          </div>
          <div class="chat-sidebar-search">
            <IconField>
              <InputIcon class="pi pi-search" />
              <InputText v-model="search" placeholder="Search" style="width:100%" />
            </IconField>
          </div>
          <div class="chat-sidebar-tabs">
            <SelectButton v-model="value" :options="options" style="width:100%" :pt="{ root: { class: 'w-full' } }" />
          </div>
          <div class="chat-list">
            <div v-for="chat in chats" :key="chat.name"
              class="chat-list-item" :class="{ active: chat.name === activeChat }"
              @click="activeChat = chat.name">
              <div class="chat-avatar-wrap">
                <div v-if="chat.active !== undefined"
                  class="chat-status" :class="chat.active ? 'online' : 'offline'"></div>
                <Avatar
                  v-bind="chat.image ? { image: chat.image } : { label: chat.capName }"
                  size="large" shape="circle"
                  :style="!chat.image ? 'background-color:var(--p-primary-100,#d1fae5);color:var(--p-primary-950,#022c22)' : ''"
                />
              </div>
              <div class="chat-list-meta">
                <div class="chat-list-row">
                  <span class="chat-list-name">{{ chat.name }}</span>
                  <span class="chat-list-time">{{ chat.time }}</span>
                </div>
                <div style="display:flex;align-items:center;gap:16px;justify-content:space-between;margin-top:2px">
                  <div class="chat-list-preview">{{ chat.lastMessage }}</div>
                  <Badge v-if="chat.unreadMessageCount > 0" :value="chat.unreadMessageCount" severity="contrast" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Center: message thread -->
        <div class="chat-main">
          <div class="chat-main-header">
            <Avatar image="https://www.primefaces.org/cdn/primevue/images/landing/apps/avatar-primetek.png" size="large" shape="circle" />
            <div class="chat-main-header-info">
              <div class="chat-main-header-name">PrimeTek</div>
              <div class="chat-main-header-members">Cody Fisher, Esther Howard, Jerome Bell, Kristin Watson, Ronald Richards, Darrell Steward</div>
            </div>
            <div class="chat-main-header-actions">
              <Button icon="pi pi-phone" text />
              <Button icon="pi pi-search" text />
              <Button type="button" icon="pi pi-ellipsis-h" text @click="toggle" aria-haspopup="true" aria-controls="chat_menu" />
              <Menu ref="menu" id="chat_menu" :model="menuItems" :popup="true" />
            </div>
          </div>
          <div class="chat-messages">
            <div v-for="msg in chatMessages" :key="msg.id" class="chat-msg" :class="msg.type">
              <Avatar
                v-bind="msg.image ? { image: msg.image } : { label: msg.capName }"
                shape="circle"
                style="flex:0 0 auto"
              />
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
              <Button icon="pi pi-face-smile" text />
              <Button icon="pi pi-paperclip" text />
            </div>
            <div class="chat-textarea-wrap">
              <Textarea placeholder="Write your message..." autoResize :rows="1"
                style="width:100%;border:0;box-shadow:none;background:var(--p-surface-100,#f1f5f9);border-radius:6px;resize:none" />
            </div>
            <Button icon="pi pi-send" />
          </div>
        </div>

        <!-- Right: detail panel -->
        <div class="chat-detail">
          <div class="chat-detail-profile">
            <Avatar image="https://www.primefaces.org/cdn/primevue/images/landing/apps/avatar-primetek.png" size="xlarge" shape="circle" style="width:80px;height:80px" />
            <div class="chat-detail-name">PrimeTek</div>
            <div class="chat-detail-handle">@primetek</div>
            <div class="chat-detail-actions">
              <Button icon="pi pi-phone" severity="secondary" text />
              <Button icon="pi pi-video" severity="secondary" text />
              <Button icon="pi pi-sign-in" severity="secondary" text />
              <Button icon="pi pi-info-circle" severity="secondary" text />
              <Button type="button" icon="pi pi-ellipsis-v" severity="secondary" text @click="toggle" aria-haspopup="true" aria-controls="chat_menu2" />
              <Menu ref="menu2" id="chat_menu2" :model="menuItems" :popup="true" />
            </div>
          </div>
          <div class="chat-detail-section">
            <div class="chat-detail-row">
              <i class="pi pi-bell" style="color:var(--p-text-color)"></i>
              <span class="chat-detail-row-label">Notification</span>
              <ToggleSwitch v-model="notification" />
            </div>
            <div class="chat-detail-row">
              <i class="pi pi-volume-down" style="color:var(--p-text-color)"></i>
              <span class="chat-detail-row-label">Sound</span>
              <ToggleSwitch v-model="sound" />
            </div>
            <div class="chat-detail-row">
              <i class="pi pi-download" style="color:var(--p-text-color)"></i>
              <span class="chat-detail-row-label">Save to downloads</span>
              <ToggleSwitch v-model="download" />
            </div>
          </div>
          <div class="chat-detail-section">
            <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:12px">
              <span class="chat-detail-section-title">Members</span>
              <Button label="See All" text style="font-size:0.875rem;padding:2px 8px;color:var(--p-text-muted-color)" />
            </div>
            <div v-for="member in members" :key="member.name" class="chat-member-item">
              <Avatar v-bind="member.image ? { image: member.image } : { label: member.capName }" shape="circle"
                :style="!member.image ? 'background-color:#fed7aa;color:#7c2d12;font-size:.75rem;font-weight:500' : ''" />
              <span class="chat-member-name">{{ member.name }}</span>
              <i class="pi pi-chevron-right" style="font-size:.75rem;color:var(--p-text-muted-color)"></i>
            </div>
          </div>
          <div class="chat-detail-section">
            <SelectButton v-model="media" :options="mediaOptions" style="width:100%" />
            <div class="chat-media-grid">
              <div v-for="(m, i) in chatMedia" :key="i" class="chat-media-cell">
                <img :src="m" alt="media" />
              </div>
              <div class="chat-media-more">99+</div>
            </div>
            <Button label="Show more" icon="pi pi-arrow-right" iconPos="right" variant="outlined" style="width:100%;justify-content:space-between" />
          </div>
        </div>
      </div>
    `,
  };
})();
