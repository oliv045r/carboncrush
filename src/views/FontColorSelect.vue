<template>
  <div class="background-select animate__animated animate__fadeIn">
    <!-- Info boks til skrifttype valg -->
    <v-card class="mx-auto px-10 py-10 rounded-lg elevation-0 bg-transparent" max-width="600">
      <v-card-title class="text-h5 font-weight-bold">Vælg tekstfarve</v-card-title>
    <v-card-text class="text-subtitle-1">
      Tid til at vælge tekstfarven for din hjemmeside! Din farvebeslutning har faktisk betydning for bæredygtigheden: forskellige farver bruger forskellige mængder energi, når de vises på skærmen.
    </v-card-text>
    </v-card>
    <v-icon class="pointer-arrow">mdi-arrow-down</v-icon>

    <!-- Circular color carousel -->
    <div class="chosen-color">
  <p class="text-subtitle-1">Valgt farve: <br> {{ colorName }}</p>
</div>
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
        :style="{ backgroundColor: colorOption.color, transform: `rotate(${index * angleStep}deg) translateY(-150px)` }"
        class="color-swatch"
        @click="rotateToColor(index)"
      ></div>
    </div>
    <v-btn @click="showFeedbackPopup = true; updateShowNextButton(true)" color="primary">Next</v-btn>

    <!-- FeedbackPop as a popup -->
    <v-sheet
      v-if="showFeedbackPopup"
      class="popup-sheet"
      max-width="600"
      transition="dialog-bottom-transition"
      variant="flat"
      color="white"
    >
      <FeedbackPop
        @close="showFeedbackPopup = false"
        :title="feedbackTitle"
        :content="feedbackContent"
        :imageUrl="feedbackImageUrl"
      ></FeedbackPop>
    </v-sheet>
  </div>
</template>

<script>
import { VCard, VBtn, VIcon, VSheet } from 'vuetify/lib/components'; // Import Vuetify components
import { mapActions, mapState } from 'vuex';
import FeedbackPop from '@/components/feedback/FeedbackPop.vue';

export default {
  name: 'FontColorSelect',
  components: {
    VCard, VBtn, VIcon, VSheet, FeedbackPop, // Register Vuetify components
  },
  data() {
    return {
      color: '#000000',
      colorOptions: [
        { name: 'Blå', color: '#3AA3EA' },
        { name: 'Pink', color: '#F142DA' },
        { name: 'Grøn', color: '#95BE87' },
        { name: 'Lilla', color: '#4E2ADF' },
        { name: 'Sort', color: '#000000' },
        { name: 'Hvid', color: '#FFFFFF' },
        { name: 'Rød', color: '#E22828' },
        { name: 'Lysegrøn', color: '#B3D08D' },
        { name: 'Lyserød', color: '#E59C9D' },
        { name: 'Grå', color: '#D9D9D9' },
        { name: 'Gul', color: '#E2EC24' },
        { name: 'Mørk lilla', color: '#732A75' }
      ],
      selectedIndex: 0,
      angleStep: 360 / 12,
      rotationAngle: 0,
      dragging: false,
      startAngle: 0,
      currentAngle: 0,
      showFeedbackPopup: false, // Control the visibility of the popup
      feedbackTitle: 'Godt valg!', // Define the title for FeedbackPop
      feedbackContent: 'Mørkere farver som sort bruger typisk mindre energi på de fleste skærme, hvilket gør dem til et grønnere valg. <br> <br> På mange skærmtyper, især OLED (Organic Light Emitting Diode) skærme, bruger mørkere farver mindre energi, fordi hver pixel selv udsender lys. Når en pixel skal vise sort, er den i princippet slukket eller reduceret til minimal lysstyrke, hvilket reducerer energiforbruget. <br> <br> Lyse farver, som hvid, kræver derimod, at skærmens pixels lyser kraftigere, hvilket øger strømforbruget. Denne forskel er særligt mærkbar ved høje lysstyrkeniveauer og længere skærmtider – for eksempel ved hjemmesider, der vises i længere tid. <br> <br> Ved at vælge en mørkere baggrund kan du altså spare energi og reducere din hjemmesides CO2-aftryk en smule – især på enheder med OLED-skærme, som bliver mere og mere almindelige.', // Define the content for FeedbackPop
      feedbackImageUrl: require('@/images/bg meme.png') // Define the image URL for FeedbackPop
    };
  },
  computed: {
    ...mapState(['fontColorSelectionReached']),
    colorName() {
      return this.colorOptions[this.selectedIndex].name;
    }
  },
  methods: {
    ...mapActions(['updateTextColor']),
    changeTextColor(color) {
      this.updateTextColor(color);
    },
    rotateToColor(index) {
      this.selectedIndex = index;
      this.rotationAngle = -this.selectedIndex * this.angleStep;
      this.color = this.colorOptions[this.selectedIndex].color;
      this.changeTextColor(this.color); // Call changeTextColor
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
      this.$router.push('/font-select');
    },
    goForward() {
      this.$router.push('/font-color-select');
    }
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

.chosen-color{ 
  position: absolute;
  padding-top: 12rem;
}

.nav-button {
  background-color: transparent;
  border: none;
  color: #ffffff;
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
