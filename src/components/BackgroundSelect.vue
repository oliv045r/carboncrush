<template>
  <div :style="{ backgroundColor: color }" class="background-select animate__animated animate__fadeIn">
    <!-- Gå tilbage pil -->
    <button class="nav-button left" @click="goBack">←</button>

    <!-- Info boks til baggrundsfarve valg -->
    <div class="info-box" :style="{ backgroundColor: darkenColor(color, 20) }">
      <h2>Vælg baggrundsfarve</h2>
      <p>
        Baggrundsfarven spiller en afgørende rolle for din hjemmesides visuelle identitet. Den kan tilføre personlighed og stemning, men den kan også have en indflydelse på energiforbruget. Er du klar over, hvilken baggrundsfarve der er mest effektiv, når det kommer til energibesparelse?
        <br><br>
        Når du vælger baggrundsfarve, skal du overveje, om du skal prioritere æstetik over funktionalitet. Hvad er vigtigst for dig: den mest tiltalende farve eller den, der er mest bæredygtig?
      </p>
    </div>
    <v-btn color="primary">
      Button
    </v-btn>
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

    <p>Valgt farve: {{ color }}</p>

    <!-- Gå frem pil -->
    <button class="nav-button right" @click="goForward">→</button>
  </div>
</template>

<script>
import { VBtn } from 'vuetify/lib/components'; // Import Vuetify button component

export default {
  name: 'BackgroundSelect',
  components: {
    VBtn, // Register Vuetify button component
  },
  data() {
    return {
      color: '#ffffff',
      colorOptions: [
        '#FF5733', '#FFBD33', '#DBFF33', '#75FF33', '#33FF57', '#33FFBD',
        '#33DBFF', '#3375FF', '#3357FF', '#5733FF', '#BD33FF', '#FF33DB'
      ],
      selectedIndex: 0,
      angleStep: 360 / 12,
      rotationAngle: 0,
      dragging: false,
      startAngle: 0,
      currentAngle: 0,
    };
  },
  methods: {
    rotateToColor(index) {
      this.selectedIndex = index;
      this.rotationAngle = -this.selectedIndex * this.angleStep;
      this.color = this.colorOptions[this.selectedIndex];
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
  color: #ffffff;
}

.info-box {
  color: #ffffff;
  border-radius: 10px;
  padding: 20px;
  margin-top: 20px;
  max-width: 600px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
  text-align: left;
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