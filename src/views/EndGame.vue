<template>
  <div class="text-center score-container">
    <!-- Transition for de to beskeder, som gør, at når den ene fader væk og den anden fader ind -->
    <transition name="fade" @after-leave="showFinalMessage">
      <!-- @after-leave bliver aktiveret når elementet heri er færdigt med at forlade skærmen-->
      <div v-if="showInitialMessage" key="initial-message" class="text-content">
        <!--v-if gør her at elementet kun vises hvis showInitialmessage er true. Key hjælper Vue til at holde styr på de enkelte elementer, når de skal vises og skjules-->
        <h1 class="game-title">Spillet er slut!</h1>
        <p class="game-message">Tak fordi du spillede. Skal vi se hvordan du klarede den?</p>
      </div>
    </transition>

    <transition name="fade">
      <div v-if="showFinalMessageContent" key="final-message" class="text-content">
        <p class="final-message">Fantastisk arbejde! Der skal være en fin balance mellem æstetik og bæredygtighed - hvad
          synes du selv om dine valg? <br> Du kan altid gå tilbage og ændre dem</p>
      </div>
    </transition>

    <!-- Vis resultat knappen som forsvinder, når man klikker på den -->
    <v-btn v-if="showButton" @click="showScore" color="primary" class="result-button">
      Vis resultat
    </v-btn>

    <!-- Score visning som cirkulær progress-bar -->
    <v-progress-circular v-if="value" :model-value="value" :size="200" :width="15" class="score-circle">
      <div class="score-text">{{ Math.round(value) }}%</div>
    </v-progress-circular>

    <!-- Placeholder til layout justering, som skal afhjælpe at teksten ikke hopper og cirkelscoren forbliver statisk -->
    <div v-if="!value" class="placeholder"></div>
  </div>
</template>

<script>

export default {
  // Data til at styre visning og animation af scoren
  data() {
    // Data til at styre visning og animation af scoren
    return {
      showButton: true,           // Starter som true, hvilket betyder at knappen 'Vis resultat' vises først
      showInitialMessage: true,    // Viser den oprindelige besked først (Spillet er slut!)
      showFinalMessageContent: false, // Starter som false, da den anden besked øførst vises når animation af første tekst er færdig
      interval: null,              // Interval ID til clearing - mangler uddyb
      value: 0,                    // Scoren start er på 0%
      targetScore: 80,             // Scoren skal slytte på 80%
      increment: 2,                // Hvor meget scoren skal stige med for hver gang i animationen
      intervalTime: 120,           // Tid mellem hvert skridt i animationen (i millisekunder)
    };
  },

  //De funktioner der bruges til at opdatere komponents tilstand, når brugeren interagere med den
  methods: {
    // Start animation og ændring af tekst
    showScore() {
      this.showButton = false;             // Skjuler knappen efter tryk
      this.startAnimation();               // Starter score-animationen ved at kalde funktionen
      setTimeout(() => {                   // Skift til slutbesked efter et delay. Dette delay er sat, da scoren skal tælle fra 0 til 80 før beskeden vises
        this.showInitialMessage = false;   // Starter transition for at fjerne initial-besked
      }, 4000);                            // Skifter besked efter 4 sekunder
    },
    showFinalMessage() {
      this.showFinalMessageContent = true; // Viser den afsluttende besked når showIntitialMessafe er false/forsvundet
    },
    // Animation af scoren
    startAnimation() {
      this.value = 0; // Nulstil scoreværdi
      this.interval = setInterval(() => {
        if (this.value < this.targetScore) {
          this.value += this.increment; // Hvis scoren (value) er mindre end targetScore så øges increment med (2)
        } else {
          clearInterval(this.interval); // Når scoren når targetScore, stopper intervallet 
          this.value = this.targetScore; // Scoren sættes præcist på targetScore
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

.game-message,
.final-message {
  font-size: 1.2rem;
  margin-top: 0.5rem;
  margin-bottom: 1rem;
}

/* Knappen Vis Resultat */
.result-button {
  font-size: 1.2rem;
  padding: 10px 20px;
  font-weight: bold;
  transition: background-color 0.3s ease;
  animation: bounceIn 1.5s ease;
  color: none !important;
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

/* CSS til overgangseffekter af teksterne*/
.fade-enter-active,
.fade-leave-active {
  transition: opacity 1s ease;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}


/* Animationer til knapper og tekster */
@keyframes fadeIn {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
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
  0%,
  20%,
  50%,
  80%,
  100% {
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
