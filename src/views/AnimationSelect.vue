<template>
  <div class="background-select animate__animated animate__fadeIn">
    <!-- Info sektion -->
    <v-card class="mx-auto px-10 py-10 rounded-lg elevation-0 bg-transparent" max-width="600">
      <v-card-title class="text-h5 font-weight-bold">Vælg Animation</v-card-title>
      <v-card-text class="text-subtitle-1">
        Vælg en knap for at se forskellige hover-animationer. Den første knap har mindst animation, og den sidste knap har mest animation.
      </v-card-text>
    </v-card>
    <div class="info-section">
      <!-- Knapper med forskellige animationer -->
      <div class="button-container">
        <button
          class="animated-button button1"
          :class="{ active: activeButton === 'button1' }"
          @click="setActiveButton('button1')"
        >
          Knap 1
        </button>
        <button
          class="animated-button button2"
          :class="{ active: activeButton === 'button2' }"
          @click="setActiveButton('button2')"
        >
          Knap 2
        </button>
        <button
          class="animated-button button3"
          :class="{ active: activeButton === 'button3' }"
          @click="setActiveButton('button3')"
          @mouseover="bounceButton"
        >
          Knap 3
        </button>
        <button
          class="animated-button button4"
          :class="{ active: activeButton === 'button4' }"
          @click="setActiveButton('button4')"
        >
          Knap 4
        </button>
      </div>
    </div>
    <v-btn class="mt-10" @click="showFeedbackPopup = true; updateShowNextButton(true)" color="primary">Next</v-btn>

  </div>
  <FeedbackPop 
      v-if="showFeedbackPopup" 
      @close="showFeedbackPopup = false" 
      :title="feedbackTitle"
      :content="feedbackContent"
      :imageUrl="feedbackImageUrl"
      >
  </FeedbackPop>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import FeedbackPop from '@/components/feedback/FeedbackPop.vue';

export default {
  components: {
    FeedbackPop,
  },
  data() {
    return {
      showFeedbackPopup: false, // Control the visibility of the popup
      feedbackTitle: 'Spændende!', // Define the title for FeedbackPop
      feedbackContent: 'Når du vælger mængden af animationer til din hjemmeside, er det vigtigt at overveje både visuel indvirkning og ydeevne. Flere animationer kan forbedre det visuelle udtryk, men de kan også belaste systemet. <br> <br> At finde den rette balance er afgørende, da for mange animationer kan forlænge indlæsningstiderne og øge energiforbruget. Ved at vælge en passende mængde animationer kan du sikre hurtigere indlæsning, hvilket forbedrer brugeroplevelsen og sparer båndbredde. <br> <br> Husk, at dit valg af animationsmængde kan have indflydelse på både ydeevne og bæredygtighed. Tænk over det, når du designer din hjemmeside!', // Define the content for FeedbackPop
      feedbackImageUrl: require('@/images/AnimationMeme.jpg'), // Define the image URL for FeedbackPop
      activeButton: null, // Track the active button
    };
  },
  computed: {
    ...mapState(['showNextButton']),
  },
  methods: {
    ...mapActions(['updateSelectedFont', 'updateShowNextButton']),

    goBack() {
      this.$router.push('/');
    },
    goForward() {
      this.$router.push('/another-route');
    },
    bounceButton(event) {
      const button = event.target;
      button.classList.remove('bounce'); // Reset animation
      void button.offsetWidth; // Trigger reflow to restart animation
      button.classList.add('bounce');
    },
    setActiveButton(button) {
      this.activeButton = button;
    },
  }
};
</script>

<style scoped>
.background-select {
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.info-section {
  text-align: center;
  max-width: 600px;
}

.description {
  font-size: 1.1em;
  line-height: 1.6;
  margin: 1em 0;
}

.button-container {
  display: flex;
  gap: 10px;
  justify-content: center;
}

.animated-button {
  margin: 0 5px; /* Afstand mellem knapperne */
  padding: 10px 20px;
  font-size: 16px;
  background-color: #e0e0e0;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.animated-button.active {
  background-color: #db0e0e; /* Change to your desired active color */
}

.button1:hover {
  transform: scale(1.05);
}

.button2 {
  position: relative;
  display: inline-block;
  padding: 10px 20px;
  border: none;
  background-color: #e0e0e0;
  cursor: pointer;
  overflow: hidden; /* Added overflow hidden */
  transition: all 0.3s ease;
}

.button2::after {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  clip-path: polygon(10% 0, 70% 0, 90% 100%, 30% 100%);
  background-color: rgba(255, 255, 255, 0.6);
  transition: all 300ms ease;
}

.button2:hover::after {
  left: 100%;
}

.button2:hover {
  transform: scale(1.1);
}

.button3.bounce {
  animation: bounce 1s;
}

.button4 {
  position: relative;
  display: inline-block;
  padding: 10px 20px;
  border: none;
  background-color: #e0e0e0;
  cursor: pointer;
  --angle: 0deg; /* Initial angle */
}

.button4::before {
  content: '';
  position: absolute;
  top: -4px;
  left: -4px;
  right: -4px;
  bottom: -4px;
  border: 4px solid transparent; /* Initially transparent */
  pointer-events: none;
}

.button4:hover {
  transform: scale(1.2);
  animation: rotate-gradient 2s linear infinite;
}

.button4:hover::before {
  border-image: conic-gradient(from var(--angle), red, yellow, lime, aqua, blue, magenta, red) 1;
  animation: rotate 2s linear infinite;
}



@keyframes rotate {
  to {
    --angle: 360deg;
  }
}

@property --angle {
  syntax: '<angle>';
  initial-value: 0deg;
  inherits: false;
}

@keyframes bounce {
  0%, 20%, 80%, 100% {
    transform: translateY(0);
  }
  30% {
    transform: translateY(-20px);
  }
  60% {
    transform: translateY(-25px);
  }
  
  90% {
    transform: translateY(-5px);
  }
}

.nav-button {
  background-color: transparent;
  border: none;
  color: #333333;
  font-size: 2rem;
  cursor: pointer;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
}

.left {
  left: 20px;
}

.right {
  right: 20px;
}
</style>