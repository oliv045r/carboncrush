<template>
  <v-app id="app" :style="appStyles">
    <v-container class="app-container">
      <TopNav /> <!-- Top navigation component -->
      <transition name="fade" mode="out-in">
        <div>
          <router-view class="router-container"></router-view> <!-- Brug router-view til at vise ruterne -->
        </div>
      </transition>
      <BottomNav class="bottomnav"/> <!-- Add BottomNav component here -->
    </v-container>
  </v-app>
</template>

<script>
import BottomNav from '@/components/navigation/BottomNav.vue'; // Import BottomNav component
import { mapState } from 'vuex';
import TopNav from './components/navigation/TopNav.vue';

export default {
  name: 'App',
  components: {
    BottomNav, // Registrer BottomNav komponent
    TopNav, // Registrer TopNav komponent
  },
  computed: {
    ...mapState(['backgroundColor', 'selectedFont', 'textColor']), // Hent state fra Vuex
    appStyles() {
      return {
        backgroundColor: this.backgroundColor, // Sæt baggrundsfarve
        fontFamily: this.selectedFont, // Sæt skrifttype
        color: `${this.textColor} !important` // Sæt tekstfarve
      };
    }
  },
};
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Rubik+Wet+Paint&display=swap'); /* Importer skrifttype */
@import url('https://fonts.googleapis.com/css2?family=Notable&display=swap'); /* Importer skrifttype */

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
  font-family: Avenir, Helvetica, Arial, sans-serif; /* Standard skrifttype */
  -webkit-font-smoothing: antialiased; /* Glat tekst på WebKit-browsere */
  -moz-osx-font-smoothing: grayscale; /* Glat tekst på OS X */
  text-align: center; /* Centrer tekst */
}

h1.title {
  font-size: 50px; /* Sæt skriftstørrelse for titler */
}
</style>