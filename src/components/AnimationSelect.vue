<template>
  <div class="background-select animate__animated animate__fadeIn">
    <!-- Gå tilbage pil -->
    <button class="nav-button left" @click="goBack">←</button>

    <!-- Info sektion -->
    <div class="info-section">
      <h1>Vælg animation</h1>
      <p class="description">
        Nu skal der vælges animationsgrad. Dette valg er afgørende for både brugeroplevelsen, ydeevnen og bæredygtigheden af dit webdesign. Mere komplekse animationer, såsom 3D-effekter eller kontinuerlige bevægelser, kan forbedre det visuelle indtryk, men kræver også flere ressourcer og mere databehandling, hvilket kan øge energiforbruget. Simpel animation eller brug af CSS-transitioner reducerer belastningen på systemet, indlæser hurtigere og minimerer miljøpåvirkningen. Ved at vælge lettere animationer kan du opnå en bedre balance mellem æstetik og bæredygtighed, samtidig med at du forbedrer performance på tværs af enheder. </p>

      <!-- Billedkvalitet slider -->
      <div>
        <label for="qualitySlider">Billedkvalitet: {{ quality }}%</label>
        <input 
          id="qualitySlider"
          type="range"
          min="10"
          max="100"
          v-model="quality"
          @input="updateImage"
        />
        <br />
        <!-- Dynamisk billede -->
        <canvas ref="canvas" :width="canvasWidth" :height="canvasHeight"></canvas>
        <p>Hukommelsesforbrug: {{ imageSize }} KB</p>
      </div>
    </div>

    <!-- Gå frem pil -->
    <button class="nav-button right" @click="goForward">→</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      quality: 80, // 80% billedkvalitet
      imageSrc: require('@/images/dog_webp.webp'),
      canvasWidth: 500, // Standard billedbredde
      canvasHeight: 333, // Standard billedhøjde
      imageSize: 0, // Vil blive beregnet dynamisk
    };
  },
  methods: {
    goBack() {
      this.$router.push('/');
    },
    goForward() {
      this.$router.push('/another-route');
    },
    updateImage() {
      const canvas = this.$refs.canvas;
      const ctx = canvas.getContext('2d');
      const img = new Image();
      img.src = this.imageSrc;

      img.onload = () => {
        const aspectRatio = img.width / img.height;
        let scaledWidth, scaledHeight;

        if (aspectRatio > 1) {
          // Landscape
          scaledWidth = (this.quality / 100) * this.canvasWidth;
          scaledHeight = scaledWidth / aspectRatio;
        } else {
          // Portrait or square
          scaledHeight = (this.quality / 100) * this.canvasHeight;
          scaledWidth = scaledHeight * aspectRatio;
        }

        // Draw the image at a lower resolution
        const offscreenCanvas = document.createElement('canvas');
        offscreenCanvas.width = scaledWidth;
        offscreenCanvas.height = scaledHeight;
        const offscreenCtx = offscreenCanvas.getContext('2d');
        offscreenCtx.drawImage(img, 0, 0, scaledWidth, scaledHeight);

        // Scale the image back up to the canvas size
        ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
        ctx.imageSmoothingEnabled = false;
        ctx.drawImage(offscreenCanvas, 0, 0, scaledWidth, scaledHeight, 0, 0, this.canvasWidth, this.canvasHeight);

        this.calculateImageSize();
      };
    },
    calculateImageSize() {
      // Her laver vi en simpel beregning af billedstørrelsen i KB baseret på kvaliteten
      const baseSize = 500; // Antag at billedet på 100% kvalitet er 500 KB
      this.imageSize = Math.round((this.quality / 100) * baseSize);
    }
  },
  mounted() {
    // Beregn initial billedstørrelse når komponentet monteres
    this.calculateImageSize();
    this.updateImage();
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
  color: #333333;
}

.info-section {
  text-align: center;
  max-width: 600px;
}

.description {
  font-size: 1.1em;
  line-height: 1.6;
  margin: 1em 0;
  color: #666666;
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