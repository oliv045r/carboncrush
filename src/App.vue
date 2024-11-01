<template>
  <v-app id="app">
      <v-container class="app-container">
        <transition name="fade" mode="out-in">
          <router-view class="router-container"></router-view> <!-- Brug router-view til at vise ruterne -->
        </transition>
        <BottomNav /> <!-- Add BottomNav component here -->
      </v-container>
  </v-app>
</template>

<script>
import BottomNav from '@/components/BottomNav.vue'; // Import BottomNav component

export default {
  name: 'App',
  components: {
    BottomNav, // Register BottomNav component
  },
};
</script>

<style>

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
