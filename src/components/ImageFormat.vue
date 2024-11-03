<template>
    <div class="background-select animate__animated animate__fadeIn">
      <!-- Info sektion -->
      <div class="info-section">
        <h1>Vælg billedformat</h1>
        <p class="description">
          Der skal nu vælges billedformat. Dette valg er vigtigt for både det visuelle udtryk, tilgængelighed og bæredygtighed af dit design. Forskellige billedformater har forskellige egenskaber, der kan påvirke, hvordan billeder indlæses og vises på skærmen, hvilket kan have betydning for energiforbruget.
        </p>
      </div>
  
      <!-- Knapper til valg af billedformat -->
      <div class="format-options">
        <button
          v-for="format in formats"
          :key="format.type"
          @click="selectFormat(format)"
          :class="['format-button', { active: selectedFormat.type === format.type }]"
        >
          {{ format.label }}
        </button>
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
          { type: 'avif', label: 'AVIF', src: require('@/images/dog.avif') },
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
        // Start fade-out effekten
        this.isFading = true; 
  
        // Skift formatet og stop fade-out efter en kort forsinkelse
        setTimeout(() => {
          this.selectedFormat = format; // Opdater det valgte format
          this.isFading = false; // Stop fade-out effekten
        }, 300); // Match timeout med fade-out varigheden
      },
      handleImageLoad() {
        this.isFading = false; // Stop fading, når billedet er indlæst
      },
      goBack() {
        this.$router.push('/');
      },
      goForward() {
        this.$router.push('/another-route');
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
    justify-content: space-between; /* Fordeler knapperne ligeligt */
    margin-top: 20px;
    width: 100%;
    max-width: 600px; /* Maks bredde for knapområdet */
  }
  
  .format-button {
    flex: 1; /* Giver knapperne ligelig plads */
    margin: 0 5px; /* Afstand mellem knapperne */
    padding: 10px 20px;
    font-size: 16px;
    background-color: #e0e0e0;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.2s ease, transform 0.2s ease; /* Hurtigere transition */
  }
  
  .format-button:hover {
    background-color: #cccccc;
  }
  
  .format-button.active {
    background-color: #6fa3ef; /* Ændret baggrundsfarve for den aktive knap */
    color: white; /* Ændret tekstfarve for den aktive knap */
    transform: scale(1.05); /* Lidt zoom-effekt på den aktive knap */
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
    transition: opacity 0.3s ease; /* Overgang for opacitet */
  }
  
  .image-preview img.fade {
    opacity: 0; /* Fade out effekten */
  }
  
  .image-preview img:not(.fade) {
    opacity: 1; /* Fade in effekten */
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
  
  .left {
    left: 20px;
  }
  
  .right {
    right: 20px;
  }
  </style>
  