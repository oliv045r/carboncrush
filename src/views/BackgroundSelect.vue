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

    <!-- Cirkulær farvekarusel -->
    <div
      class="carousel"
      :style="{ transform: `rotate(${rotationAngle}deg)` }"
      @mousedown="startDrag"
      @mouseup="endDrag"
      @mousemove="onDrag"
      @mouseleave="endDrag"
    >
      <!-- Farvevalg i karusellen -->
      <div
        v-for="(colorOption, index) in colorOptions"
        :key="index"
        :style="{ backgroundColor: colorOption.color, transform: `rotate(${index * angleStep}deg) translateY(-150px)` }"
        class="color-swatch"
        :aria-label="`vælg ${colorOption.name} baggrundsfarve`"
        @click="rotateToColor(index)"
      ></div>
    </div>
    <div class="chosen-color">
      <!-- Viser navnet på den valgte farve -->
      <p class="text-subtitle-1">Valgt farve: <br> {{ colorName }}</p>
    </div>
    <!-- Knap til at vise feedback popup -->
    <v-btn @click="showFeedbackPopup = true; updateShowNextButton(true)" color="primary" aria-label="Gå til næste trin">Next</v-btn>
  </div>
  <!-- FeedbackPop som en popup -->
  <FeedbackPop 
    v-if="showFeedbackPopup" 
    @close="showFeedbackPopup = false" 
    :title="feedbackTitle"
    :content="feedbackContent"
    :imageUrl="feedbackImageUrl"
  ></FeedbackPop>
</template>

<script>
import { VCard, VBtn } from 'vuetify/lib/components'; // Importer Vuetify komponenter
import { mapActions, mapState } from 'vuex';
import FeedbackPop from '@/components/feedback/FeedbackPop.vue';

export default {
  name: 'BackgroundSelect',
  components: {
    VCard, VBtn, FeedbackPop, // Registrer Vuetify komponenter
  },
  data() {
    return {
      color: '#ffffff', // Standard baggrundsfarve
      colorOptions: [
        { name: 'Hvid', color: '#FFFFFF' },
        { name: 'Blå', color: '#3AA3EA' },
        { name: 'Pink', color: '#F142DA' },
        { name: 'Grøn', color: '#95BE87' },
        { name: 'Lilla', color: '#4E2ADF' },
        { name: 'Sort', color: '#000000' },
        { name: 'Rød', color: '#E22828' },
        { name: 'Lysegrøn', color: '#B3D08D' },
        { name: 'Lyserød', color: '#E59C9D' },
        { name: 'Grå', color: '#D9D9D9' },
        { name: 'Gul', color: '#E2EC24' },
        { name: 'Mørk lilla', color: '#732A75' }
      ],
      selectedIndex: 0, // Indeks for valgt farve
      angleStep: 360 / 12, // Vinkeltrin for karusellen
      rotationAngle: 0, // Aktuel rotationsvinkel
      dragging: false, // Om brugeren trækker i karusellen
      startAngle: 0, // Startvinkel for træk
      currentAngle: 0, // Aktuel vinkel under træk
      showFeedbackPopup: false, // Kontroller synligheden af popup
      feedbackTitle: 'Godt valg!', // Titel for FeedbackPop
      feedbackContent: 'Mørkere farver som sort bruger typisk mindre energi på de fleste skærme, hvilket gør dem til et grønnere valg. <br> <br> På mange skærmtyper, især OLED (Organic Light Emitting Diode) skærme, bruger mørkere farver mindre energi, fordi hver pixel selv udsender lys. Når en pixel skal vise sort, er den i princippet slukket eller reduceret til minimal lysstyrke, hvilket reducerer energiforbruget. <br> <br> Lyse farver, som hvid, kræver derimod, at skærmens pixels lyser kraftigere, hvilket øger strømforbruget. Denne forskel er særligt mærkbar ved høje lysstyrkeniveauer og længere skærmtider – for eksempel ved hjemmesider, der vises i længere tid. <br> <br> Ved at vælge en mørkere baggrund kan du altså spare energi og reducere din hjemmesides CO2-aftryk en smule – især på enheder med OLED-skærme, som bliver mere og mere almindelige.', // Indhold for FeedbackPop
      feedbackImageUrl: require('@/images/bg meme.png') // Billede-URL for FeedbackPop
    };
  },
  computed: {
    ...mapState(['fontColorSelectionReached']),
    colorName() {
      return this.colorOptions[this.selectedIndex].name; // Navn på valgt farve
    }
  },
  methods: {
    ...mapActions(['updateBackgroundColor', 'updateTextColor', 'updateShowNextButton']),
    changeBackgroundColor(color) {
      this.updateBackgroundColor(color); // Opdater baggrundsfarve i Vuex
    },
    changeTextColor(color) {
      this.updateTextColor(color); // Opdater tekstfarve i Vuex
    },
    rotateToColor(index) {
      this.selectedIndex = index; // Opdater valgt indeks
      this.rotationAngle = -this.selectedIndex * this.angleStep; // Beregn rotationsvinkel
      this.color = this.colorOptions[this.selectedIndex].color; // Opdater valgt farve
      this.changeBackgroundColor(this.color); // Opdater baggrundsfarve

      // Sæt tekstfarve til hvid, hvis sort baggrund er valgt, og fontfarvevalgssiden ikke er nået
      if (this.color === '#000000' && !this.fontColorSelectionReached) {
        this.changeTextColor('#FFFFFF');
      } else if (!this.fontColorSelectionReached) {
        this.changeTextColor('#000000');
      }
    },
    darkenColor(hex, percent = 20) {
      // Mørkner en farve med en given procentdel
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
      this.dragging = true; // Start træk
      this.startAngle = this.getMouseAngle(event); // Startvinkel for træk
      this.currentAngle = this.rotationAngle; // Aktuel vinkel under træk
    },
    onDrag(event) {
      if (!this.dragging) return;
      const angle = this.getMouseAngle(event);
      const deltaAngle = angle - this.startAngle;
      this.rotationAngle = this.currentAngle + deltaAngle; // Opdater rotationsvinkel under træk
    },
    endDrag() {
      this.dragging = false; // Stop træk
    },
    getMouseAngle(event) {
      const rect = event.target.getBoundingClientRect();
      const x = event.clientX - (rect.left + rect.width / 2);
      const y = event.clientY - (rect.top + rect.height / 2);
      return Math.atan2(y, x) * (180 / Math.PI); // Beregn musevinkel
    },
    goBack() {
      this.$router.push('/'); // Naviger tilbage til startskærmen
    },
    goForward() {
      this.$router.push('/font-select'); // Naviger frem til skrifttypevalg
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
  transition: transform 0.5s ease; /* Glidende overgang */
}

.color-swatch {
  position: absolute;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  cursor: pointer;
  transition: transform 0.5s;
  box-shadow: 0px 0px 5px 3px rgba(0,0,0,0.2);
}

.chosen-color{ 
  position: absolute;
  padding-top: 12rem;
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