<template>
  <div class="text-center score-container">
    <!-- Button to show the final score, only visible if showButton is true -->
    <v-btn v-if="showButton" @click="showScore" color="primary" class="mb-4">
      Vis resultat
    </v-btn>
    
    <!-- Progress circular display for the score -->
    <v-progress-circular
      v-if="value"
      :model-value="value"
      :size="200"
      :width="15"
      color="blue"
    >
      <div class="score-text">{{ Math.round(value) }}%</div>
    </v-progress-circular>

    <!-- Placeholder for consistent layout -->
    <div v-if="!value" class="placeholder"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showButton: true,      // Controls visibility of the button
      interval: null,        // Interval ID for clearing
      value: 0,              // Starting score value
      targetScore: 80,       // Final target score
      increment: 2,          // Increment step size
      intervalTime: 80,     // Milliseconds between each step
    };
  },
  methods: {
    // Method to show the score and emit event
    showScore() {
      this.showButton = false; // Hide the button
      this.startAnimation();   // Start the animation
      this.$emit('score-shown'); // Emit event to update text in EndGame.vue
    },
    // Method to handle the score animation
    startAnimation() {
      this.value = 0; // Reset the score value
      this.interval = setInterval(() => {
        if (this.value < this.targetScore) {
          this.value += this.increment; // Increment score
        } else {
          clearInterval(this.interval); // Stop the interval
          this.value = this.targetScore; // Ensure it ends at target
        }
      }, this.intervalTime);
    },
  },
};
</script>

<style scoped>
.score-container {
  display: flex;
  flex-direction: column; /* Arrange items vertically */
  align-items: center; /* Center items horizontally */
  justify-content: center; /* Center items vertically */
}

.score-text {
  font-size: 2rem; /* Style for the score text */
  font-weight: bold;
  position: absolute; /* Center the score text over the progress ring */
}

/* Placeholder to maintain layout consistency */
.placeholder {
  height: 200px; /* Set the same height as the progress circular */
}
</style>
