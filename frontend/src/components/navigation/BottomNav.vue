<template>
  <v-bottom-navigation
    class="elevation-4 rounded-xl"
    v-model="active"
    color="primary"
    app
    v-if="isNavigationRoute"
    :model-value="progress"
  >
    <!-- Knap til at gå tilbage, skjult hvis på første side -->
    <v-btn :class="{ hidden: currentPage === 1 }" @click="goBack" icon aria-label="Gå tilbage">
      <v-icon>mdi-arrow-left</v-icon>
    </v-btn>
    <!-- Knap til at gå frem, skjult hvis showNextButton er falsk -->
    <v-btn :class="{ hidden: !showNextButton }" @click="goForward" icon aria-label="Gå frem">
      <v-icon>mdi-arrow-right</v-icon>
    </v-btn>
  </v-bottom-navigation>
  <!-- Lineær fremdriftsindikator -->
  <v-progress-linear class="nav-progress position-fixed" :height="18" :model-value="progress"></v-progress-linear>
</template>

<script>
import { VBottomNavigation, VBtn, VIcon } from 'vuetify/lib/components'; // Importer Vuetify komponenter
import { mapState, mapActions } from 'vuex';

export default {
  name: 'BottomNav',
  components: {
    VBottomNavigation,
    VBtn,
    VIcon,
  },
  data() {
    return {
      active: null, // Aktivt element i navigationen
      routes: [
        { name: 'Background Select', path: '/background-select' },
        { name: 'Font Select', path: '/font-select' },
        { name: 'Font Color Select', path: '/font-color-select' },
        { name: 'Image Format', path: '/image-format' },
        { name: 'Image Quality', path: '/image-quality' },
        { name: 'Animation Select', path: '/animation-select' },
        { name: 'Icon Format', path: '/icon-format' },
        { name: 'End Game', path: '/end-game' },
        // Tilføj flere ruter efter behov
      ],
    };
  },
  computed: {
    ...mapState(['showNextButton']), // Hent showNextButton state fra Vuex
    isNavigationRoute() {
      return this.routes.some(route => route.path === this.$route.path); // Tjek om den aktuelle rute er en navigationrute
    },
    currentPage() {
      const route = this.$route;
      return this.routes.findIndex(r => r.path === route.path) + 1; // Find den aktuelle sideindeks
    },
    totalPages() {
      return this.routes.length; // Total antal sider
    },
    progress() {
      return (this.currentPage / this.totalPages) * 100; // Beregn fremdrift i procent
    },
  },
  methods: {
    ...mapActions(['resetShowNextButton']), // Kortlæg resetShowNextButton handling fra Vuex
    goBack() {
      const currentIndex = this.currentPage - 1;
      if (currentIndex > 0) {
        this.resetShowNextButton(); // Nulstil state
        this.$router.push(this.routes[currentIndex - 1].path); // Naviger til forrige rute
      }
    },
    goForward() {
      const currentIndex = this.currentPage - 1;
      if (currentIndex < this.totalPages - 1) {
        this.resetShowNextButton(); // Nulstil state
        this.$router.push(this.routes[currentIndex + 1].path); // Naviger til næste rute
      }
    },
  },
};
</script>

<style scoped>
.v-bottom-navigation {
  position: fixed;
  bottom: 2rem !important;
  left: calc(50% - 7.5rem) !important;
  width: 15rem !important;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.hidden {
  visibility: hidden; /* Skjuler elementet */
}

.nav-progress {
  top: unset !important;
  bottom: 0; /* Placerer fremdriftsindikatoren i bunden */
}
</style>