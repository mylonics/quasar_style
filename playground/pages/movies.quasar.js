/*
 * Movies page — Quasar (with or without the Aura theme).
 *
 * Quasar equivalent of PrimeVue's MoviesApp. Registered on window.DASH_Q.
 */
(function () {
  const MOVIES = [
    { title: 'Matrix', rating: 8.7, year: 1999, genre: 'Sci-Fi', duration: '2h 16m', image: 'https://www.primefaces.org/cdn/primevue/images/landing/apps/movie1.png', director: { name: 'Wachowskis', image: 'https://www.primefaces.org/cdn/primevue/images/landing/apps/avatar13.jpg' }, watched: 4, want: 64, percent: 38 },
    { title: 'Interstellar', rating: 8.6, year: 2014, genre: 'Sci-Fi', duration: '2h 49m', image: 'https://www.primefaces.org/cdn/primevue/images/landing/apps/movie2.png', director: { name: 'C. Nolan', image: 'https://www.primefaces.org/cdn/primevue/images/landing/apps/avatar2.png' }, watched: 6, want: 32, percent: 57 },
    { title: 'Arrival', rating: 7.9, year: 2016, genre: 'Sci-Fi', duration: '1h 56m', image: 'https://www.primefaces.org/cdn/primevue/images/landing/apps/movie3.png', director: { name: 'D. Villeneuve', image: 'https://www.primefaces.org/cdn/primevue/images/landing/apps/avatar11.jpg' }, watched: 2, want: 18, percent: 72 },
    { title: 'Blade Runner', rating: 8.1, year: 1982, genre: 'Sci-Fi', duration: '1h 57m', image: 'https://www.primefaces.org/cdn/primevue/images/landing/apps/movie4.png', director: { name: 'R. Scott', image: 'https://www.primefaces.org/cdn/primevue/images/landing/apps/avatar7.png' }, watched: 5, want: 41, percent: 45 },
    { title: '2001: Space Odyssey', rating: 8.3, year: 1968, genre: 'Sci-Fi', duration: '2h 29m', image: 'https://www.primefaces.org/cdn/primevue/images/landing/apps/movie5.png', director: { name: 'S. Kubrick', image: 'https://www.primefaces.org/cdn/primevue/images/landing/apps/avatar12.jpg' }, watched: 3, want: 27, percent: 61 },
    { title: 'Dune', rating: 8.0, year: 2021, genre: 'Sci-Fi', duration: '2h 35m', image: 'https://www.primefaces.org/cdn/primevue/images/landing/apps/movie6.png', director: { name: 'D. Villeneuve', image: 'https://www.primefaces.org/cdn/primevue/images/landing/apps/avatar10.jpg' }, watched: 7, want: 53, percent: 49 },
  ];

  (window.DASH_Q = window.DASH_Q || {}).Movies = {
    name: 'MoviesQ',
    data() {
      return {
        search: '',
        viewMode: 'grid',
        movies: MOVIES,
      };
    },
    computed: {
      filteredMovies() {
        if (!this.search) return this.movies;
        const q = this.search.toLowerCase();
        return this.movies.filter(m => m.title.toLowerCase().includes(q));
      },
    },
    methods: {
      scrollCarousel(dir) {
        const el = this.$refs.carouselTrack;
        if (el) el.scrollBy({ left: dir * 220, behavior: 'smooth' });
      },
    },
    template: `
      <div class="movies-shell">
        <div class="movies-head">
          <div>
            <div class="movies-head-title">Movies</div>
            <div class="movies-head-sub">Your most recent movies</div>
          </div>
          <div style="display:flex;align-items:center;gap:8px">
            <q-btn icon="add" label="New Movie" no-caps dense color="primary" size="sm" />
            <q-btn icon="tune" outline dense color="grey-7" size="sm" />
          </div>
        </div>

        <div class="movies-toolbar">
          <q-btn-toggle
            v-model="viewMode"
            toggle-color="primary" color="grey-7" outline dense no-caps
            :options="[{icon:'grid_on',value:'grid'},{icon:'view_list',value:'list'}]"
            style="height:36px;flex-shrink:0" />
          <q-input v-model="search" outlined dense placeholder="Search by movie title" style="flex:1">
            <template #prepend><q-icon name="search" /></template>
          </q-input>
          <q-btn icon="chevron_left" round outline color="grey-7" @click="scrollCarousel(-1)" />
          <q-btn icon="chevron_right" round outline color="grey-7" @click="scrollCarousel(1)" />
        </div>

        <!-- Carousel track -->
        <div class="movies-carousel" ref="carouselTrack">
          <div v-for="m in filteredMovies" :key="m.title" class="movies-card">
            <div class="movies-card-poster">
              <img :src="m.image" :alt="m.title" />
              <div class="movies-card-badge">{{ m.rating }}</div>
            </div>
            <div class="movies-card-body">
              <div class="movies-card-title">{{ m.title }}</div>
              <div class="movies-card-meta">{{ m.year }} &bull; {{ m.genre }} &bull; {{ m.duration }}</div>
              <div class="movies-card-director">
                <q-avatar size="24px" style="border-radius:50%;overflow:hidden">
                  <img :src="m.director.image" />
                </q-avatar>
                <span>{{ m.director.name }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Stats table -->
        <div class="movies-table-head">
          <span style="font-size:.85rem;font-weight:500;color:var(--p-text-color,#1e293b)">Recently Added</span>
        </div>
        <div class="movies-table-wrap">
          <div v-for="m in movies.slice(0,5)" :key="m.title + '_row'" class="movies-row">
            <img :src="m.image" class="movies-row-thumb" :alt="m.title" />
            <div class="movies-row-info">
              <div style="font-weight:500;color:var(--p-text-color,#1e293b);font-size:.9rem">{{ m.title }}</div>
              <div style="font-size:.8rem;color:var(--p-text-muted-color,#64748b)">{{ m.genre }} &bull; {{ m.duration }}</div>
            </div>
            <div class="movies-row-director">
              <q-avatar size="24px" style="border-radius:50%;overflow:hidden">
                <img :src="m.director.image" />
              </q-avatar>
              <span style="font-size:.8rem;color:var(--p-text-muted-color,#64748b)">{{ m.director.name }}</span>
            </div>
            <div class="movies-row-stat">
              <span style="font-size:.75rem;color:var(--p-text-muted-color,#64748b)">Watched: {{ m.watched }}</span>
              <q-linear-progress :value="m.percent / 100" color="primary" style="height:6px;width:80px;margin-top:2px" />
            </div>
            <div class="movies-row-badge">
              <div style="position:relative;display:inline-flex">
                <q-btn icon="bookmark_border" round outline dense color="grey-7" size="sm" />
                <q-badge :label="m.want" color="grey-3" text-color="grey-8" floating rounded />
              </div>
            </div>
          </div>
        </div>
      </div>
    `,
  };
})();
