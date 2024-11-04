<template>
  <v-app id="app" :style="appStyles">
    <v-container class="app-container">
      <transition name="fade" mode="out-in">
        <div>
          <router-view class="router-container"></router-view> <!-- Brug router-view til at vise ruterne -->
        </div>
      </transition>
      <BottomNav /> <!-- Add BottomNav component here -->
    </v-container>
  </v-app>
</template>

<script>
import BottomNav from '@/components/BottomNav.vue'; // Import BottomNav component
import { mapState } from 'vuex';

export default {
  name: 'App',
  components: {
    BottomNav, // Register BottomNav component
  },
  computed: {
    ...mapState(['backgroundColor', 'selectedFont', 'textColor']),
    appStyles() {
      return {
        backgroundColor: this.backgroundColor,
        fontFamily: this.selectedFont,
        color: `${this.textColor} !important`
      };
    }
  },
};
</script>

<style>
#app {
  width: 100vw !important;
}

.app-container {
  margin: 0 !important;
  padding: 0 !important;
}

.router-container {
  height: 100vh;
  width: 100vw;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
</style>
