<template>
  <v-container class="score-ring-container" fluid>
    <v-progress-circular
      :value="displayedScore"
      :size="200"
      :width="15"
      color="blue"
      rotate="90"
      class="progress-circle"
    >
      <template v-slot:default="{ value }">
        <div class="score-text">{{ Math.round(value) }}%</div>
      </template>
    </v-progress-circular>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      score: 80, // Static score
      displayedScore: 0, // Score that will be animated
      duration: 2000, // Total duration of the animation in milliseconds
    };
  },
  methods: {
    animateScore() {
      const start = performance.now(); // Capture the start time
      const animate = (currentTime) => {
        const elapsed = currentTime - start; // Calculate how much time has passed
        const progress = Math.min(elapsed / this.duration, 1); // Normalize to 0-1

        // Easing function to slow down the animation as it approaches the target
        this.displayedScore = Math.round(this.easeOutCubic(progress) * this.score);

        // Continue the animation until it reaches the end
        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          // Ensure the score is exactly what it should be when done
          this.displayedScore = this.score;
        }
      };
      requestAnimationFrame(animate); // Start the animation
    },
    easeOutCubic(t) {
      return 1 - Math.pow(1 - t, 3); // Easing function
    },
  },
  mounted() {
    this.animateScore(); // Trigger the animation when the component mounts
  },
};
</script>

<style scoped>
.score-ring-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh; /* Center vertically */
}

.score-text {
  font-size: 2rem;
  font-weight: bold;
  position: absolute; /* Center the score text over the progress ring */
}
</style>
