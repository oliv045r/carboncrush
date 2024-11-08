<template>
  <div :style="{ fontFamily: selectedFont, color: textColor }" class="background-select animate__animated animate__fadeIn">
    <!-- Info boks til baggrundsfarve valg -->
    <v-card class="mx-auto px-10 py-10 rounded-lg elevation-0 bg-transparent" max-width="600">
      <v-card-title class="text-h4 font-weight-bold">Vælg skrifttype</v-card-title>
      <v-card-text class="text-subtitle-">
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
    <v-btn @click="showFeedbackPopup = true; updateShowNextButton(true)" color="primary" aria-label="Gå til næste trin">Next</v-btn>
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

export default {
  name: 'FontSelect',
  components: {
    VBtn,
    VCard,
    VCarousel,
    VCarouselItem,
    FeedbackPop // Register Vuetify button component
  },
  data() {
    return {
      currentFontIndex: 0, // Aktuel skrifttypeindeks
      fonts: [
        { name: 'Arial', font: 'Arial, sans-serif' },
        { name: 'Courier New', font: 'Courier New, monospace' },
        { name: 'Georgia', font: 'Georgia, serif' },
        { name: 'Times New Roman', font: 'Times New Roman, serif' },
        { name: 'Tahoma', font: 'Tahoma, sans-serif' },
        { name: 'Trebuchet MS', font: 'Trebuchet MS, sans-serif' },
        { name: 'Comic Sans MS', font: 'Comic Sans MS, cursive, sans-serif' },
        { name: 'Rubik Wet Paint', font: 'Rubik Wet Paint, system-ui' }, // Tilføj din egen skrifttype her
        { name: 'Notable', font: 'Notable, system-ui' } // Tilføj din egen skrifttype her
      ],
      showFeedbackPopup: false, // Kontroller synligheden af popup
      feedbackTitle: 'Ikke dårligt!', // Titel for FeedbackPop
      feedbackContent: 'Når du vælger en skrifttype, der er indbygget i HTML, sparer du båndbredde. Websikre skrifttyper som Arial og Verdana er hurtigere at indlæse, da de er tilgængelige på de fleste enheder uden ekstra filoverførsler. <br> <br> Moderne skrifttyper, der kræver eksternt download, kan øge serverbelastningen og bruge mere tid og data, hvilket medfører et højere CO2-aftryk. Skrifttyper med mange vægte og stilarter kræver ekstra filer, som belaster indlæsningstiden. Ved at vælge en enkel skrifttype kan du optimere din hjemmesides hastighed og bæredygtighed, og dermed reducere CO2-aftrykket.', // Indhold for FeedbackPop
      feedbackImageUrl: require('@/images/font_meme2.png') // Billede-URL for FeedbackPop
    };
  },
  computed: {
    ...mapState(['selectedFont', 'textColor']), // Hent valgt skrifttype og tekstfarve fra Vuex
  },
  methods: {
    ...mapActions(['updateSelectedFont', 'updateShowNextButton']), // Kortlæg Vuex handlinger
    goBack() {
      this.$router.push('/background-select'); // Naviger tilbage til baggrundsvalg
    },
    goForward() {
      this.$router.push('/font-color-select'); // Naviger frem til tekstfarvevalg
    },
    goForwardFont() {
      this.currentFontIndex = (this.currentFontIndex + 1) % this.fonts.length; // Gå til næste skrifttype
      this.updateSelectedFont(this.fonts[this.currentFontIndex].font); // Opdater valgt skrifttype i Vuex
    },
    goBackwardFont() {
      this.currentFontIndex = (this.currentFontIndex - 1 + this.fonts.length) % this.fonts.length; // Gå til forrige skrifttype
      this.updateSelectedFont(this.fonts[this.currentFontIndex].font); // Opdater valgt skrifttype i Vuex
    },
  },
  watch: {
    currentFontIndex(newIndex) {
      this.updateSelectedFont(this.fonts[newIndex].font); // Opdater valgt skrifttype i Vuex, når currentFontIndex ændres
    },
  },
  mounted() {
    this.currentFontIndex = this.fonts.findIndex(font => font.font === this.selectedFont); // Sæt currentFontIndex til den valgte skrifttype ved montering
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