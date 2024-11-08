<template>
  <div class="background-select animate__animated animate__fadeIn">
    <!-- Info sektion -->
    <v-card class="mx-auto px-10 py-10 rounded-lg elevation-0 bg-transparent" max-width="600">
      <v-card-title class="text-h5 font-weight-bold">Vælg dit billedformat</v-card-title>
      <v-card-text class="text-subtitle-">
        Skal vi finde det bedste format til dine billeder? Udadtil har valget af format ikke den store betydning - men
        for din side og dit energiforbrug kan det betyde en del.
      </v-card-text>
    </v-card>

    <!-- Knapper til valg af billedformat -->
    <div class="format-options">
      <!--Format in formats løkker igennem formats-arrayet og skaber en knap for hvert format. De har en klik-handler som opdaterer det valgte format når man vælger en ny knap-->
      <v-btn v-for="format in formats" :key="format.type" @click="selectFormat(format)"
        :color="selectedFormat.type === format.type ? 'primary' : 'default'" class="format-button" depressed :aria-label="`Vælg ${format.label} format`">
        <!--depressed ovenover her er en funktion i Vuetify som gør at knappen ser fladere ud når den er valgt-->
        {{ format.label }}
      </v-btn>
    </div>

    <!-- Eksempelbillede, som skifter afhængigt af valgte format -->
    <div class="image-preview">
      <img :src="selectedImage" :alt="`Billede i ${selectedFormat.label}-format`"  :aria-label="`Eksempelbillede i ${selectedFormat.label} format`" :class="{ fade: isFading }"
        @load="handleImageLoad" />
      <!--load event der fjerner fade ind effekten når billedet er helt indlæst-->
    </div>
    <v-btn @click="showFeedbackPopup = true; updateShowNextButton(true)" color="primary">Next</v-btn>
  </div>
  <FeedbackPop v-if="showFeedbackPopup" @close="showFeedbackPopup = false" :title="feedbackTitle"
    :content="feedbackContent" :imageUrl="feedbackImageUrl">
  </FeedbackPop>
</template>

<script>
import FeedbackPop from '@/components/feedback/FeedbackPop.vue';
import { mapActions, mapState } from 'vuex';

export default {
  name: 'BackgroundSelect',
  components: {
    FeedbackPop,
  },
  data() {
    // liste af data, hvor hvert objekt har en type, label og src
    return {
      formats: [
        { type: 'jpeg', label: 'JPEG', src: require('@/images/dog_jpg.jpg') },
        { type: 'png', label: 'PNG', src: require('@/images/dog_png.png') },
        { type: 'webp', label: 'WEBP', src: require('@/images/dog_webp.webp') },
        { type: 'avif', label: 'AVIF', src: require('@/images/dog_jpg.jpg') },
      ],
      // SelectedFormat gør at der som standard altid er valgt JPEG, hvilket brugeren ikke selv tager et valg
      selectedFormat: { type: 'jpeg', label: 'JPEG', src: require('@/images/dog_jpg.jpg') },
      isFading: false, //Gør at fade ind effekten som udgangspunkt ikke vises
      showFeedbackPopup: false, // Control the visibility of the popup
      feedbackTitle: 'Den her er svær...', // Define the title for FeedbackPop
      feedbackContent: 'Når du vælger billedformat til din hjemmeside, skal du tænke på kvalitet og filstørrelse. JPEG er godt til fotografier med en balance mellem størrelse og kvalitet, mens PNG er bedre til billeder med gennemsigtighed. <br> <br>WEBP og AVIF giver bedre kompression, hvilket reducerer filstørrelser og forbedrer indlæsningstider. Det kan forbedre brugeroplevelsen og spare båndbredde. Husk, at det rigtige format kan optimere både ydeevne og bæredygtighed. Vælg med omtanke for at sikre en hurtig og effektiv hjemmeside. ', // Define the content for FeedbackPop
      feedbackImageUrl: require('@/images/king-of-the-hill-jpeg.gif') // Define the image URL for FeedbackPop
    };
  },
  computed: {
    ...mapState('ShowNextButton', ['showNextButton']),
    // selectedImage er en egenskab som returnerer src for det valgte format
    selectedImage() {
      return this.selectedFormat.src;
    },
  },
  methods: {
    ...mapActions(['updateSelectedFont', 'updateShowNextButton']),
    // selectFormat er en metode som opdaterer det valgte format og sætter isFading til true for at vise fade ind effekten
    selectFormat(format) {
      this.isFading = true; //sætter gang i fading effekt når man vælger et andet format
      setTimeout(() => {
        this.selectedFormat = format;
        this.isFading = false;
      }, 300);
    },
    handleImageLoad() {
      this.isFading = false; //fade ind sættes igen til false når billedet er indlæst
    }
  }
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

.info-section {
  text-align: center;
  max-width: 600px;
}

.description {
  font-size: 1.1em;
  line-height: 1.6;
  margin: 1em 0;
}

.format-options {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  width: 100%;
  max-width: 600px;
}

.format-button {
  flex: 1;
  margin: 0 5px;
}

.image-preview {
  margin-top: 20px;
  max-width: 600px;
  text-align: center;
}

.image-preview img {
  width: 100%;
  height: auto;
  max-height: 400px;
  object-fit: cover;
  border-radius: 8px;
  transition: opacity 0.3s ease;
}

.image-preview img.fade {
  opacity: 0;
}

.image-preview img:not(.fade) {
  opacity: 1;
}

.navigation {
  display: flex;
  justify-content: space-between;
  width: 100%;
  max-width: 600px;
  margin-top: 20px;
}
</style>
