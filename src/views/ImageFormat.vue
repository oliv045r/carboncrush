<template>
  <div class="background-select animate__animated animate__fadeIn">
    <!-- Info sektion -->
    <v-card class="mx-auto px-10 py-10 rounded-lg elevation-0 bg-transparent" max-width="600">
      <v-card-title class="text-h4 font-weight-bold">Vælg dit billedformat</v-card-title>
      <v-card-text class="text-subtitle-">
        Skal vi finde det bedste format til dine billeder? Valget kan have betydning for din sides ydeevne og energiforbrug.
      </v-card-text>
    </v-card>

    <!-- Knapper til valg af billedformat -->
    <div class="format-options">
      <v-btn
        v-for="format in formats"
        :key="format.type"
        @click="selectFormat(format)"
        :color="selectedFormat.type === format.type ? 'primary' : 'default'"
        class="format-button"
        depressed
        :aria-label="`Vælg ${format.label} format`"
      >
        {{ format.label }}
      </v-btn>
    </div>

    <!-- Eksempelbillede -->
    <div class="image-preview">
      <img
        :src="selectedImage"
        :alt="`Billede i ${selectedFormat.label}-format`"
        :aria-label="`Eksempelbillede i ${selectedFormat.label} format`"
        :class="{ fade: isFading }"
        @load="handleImageLoad"
      />
    </div>

    <!-- Gem og fortsæt knap -->
    <v-btn @click="saveImageFormatSelection" color="primary" aria-label="Gem billedformat og fortsæt">Gem og fortsæt</v-btn>

    <!-- FeedbackPop -->
    <FeedbackPop
      v-if="showFeedbackPopup"
      @close="showFeedbackPopup = false"
      :title="feedbackTitle"
      :content="feedbackContent"
      :imageUrl="feedbackImageUrl"
    ></FeedbackPop>
  </div>
</template>

<script>
import FeedbackPop from "@/components/feedback/FeedbackPop.vue";
import axios from "axios";

export default {
  name: "ImageFormatSelect",
  components: {
    FeedbackPop,
  },
  data() {
    return {
      formats: [
        { type: "jpeg", label: "JPEG", src: require("@/images/dog_jpg.jpg"), id: 34 },
        { type: "png", label: "PNG", src: require("@/images/dog_png.png"), id: 35 },
        { type: "webp", label: "WEBP", src: require("@/images/dog_webp.webp"), id: 36 },
        { type: "avif", label: "AVIF", src: require("@/images/dog_jpg.jpg"), id: 37 },
      ],
      selectedFormat: { type: "jpeg", label: "JPEG", src: require("@/images/dog_jpg.jpg"), id: 34 },
      isFading: false,
      showFeedbackPopup: false,
      feedbackTitle: "Den her er svær...",
      feedbackContent:
        "JPEG er godt til fotografier med en balance mellem størrelse og kvalitet, mens PNG er bedre til billeder med gennemsigtighed. WEBP og AVIF giver bedre kompression og reducerer filstørrelser, hvilket sparer båndbredde og energi.",
      feedbackImageUrl: require("@/images/king-of-the-hill-jpeg.gif"),
    };
  },
  computed: {
    selectedImage() {
      return this.selectedFormat.src;
    },
  },
  methods: {
    selectFormat(format) {
      this.isFading = true;
      setTimeout(() => {
        this.selectedFormat = format;
        this.isFading = false;
      }, 300);
    },
    handleImageLoad() {
      this.isFading = false;
    },
    async saveImageFormatSelection() {
      try {
        const userId = localStorage.getItem("user_id");
        if (!userId) {
          alert("Bruger ikke fundet! Opret en bruger først.");
          return;
        }

        const questionId = 4; // ID for spørgsmålet "Vælg billedformat"
        const optionId = this.selectedFormat.id;

        const response = await axios.post("http://localhost:3000/userAnswer", {
          user_id: userId,
          question_id: questionId,
          option_id: optionId,
        });

        console.log("Billedformat gemt:", response.data);
        alert("Dit valg er blevet gemt!");
        this.$router.push("/image-quality"); // Naviger til næste trin
      } catch (error) {
        console.error("Fejl ved gemning af billedformat:", error.message);
        alert("Der opstod en fejl. Prøv igen senere.");
      }
    },
  },
};
</script>

<style scoped>
.background-select {
  margin-top: 10px;
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

.format-options {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  width: 100%;
  max-width: 600px;
}

.format-button {
  flex: 1;
  margin: 0 5px;
}

.image-preview {
  margin-top: 20px;
  max-width: 550px;
  text-align: center;
}

.image-preview img {
  width: 100%;
  height: auto;
  max-height: 400px;
  object-fit: cover;
  border-radius: 8px;
  transition: opacity 0.3s ease;
}

.image-preview img.fade {
  opacity: 0;
}

.image-preview img:not(.fade) {
  opacity: 1;
}

.navigation {
  display: flex;
  justify-content: space-between;
  width: 100%;
  max-width: 600px;
  margin-top: 20px;
}
</style>
