<template>
  <v-bottom-navigation
    v-model="active"
    color="primary"
    app
  >
    <v-btn @click="goBack" icon>
      <v-icon>mdi-arrow-left</v-icon>
    </v-btn>
    <span>{{ currentPage }} / {{ totalPages }}</span>
    <v-btn @click="goForward" icon>
      <v-icon>mdi-arrow-right</v-icon>
    </v-btn>
  </v-bottom-navigation>
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
        { name: 'Home', path: '/' },
        { name: 'Background Select', path: '/background-select' },
        { name: 'Feedback Background', path: '/feedback-background' },
        { name: 'Font Select', path: '/font-select' },
        { name: 'Feedback Font', path: '/feedback-font' },

        { name: 'Font Color Select', path: '/font-color-select' },
        { name: 'Image Format', path: '/image-format' },
        { name: 'Feedback Image', path: '/feedback-image' },
        { name: 'Image Quality', path: '/image-quality' },
        { name: 'Animation Select', path: '/animation-select' },
        { name: 'Icon Format', path: '/icon-format' },
        { name: 'Feedback Icon', path: '/feedback-icon' },
        { name: 'Feedback Icon Bad', path: '/feedback-icon-bad' },
        { name: 'End Game', path: '/end-game' },



        // Add more routes as needed
      ],
    };
  },
  computed: {
    currentPage() {
      const route = this.$route;
      return this.routes.findIndex(r => r.path === route.path) + 1;
    },
    totalPages() {
      return this.routes.length;
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
  bottom: 1rem;
  left: calc(50% - 10rem) !important;
  width: 15rem !important;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>