<template>
  <div class="background-select animate__animated animate__fadeIn">
    <!-- Info sektion -->
    <v-card class="mx-auto px-10 py-10 rounded-lg elevation-0 bg-transparent" max-width="600">
      <v-card-title class="text-h4 font-weight-bold">Vælg dit billedformat</v-card-title>
      <v-card-text class="text-subtitle-">
        Skal vi finde det bedste format til dine billeder?
      </v-card-text>
    </v-card>

    <!-- Knapper til valg af billedformat -->
    <div class="format-options">
      <v-btn v-for="format in formats" :key="format.type" @click="selectFormat(format)"
        :color="selectedFormat.type === format.type ? 'primary' : 'default'" class="format-button" depressed
        :aria-label="`Vælg ${format.label} format`">
        {{ format.label }}
      </v-btn>
    </div>

    <!-- Eksempelbillede, som skifter afhængigt af valgte format -->
    <div class="image-preview">
      <img :src="selectedImage" :alt="`Billede i ${selectedFormat.label}-format`"
        :aria-label="`Eksempelbillede i ${selectedFormat.label} format`" :class="{ fade: isFading }"
        @load="handleImageLoad" />
    </div>


    <!-- DummyContent flyvende panel -->
    <DummyContent
      :fontFamily="'Arial, sans-serif'"
      title="Valg af billedformat"
      subtitle="Dit valg af billedformat kan påvirke din sides ydeevne"
      date="20. november 2024"
      :imageSrc="feedbackImageUrl"
      imageAlt="Billedformat valg"
      :content="[ 
        'Billedformater kan påvirke både ydeevne og energieffektivitet af din hjemmeside.',
        'JPEG og PNG har forskellige styrker, mens nye formater som WEBP og AVIF kan reducere filstørrelser betydeligt.',
        'Vælg det bedste billedformat for at optimere din hjemmeside for både hastighed og bæredygtighed.'
      ]"
      footer="Skrevet af: Design og Bæredygtighed Teamet"
    />
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import DummyContent from '@/components/dummypage/DummyContent.vue';

export default {
  name: 'BackgroundSelect',
  components: {
    DummyContent,
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
      showFeedbackPopup: false,
      feedbackTitle: 'Den her er svær...',
      feedbackContent: 'Når du vælger billedformat til din hjemmeside, skal du tænke på kvalitet og filstørrelse. JPEG er godt til fotografier med en balance mellem størrelse og kvalitet, mens PNG er bedre til billeder med gennemsigtighed. <br> <br>WEBP og AVIF giver bedre kompression, hvilket reducerer filstørrelser og forbedrer indlæsningstider. Det kan forbedre brugeroplevelsen og spare båndbredde. Husk, at det rigtige format kan optimere både ydeevne og bæredygtighed. Vælg med omtanke for at sikre en hurtig og effektiv hjemmeside.',
      feedbackImageUrl: require('@/images/king-of-the-hill-jpeg.gif'),
    };
  },
  computed: {
    ...mapState('ShowNextButton', ['showNextButton']),
    selectedImage() {
      return this.selectedFormat.src;
    },
  },
  methods: {
    ...mapActions(['updateSelectedFont', 'updateShowNextButton']),
    selectFormat(format) {
      this.isFading = true;
      setTimeout(() => {
        this.selectedFormat = format;
        this.isFading = false;
      }, 300);
    },
    handleImageLoad() {
      this.isFading = false;
    },
  },
};
</script>

<style scoped>
.background-select {
  margin-top: 10px;
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.info-section {
  text-align: center;
  max-width: 700px;
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
