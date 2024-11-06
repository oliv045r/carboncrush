<template>
  <div class="background-select animate__animated animate__fadeIn">
    <!-- Info boks til baggrundsfarve valg -->

    <v-card class="mx-auto px-10 py-10 rounded-lg elevation-0 bg-transparent" max-width="600">
      <v-card-title class="text-h5 font-weight-bold">Vælg baggrundsfarve</v-card-title>
    <v-card-text class="text-subtitle-1">
      Tid til at vælge baggrundsfarven for din hjemmeside! Din farvebeslutning har faktisk betydning for bæredygtigheden: forskellige farver bruger forskellige mængder energi, når de vises på skærmen.
    </v-card-text>
    </v-card>
    <v-icon class="pointer-arrow">mdi-arrow-down</v-icon>

    <!-- Circular color carousel -->
    <div
      class="carousel"
      :style="{ transform: `rotate(${rotationAngle}deg)` }"
      @mousedown="startDrag"
      @mouseup="endDrag"
      @mousemove="onDrag"
      @mouseleave="endDrag"
    >
      <div
        v-for="(colorOption, index) in colorOptions"
        :key="index"
        :style="{ backgroundColor: colorOption, transform: `rotate(${index * angleStep}deg) translateY(-150px)` }"
        class="color-swatch"
        @click="rotateToColor(index)"
      ></div>
    </div>
    <p class="mt-n7 text-subtitle-1">Valgt farve: {{ color }}</p>
    <v-btn @click="showFeedbackPopup = true; updateShowNextButton(true)" color="primary">Next</v-btn>
  </div>
    <!-- FeedbackPop as a popup -->

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
import { VCard, VBtn } from 'vuetify/lib/components'; // Import Vuetify button component
import { mapActions, mapState } from 'vuex';
import FeedbackPop from '@/components/feedback/FeedbackPop.vue';

export default {
  name: 'BackgroundSelect',
  components: {
    VCard, VBtn, FeedbackPop, // Register Vuetify button component
  },
  data() {
    return {
      color: '#ffffff',
      colorOptions: [
        '#3AA3EA', '#F142DA', '#95BE87', '#4E2ADF', '#000000', '#FFFFFF',
        '#E22828', '#B3D08D', '#E59C9D', '#D9D9D9', '#E2EC24', '#732A75'
      ],
      selectedIndex: 0,
      angleStep: 360 / 12,
      rotationAngle: 0,
      dragging: false,
      startAngle: 0,
      currentAngle: 0,
      showFeedbackPopup: false, // Control the visibility of the popup
      feedbackTitle: 'Godt valg!', // Define the title for FeedbackPop
      feedbackContent: 'Mørkere farver som sort bruger typisk mindre energi på de fleste skærme, hvilket gør dem til et grønnere valg. <br <br> På mange skærmtyper, især OLED (Organic Light Emitting Diode) skærme, bruger mørkere farver mindre energi, fordi hver pixel selv udsender lys. Når en pixel skal vise sort, er den i princippet slukket eller reduceret til minimal lysstyrke, hvilket reducerer energiforbruget. <br> <br> Lyse farver, som hvid, kræver derimod, at skærmens pixels lyser kraftigere, hvilket øger strømforbruget. Denne forskel er særligt mærkbar ved høje lysstyrkeniveauer og længere skærmtider – for eksempel ved hjemmesider, der vises i længere tid. <br> <br> Ved at vælge en mørkere baggrund kan du altså spare energi og reducere din hjemmesides CO2-aftryk en smule – især på enheder med OLED-skærme, som bliver mere og mere almindelige.', // Define the content for FeedbackPop
      feedbackImageUrl: require('@/images/bg meme.png') // Define the image URL for FeedbackPop
    };
  },
  computed: {
    ...mapState(['fontColorSelectionReached']),
  },
  methods: {
    ...mapActions(['updateBackgroundColor', 'updateTextColor', 'updateShowNextButton']),
    changeBackgroundColor(color) {
      this.updateBackgroundColor(color);
    },
    changeTextColor(color) {
      this.updateTextColor(color);
    },
    rotateToColor(index) {
      this.selectedIndex = index;
      this.rotationAngle = -this.selectedIndex * this.angleStep;
      this.color = this.colorOptions[this.selectedIndex];
      this.changeBackgroundColor(this.color); // Call changeBackgroundColor

      // Set text color to white if black background is chosen and font color selection page is not reached
      if (this.color === '#000000' && !this.fontColorSelectionReached) {
        this.changeTextColor('#FFFFFF');
      } else if (!this.fontColorSelectionReached) {
        this.changeTextColor('#000000');
      }
    },
    darkenColor(hex, percent = 20) {
      hex = hex.replace('#', '');
      let r = parseInt(hex.substring(0, 2), 16);
      let g = parseInt(hex.substring(2, 4), 16);
      let b = parseInt(hex.substring(4, 6), 16);
      r = Math.max(0, r - Math.round((percent / 100) * 255));
      g = Math.max(0, g - Math.round((percent / 100) * 255));
      b = Math.max(0, b - Math.round((percent / 100) * 255));
      return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
    },
    startDrag(event) {
      this.dragging = true;
      this.startAngle = this.getMouseAngle(event);
      this.currentAngle = this.rotationAngle;
    },
    onDrag(event) {
      if (!this.dragging) return;
      const angle = this.getMouseAngle(event);
      const deltaAngle = angle - this.startAngle;
      this.rotationAngle = this.currentAngle + deltaAngle;
    },
    endDrag() {
      this.dragging = false;
    },
    getMouseAngle(event) {
      const rect = event.target.getBoundingClientRect();
      const x = event.clientX - (rect.left + rect.width / 2);
      const y = event.clientY - (rect.top + rect.height / 2);
      return Math.atan2(y, x) * (180 / Math.PI);
    },
    goBack() {
      this.$router.push('/');
    },
    goForward() {
      this.$router.push('/font-select');
    }
  }
};
</script>

<style scoped>
/* Feedback pop up */
.popup-sheet {
  left: calc(50vw - 400px);
  height: 800px;
  top: calc(50vh - 400px);
}




.background-select {
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.carousel {
  position: relative;
  width: 300px;
  height: 450px;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: transform 0.5s ease; /* Smooth transition */
}

.color-swatch {
  position: absolute;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: 2px solid white;
  cursor: pointer;
  transition: transform 0.5s;
}

.nav-button {
  background-color: transparent;
  border: none;
  font-size: 2rem;
  cursor: pointer;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
}

.pointer-arrow {
  margin-bottom: -40px;
}

.left {
  left: 20px;
}

.right {
  right: 20px;
}
</style>