<template>
  <div class="background-select animate__animated animate__fadeIn">
    <!-- Info sektion -->
    <v-card class="mx-auto px-10 py-10 rounded-lg elevation-0 bg-transparent" max-width="600">
      <v-card-title class="text-h5 font-weight-bold">Vælg dit billedformat</v-card-title>
    <v-card-text class="text-subtitle-1">
      Skal vi finde det bedste format til dine billeder? Udadtil har valget af format ikke den store betydning - men for din side og dit energiforbrug kan det betyde en del.
    </v-card-text>
    </v-card>

    <!-- Knapper til valg af billedformat -->
    <div class="format-options">
      <v-btn
        v-for="format in formats"
        :key="format.type"
        @click="selectFormat(format)"
        :color="selectedFormat.type === format.type ? 'primary' : 'default'"
        class="format-button"
        depressed
      >
        {{ format.label }}
      </v-btn>
    </div>

    <!-- Eksempelbillede, som skifter afhængigt af valgte format -->
    <div class="image-preview">
      <img
        :src="selectedImage"
        :alt="`Billede i ${selectedFormat.label}-format`"
        :class="{ fade: isFading }"
        @load="handleImageLoad"
      />
    </div>
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
export default {
  name: 'BackgroundSelect',
  components: {
    FeedbackPop,
  },
  data() {
    return {
      formats: [
        { type: 'jpeg', label: 'JPEG', src: require('@/images/dog_jpg.jpg') },
        { type: 'png', label: 'PNG', src: require('@/images/dog_png.png') },
        { type: 'webp', label: 'WEBP', src: require('@/images/dog_webp.webp') },
        { type: 'avif', label: 'AVIF', src: require('@/images/dog_jpg.jpg') },
      ],
      selectedFormat: { type: 'jpeg', label: 'JPEG', src: require('@/images/dog_jpg.jpg') },
      isFading: false,
      showFeedbackPopup: false, // Control the visibility of the popup
      feedbackTitle: 'Den her er svær...', // Define the title for FeedbackPop
      feedbackContent: 'Når du vælger billedformat til din hjemmeside, er det vigtigt at tænke på kvalitet og filstørrelse. Formater som JPEG og PNG er almindeligt anvendte, men nyere formater som WEBP og AVIF tilbyder bedre kompression og kvalitet. <br> <br> JPEG er ideelt til fotografier og giver en god balance mellem størrelse og kvalitet, mens PNG er bedre til billeder med gennemsigtighed. WEBP og AVIF kan reducere filstørrelserne betydeligt, hvilket forbedrer indlæsningstiderne og sparer båndbredde. <br> <br>Det rigtige valg kan også påvirke tilgængeligheden, da hurtigere indlæsning giver en bedre brugeroplevelse. Vær opmærksom på, hvordan dit valg kan optimere både ydeevne og bæredygtighed. Gør dit valg med omtanke!', // Define the content for FeedbackPop
      feedbackImageUrl: require('@/images/king-of-the-hill-jpeg.gif') // Define the image URL for FeedbackPop
    };
  },
  computed: {
    selectedImage() {
      return this.selectedFormat.src;
    }
  },
  methods: {
    selectFormat(format) {
      this.isFading = true;
      setTimeout(() => {
        this.selectedFormat = format;
        this.isFading = false;
      }, 300);
    },
    handleImageLoad() {
      this.isFading = false;
    }
  }
};
</script>

<style scoped>
.background-select {
  height: 100vh;
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
