<template>
    <div :style="{ backgroundColor: color }" class="background-select animate__animated animate__fadeIn">
      <!-- Gå tilbage pil -->
      <button class="nav-button left" @click="goBack">←</button>
  
      <!-- Info boks til baggrundsfarve valg -->
      <div class="info-box" :style="{ backgroundColor: darkenColor(color, 20) }">
        <h2>Vælg baggrundsfarve</h2>
        <p>
          Baggrundsfarven spiller en afgørende rolle for din hjemmesides visuelle identitet. Den kan tilføre personlighed og stemning, men den kan også have en indflydelse på energiforbruget. Er du klar over, hvilken baggrundsfarve der er mest effektiv, når det kommer til energibesparelse?
        </p>
        <p>
          Når du vælger baggrundsfarve, skal du overveje, om du skal prioritere æstetik over funktionalitet. Hvad er vigtigst for dig: den mest tiltalende farve eller den, der er mest bæredygtig?
        </p>
      </div>
  
      <div class="color-options">
        <div
          v-for="(colorOption, index) in colorOptions"
          :key="index"
          :style="{ backgroundColor: colorOption }"
          class="color-swatch"
          @click="selectColor(colorOption)"
        ></div>
      </div>
  
      <p>Valgt farve: {{ color }}</p>
  
      <!-- Gå frem pil -->
      <button class="nav-button right" @click="goForward">→</button>
    </div>
  </template>
  
  <script>
  export default {
    name: 'BackgroundSelect',
    data() {
      return {
        color: '#ffffff', // Standardfarve
        colorOptions: [
          '#FF5733', '#FFBD33', '#DBFF33', '#75FF33', '#33FF57', '#33FFBD',
          '#33DBFF', '#3375FF', '#3357FF', '#5733FF', '#BD33FF', '#FF33DB',
          '#FF33A6', '#FF3357', '#FF33A1', '#333333', '#FFFFFF', '#FFCC00',
          '#FF6699', '#CCFF33', '#6699FF'  // Liste over farver
        ],
      };
    },
    methods: {
      selectColor(selectedColor) {
        this.color = selectedColor; // Opdater den valgte farve
      },
      darkenColor(hex, percent = 20) {
        // Fjern # fra hex, hvis tilstede
        hex = hex.replace('#', '');
        // Konverter hex til RGB
        let r = parseInt(hex.substring(0, 2), 16);
        let g = parseInt(hex.substring(2, 4), 16);
        let b = parseInt(hex.substring(4, 6), 16);
        
        // Mørk farven ved at reducere RGB værdierne baseret på percent
        r = Math.max(0, r - Math.round((percent / 100) * 255));
        g = Math.max(0, g - Math.round((percent / 100) * 255));
        b = Math.max(0, b - Math.round((percent / 100) * 255));
        
        // Konverter RGB tilbage til hex
        const newHex = `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
        return newHex;
      },
      goBack() {
        this.$router.push('/'); // Naviger tilbage til startsiden
      },
      goForward() {
        this.$router.push('/another-route'); // Erstat '/another-route' med din ønskede rute
      }
    }
  };
  </script>
  
  <style scoped>
  .background-select {
    height: 100vh; /* Gør at baggrunden fylder hele skærmen */
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: #ffffff; /* Ændre tekstfarve hvis nødvendigt */
  }
  
  .info-box {
    color: #ffffff; /* Tekstfarve */
    border-radius: 10px; /* Rundede kanter */
    padding: 20px; /* Indvendig afstand */
    margin-top: 20px; /* Plads over info boksen */
    max-width: 600px; /* Maksimal bredde på boksen */
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3); /* Skyggeeffekt */
    text-align: left; /* Venstrejustering af teksten */
  }
  
  .color-options {
    display: flex;
    flex-wrap: wrap; /* Gør det muligt at have flere rækker */
    justify-content: center; /* Centerer farvevalgene */
    margin-top: 20px; /* Plads mellem overskrift og farver */
    max-width: 400px; /* Maksimal bredde for farvevalg */
  }
  
  .color-swatch {
    width: 50px; /* Bredde på hver farveprøve */
    height: 50px; /* Højde på hver farveprøve */
    margin: 5px; /* Plads mellem prøverne */
    cursor: pointer; /* Pointer cursor når musen svæver over */
    border: 2px solid transparent; /* Standard kant */
    transition: border-color 0.3s; /* Blød overgang for kantfarve */
  }
  
  .color-swatch:hover {
    border-color: #ffffff; /* Hvid kant når man hover over */
  }
  
  .nav-button {
    background-color: transparent; /* Transparent baggrund */
    border: none; /* Ingen kant */
    color: #ffffff; /* Hvid tekstfarve */
    font-size: 2rem; /* Størrelse af pilene */
    cursor: pointer; /* Pointer cursor */
    position: absolute; /* Absolut positionering */
    top: 50%; /* Centrere lodret */
    transform: translateY(-50%); /* Juster for midten */
  }
  
  .left {
    left: 20px; /* Placer til venstre */
  }
  
  .right {
    right: 20px; /* Placer til højre */
  }
  </style>