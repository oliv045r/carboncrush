<template>
  <div class="background-select animate__animated animate__fadeIn">
    <!-- Info boks til skrifttype valg -->
    <v-card class="mx-auto px-10 py-10 rounded-lg elevation-0 bg-transparent" max-width="600">
      <v-card-title class="text-h4 font-weight-bold">Vælg tekstfarve</v-card-title>
      <v-card-text class="text-subtitle-">
        Tid til at vælge tekstfarven for din hjemmeside! Din farvebeslutning har faktisk betydning for bæredygtigheden: forskellige farver bruger forskellige mængder energi, når de vises på skærmen.
      </v-card-text>
    </v-card>
    <v-icon class="pointer-arrow">mdi-arrow-down</v-icon>

    <!-- Viser navnet på den valgte farve -->
    <div class="chosen-color">
      <p class="text-subtitle-1">Valgt farve: <br> {{ colorName }}</p>
    </div>

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
        :aria-label="`vælg ${colorOption.name} tekstfarve`"
        @click="rotateToColor(index)"
      ></div>
    </div>
    <v-btn @click="showFeedbackPopup = true; updateShowNextButton(true)" color="primary" aria-label="Gå til næste trin">Næste</v-btn>

  <!-- FeedbackPop som en popup -->
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
import { VCard, VBtn, VIcon } from 'vuetify/lib/components'; // Importer Vuetify komponenter
import { mapActions, mapState } from 'vuex';
import FeedbackPop from '@/components/feedback/FeedbackPop.vue';

export default {
  name: 'FontColorSelect',
  components: {
    VCard, VBtn, VIcon, FeedbackPop, // Registrer Vuetify komponenter
  },
  data() {
    return {
      color: '#000000', // Standard tekstfarve
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
      selectedIndex: 0, // Indeks for valgt farve
      angleStep: 360 / 12, // Vinkeltrin for karusellen
      rotationAngle: 0, // Aktuel rotationsvinkel
      dragging: false, // Om brugeren trækker i karusellen
      startAngle: 0, // Startvinkel for træk
      currentAngle: 0, // Aktuel vinkel under træk
      showFeedbackPopup: false, // Kontroller synligheden af popup
      feedbackTitle: 'Godt valg!', // Titel for FeedbackPop
      feedbackContent: 'Mørke farver som sort bruger mindre energi på de fleste skærme, især OLED, hvor hver pixel selv udsender lys. Når en pixel viser sort, er den næsten slukket, hvilket reducerer energiforbruget. Lyse farver som hvid kræver derimod, at pixels lyser kraftigere og dermed bruger mere strøm. <br> <br> Denne forskel er især tydelig ved høj lysstyrke og længere skærmtider, f.eks. når en hjemmeside er åben længe. Ved at vælge en mørkere baggrund kan du derfor spare energi og reducere CO2-udslippet, især på OLED-enheder, der bliver mere udbredte. Mørkt design kan dermed også forlænge batterilevetiden på mobile enheder.', // Indhold for FeedbackPop
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
    ...mapActions(['updateTextColor', 'updateShowNextButton']),
    changeTextColor(color) {
      this.updateTextColor(color); // Opdater tekstfarve i Vuex
    },
    rotateToColor(index) {
      this.selectedIndex = index; // Opdater valgt indeks
      this.rotationAngle = -this.selectedIndex * this.angleStep; // Beregn rotationsvinkel
      this.color = this.colorOptions[this.selectedIndex].color; // Opdater valgt farve
      this.changeTextColor(this.color); // Opdater tekstfarve
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
      this.$router.push('/font-select'); // Naviger tilbage til skrifttypevalg
    },
    goForward() {
      this.$router.push('/font-color-select'); // Naviger frem til tekstfarvevalg
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
</style>