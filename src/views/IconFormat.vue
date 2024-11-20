<template>
  <div>
    <v-container class="background-select">
      <!-- Info sektion -->
      <div class="info-section text-center">
        <h1>Vælg ikonformat</h1>
        <p class="description">
          Vælg det ikonformat, der bedst passer til dine behov for bæredygtighed og læsbarhed. Hvert format har unikke
          egenskaber, der kan påvirke indlæsningstid, billedkvalitet og energiforbrug.
        </p>
      </div>

      <!-- Formatknapper på en række -->
      <v-row justify="center" class="format-options">
        <!-- Knapperne er dynamisk genereret fra formats-arrayet -->
        <div
          v-for="format in formats"
          :key="format.type"
          class="format-button"
          @click="selectFormat(format)"
          :class="{ active: selectedFormat.type === format.type }"
          :aria-label="`Vælg ${format.label} format`"
        >
          <img :src="format.icon" :alt="`${format.label} Icon`" class="format-icon" />
          <p class="format-label">{{ format.label }}</p>
        </div>
      </v-row>
    </v-container>

    <v-btn @click="saveIconFormatSelection" color="primary" aria-label="Gem og fortsæt">Gem og fortsæt</v-btn>

    <!-- Conditional Feedback Components baseret på det valgte format -->
    <FeedbackPopIcon
      class="feedback-pop-icon"
      v-if="showFeedbackPopup && isSvgOrPng"
      @close="showFeedbackPopup = false"
    />
    <FeedbackPopIconBad
      class="feedback-pop-icon"
      v-if="showFeedbackPopup && isJpg"
      @close="showFeedbackPopup = false"
    />
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import axios from "axios";
import FeedbackPopIcon from "@/components/feedback/FeedbackPopIcon.vue";
import FeedbackPopIconBad from "@/components/feedback/FeedbackPopIconBad.vue";

export default {
  name: "IconFormat",
  components: {
    FeedbackPopIcon,
    FeedbackPopIconBad,
  },
  data() {
    return {
      formats: [
        { type: "jpg", label: "JPG", icon: require("@/images/icon.jpg") },
        { type: "png", label: "PNG", icon: require("@/images/icon.png") },
        { type: "svg", label: "SVG", icon: require("@/images/icon.svg") },
      ],
      selectedFormat: { type: "jpg", label: "JPG" },
      showFeedbackPopup: false,
    };
  },
  computed: {
    ...mapState(["showNextButton"]),
    isSvgOrPng() {
      return this.selectedFormat.type === "svg" || this.selectedFormat.type === "png";
    },
    isJpg() {
      return this.selectedFormat.type === "jpg";
    },
  },
  methods: {
    ...mapActions(["updateShowNextButton"]),

    selectFormat(format) {
      this.selectedFormat = format;
    },

    async saveIconFormatSelection() {
      try {
        const userId = localStorage.getItem("user_id");
        if (!userId) {
          alert("Bruger ikke fundet! Opret en bruger først.");
          return;
        }

        const questionId = 7; // ID for spørgsmålet "Vælg ikonformat"
        const optionId = this.getOptionId(this.selectedFormat.type);

        const response = await axios.post("http://localhost:3000/userAnswer", {
          user_id: userId,
          question_id: questionId,
          option_id: optionId,
        });

        console.log("Ikonformat gemt:", response.data);
        alert("Dit valg er blevet gemt!");
        this.$router.push("/end-game"); // Naviger til næste trin
      } catch (error) {
        console.error("Fejl ved gemning af ikonformat:", error.message);
        alert("Der opstod en fejl. Prøv igen senere.");
      }
    },

    getOptionId(formatType) {
      const mapping = {
        jpg: 48, // Option ID for JPG
        png: 49, // Option ID for PNG
        svg: 50, // Option ID for SVG
      };
      return mapping[formatType];
    },
  },
};
</script>

<style scoped>
.feedback-pop-icon {
  position: absolute;
  top: 0;
  width: 80vw;
  left: 10vw;
}

.background-select {
  margin-top: 10px;
  height: 100vh;
  width: 100vw !important;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #333333;
}

.info-section {
  text-align: center;
  max-width: 600px;
  margin-top: 100px;
}

.description {
  line-height: 1.6;
  margin: 1em 0;
}

.format-options {
  margin-top: 20px;
  margin-bottom: 30px;
  display: flex;
  gap: 30px;
  width: 100%;
  max-width: 800px;
  justify-content: center;
}

.format-button {
  flex: 1;
  padding: 20px;
  cursor: pointer;
  border: 2px solid #ddd;
  border-radius: 8px;
  text-align: center;
  transition: background-color 0.2s ease, transform 0.2s ease;
  max-width: 220px;
  min-width: 150px;
}

/* Hover effekt for at give en visuel indikation af klikbare elementer */
.format-button:hover {
  background-color: #e3f2fd;
  transform: scale(1.05);
}

/* Active klasse for at fremhæve det valgte format */
.format-button.active {
  background-color: #6fa3ef;
  color: white;
}

.format-icon {
  width: 80px;
  height: 80px;
  margin-bottom: 10px;
}

.format-label {
  font-weight: bold;
  font-size: 1.2em;
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

.background-select {
  height: auto;
  width: 100vw;
}

.left {
  left: 20px;
}

.right {
  right: 20px;
}
</style>
