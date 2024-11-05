<template>
  <v-bottom-navigation
  class="elevation-4 rounded-xl"
    v-model="active"
    color="primary"
    app
    v-if="!isStartScreen"
    :model-value="progress"
  >
    <v-btn :class="{ hidden: currentPage === 1 }" @click="goBack" icon>
      <v-icon>mdi-arrow-left</v-icon>
    </v-btn>
    <span>{{ currentPage }} / {{ totalPages }}</span>
    <v-btn @click="goForward" icon>
      <v-icon>mdi-arrow-right</v-icon>
    </v-btn>
  </v-bottom-navigation>
  <v-progress-linear class="position-fixed	bottom-0" height="8" :model-value="progress"></v-progress-linear>

</template>

<script>
import { VBottomNavigation, VBtn, VIcon } from 'vuetify/lib/components';

export default {
  name: 'BottomNav',
  components: {
    VBottomNavigation,
    VBtn,
    VIcon,
  },
  data() {
    return {
      active: null,
      routes: [
        { name: 'Background Select', path: '/background-select' },
        { name: 'Font Select', path: '/font-select' },
        { name: 'Font Color Select', path: '/font-color-select' },
        { name: 'Image Format', path: '/image-format' },
        { name: 'Image Quality', path: '/image-quality' },
        { name: 'Animation Select', path: '/animation-select' },
        { name: 'Icon Format', path: '/icon-format' },
        { name: 'End Game', path: '/end-game' },



        // Add more routes as needed
      ],
    };
  },
  computed: {
    isStartScreen() {
      return this.$route.path === '/';
    },
    currentPage() {
      const route = this.$route;
      return this.routes.findIndex(r => r.path === route.path) + 1;
    },
    totalPages() {
      return this.routes.length;
    },    
    progress() {
      return (this.currentPage / this.totalPages) * 100;
    },
  },
  methods: {
    goBack() {
      const currentIndex = this.currentPage - 1;
      if (currentIndex > 0) {
        this.$router.push(this.routes[currentIndex - 1].path);
      }
    },
    goForward() {
      const currentIndex = this.currentPage - 1;
      if (currentIndex < this.totalPages - 1) {
        this.$router.push(this.routes[currentIndex + 1].path);
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
  visibility: hidden;
}
</style>