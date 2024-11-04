<template>
  <div class="background-select animate__animated animate__fadeIn">
    <!-- Info sektion -->
    <div class="info-section">
      <h1>Vælg dit billedformat</h1>
      <p class="description">
        Skal vi finde det bedste format til dine billeder? Udadtil har valget af format ikke den store betydning - men for din side og dit energiforbrug kan det betyde en del.
      </p>
    </div>

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
    </div>
</template>

<script>
export default {
  name: 'BackgroundSelect',
  data() {
    return {
      formats: [
        { type: 'jpeg', label: 'JPEG', src: require('@/images/dog_jpg.jpg') },
        { type: 'png', label: 'PNG', src: require('@/images/dog_png.png') },
        { type: 'webp', label: 'WEBP', src: require('@/images/dog_webp.webp') },
        { type: 'avif', label: 'AVIF', src: require('@/images/dog_jpg.jpg') },
      ],
      selectedFormat: { type: 'jpeg', label: 'JPEG', src: require('@/images/dog_jpg.jpg') },
      isFading: false
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
