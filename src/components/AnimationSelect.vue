<template>
  <div class="background-select animate__animated animate__fadeIn">
    <!-- Info sektion -->
    <div class="info-section">
      <h1>Vælg Animation</h1>
      <p class="description">
        Vælg en knap for at se forskellige hover-animationer. Den første knap har mindst animation, og den sidste knap har mest animation.
      </p>

      <!-- Knapper med forskellige animationer -->
      <div class="button-container">
        <button class="animated-button button1">Knap 1</button>
        <button class="animated-button button2">Knap 2</button>
        <button class="animated-button button3" @click="bounceButton">Knap 3</button>
        <button class="animated-button button4">Knap 4</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    goBack() {
      this.$router.push('/');
    },
    goForward() {
      this.$router.push('/another-route');
    },
    bounceButton(event) {
      const button = event.target;
      button.classList.remove('bounce'); // Reset animation
      void button.offsetWidth; // Trigger reflow to restart animation
      button.classList.add('bounce');
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

.button-container {
  display: flex;
  gap: 10px;
  justify-content: center;
}

.animated-button {
  flex: 1; /* Giver knapperne ligelig plads */
  margin: 0 5px; /* Afstand mellem knapperne */
  padding: 10px 20px;
  font-size: 16px;
  background-color: #e0e0e0;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.button1:hover {
  transform: scale(1.05);
}

.button2 {
  position: relative;
  display: inline-block;
  padding: 10px 20px;
  border: none;
  background-color: #e0e0e0;
  cursor: pointer;
  overflow: hidden; /* Added overflow hidden */
  transition: all 0.3s ease;
}

.button2::after {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  clip-path: polygon(10% 0, 70% 0, 90% 100%, 30% 100%);
  background-color: rgba(255, 255, 255, 0.6);
  transition: all 300ms ease;
}

.button2:hover::after {
  left: 100%;
}

.button2:hover {
  transform: scale(1.1);
  background-color: #f0f0f0;
}

.button3.bounce {
  animation: bounce 1s;
}

.button4 {
  position: relative;
  display: inline-block;
  padding: 10px 20px;
  border: none;
  background-color: #e0e0e0;
  cursor: pointer;
  --angle: 0deg; /* Initial angle */
}

.button4::before {
  content: '';
  position: absolute;
  top: -4px;
  left: -4px;
  right: -4px;
  bottom: -4px;
  border: 4px solid transparent; /* Initially transparent */
  pointer-events: none;
}

.button4:hover {
  transform: scale(1.2);
  animation: rotate-gradient 2s linear infinite;
}

.button4:hover::before {
  border-image: conic-gradient(from var(--angle), red, yellow, lime, aqua, blue, magenta, red) 1;
  animation: rotate 2s linear infinite;
}



@keyframes rotate {
  to {
    --angle: 360deg;
  }
}

@property --angle {
  syntax: '<angle>';
  initial-value: 0deg;
  inherits: false;
}

@keyframes bounce {
  0%, 20%, 80%, 100% {
    transform: translateY(0);
  }
  30% {
    transform: translateY(-40px);
  }
  60% {
    transform: translateY(-50px);
  }
  
  90% {
    transform: translateY(-10px);
  }
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