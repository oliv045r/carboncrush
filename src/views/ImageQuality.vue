<template>
  <div class="background-select animate__animated animate__fadeIn">
    <!-- Info sektion -->
    <v-card class="mx-auto px-10 py-10 rounded-lg elevation-0 bg-transparent" max-width="600">
      <v-card-title class="text-h4 font-weight-bold">Vælg billedkvalitet</v-card-title>
      <v-card-text class="text-subtitle-">
        Vælg billedkvalitet. Kan du finde balance mellem kvalitet og energiforbrug?
      </v-card-text>
    </v-card>
    
    <!-- Info sektion med slider -->
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
          aria-label="Billedkvalitet slider"
        />
        <br />
        <!-- Dynamisk billede -->
        <canvas class="rounded-lg" ref="canvas" :width="canvasWidth" :height="canvasHeight" aria-label="Dynamisk billede"></canvas>
        <p>Hukommelsesforbrug: {{ imageSize }} KB</p>
      </div>
    </div>


    <!-- DummyContent flyvende panel -->
    <DummyContent
      :fontFamily="'Arial, sans-serif'"
      title="Vælg billedkvalitet"
      subtitle="Hvordan påvirker billedkvalitet energiforbruget?"
      date="20. november 2024"
      :imageSrc="feedbackImageUrl"
      imageAlt="Billedkvalitets valg"
      :content="[ 
        'Valget af billedkvalitet kan have stor betydning for din hjemmesides energieffektivitet.',
        'Billeder i høj kvalitet ser bedre ud, men kræver mere båndbredde og længere indlæsningstider.',
        'Lavere kvalitet kan reducere disse påvirkninger, hvilket gør hjemmesiden mere bæredygtig.'
      ]"
      footer="Skrevet af: Design og Bæredygtighed Teamet"
    />


  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import DummyContent from '@/components/dummypage/DummyContent.vue';

export default {
  components: {
    DummyContent,
  },
  data() {
    return {
      quality: 80, // Standard billedkvalitet sat til 80%
      imageSrc: require('@/images/dog_webp.webp'), // Kilde til billedet
      canvasWidth: 500, // Standard billedbredde
      canvasHeight: 333, // Standard billedhøjde
      imageSize: 0, // Vil blive beregnet dynamisk
      showFeedbackPopup: false, // Kontroller synligheden af popup
      feedbackTitle: 'Okay!', // Definer titlen for FeedbackPop
      feedbackContent: 'Når du vælger billedkvalitet, overvej både kvalitet og filstørrelse. Højere kvalitet forbedrer udseendet, men øger filstørrelsen. For hurtigere indlæsning og bedre ydeevne bør billeder ikke overstige 500 KB. Små billeder kan ofte have lavere opløsning uden tab af kvalitet. Dit valg påvirker både ydeevne og bæredygtighed – husk det, når du designer!', // Definer indholdet for FeedbackPop
      feedbackImageUrl: require('@/images/QualityMeme2.png') // Definer billed-URL for FeedbackPop
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
          // Landskab
          scaledWidth = (this.quality / 100) * this.canvasWidth;
          scaledHeight = scaledWidth / aspectRatio;
        } else {
          // Portræt eller kvadrat
          scaledHeight = (this.quality / 100) * this.canvasHeight;
          scaledWidth = scaledHeight * aspectRatio;
        }

        // Tegn billedet i en lavere opløsning
        const offscreenCanvas = document.createElement('canvas');
        offscreenCanvas.width = scaledWidth;
        offscreenCanvas.height = scaledHeight;
        const offscreenCtx = offscreenCanvas.getContext('2d');
        offscreenCtx.drawImage(img, 0, 0, scaledWidth, scaledHeight);

        // Skaler billedet op til canvas størrelse
        ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
        ctx.imageSmoothingEnabled = false;
        ctx.drawImage(offscreenCanvas, 0, 0, scaledWidth, scaledHeight, 0, 0, this.canvasWidth, this.canvasHeight);

        this.calculateImageSize();
      };
    },
    calculateImageSize() {
      // Beregning af billedstørrelse i KB baseret på kvalitet
      const baseSize = 500; // Antag at billedet ved 100% kvalitet er 500 KB
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
