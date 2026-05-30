/*
 * Movies page — real PrimeVue v4 Aura components.
 *
 * Mirrors PrimeVue's MoviesApp landing sample. Registered on window.DASH_PV.
 * Uses a scrollable flex container instead of PrimeVue Carousel to avoid
 * Tailwind dependency. Carousel-style navigation is provided via scroll buttons.
 */
(function () {
  const MOVIES = [
    { title: 'Matrix', rating: 8.7, year: 1999, genre: 'Sci-Fi', duration: '2h 16m', image: 'https://www.primefaces.org/cdn/primevue/images/landing/apps/movie1.png', director: { name: 'Wachowskis', image: 'https://www.primefaces.org/cdn/primevue/images/landing/apps/avatar13.jpg' }, watched: 4, want: 64, percent: 38 },
    { title: 'Interstellar', rating: 8.6, year: 2014, genre: 'Sci-Fi', duration: '2h 49m', image: 'https://www.primefaces.org/cdn/primevue/images/landing/apps/movie2.png', director: { name: 'C. Nolan', image: 'https://www.primefaces.org/cdn/primevue/images/landing/apps/avatar2.png' }, watched: 6, want: 32, percent: 57 },
    { title: 'Arrival', rating: 7.9, year: 2016, genre: 'Sci-Fi', duration: '1h 56m', image: 'https://www.primefaces.org/cdn/primevue/images/landing/apps/movie3.png', director: { name: 'D. Villeneuve', image: 'https://www.primefaces.org/cdn/primevue/images/landing/apps/avatar11.jpg' }, watched: 2, want: 18, percent: 72 },
    { title: 'Blade Runner', rating: 8.1, year: 1982, genre: 'Sci-Fi', duration: '1h 57m', image: 'https://www.primefaces.org/cdn/primevue/images/landing/apps/movie4.png', director: { name: 'R. Scott', image: 'https://www.primefaces.org/cdn/primevue/images/landing/apps/avatar7.png' }, watched: 5, want: 41, percent: 45 },
    { title: '2001: A Space Odyssey', rating: 8.3, year: 1968, genre: 'Sci-Fi', duration: '2h 29m', image: 'https://www.primefaces.org/cdn/primevue/images/landing/apps/movie5.png', director: { name: 'S. Kubrick', image: 'https://www.primefaces.org/cdn/primevue/images/landing/apps/avatar12.jpg' }, watched: 3, want: 27, percent: 61 },
    { title: 'Dune', rating: 8.0, year: 2021, genre: 'Sci-Fi', duration: '2h 35m', image: 'https://www.primefaces.org/cdn/primevue/images/landing/apps/movie6.png', director: { name: 'D. Villeneuve', image: 'https://www.primefaces.org/cdn/primevue/images/landing/apps/avatar10.jpg' }, watched: 7, want: 53, percent: 49 },
  ];

  (window.DASH_PV = window.DASH_PV || {}).Movies = {
    name: 'MoviesPV',
    data() {
      return {
        search: '',
        listView: [{ icon: 'pi pi-table', value: 'grid' }, { icon: 'pi pi-list', value: 'list' }],
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
            <Button icon="pi pi-plus" label="New Movie" size="small" />
            <Button icon="pi pi-sliders-h" variant="outlined" severity="secondary" size="small" />
          </div>
        </div>

        <div class="movies-toolbar">
          <SelectButton v-model="viewMode" :options="listView" optionValue="value" optionLabel="icon"
            style="height:36px;flex-shrink:0">
            <template #option="{ option }">
              <i :class="option.icon" />
            </template>
          </SelectButton>
          <IconField style="flex:1">
            <InputIcon class="pi pi-search" />
            <InputText v-model="search" placeholder="Search by movie title" style="width:100%" />
          </IconField>
          <Button icon="pi pi-chevron-left" rounded variant="outlined" severity="secondary" size="small" @click="scrollCarousel(-1)" />
          <Button icon="pi pi-chevron-right" rounded variant="outlined" severity="secondary" size="small" @click="scrollCarousel(1)" />
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
                <Avatar :image="m.director.image" size="small" style="border-radius:50%;overflow:hidden" />
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
              <Avatar :image="m.director.image" size="small" style="border-radius:50%;overflow:hidden" />
              <span style="font-size:.8rem;color:var(--p-text-muted-color,#64748b)">{{ m.director.name }}</span>
            </div>
            <div class="movies-row-stat">
              <span style="font-size:.75rem;color:var(--p-text-muted-color,#64748b)">Watched: {{ m.watched }}</span>
              <ProgressBar :value="m.percent" style="height:6px;width:80px;margin-top:2px" :showValue="false" />
            </div>
            <div class="movies-row-badge">
              <OverlayBadge :value="m.want">
                <Button icon="pi pi-bookmark" variant="outlined" severity="secondary" rounded size="small" />
              </OverlayBadge>
            </div>
          </div>
        </div>
      </div>
    `,
  };
})();
