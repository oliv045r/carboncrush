<template>
  <v-app id="app" :style="appStyles">
    <v-container class="app-container">
    <TopNav />
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
import TopNav from './components/TopNav.vue';

export default {
  name: 'App',
  components: {
    BottomNav,
    TopNav, // Register BottomNav component
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
@import url('https://fonts.googleapis.com/css2?family=Rubik+Wet+Paint&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Notable&display=swap');


#app {
  width: 100vw !important;
}

.app-container {
  margin: 0 !important;
  padding: 0 !important;
}

.router-container {
  width: 100vw;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}

h1.title {
  font-size: 50px;
}
</style>
