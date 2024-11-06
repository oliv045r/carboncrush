<template>
  <div class="background-select animate__animated animate__fadeIn">
    <!-- Info boks til skrifttype valg -->
    <v-card class="mx-auto px-10 py-10 rounded-lg elevation-0 bg-transparent" max-width="600">
      <v-card-title class="text-h5 font-weight-bold">Vælg tekstfarve</v-card-title>
    <v-card-text class="text-subtitle-1">
      Tid til at vælge tekstfarven for din hjemmeside! Din farvebeslutning har faktisk betydning for bæredygtigheden: forskellige farver bruger forskellige mængder energi, når de vises på skærmen.
    </v-card-text>
    </v-card>
    <v-icon class="pointer-arrow">mdi-arrow-down</v-icon>

    <!-- Circular color carousel -->
    <div
      class="carousel"
      :style="{ transform: `rotate(${rotationAngle}deg)` }"
      @mousedown="startDrag"
      @mouseup="endDrag"
      @mousemove="onDrag"
      @mouseleave="endDrag"
    >
      <div
        v-for="(colorOption, index) in colorOptions"
        :key="index"
        :style="{ backgroundColor: colorOption, transform: `rotate(${index * angleStep}deg) translateY(-150px)` }"
        class="color-swatch"
        @click="rotateToColor(index)"
      ></div>
    </div>

    <p class="text-subtitle-1 mt-n7">Valgt farve: {{ textColor }}</p>
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
import { VCard } from 'vuetify/lib/components';
import { mapActions, mapState } from 'vuex';

export default {
  name: 'FontColorSelect',
  components: {
    VCard, FeedbackPop,
  },
  data() {
    return {
      colorOptions: [
      '#3AA3EA', '#F142DA', '#95BE87', '#4E2ADF', '#000000', '#FFFFFF',
        '#E22828', '#B3D08D', '#E59C9D', '#D9D9D9', '#E2EC24', '#732A75'
      ],
      selectedIndex: 0,
      angleStep: 360 / 12,
      rotationAngle: 0,
      dragging: false,
      startAngle: 0,
      currentAngle: 0,
      showFeedbackPopup: false, // Control the visibility of the popup
      feedbackTitle: 'Interessant valg!', // Define the title for FeedbackPop
      feedbackContent: 'Når du vælger fontfarve, er det vigtigt at tage hensyn til både læsbarhed og tilgængelighed. Den rette farve kan gøre en stor forskel i brugeroplevelsen, uanset hvilken baggrundsfarve der er valgt. <br> <br> For at sikre optimal læsbarhed er det vigtigt at skabe en god kontrast mellem tekst og baggrund. En høj kontrast, såsom mørk tekst på en lys baggrund, forbedrer læsbarheden for de fleste brugere, herunder dem med synsnedsættelser. Det anbefales at følge retningslinjerne for kontrastforhold, der hjælper med at sikre, at dit indhold er tilgængeligt for alle. <br> <br> Det er også vigtigt at overveje, at lysere farver typisk kræver mere energi at vise på skærme, især på OLED-enheder. Derfor kan det være en god idé at vælge mørkere farver, da de kan spare energi og reducere dit hjemmesides CO2-aftryk.<br> <br> Husk, at tilgængelighed ikke kun handler om visuel læsbarhed; det handler også om at skabe en oplevelse, hvor alle kan interagere med dit indhold effektivt. Ved at vælge en fontfarve, der både er visuelt tiltalende og energieffektiv, kan du forbedre din hjemmesides ydeevne og samtidig sikre, at den er tilgængelig for alle brugere. Gør dit valg med omtanke!', // Define the content for FeedbackPop
      feedbackImageUrl: require('@/images/font_meme.webp') // Define the image URL for FeedbackPop
    };
  },
  computed: {
    ...mapState(['textColor']),
  },
  methods: {
    ...mapActions(['updateTextColor']),
    rotateToColor(index) {
      this.selectedIndex = index;
      this.rotationAngle = -this.selectedIndex * this.angleStep;
      this.updateTextColor(this.colorOptions[this.selectedIndex]);
    },
    darkenColor(hex, percent = 20) {
      hex = hex.replace('#', '');
      let r = parseInt(hex.substring(0, 2), 16);
      let g = parseInt(hex.substring(2, 4), 16);
      let b = parseInt(hex.substring(4, 6), 16);
      r = Math.max(0, r - Math.round((percent / 100) * 255));
      g = Math.max(0, g - Math.round((percent / 100) * 255));
      b = Math.max(0, b - Math.round((percent / 100) * 255));
      return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
    },
    startDrag(event) {
      this.dragging = true;
      this.startAngle = this.getMouseAngle(event);
      this.currentAngle = this.rotationAngle;
    },
    onDrag(event) {
      if (!this.dragging) return;
      const angle = this.getMouseAngle(event);
      const deltaAngle = angle - this.startAngle;
      this.rotationAngle = this.currentAngle + deltaAngle;
    },
    endDrag() {
      this.dragging = false;
    },
    getMouseAngle(event) {
      const rect = event.target.getBoundingClientRect();
      const x = event.clientX - (rect.left + rect.width / 2);
      const y = event.clientY - (rect.top + rect.height / 2);
      return Math.atan2(y, x) * (180 / Math.PI);
    },
    goBack() {
      this.$router.push('/font-select');
    },
    goForward() {
      this.$router.push('/font-color-select');
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

.carousel {
  position: relative;
  width: 300px;
  height: 450px;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: transform 0.5s ease; /* Smooth transition */
}

.color-swatch {
  position: absolute;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: 2px solid white;
  cursor: pointer;
  transition: transform 0.5s;
}

.nav-button {
  background-color: transparent;
  border: none;
  color: #ffffff;
  font-size: 2rem;
  cursor: pointer;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
}

.pointer-arrow {
  margin-bottom: -40px;
}

.left {
  left: 20px;
}

.right {
  right: 20px;
}
</style>
