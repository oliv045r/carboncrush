<template>
  <v-app id="app" :style="{ backgroundColor: backgroundColor }">
    <v-container class="app-container">
      <transition name="fade" mode="out-in">
        <div :style="{ backgroundColor: backgroundColor }">
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
    ...mapState(['backgroundColor']),
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
  color: #2c3e50;
  margin: 0;
  padding: 0;
  width: auto;
}

/* Transition styles */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s ease; /* Animerer opacity */
}

.fade-enter, .fade-leave-to /* .fade-leave-active i <2.1.8 */ {
  opacity: 0; /* Starter og slutter med en opacity på 0 */
}
</style>
