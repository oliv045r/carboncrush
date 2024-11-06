<template>
  <div class="background-select animate__animated animate__fadeIn">
    <!-- Info sektion -->
    <v-card class="mx-auto px-10 py-10 rounded-lg elevation-0 bg-transparent" max-width="600">
      <v-card-title class="text-h5 font-weight-bold">Vælg Billedkvalitet</v-card-title>
    <v-card-text class="text-subtitle-1">
      Nu skal der vælges billedkvalitet. Dette valg er afgørende for både billedets udseende, ydeevne og dets indflydelse på bæredygtigheden af dit design. Højere billedkvalitet giver skarpere billeder, men kræver mere databehandling og længere indlæsningstid, hvilket kan øge energiforbruget. Lavere billedkvalitet reducerer belastningen på systemet og kan forbedre brugeroplevelsen på langsommere forbindelser, samtidig med at det mindsker miljøpåvirkningen.
    </v-card-text>
    </v-card>
    <div class="info-section">
      <!-- Billedkvalitet slider -->
      <div>
        <label for="qualitySlider">Billedkvalitet: {{ quality }}%</label>
        <input 
          id="qualitySlider"
          type="range"
          min="10"
          max="100"
          v-model="quality"
          @input="updateImage"
        />
        <br />
        <!-- Dynamisk billede -->
        <canvas ref="canvas" :width="canvasWidth" :height="canvasHeight"></canvas>
        <p>Hukommelsesforbrug: {{ imageSize }} KB</p>
      </div>
    </div>
    <v-btn @click="showFeedbackPopup = true; updateShowNextButton(true)" color="primary">Next</v-btn>

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
      quality: 80, // 80% billedkvalitet
      imageSrc: require('@/images/dog_webp.webp'),
      canvasWidth: 500, // Standard billedbredde
      canvasHeight: 333, // Standard billedhøjde
      imageSize: 0, // Vil blive beregnet dynamisk
      showFeedbackPopup: false, // Control the visibility of the popup
      feedbackTitle: 'Okay!', // Define the title for FeedbackPop
      feedbackContent: 'Når du vælger billedkvalitet til din hjemmeside, er det vigtigt at overveje både kvalitet og filstørrelse. Højere billedkvalitet kan forbedre det visuelle indtryk, men det kan også øge filstørrelsen. <br> <br> At finde den rette balance er afgørende, da større billeder kan forlænge indlæsningstiderne og øge energiforbruget. Ved at vælge en passende billedkvalitet kan du sikre hurtigere indlæsning, hvilket forbedrer brugeroplevelsen og samtidig sparer båndbredde. <br> <br>Husk, at dit valg af billedkvalitet kan have indflydelse på både ydeevne og bæredygtighed. Tænk over det, når du designer din hjemmeside!', // Define the content for FeedbackPop
      feedbackImageUrl: require('@/images/king-of-the-hill-jpeg.gif') // Define the image URL for FeedbackPop
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
    updateImage() {
      const canvas = this.$refs.canvas;
      const ctx = canvas.getContext('2d');
      const img = new Image();
      img.src = this.imageSrc;

      img.onload = () => {
        const aspectRatio = img.width / img.height;
        let scaledWidth, scaledHeight;

        if (aspectRatio > 1) {
          // Landscape
          scaledWidth = (this.quality / 100) * this.canvasWidth;
          scaledHeight = scaledWidth / aspectRatio;
        } else {
          // Portrait or square
          scaledHeight = (this.quality / 100) * this.canvasHeight;
          scaledWidth = scaledHeight * aspectRatio;
        }

        // Draw the image at a lower resolution
        const offscreenCanvas = document.createElement('canvas');
        offscreenCanvas.width = scaledWidth;
        offscreenCanvas.height = scaledHeight;
        const offscreenCtx = offscreenCanvas.getContext('2d');
        offscreenCtx.drawImage(img, 0, 0, scaledWidth, scaledHeight);

        // Scale the image back up to the canvas size
        ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
        ctx.imageSmoothingEnabled = false;
        ctx.drawImage(offscreenCanvas, 0, 0, scaledWidth, scaledHeight, 0, 0, this.canvasWidth, this.canvasHeight);

        this.calculateImageSize();
      };
    },
    calculateImageSize() {
      // Her laver vi en simpel beregning af billedstørrelsen i KB baseret på kvaliteten
      const baseSize = 500; // Antag at billedet på 100% kvalitet er 500 KB
      this.imageSize = Math.round((this.quality / 100) * baseSize);
    }
  },
  mounted() {
    // Beregn initial billedstørrelse når komponentet monteres
    this.calculateImageSize();
    this.updateImage();
  }
};
</script>

<style scoped>

.background-select {
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;}

.info-section {
  text-align: center;
  max-width: 600px;
}

.description {
  font-size: 1.1em;
  line-height: 1.6;
  margin: 1em 0;
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