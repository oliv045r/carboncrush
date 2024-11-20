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

    <!-- Knappen til at gemme valget -->
    <v-btn @click="saveFontColorSelection" color="" aria-label="Gå til næste trin">Gem og fortsæt</v-btn>

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
import { VCard, VBtn, VIcon } from 'vuetify/lib/components';
import { mapActions, mapState } from 'vuex';
import FeedbackPop from '@/components/feedback/FeedbackPop.vue';
import axios from 'axios';

export default {
  name: 'FontColorSelect',
  components: {
    VCard,
    VBtn,
    VIcon,
    FeedbackPop,
  },
  data() {
    return {
      color: '#000000', // Standard tekstfarve
      colorOptions: [
        { name: 'Sort', color: '#000000' },
        { name: 'Blå', color: '#3AA3EA' },
        { name: 'Pink', color: '#F142DA' },
        { name: 'Grøn', color: '#95BE87' },
        { name: 'Lilla', color: '#4E2ADF' },
        { name: 'Hvid', color: '#FFFFFF' },
        { name: 'Rød', color: '#E22828' },
        { name: 'Lysegrøn', color: '#B3D08D' },
        { name: 'Lyserød', color: '#E59C9D' },
        { name: 'Grå', color: '#D9D9D9' },
        { name: 'Gul', color: '#E2EC24' },
        { name: 'Mørk lilla', color: '#732A75' },
      ],
      selectedIndex: 0, // Indeks for valgt farve
      angleStep: 360 / 12, // Vinkeltrin for karusellen
      rotationAngle: 0, // Aktuel rotationsvinkel
      dragging: false, // Om brugeren trækker i karusellen
      showFeedbackPopup: false, // Kontroller synligheden af popup
      feedbackTitle: 'Godt valg!', // Titel for FeedbackPop
      feedbackContent: 'Mørke farver bruger mindre energi på de fleste skærme, især OLED-skærme. Når en pixel er sort, er den næsten slukket, hvilket reducerer energiforbruget. Lyse farver som hvid kræver derimod, at pixels lyser kraftigere og dermed bruger mere strøm.', // Indhold for FeedbackPop
      feedbackImageUrl: require('@/images/bg meme.png'), // Billede-URL for FeedbackPop
    };
  },
  computed: {
    ...mapState(['fontColorSelectionReached']),
    colorName() {
      return this.colorOptions[this.selectedIndex].name; // Navn på valgt farve
    },
  },
  methods: {
    ...mapActions(['updateTextColor']),
    rotateToColor(index) {
      this.selectedIndex = index; // Opdater valgt indeks
      this.rotationAngle = -this.selectedIndex * this.angleStep; // Beregn rotationsvinkel
      this.color = this.colorOptions[this.selectedIndex].color; // Opdater valgt farve
      this.updateTextColor(this.color); // Opdater tekstfarve
    },
    startDrag() {
      this.dragging = true; // Start træk
    },
    endDrag() {
      this.dragging = false; // Stop træk
    },
    async saveFontColorSelection() {
      try {
        const userId = localStorage.getItem('user_id');
        if (!userId) {
          alert('Bruger ikke fundet! Opret en bruger først.');
          return;
        }

        const questionId = 3; // ID for spørgsmålet "Vælg tekstfarve"
        const optionId = this.selectedIndex + 22; // Option ID begynder fra 22

        await axios.post('http://localhost:3000/userAnswer', {
          user_id: userId,
          question_id: questionId,
          option_id: optionId,
        });

        alert('Tekstfarve gemt succesfuldt!');
        this.$router.push('/image-format'); // Naviger til næste trin
      } catch (error) {
        console.error('Fejl ved gemning af tekstfarve:', error.message);
        alert('Der opstod en fejl. Prøv igen senere.');
      }
    },
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