<template>
  <div class="background-select animate__animated animate__fadeIn">
    <!-- Info boks til baggrundsfarve valg -->
    <v-card class="mx-auto px-10 py-10 rounded-lg elevation-0 bg-transparent" max-width="600">
      <v-card-title class="text-h4 font-weight-bold">Vælg baggrundsfarve</v-card-title>
      <v-card-text class="text-subtitle-">
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
    <v-btn @click="saveBackgroundSelection" color="primary" aria-label="Gå til næste trin">Næste</v-btn>
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
import { mapActions } from 'vuex';
import axios from 'axios';
import FeedbackPop from '@/components/feedback/FeedbackPop.vue';

export default {
  name: 'BackgroundSelect',
  components: {
    FeedbackPop,
  },
  data() {
    return {
      colorOptions: [], // Dynamiske farvevalg fra backend
      selectedIndex: 0, // Indeks for valgt farve
      angleStep: 0, // Vinkeltrin, beregnes dynamisk
      rotationAngle: 0, // Aktuel rotationsvinkel for karusellen
      dragging: false, // Om brugeren trækker i karusellen
      startAngle: 0, // Startvinkel for træk
      currentAngle: 0, // Aktuel vinkel under træk
      showFeedbackPopup: false, // Popup synlighed
      feedbackTitle: 'Godt valg!', // Titel for feedback
      feedbackContent: 'Mørke farver bruger mindre energi på de fleste skærme, især OLED-skærme. Når en pixel er sort, er den næsten slukket, hvilket reducerer energiforbruget. Lyse farver som hvid kræver derimod, at pixels lyser kraftigere og dermed bruger mere strøm.',
      feedbackImageUrl: require('@/images/bg meme.png'), // Feedback billede
    };
  },
  computed: {
    colorName() {
      return this.colorOptions[this.selectedIndex]?.option_text || ''; // Dynamisk navn for valgt farve
    },
  },
  methods: {
    ...mapActions(['updateBackgroundColor']), // Vuex action til at opdatere baggrundsfarve
    async fetchColors() {
      try {
        // Hent farvevalg fra backend
        const response = await axios.get('http://localhost:3000/api/ui/background-colors');
        this.colorOptions = response.data;
        this.angleStep = 360 / this.colorOptions.length; // Dynamisk beregning af vinkeltrin
      } catch (error) {
        console.error('Fejl ved hentning af baggrundsfarver:', error.message);
        alert('Kunne ikke hente farvevalg. Prøv igen senere.');
      }
    },
    rotateToColor(index) {
      this.selectedIndex = index; // Sæt valgt indeks
      this.rotationAngle = -this.selectedIndex * this.angleStep; // Beregn rotationsvinkel
      this.updateBackgroundColor(this.colorOptions[this.selectedIndex]?.color); // Opdater baggrundsfarve i Vuex
    },
    startDrag(event) {
      this.dragging = true; // Start træk
      this.startAngle = this.getMouseAngle(event); // Startvinkel
      this.currentAngle = this.rotationAngle; // Aktuel vinkel
    },
    onDrag(event) {
      if (!this.dragging) return;
      const angle = this.getMouseAngle(event); // Beregn musevinkel
      const deltaAngle = angle - this.startAngle; // Beregn ændring
      this.rotationAngle = this.currentAngle + deltaAngle; // Opdater rotationsvinkel
    },
    endDrag() {
      this.dragging = false; // Stop træk
    },
    getMouseAngle(event) {
      const rect = event.target.getBoundingClientRect();
      const x = event.clientX - (rect.left + rect.width / 2);
      const y = event.clientY - (rect.top + rect.height / 2);
      return Math.atan2(y, x) * (180 / Math.PI); // Konverter til grader
    },
    async saveBackgroundSelection() {
      try {
        const userId = localStorage.getItem('user_id'); // Hent bruger-ID
        if (!userId) {
          alert('Bruger ikke fundet! Opret en bruger først.');
          return;
        }

        const questionId = 1; // ID for spørgsmålet
        const optionId = this.colorOptions[this.selectedIndex]?.id; // Dynamisk option ID

        const response = await axios.post('http://localhost:3000/userAnswer', {
          user_id: userId,
          question_id: questionId,
          option_id: optionId,
        });

        console.log('Baggrundsfarve gemt:', response.data);
        alert('Dit valg er blevet gemt!');
        this.$router.push('/font-select'); // Naviger til næste trin
      } catch (error) {
        console.error('Fejl ved gemning af baggrundsfarve:', error.message);
        alert('Der opstod en fejl. Prøv igen senere.');
      }
    },
  },
  mounted() {
    this.fetchColors(); // Hent farvevalg når komponenten loades
  },
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