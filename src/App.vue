<template>
  <div id="app">
    <transition name="fade" mode="out-in">
      <router-view></router-view> <!-- Brug router-view til at vise ruterne -->
    </transition>
  </div>
</template>

<script>
export default {
  name: 'App',
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

/* Transition styles */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s ease; /* Animerer opacity */
}

.fade-enter, .fade-leave-to /* .fade-leave-active i <2.1.8 */ {
  opacity: 0; /* Starter og slutter med en opacity på 0 */
}

h1.title {
  font-size: 50px;
}
</style>
