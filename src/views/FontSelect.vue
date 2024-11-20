<template>
  <div :style="{ fontFamily: selectedFont, color: textColor }" class="background-select animate__animated animate__fadeIn">
    <!-- Info boks til baggrundsfarve valg -->
    <v-card class="card-intro mx-auto px-10 py-10 rounded-lg elevation-0 bg-transparent" max-width="600">
      <v-card-title class="text-h5 font-weight-bold">Vælg skrifttype</v-card-title>
      <v-card-text class="text-subtitle-1">
        Nu er det tid til at vælge skrifttypen til din hjemmeside! Her kan du designe et flot udseende, mens du samtidig tager hensyn til miljøet. Forskellige skrifttyper kræver forskellig mængde data at indlæse, og dit valg kan derfor have en effekt på din hjemmesides CO2-aftryk.
        <br> <br>
        Nogle skrifttyper er lettere og kræver mindre energi at indlæse, mens mere detaljerede og dekorative skrifttyper kan være tungere og dermed mindre bæredygtige.
      </v-card-text>
    </v-card>

    <!-- Font carousel -->
    <v-carousel v-model="currentFontIndex" hide-delimiters>
      <template v-slot:prev>
        <v-btn class="custom-prev-btn" icon @click="goBackwardFont">←</v-btn>
      </template>
      <v-carousel-item v-for="(font, index) in fonts" :key="index">
        <div :style="{ fontFamily: font.font, color: textColor }" class="font-preview">
          {{ font.name }} - The quick brown fox jumps over the lazy dog.
        </div>
      </v-carousel-item>
      <template v-slot:next>
        <v-btn class="custom-next-btn" icon @click="goForwardFont">→</v-btn>
      </template>
    </v-carousel>
    <v-btn @click="saveFontSelection" color="primary" aria-label="Gå til næste trin">Next</v-btn>
  </div>
  <FeedbackPop 
    v-if="showFeedbackPopup" 
    @close="showFeedbackPopup = false" 
    :title="feedbackTitle"
    :content="feedbackContent"
    :imageUrl="feedbackImageUrl"
  />
</template>

<script>
import FeedbackPop from '@/components/feedback/FeedbackPop.vue';
import { VBtn, VCard, VCarousel, VCarouselItem } from 'vuetify/lib/components'; // Import Vuetify button component
import { mapActions, mapState } from 'vuex';
import axios from 'axios'; // Import Axios for HTTP requests

export default {
  name: 'FontSelect',
  components: {
    VBtn,
    VCard,
    VCarousel,
    VCarouselItem,
    FeedbackPop // Register FeedbackPop component
  },
  data() {
    return {
      currentFontIndex: 0, // Aktuel skrifttypeindeks
      fonts: [
        { id: 13, name: 'Arial', font: 'Arial, sans-serif' },
        { id: 14, name: 'Courier New', font: 'Courier New, monospace' },
        { id: 15, name: 'Georgia', font: 'Georgia, serif' },
        { id: 16, name: 'Times New Roman', font: 'Times New Roman, serif' },
        { id: 17, name: 'Tahoma', font: 'Tahoma, sans-serif' },
        { id: 18, name: 'Trebuchet MS', font: 'Trebuchet MS, sans-serif' },
        { id: 19, name: 'Comic Sans MS', font: 'Comic Sans MS, cursive, sans-serif' },
        { id: 20, name: 'Rubik Wet Paint', font: 'Rubik Wet Paint, system-ui' },
        { id: 21, name: 'Roboto', font: 'Roboto, sans-serif' }
      ],
      showFeedbackPopup: false,
      feedbackTitle: 'Ikke dårligt!',
      feedbackContent: 'Når du vælger en skrifttype, der er indbygget i HTML, sparer du båndbredde...',
      feedbackImageUrl: require('@/images/font_meme2.png') // Path to feedback image
    };
  },
  computed: {
    ...mapState(['selectedFont', 'textColor']),
  },
  methods: {
    ...mapActions(['updateSelectedFont', 'updateShowNextButton']),
    async saveFontSelection() {
      try {
        const userId = localStorage.getItem('user_id');
        if (!userId) {
          alert('Bruger ikke fundet! Opret en bruger først.');
          return;
        }

        const selectedFont = this.fonts[this.currentFontIndex];

        // Send POST-anmodning til backend
        const response = await axios.post('http://localhost:3000/userAnswer', {
          user_id: userId,
          question_id: 2, // ID'et for "Vælg skrifttype"
          option_id: selectedFont.id, // ID'et for den valgte skrifttype
        });

        console.log('Skrifttype gemt:', response.data);
        alert('Skrifttypevalg gemt succesfuldt!');

        // Naviger til næste trin
        this.$router.push('/font-color-select');
      } catch (error) {
        console.error('Fejl ved gemning af skrifttypevalg:', error.message);
        alert('Der opstod en fejl. Prøv igen senere.');
      }
    },
    goForwardFont() {
      this.currentFontIndex = (this.currentFontIndex + 1) % this.fonts.length;
      this.updateSelectedFont(this.fonts[this.currentFontIndex].font);
    },
    goBackwardFont() {
      this.currentFontIndex = (this.currentFontIndex - 1 + this.fonts.length) % this.fonts.length;
      this.updateSelectedFont(this.fonts[this.currentFontIndex].font);
    },
  },
};
</script>


<style scoped>
.card-intro {
  height: 500px;
}

.background-select {
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.v-carousel {
  height: 5rem !important;
  padding: 0;
  width: 60%;
}

.font-preview {
  color: inherit !important;
  font-size: 24px;
  text-align: center;
  padding: 20px;
}

.font-selector .v-select__selections {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.custom-prev-btn {
  background-color: #fff;
  color: #000;
}

.custom-next-btn {
  background-color: #fff;
  color: #000;
}
</style>