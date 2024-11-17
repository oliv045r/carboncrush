<template>
  <div class="background-select-container" :style="{ fontFamily: selectedFont }">
    <!-- Barometer Progress Bar til venstre, score passeres her -->
    <BarometerBar :score="score" />

    <!-- Container til resten af indholdet -->
    <div class="content-container">
      <!-- Overskrift -->
      <v-card class="mx-auto px-10 py-10 rounded-lg elevation-0 bg-transparent" max-width="800">
        <v-card-title class="text-h4 font-weight-bold text-center">Vælg baggrundsfarve</v-card-title>
        <v-card-text class="text-subtitle-1 text-center">
          Tid til at vælge baggrundsfarven for din hjemmeside! Din farvebeslutning har faktisk betydning for bæredygtigheden: forskellige farver bruger forskellige mængder energi, når de vises på skærmen.
        </v-card-text>
      </v-card>

      <!-- Farvevalg via karussel -->
      <div class="carousel-container">
        <div class="indicator-container">
          <div class="pointer-arrow">↓</div>
        </div>
        <div class="carousel" :style="{ transform: `rotate(${rotationAngle}deg)` }" @mousedown="startDrag"
          @mouseup="endDrag" @mousemove="onDrag" @mouseleave="endDrag">
          <div v-for="(colorOption, index) in colorOptions" :key="index"
            :style="{ backgroundColor: colorOption.color, transform: `rotate(${index * angleStep}deg) translateY(-150px)` }"
            class="color-swatch" :aria-label="`vælg ${colorOption.name} baggrundsfarve`" @click="rotateToColor(index)">
          </div>
        </div>
      </div>

      <!-- DummyContent flyvende panel -->
      <DummyContent :fontFamily="'Arial, sans-serif'" title="Vælg baggrundsfarve til dit design"
        subtitle="Baggrundsfarve kan have indflydelse på energiforbruget på din side" date="20. november 2024"
        :imageSrc="imageSrc" imageAlt="Baggrundsfarvevalg" :content="[ 
          'Baggrundsfarver på din hjemmeside kan have indflydelse på energieffektivitet og bæredygtighed.',
          'Lysere farver bruger mere energi på skærme, mens mørkere farver ofte er mere energieffektive.',
          'Vælg den rigtige baggrundsfarve for at gøre din hjemmeside mere bæredygtig.'
        ]" footer="Skrevet af: Design og Bæredygtighed Teamet" />
    </div>
  </div>
</template>

<script>
import { VCard } from 'vuetify/lib/components';
import { mapActions, mapState } from 'vuex';
import DummyContent from '@/components/dummypage/DummyContent.vue';
import BarometerBar from '@/components/BarometerBar.vue'; // Importer BarometerBar (ProgressBarComponent)
import axios from 'axios';

// Brug import eller require til at hente billedet korrekt
import backgroundImage from '@/images/dog_png.png';

export default {
  name: 'BackgroundSelect',
  components: {
    VCard, DummyContent, BarometerBar
  },
  data() {
    return {
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
      selectedIndex: 0,
      angleStep: 360 / 12,
      rotationAngle: 0,
      dragging: false,
      startAngle: 0,
      currentAngle: 0,
      imageSrc: backgroundImage,
      score: 0, // Denne score bliver opdateret
    };
  },
  computed: {
    ...mapState(['fontColorSelectionReached']),
    colorName() {
      return this.colorOptions[this.selectedIndex].name;
    }
  },
  async created() {
    const userId = localStorage.getItem('userId');
    if (userId) {
      try {
        // Hent brugerens score fra backend, når komponenten indlæses
        const response = await axios.get(`http://localhost:3000/api/users/${userId}`);
        if (response.data) {
          this.score = response.data.total_score || 0;

          // Debugging: Log hentet score
          console.log('Hentet score fra backend:', this.score);
        }
      } catch (error) {
        console.error('Fejl ved hentning af brugerens data:', error);
      }
    }
  },
  methods: {
    ...mapActions(['updateBackgroundColor', 'updateTextColor']),
    async rotateToColor(index) {
      this.selectedIndex = index;
      this.rotationAngle = -this.selectedIndex * this.angleStep;
      const selectedColor = this.colorOptions[this.selectedIndex].color;
      this.updateBackgroundColor(selectedColor);

      // Debugging: Log valget for at sikre det er korrekt
      console.log('Valgt farve:', selectedColor);

      // Gem den valgte baggrundsfarve i localStorage
      localStorage.setItem('selectedBackgroundColor', selectedColor);

      // Send valget til backend for at opdatere brugerens quiz-svar
      await this.updateQuizBackend(selectedColor);
    },
    async updateQuizBackend(selectedColor) {
      try {
        const userId = localStorage.getItem('userId');

        // Debugging: Log userId og selectedColor
        console.log('userId:', userId);
        console.log('selectedColor:', selectedColor);

        if (!userId) {
          console.error('Bruger-ID ikke fundet. Brugeren skal registreres først.');
          return;
        }

        // Hvis font_type ikke er valgt, send en standardværdi ('ukendt')
        const selectedFont = localStorage.getItem('selectedFont') || 'ukendt'; 

        // Send data til backend for at opdatere brugerens quiz-svar
        const response = await axios.post('http://localhost:3000/api/quiz', {
          userId: userId,
          font_type: selectedFont, // Sender den nuværende font (eller 'ukendt')
          background_color: selectedColor, // Send baggrundsfarven også
        });

        if (response.data && response.data.score !== undefined) {
          this.score = response.data.score;
        } else {
          console.error('Backend returnerede ingen score');
        }
      } catch (error) {
        console.error('Fejl ved opdatering af quiz:', error);
      }
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
  },
};
</script>

<style scoped>
.background-select-container {
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  /* Sørger for, at alle elementer starter øverst */
  position: relative;
  z-index: 1;
}

.content-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  /* Sørger for, at elementerne starter oppefra */
  margin-top: 1rem;
  width: calc(100% - 60px);
  /* For at tage højde for BarometerBar på venstre side */
}

.carousel-container {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 2rem;
  position: relative;
}

.indicator-container {
  text-align: center;
  margin-bottom: 1rem;
}

.pointer-arrow {
  font-size: 2rem;
  color: #333;
  animation: bounce 1.5s infinite;
}

@keyframes bounce {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}

.carousel {
  position: relative;
  width: 300px;
  height: 450px;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: transform 0.5s ease;
}

.color-swatch {
  position: absolute;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  cursor: pointer;
  transition: transform 0.5s;
  box-shadow: 0px 0px 5px 3px rgba(0, 0, 0, 0.2);
}
</style>
