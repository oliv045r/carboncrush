<template>
  <div :style="{ fontFamily: selectedFont, color: textColor }" class="background-select animate__animated animate__fadeIn">
    <!-- Info boks til baggrundsfarve valg -->
    <v-card class="mx-auto px-10 py-10 rounded-lg elevation-0 bg-transparent" max-width="600">
      <v-card-title class="text-h5 font-weight-bold">Vælg skrifttype</v-card-title>
    <v-card-text class="text-subtitle-1">
      Nu er det tid til at vælge skrifttypen til din hjemmeside! Her kan du designe et flot udseende, mens du samtidig tager hensyn til miljøet. Forskellige skrifttyper kræver forskellig mængde data at indlæse, og dit valg kan derfor have en effekt på din hjemmesides CO2-aftryk.
      <br> <br>
      Nogle skrifttyper er lettere og kræver mindre energi at indlæse, mens mere detaljerede og dekorative skrifttyper kan være tungere og dermed mindre bæredygtige.    </v-card-text>
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
    <v-btn @click="showFeedbackPopup = true" color="primary">Next</v-btn>

  </div>
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
      currentFontIndex: 0,
      fonts: [
        { name: 'Arial', font: 'Arial, sans-serif' },
        { name: 'Courier New', font: 'Courier New, monospace' },
        { name: 'Georgia', font: 'Georgia, serif' },
        { name: 'Times New Roman', font: 'Times New Roman, serif' },
        { name: 'Tahoma', font: 'Tahoma, sans-serif' },
        { name: 'Trebuchet MS', font: 'Trebuchet MS, sans-serif' },
        { name: 'Comic Sans MS', font: 'Comic Sans MS, cursive, sans-serif' },
        { name: 'Rubik Wet Paint', font: 'Rubik Wet Paint, system-ui' }, // Add your custom font here
        { name: 'Notable', font: 'Notable, system-ui' } // Add your custom font here

      ],
      showFeedbackPopup: false, // Control the visibility of the popup
      feedbackTitle: 'Ikke dårligt!', // Define the title for FeedbackPop
      feedbackContent: '        Når du vælger en skrifttype, der er integreret i HTML, kan det have en positiv indvirkning på din hjemmesides ydeevne. Websikre skrifttyper, som Arial, Verdana eller Georgia, er generelt lettere at indlæse, da de er tilgængelige på de fleste enheder uden behov for ekstra filoverførsler. <br> <br> Dette sparer båndbredde og reducerer energiforbruget, når siden indlæses. <br> <br> Moderne skrifttyper, der skal downloades som webfonte, kan derimod øge belastningen på serveren og kræve mere tid og data at indlæse, hvilket kan føre til et højere CO2-aftryk. Dette gælder især for skrifttyper med mange vægte og stilarter, da hver variation kræver sin egen fil. <br> <br> Ved at vælge en simpel og effektiv skrifttype kan du dermed optimere din hjemmesides hastighed og bæredygtighed, hvilket i sidste ende hjælper med at reducere dens samlede CO2-aftryk. Gør dit valg med omtanke, og se, hvordan det kan gøre en forskel!', // Define the content for FeedbackPop
      feedbackImageUrl: require('@/images/font_meme.webp') // Define the image URL for FeedbackPop

    };
  },
  computed: {
    ...mapState(['selectedFont', 'textColor']),
  },
  methods: {
    ...mapActions(['updateSelectedFont']),
    goBack() {
      this.$router.push('/background-select');
    },
    goForward() {
      this.$router.push('/font-color-select');
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
  watch: {
    currentFontIndex(newIndex) {
      this.updateSelectedFont(this.fonts[newIndex].font);
    },
  },
  mounted() {
    this.currentFontIndex = this.fonts.findIndex(font => font.font === this.selectedFont);
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


.left {
  left: 20px;
}

.right {
  right: 20px;
}
</style>