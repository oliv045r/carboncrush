<template>
  <div class="text-center score-container">
    <!-- Transition for de to beskeder, som gør, at når den ene fader væk og den anden fader ind -->
    <transition name="fade" @after-leave="showFinalMessage">
      <!-- Denne besked vises i starten af spillet -->
      <div v-if="showInitialMessage" key="initial-message" class="text-content">
        <h1 class="game-title">Spillet er slut!</h1>
        <p class="game-message">Tak fordi du spillede. Skal vi se hvordan du klarede den?</p>
      </div>
    </transition>

    <transition name="fade">
      <!-- Denne besked vises, når animationen af score er afsluttet -->
      <div v-if="showFinalMessageContent" key="final-message" class="text-content">
        <p class="final-message">Fantastisk arbejde! Der skal være en fin balance mellem æstetik og bæredygtighed - hvad
          synes du selv om dine valg? <br> Du kan altid gå tilbage og ændre dem</p>
      </div>
    </transition>

    <!--i dette tilfælde styrer v-if synligheden af de forskellige elementer, som skifter dynamisk baseret på spillets status og interaktioner.-->

    <!-- Vis knappen 'Vis resultat', som forsvinder, når den klikkes på -->
    <v-btn v-if="showButton" @click="showScore" class="start-btn">
      Vis resultat
    </v-btn>

    <!-- Circulær progress bar, som viser score -->
    <v-progress-circular v-if="value" :model-value="value" :size="200" :width="15" class="score-circle">
      <div class="score-text">{{ Math.round(value) }}%</div>
    </v-progress-circular>

    <!-- Start forfra knappen, som vises når final-beskeden er synlig -->
    <transition name="fade">
      <v-btn 
        v-if="showRestartButton" 
        @click="restartGame" 
        class="howto-btn"
        :class="{ visible: showRestartButton }" 
      >
      
        Tilbage til start
      </v-btn>
    </transition>
    <!-- Dynamisk klassebinding, som viser knappen med en overgangseffekt --
    
    Placeholder til layout justering, som sørger for at teksten ikke hopper -->
    <div v-if="!value" class="placeholder"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showButton: true,               // Skjul/vis knappen for resultat
      showInitialMessage: true,        // Skjul/vis den oprindelige besked
      showFinalMessageContent: false,  // Skjul/vis den afsluttende besked
      showRestartButton: false,        // Skjul/vis knappen 'Start forfra'
      interval: null,                  // Interval til at styre animation af score
      value: 0,                        // Startværdi for score (0%)
      targetScore: 80,                 // Mål for score (80%)
      increment: 2,                    // Hvor meget score øges med hver gang i animationen
      intervalTime: 120,               // Interval tid mellem opdateringer af score (i millisekunder)
    };
  },

  methods: {
    // Funktion der vises ved klik på 'Vis resultat' knappen og starter animationen
    showScore() {
      this.showButton = false;         // Skjul 'Vis resultat' knappen efter klik
      this.startAnimation();           // Start score-animationen
      setTimeout(() => {
        this.showInitialMessage = false;  // Skift besked efter 4 sekunder
      }, 4000);
    },

    // Denne funktion aktiverer visning af den afsluttende besked
    showFinalMessage() {
      this.showFinalMessageContent = true;
      this.showRestartButton = true;     // Vis knappen 'Start forfra' når final besked vises
    },

    // Score animation der tæller fra 0 til targetScore
    startAnimation() {
      this.value = 0;                   // Nulstil score til 0
      this.interval = setInterval(() => {
        if (this.value < this.targetScore) {
          this.value += this.increment;  // Øg score med increment
        } else {
          clearInterval(this.interval); // Stop animationen når målscore er nået
          this.value = this.targetScore; // Sæt score præcist til targetScore
        }
      }, this.intervalTime);
    },

    // Restart knappen: Naviger tilbage til startskærmen
    restartGame() {
      this.$router.push('/'); // Naviger tilbage til startskærmen
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

/* Styling for knapperne - Start forfra og Vis resultat */
button, .v-btn {
  height: 50px;
  font-size: 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  color: #282c34;
  transition: background-color 0.3s ease;
  width: 200px; /* Ensartet bredde på knapperne */
  margin: 10px auto; /* Centrerer knapperne */
}

/* Hover-effekt for knapper */
button:hover, .v-btn:hover {
  background-color: #21a1f1; /* Mørkere blå farve ved hover */
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

/* Score cirkel og tekst */
.score-circle {
  margin-top: 20px;
  animation: fadeInUp 1.2s ease;
}

.score-text {
  font-size: 2rem;
  font-weight: bold;
}

/* Placeholder til layout justering */
.placeholder {
  height: 250px;
  position: static;
}

.howto-btn {
  position: fixed; /* Fast position nederst på skærmen */
  bottom: 100px; /* Placer knappen 30px fra bunden */
  left: 50%; /* Centrer knappen horisontalt */
  transform: translateX(-50%); /* Juster knappen til at være præcist centreret */
  visibility: hidden; /* Skjul knappen først */
  opacity: 0; /* Skjul knappen først */
  transition: opacity 1s ease, visibility 1s ease; /* Overgangseffekter for synliggørelse */
}

.howto-btn.visible {
  visibility: visible; /* Gør knappen synlig */
  opacity: 1; /* Fade knappen ind */
}

/* CSS til overgangseffekter af knappen */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 1s ease;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
