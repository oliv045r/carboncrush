<template>
  <div class="text-center score-container">
    <!-- Transition for the initial and final messages -->
    <transition name="fade" @after-leave="showFinalMessage">
      <div v-if="showInitialMessage" key="initial-message" class="text-content">
        <h1 class="game-title">Spillet er slut!</h1>
        <p class="game-message">Tak fordi du spillede. Skal vi se hvordan du klarede den?</p>
      </div>
    </transition>

    <transition name="fade">
      <div v-if="showFinalMessageContent" key="final-message" class="text-content">
        <p class="final-message">Fantastisk arbejde! Der skal være en fin balance mellem æstetik og bæredygtighed - hvad synes du selv om dine valg? <br> Du kan altid gå tilbage og ændre dem</p>
      </div>
    </transition>

    <!-- Vis resultat knappen, kun synlig indtil man klikker på den -->
    <v-btn v-if="showButton" @click="showScore" color="primary" class="result-button">
      Vis resultat
    </v-btn>

    <!-- Score visning som cirkulær progress-bar -->
    <v-progress-circular
      v-if="value"
      :model-value="value"
      :size="200"
      :width="15"
      color="blue"
      class="score-circle"
    >
      <div class="score-text">{{ Math.round(value) }}%</div>
    </v-progress-circular>

    <!-- Placeholder til layout justering -->
    <div v-if="!value" class="placeholder"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showButton: true,           // Styrer synligheden af knappen
      showInitialMessage: true,    // Viser den oprindelige besked først
      showFinalMessageContent: false, // Flag til at vise den afsluttende besked
      interval: null,              // Interval ID til clearing
      value: 0,                    // Startværdi for score
      targetScore: 80,             // Mål score
      increment: 2,                // Størrelse for stigning
      intervalTime: 120,           // Tid mellem hvert skridt
    };
  },
  methods: {
    // Start animation og ændr tekst
    showScore() {
      this.showButton = false;             // Skjuler knappen
      this.startAnimation();               // Starter score-animationen
      setTimeout(() => {                   // Skift til slutbesked efter et delay
        this.showInitialMessage = false;   // Starter transition for at fjerne initial-besked
      }, 4000);                            // Skifter besked efter 4 sekunder
      this.$emit('score-shown');           // Emitter event til EndGame.vue
    },
    showFinalMessage() {
      this.showFinalMessageContent = true; // Viser den afsluttende besked efter overgang
    },
    // Animation af scoren
    startAnimation() {
      this.value = 0; // Nulstil scoreværdi
      this.interval = setInterval(() => {
        if (this.value < this.targetScore) {
          this.value += this.increment; // Øg score
        } else {
          clearInterval(this.interval); // Stop interval
          this.value = this.targetScore; // Sæt den på målscore
        }
      }, this.intervalTime);
    },
  },
};
</script>

<style scoped>
/* Hovedcontainer til afslutningsskærmen */
.score-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  text-align: center;
}

/* Titel og beskeder */
.game-title {
  font-size: 2.5rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
  animation: fadeInDown 1s ease;
}

.game-message, .final-message {
  font-size: 1.2rem;
  margin-top: 0.5rem;
  margin-bottom: 1rem;
}

/* Knappen Vis Resultat */
.result-button {
  font-size: 1.2rem;
  padding: 10px 20px;
  color: #424242;
  font-weight: bold;
  transition: background-color 0.3s ease;
  animation: bounceIn 1.5s ease;
}


/* Score cirkel og tekst */
.score-circle {
  margin-top: 20px;
  animation: fadeInUp 1.2s ease;
}
.score-text {
  font-size: 2rem;
  font-weight: bold;
}

/* Placeholder til layout */
.placeholder {
  height: 200px;
}

/* CSS til overgangseffekter */
.fade-enter-active, .fade-leave-active {
  transition: opacity 1s ease;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}

/* Animationer */
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes fadeInDown {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes bounceIn {
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-10px);
  }
  60% {
    transform: translateY(-5px);
  }
}
</style>
