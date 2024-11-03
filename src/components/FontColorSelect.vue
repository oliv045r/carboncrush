<template>
  <div :style="{ color: textColor }" class="font-color-select animate__animated animate__fadeIn">
    <!-- Gå tilbage pil -->
    <v-btn class="position-absolute left-20 left" @click="goBack">←</v-btn>
    <!-- Info boks til skrifttype valg -->
    <v-card 
      class="mx-auto mb-15 px-10 py-10 rounded-lg elevation-4" 
      max-width="600" 
      title="Vælg tekstfarve" 
      text="Tid til at vælge tekstfarven for din hjemmeside! Din farvebeslutning har faktisk betydning for bæredygtigheden: forskellige farver bruger forskellige mængder energi, når de vises på skærmen.">
    </v-card>

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

    <p>Valgt farve: {{ textColor }}</p>

    <!-- Gå frem pil -->
    <v-btn class="position-absolute left-20 right" @click="goForward">→</v-btn>
  </div>
</template>

<script>
import { VBtn, VCard } from 'vuetify/lib/components';

export default {
  name: 'FontColorSelect',
  components: {
    VBtn,
    VCard,
  },
  data() {
    return {
      textColor: '#000000',
      colorOptions: [
        '#FF5733', '#FFBD33', '#DBFF33', '#75FF33', '#33FF57', '#33FFBD',
        '#33DBFF', '#3375FF', '#3357FF', '#5733FF', '#BD33FF', '#FF33DB'
      ],
      selectedIndex: 0,
      angleStep: 360 / 12,
      rotationAngle: 0,
    };
  },
  methods: {
    goBack() {
      this.$router.push('/background-select');
    },
    goForward() {
      this.$router.push('/another-route');
    },
    startDrag(event) {
      this.dragging = true;
      this.startX = event.clientX;
    },
    endDrag() {
      this.dragging = false;
    },
    onDrag(event) {
      if (this.dragging) {
        const deltaX = event.clientX - this.startX;
        this.rotationAngle += deltaX / 2;
        this.startX = event.clientX;
      }
    },
    rotateToColor(index) {
      this.selectedIndex = index;
      this.textColor = this.colorOptions[index];
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
  color: #ffffff;
}


.carousel {
  position: relative;
  width: 300px;
  height: 300px;
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

.left {
  left: 20px;
}

.right {
  right: 20px;
}
</style>
