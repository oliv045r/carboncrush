<template>
  <div class="container" :style="containerStyles">
    <!-- Bølgeanimation af ikoner som vises inden resten af indholdet -->
    <div class="wave-container" v-if="!loadingFinished"> 
      <!-- Er med til at sikre at ikonerne kun vises indtil loadingFinished bliver true -->
      <img 
        v-for="(icon, index) in icons" 
        :key="index"  
        :src="require(`@/images/heart.png`)" 
        alt="hjerte ikon"
        class="wave-icon" 
        :style="{ animationDelay: `${index * 0.1}s` }"  
      />
      <!-- Dette delay er med til at give bølge effekten og :key sørger for at alle ikoner har en unik nøgle. Dette afhjælper at der ikke åbner fejl i rækkefølgen af visningen-->
    </div>
    
    <!-- Denne container får også v-if loadingFinished da den skal vises når animationen er færdig med at loade ind. fadeIn sker når textVisible er true hvilket gør den fader gradvist ind -->
    <v-container v-if="loadingFinished" :class="{ fadeIn: textVisible }" class="text-container">
      <h1 class="title">Ikoner <strong>elsker</strong> SVG!</h1>
      <p>
        PNG fungerer godt til elementer der kræver gennemsigtighed og skarpe detaljer, hvilket gør det velegnet til
        typisk grafik. SVG er det absolut bedste valg til ikoner, da det er et vektorformat, hvilket betyder, at det kan skaleres
        uden tab af kvalitet. Dette gør SVG perfekt til både små og store skærme.
        <br /><br />
        Valget af format kan også påvirke bæredygtigheden. Mindre filstørrelser, som dem der typisk findes i
        SVG-filer, resulterer i hurtigere indlæsningstider, hvilket reducerer energi- og båndbreddeforbruget. Desuden
        mindsker skalerbarheden af SVG behovet for at gemme flere versioner af det samme ikon, hvilket sparer plads og
        energi i datacentrene.
      </p>

      <!-- Samme fade in effekt er givet til de fire ikoner i bunden -->
      <div class="icon-row" v-if="textVisible">
        <img 
          v-for="(icon, index) in iconSet" 
          :key="index"  
          :src="require(`@/images/${icon.src}`)" 
          :alt="icon.alt"
          class="additional-icon" 
          :style="{ animationDelay: `${index * 0.2}s` }"
        />
        <!-- :key Sørger for at hvert element har en unik key -->
      </div>
    </v-container>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
name: 'FeedbackPopIcon',
components: {
   // Register the component
},

data() {
  return {
    icons: Array(6).fill(0), // Array af seks elementer
    iconSet: [
      { src: "home.svg", alt: 'Icon by UIcons' },
      { src: "cart.svg", alt: "Icon by UIcons" },
      { src: "calendar.svg", alt: "Icon by UIcons" },
      { src: "likes.svg", alt: "Icon by UIcons" }
    ], // Forskellige ikoner
    loadingFinished: false, // Kontrollerer synligheden af ikonerne
    textVisible: false, // Kontrollerer synligheden af teksten
  };
},

mounted() {
  setTimeout(() => {
    this.loadingFinished = true; // Vis tekst efter hjerte ikonerne er færdige
    this.fadeInText(); // Kalde metoden fadeInText
  }, 2000); // Delay på 2 sekunder, så hjerte ikonerne kan nå at loade ind og forsvinde igen
},

methods: {
  fadeInText() {
    setTimeout(() => {
      this.textVisible = true; // Fade teksten ind efter hjerte ikonerne er færdige
    }, 300); // Delay på 300ms for at give tid til at fade effekten kan nå at loade ind
  },
},

computed: {
  ...mapState(['backgroundColor']), // Tager backgroundColor fra Vuex
  containerStyles() {
    return {
      backgroundColor: this.backgroundColor, // Tag backgroundColor fra Vuex
    };
  },
},
};
</script>

<style scoped>
body {
background: #fff;
margin: 0;
}

.container {
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
height: 100vh;
}
.popup-container {
position: absolute;
left: calc(10vw);
height: 800px;
top: calc(50vh - 400px);
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
width: 80vw;
}

.wave-container {
display: flex;
justify-content: center;
align-items: flex-end;
}

.wave-icon {
width: 50px;
height: auto;
margin: 0 5px;
opacity: 0;
animation: wave 1s ease-in-out forwards;
animation-delay: 0;
}

@keyframes wave {
0% {
  transform: translateY(0);
  opacity: 0;
}

50% {
  transform: translateY(-20px);
  opacity: 1;
}

100% {
  transform: translateY(0);
  opacity: 0;
}
}

.text-container {
text-align: center;
opacity: 0;
transition: opacity 1s ease;
max-width: 600px;
width: 100%;
}

.text-container.fadeIn {
opacity: 1;
}

.text-container[v-cloak] {
display: none;
}

.icon-row {
display: flex;
justify-content: space-between;
margin-top: 50px;
}

.additional-icon {
width: 60px;
height: auto;
margin: 0 10px;
opacity: 0;
animation: fadeIn 0.8s ease forwards;
animation-delay: 0;
}

@keyframes fadeIn {
0% {
  opacity: 0;
  transform: scale(0.4);
}

100% {
  opacity: 1;
  transform: scale(1);
}
}
</style>
