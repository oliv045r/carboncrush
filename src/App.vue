<template>
  <v-app id="app" :style="appStyles">
    <v-container class="app-container">
      <TopNav />
      <transition name="fade" mode="out-in">
        <div>
          <router-view class="router-container"></router-view>
        </div>
      </transition>
      <BottomNav />
    </v-container>
  </v-app>
</template>

<script>
import BottomNav from '@/components/navigation/BottomNav.vue';
import { mapState } from 'vuex';
import TopNav from './components/navigation/TopNav.vue';

export default {
  name: 'App',
  components: {
    BottomNav,
    TopNav,
  },
  computed: {
    ...mapState(['backgroundColor', 'selectedFont', 'textColor']),
    appStyles() {
      return {
        backgroundColor: this.backgroundColor,
        fontFamily: this.selectedFont,  // Brug skrifttypen fra Vuex
        color: `${this.textColor} !important`,  // Brug tekstfarven fra Vuex
      };
    },
  },
};
</script>


<style>
@import url('https://fonts.googleapis.com/css2?family=Rubik+Wet+Paint&display=swap'); /* Importer skrifttype */
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');

#app {
  width: 100vw !important; /* Sæt bredde til 100% af viewport bredde */
}

.app-container {
  margin: 0 !important; /* Fjern margin */
  padding: 0 !important; /* Fjern padding */
}

.router-container {
  width: 100vw; /* Sæt bredde til 100% af viewport bredde */
}

#app {
  -webkit-font-smoothing: antialiased; /* Glat tekst på WebKit-browsere */
  -moz-osx-font-smoothing: grayscale; /* Glat tekst på OS X */
  text-align: center; /* Centrer tekst */
}

h1.title {
  font-size: 50px; /* Sæt skriftstørrelse for titler */
}

h5 {
  font-size: 40px !important;
}

.v-card-text {
  font-size: 18px !important;
}

p {
  font-size: 18px !important;
}
</style>