<template>
   <div>
    <AppHeader />
    <v-container class="background-select">
      <!-- Gå tilbage pil -->
      <v-btn @click="goBack" class="nav-button left">←</v-btn>
  
      <!-- Info sektion -->
      <div class="info-section text-center">
        <h1>Vælg billedformat</h1>
        <p class="description">
            Vælg det billedformat, der bedst passer til dine behov for bæredygtighed og læsbarhed. Hvert format har unikke egenskaber, der kan påvirke indlæsningstid, billedkvalitet og energiforbrug.
        </p>
      </div>
  
      <!-- Formatknapper på en række -->
      <v-row justify="center" class="format-options">
        <div
          v-for="format in formats"
          :key="format.type"
          class="format-button"
          @click="selectFormat(format)"
          :class="{ active: selectedFormat.type === format.type }"
        >
          <img :src="format.icon" class="format-icon" />
          <p class="format-label">{{ format.label }}</p>
        </div>
      </v-row>
  
      <!-- Eksempelbillede -->
      <v-img
        :src="selectedImage"
        :alt="`Billede i ${selectedFormat.label}-format`"
        class="image-preview"
        :class="{ fade: isFading }"
        @load="handleImageLoad"
        max-width="600"
        max-height="400"
        contain
      />
  
      <!-- Gå frem pil -->
      <v-btn @click="goForward" class="nav-button right">→</v-btn>
    </v-container>
    </div>
  </template>
  
  <script>
  // Import the AppHeader component at the top
import AppHeader from '@/components/AppHeader.vue'; // Adjust the path based on your file structure
  export default {
    components: {
    AppHeader // Register the component
  },
    name: 'BackgroundSelect',
    data() {
      return {
        formats: [
          { type: 'jpg', label: 'JPG', icon: require('@/images/icon.jpg'), src: require('@/images/icon.jpg') },
          { type: 'png', label: 'PNG', icon: require('@/images/icon.png'), src: require('@/images/icon.png') },
          { type: 'svg', label: 'SVG', icon: require('@/images/icon.svg'), src: require('@/images/icon.svg') },
        ],
        selectedFormat: { type: 'jpg', label: 'JPG', src: require('@/images/icon.jpg') },
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
  },
  goBack() {
    this.$router.push('/');
  },
  goForward() {
    // Check the selected format and navigate based on it
    if (this.selectedFormat.type === 'jpg') {
      this.$router.push('/feedback-icon-wrong'); // Route for JPG format
    } else {
      this.$router.push('/feedback-icon'); // Route for PNG, SVG, etc.
    }
  },
  }
  }
  </script>
  
  <style scoped>
  .background-select {
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: #333333;
  }
  
  .info-section {
    text-align: center;
    max-width: 600px;
    margin-top: 100px;
  }
  
  .description {
    font-size: 1.1em;
    line-height: 1.6;
    margin: 1em 0;
    color: #666666;
  }
  
  .format-options {
    margin-top: 20px;
    display: flex;
    gap: 30px; /* Øget afstand mellem knapper */
    width: 100%;
    max-width: 800px; /* Begrænser samlet bredde */
    justify-content: center;
  }
  
  .format-button {
    flex: 1; /* Knapperne fylder hele rækken */
    padding: 20px;
    cursor: pointer;
    border: 2px solid #ddd;
    border-radius: 8px;
    text-align: center;
    transition: background-color 0.2s ease, transform 0.2s ease;
    max-width: 220px; /* Sætter maks bredde pr. knap */
    min-width: 150px; /* Sætter minimum bredde */
  }
  
  .format-button:hover {
    background-color: #e3f2fd;
    transform: scale(1.05);
  }
  
  .format-button.active {
    background-color: #6fa3ef;
    color: white;
  }
  
  .format-icon {
    width: 80px;
    height: 80px;
    margin-bottom: 10px;
  }
  
  .format-label {
    font-weight: bold;
    font-size: 1.2em;
  }
  
  .image-preview {
    margin-top: 20px;
    max-width: 600px;
    text-align: center;
    border-radius: 8px;
    transition: opacity 0.3s ease;
  }
  
  .image-preview.fade {
    opacity: 0;
  }
  
  .nav-button {
    background-color: transparent;
    border: none;
    color: #333333;
    font-size: 2rem;
    cursor: pointer;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
  }

  .background-select {
  height: auto; /* or any other desired height, e.g., 50vh, 500px, etc. */
}
  
  .left {
    left: 20px;
  }
  
  .right {
    right: 20px;
  }
  </style>
  