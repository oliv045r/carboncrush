<template>
  <v-container>
    <h1>Her er din endelige score</h1>
    <ScoreDisplay />
  </v-container>
</template>

<script>
import ScoreDisplay from './ScoreDisplay.vue';

export default {
  components: {
    ScoreDisplay,
  },
};
</script>
