<template>
  <div class="background-select animate__animated animate__fadeIn">
    <!-- Info sektion -->
    <v-card class="mx-auto px-10 py-10 rounded-lg elevation-0 bg-transparent" max-width="600">
      <v-card-title class="text-h4 font-weight-bold">Vælg billedkvalitet</v-card-title>
      <v-card-text class="text-subtitle-">
        Vælg billedkvalitet. Høj kvalitet giver skarpere billeder, men øger indlæsningstid og energiforbrug. Lav
        kvalitet reducerer belastningen, forbedrer ydeevnen og mindsker miljøpåvirkningen.
      </v-card-text>
    </v-card>
    <div class="info-section">
      <!-- Billedkvalitet slider med faste værdier -->
      <div>
        <label for="qualitySlider">Billedkvalitet: {{ qualityLabel }}</label>
        <input
          id="qualitySlider"
          type="range"
          :min="1"
          :max="100"
          :step="19"
          v-model="quality"
          @input="constrainSliderValue"
          aria-label="Billedkvalitet slider"
        />
        <datalist id="tickmarks">
          <option v-for="value in fixedValues" :key="value" :value="value">{{ value }}%</option>
        </datalist>
        <br />
        <!-- Dynamisk billede -->
        <canvas
          class="rounded-lg"
          ref="canvas"
          :width="canvasWidth"
          :height="canvasHeight"
          aria-label="Dynamisk billede"
        ></canvas>
        <p>Hukommelsesforbrug: {{ imageSize }} KB</p>
      </div>
    </div>
    <!-- Gem og fortsæt knap -->
    <v-btn @click="saveImageQualitySelection" color="primary" aria-label="Gem billedkvalitet og fortsæt">
      Gem og fortsæt
    </v-btn>
  </div>
  <!-- FeedbackPop som en popup -->
  <FeedbackPop
    v-if="showFeedbackPopup"
    @close="showFeedbackPopup = false"
    :title="feedbackTitle"
    :content="feedbackContent"
    :imageUrl="feedbackImageUrl"
    aria-label="Feedback popup"
  ></FeedbackPop>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import FeedbackPop from '@/components/feedback/FeedbackPop.vue';
import axios from 'axios';

export default {
  components: {
    FeedbackPop,
  },
  data() {
    return {
      fixedValues: [1, 20, 40, 60, 80, 100], // Tilladte værdier for slideren
      quality: 80, // Standard billedkvalitet
      imageSrc: require('@/images/dog_webp.webp'), // Kilde til billedet
      canvasWidth: 500, // Standard billedbredde
      canvasHeight: 333, // Standard billedhøjde
      imageSize: 0, // Dynamisk beregnet billedstørrelse
      showFeedbackPopup: false, // Feedback-popup synlighed
      feedbackTitle: 'Okay!', // Titel til FeedbackPop
      feedbackContent:
        'Når du vælger billedkvalitet, overvej både kvalitet og filstørrelse. Højere kvalitet forbedrer udseendet, men øger filstørrelsen. For hurtigere indlæsning og bedre ydeevne bør billeder ikke overstige 500 KB. Små billeder kan ofte have lavere opløsning uden tab af kvalitet. Dit valg påvirker både ydeevne og bæredygtighed – husk det, når du designer!', // Indhold til FeedbackPop
      feedbackImageUrl: require('@/images/QualityMeme2.png'), // FeedbackPop billede
    };
  },
  computed: {
    ...mapState(['showNextButton']),
    qualityLabel() {
      return `${this.quality}%`; // Dynamisk visning af kvalitet
    },
  },
  methods: {
    ...mapActions(['updateShowNextButton']),

    constrainSliderValue() {
      const closestValue = this.fixedValues.reduce((prev, curr) =>
        Math.abs(curr - this.quality) < Math.abs(prev - this.quality) ? curr : prev
      );
      this.quality = closestValue; // Sæt sliderens værdi til det nærmeste tilladte trin
    },

    async saveImageQualitySelection() {
      try {
        const userId = localStorage.getItem('user_id');
        const questionId = 5; // ID for spørgsmålet
        const optionId = this.getOptionId(this.quality);

        if (!userId || !optionId) {
          alert('Manglende brugerdata eller option ID.');
          return;
        }

        // Send data til backend
        const response = await axios.post('http://localhost:3000/userAnswer', {
          user_id: userId,
          question_id: questionId,
          option_id: optionId,
        });

        console.log('Response:', response.data);
        alert('Dit valg er gemt!');
        this.$router.push('/animation-select');
      } catch (error) {
        console.error('Fejl ved gemning af billedkvalitet:', error.response || error.message);
        alert('Kunne ikke gemme billedkvalitet. Prøv igen senere.');
      }
    },

    getOptionId(quality) {
      const mapping = {
        1: 38,
        20: 39,
        40: 40,
        60: 41,
        80: 42,
        100: 43,
      };
      return mapping[quality] || null; // Returnér null, hvis kvalitet ikke findes
    },

    updateImage() {
      const canvas = this.$refs.canvas;
      const ctx = canvas.getContext('2d');
      const img = new Image();
      img.src = this.imageSrc;

      img.onload = () => {
        const aspectRatio = img.width / img.height;
        let scaledWidth, scaledHeight;

        if (aspectRatio > 1) {
          scaledWidth = (this.quality / 100) * this.canvasWidth;
          scaledHeight = scaledWidth / aspectRatio;
        } else {
          scaledHeight = (this.quality / 100) * this.canvasHeight;
          scaledWidth = scaledHeight * aspectRatio;
        }

        const offscreenCanvas = document.createElement('canvas');
        offscreenCanvas.width = scaledWidth || 1;
        offscreenCanvas.height = scaledHeight || 1;
        const offscreenCtx = offscreenCanvas.getContext('2d');
        offscreenCtx.drawImage(img, 0, 0, scaledWidth, scaledHeight);

        ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
        ctx.imageSmoothingEnabled = false;
        ctx.drawImage(
          offscreenCanvas,
          0,
          0,
          scaledWidth,
          scaledHeight,
          0,
          0,
          this.canvasWidth,
          this.canvasHeight
        );

        this.calculateImageSize();
      };
    },

    calculateImageSize() {
      const baseSize = 500; // Antag at billedet ved 100% kvalitet er 500 KB
      this.imageSize = Math.round((this.quality / 100) * baseSize);
    },
  },
  mounted() {
    this.calculateImageSize();
    this.updateImage();
  },
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

canvas {
  border: 1px solid #ccc;
  border-radius: 8px;
  margin-top: 20px;
}

.description {
  font-size: 1.1em;
  line-height: 1.6;
  margin: 1em 0;
}
</style>
