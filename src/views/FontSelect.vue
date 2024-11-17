<template>
  <div class="font-select-container">
    <!-- Progress Bar Component -->
    <BarometerBar :score="score" />

    <!-- Overskrift -->
    <v-card class="mx-auto px-10 py-10 rounded-lg elevation-0 bg-transparent" max-width="800">
      <v-card-title class="text-h4 font-weight-bold text-center">Vælg skrifttype</v-card-title>
      <v-card-text class="text-subtitle-1 text-center">
        Tid til at vælge skrifttype! Der er frit valg, men husk - det kan have indflydelse på hvor meget energi din side bruger.
      </v-card-text>
    </v-card>

    <!-- Skrifttypevisning -->
    <div class="font-preview-wrapper">
      <v-btn class="arrow-btn left" icon @click="goBackwardFont">←</v-btn>
      <div class="font-preview-box">
        <p class="font-preview" :style="{ fontFamily: fonts[currentFontIndex].font }">
          {{ fonts[currentFontIndex].name }} - The quick brown fox jumps over the lazy dog.
        </p>
      </div>
      <v-btn class="arrow-btn right" icon @click="goForwardFont">→</v-btn>
    </div>

    <!-- DummyContent flyvende panel -->
    <DummyContent
      :fontFamily="selectedFont"
      title="Font Selection Panel"
      subtitle="Learn how different fonts impact your website's carbon footprint"
      date="20. november 2024"
      :imageSrc="imageSrc"
      imageAlt="Font Selection"
      :content="[ 
        'Fonts can play a big role in the sustainability of a website.',
        'Some fonts are more data-intensive to load, which can impact the energy usage of a website.',
        'Selecting the right fonts can therefore reduce the carbon footprint of a website.'
      ]"
      footer="Written by: Sustainability Design Team"
    />
  </div>
</template>

<script>
import { VBtn, VCard } from 'vuetify/lib/components';
import { mapActions, mapState } from 'vuex';
import DummyContent from '@/components/dummypage/DummyContent.vue';
import BarometerBar from '@/components/BarometerBar.vue'; // Importer progress bar-komponenten
import axios from 'axios';

// Brug import eller require til at hente billedet korrekt
const imagePath = require('@/images/font_meme2.png');

export default {
  name: 'FontSelect',
  components: {
    VBtn,
    VCard,
    DummyContent,
    BarometerBar,
  },
  data() {
    return {
      currentFontIndex: 0,
      imageSrc: imagePath, // Brug stien til billedet som en del af data
      score: 0, // Initial score, som opdateres fra backend
      fonts: [
        { name: 'Arial', font: 'Arial, sans-serif' },
        { name: 'Courier New', font: 'Courier New, monospace' },
        { name: 'Georgia', font: 'Georgia, serif' },
        { name: 'Times New Roman', font: 'Times New Roman, serif' },
        { name: 'Tahoma', font: 'Tahoma, sans-serif' },
        { name: 'Trebuchet MS', font: 'Trebuchet MS, sans-serif' },
        { name: 'Comic Sans MS', font: 'Comic Sans MS, cursive, sans-serif' },
        { name: 'Rubik Wet Paint', font: 'Rubik Wet Paint, system-ui' },
        { name: 'Roboto', font: 'Roboto, sans-serif' },
      ],
      selectedBackgroundColor: '', // Baggrundsfarve valgt i tidligere skærm
    };
  },
  computed: {
    ...mapState(['textColor']),
    selectedFont() {
      return this.fonts[this.currentFontIndex].font; // Returner den aktuelt valgte skrifttype
    },
  },
  methods: {
    ...mapActions(['updateSelectedFont', 'updateShowNextButton']),
    goBackwardFont() {
      this.currentFontIndex =
        (this.currentFontIndex - 1 + this.fonts.length) % this.fonts.length;
      this.updateSelectedFont(this.fonts[this.currentFontIndex].font);
      this.updateQuizBackend(); // Opdaterer scoren, når skrifttypen ændres
    },
    goForwardFont() {
      this.currentFontIndex = (this.currentFontIndex + 1) % this.fonts.length;
      this.updateSelectedFont(this.fonts[this.currentFontIndex].font);
      this.updateQuizBackend(); // Opdaterer scoren, når skrifttypen ændres
    },
    async updateQuizBackend() {
      try {
        const userId = localStorage.getItem('userId');
        if (!userId) {
          console.error('Bruger-ID ikke fundet. Brugeren skal registreres først.');
          return;
        }

        const selectedFont = this.fonts[this.currentFontIndex].name;
        const selectedColor = this.selectedBackgroundColor;

        // Send data til backend for at opdatere brugerens quiz-svar
        const response = await axios.post('http://localhost:3000/api/quiz', {
          userId: userId,
          font_type: selectedFont,
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
    async loadUserScore() {
      try {
        const userId = localStorage.getItem('userId');
        if (!userId) {
          console.error('Bruger-ID ikke fundet. Brugeren skal registreres først.');
          return;
        }

        const response = await axios.get(`http://localhost:3000/api/users/${userId}`);
        if (response.data && response.data.total_score !== undefined) {
          this.score = response.data.total_score;
        } else {
          console.error('Kunne ikke hente brugerens score');
        }
      } catch (error) {
        console.error('Fejl ved hentning af brugerens score:', error);
      }
    },
  },
  async mounted() {
    await this.loadUserScore(); // Hent scoren når komponenten er monteret
    this.updateSelectedFont(this.fonts[this.currentFontIndex].font);
  },
};
</script>

<style scoped>
/* CSS for font select container and preview styling */
.font-select-container {
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
  position: relative;
  z-index: 1;
  overflow: hidden;
}

.font-preview-wrapper {
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 800px;
  height: 150px;
}

.arrow-btn {
  font-size: 1.5rem;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: transparent;
  color: black;
  border: 1px solid black;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: transform 0.3s ease-in-out;
}

.arrow-btn:hover {
  transform: scale(1.1);
}

.font-preview-box {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  height: 100%;
}

.font-preview {
  font-size: 20px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  margin: 0;
}
</style>