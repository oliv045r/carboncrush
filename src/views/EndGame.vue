<template>
  <div class="text-center score-container">
    <transition name="fade" @after-leave="() => (showFinalMessageContent = true)">
      <div v-if="showInitialMessage" key="initial-message" class="text-content">
        <h1 class="game-title">Spillet er slut!</h1>
        <p class="game-message">Tak fordi du spillede. Skal vi se hvordan du klarede den?</p>
      </div>
    </transition>

    <transition name="fade">
      <div v-if="showFinalMessageContent" key="final-message" class="text-content">
        <p class="final-message">
          Fantastisk arbejde! Der skal være en fin balance mellem æstetik og bæredygtighed -
          hvad synes du selv om dine valg? <br />
          Du kan altid gå tilbage og ændre dem
        </p>
      </div>
    </transition>

    <v-btn v-if="showButton" @click="fetchAndShowScore" class="start-btn">
      Vis resultat
    </v-btn>

    <v-progress-circular v-if="value" :model-value="value" :size="200" :width="15" class="score-circle">
      <div class="score-text">{{ Math.round(value) }}%</div>
    </v-progress-circular>

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

    <div v-if="!value" class="placeholder"></div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      showButton: true,
      showInitialMessage: true,
      showFinalMessageContent: false,
      showRestartButton: false,
      interval: null,
      value: 0,
      targetScore: 0,
      increment: 2,
      intervalTime: 120,
    };
  },
  methods: {
    async fetchAndShowScore() {
  try {
    this.showButton = false;

    const userId = localStorage.getItem("user_id");
    if (!userId) {
      alert("Bruger ikke fundet!");
      return;
    }

    const response = await axios.get(
      `http://localhost:3000/api/sustainability/calculate-sustainability/${userId}`
    );
    this.targetScore = Math.round(response.data.sustainabilityPercentage);

    this.startAnimation();
    setTimeout(() => {
      this.showInitialMessage = false;
    }, 4000);
  } catch (error) {
    console.error("Fejl ved hentning af score:", error.response || error.message);
    alert("Kunne ikke hente bæredygtighedsprocent. Prøv igen senere.");
  }
},
    startAnimation() {
      this.value = 0;
      this.interval = setInterval(() => {
        if (this.value < this.targetScore) {
          this.value += this.increment;
        } else {
          clearInterval(this.interval);
          this.value = this.targetScore;
        }
      }, this.intervalTime);
    },
    restartGame() {
      this.$router.push("/");
    },
  },
};
</script>


<style scoped>
/* Styling som i tidligere version */
.score-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  text-align: center;
}

button,
.v-btn {
  height: 50px;
  font-size: 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  color: #282c34;
  transition: background-color 0.3s ease;
  width: 200px;
  margin: 10px auto;
}

button:hover,
.v-btn:hover {
  background-color: #21a1f1;
}

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

.score-circle {
  margin-top: 20px;
  animation: fadeInUp 1.2s ease;
}

.score-text {
  font-size: 2rem;
  font-weight: bold;
}

.placeholder {
  height: 250px;
  position: static;
}

.howto-btn {
  position: fixed;
  bottom: 100px;
  left: 50%;
  transform: translateX(-50%);
  visibility: hidden;
  opacity: 0;
  transition: opacity 1s ease, visibility 1s ease;
}

.howto-btn.visible {
  visibility: visible;
  opacity: 1;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 1s ease;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
