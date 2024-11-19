<template>
  <div class="container" :style="containerStyles">
    <!-- Bølgeanimation af ikoner som vises inden resten af indholdet -->
    <div class="wave-container" v-if="!loadingFinished"> 
      <!-- Er med til at sikre at ikonerne kun vises indtil loadingFinished bliver true -->
      <img
        v-for="(icon, index) in Array(6)"  
        :key="index"
        :src="require(`@/images/broken_heart.png`)"
        alt="hjerte ikon"
        class="wave-icon"
        :style="{ animationDelay: `${index * 0.1}s` }" 
      /> <!-- Dette delay er med til at give bølge effekten -->
    </div>

    <!-- Denne container får også v-if loadingFinished da den skal vises når animationen er færdig med at loade ind. fadeIn sker når textVisible er true hvilket gør den fader gradvist ind -->
    <v-container v-if="loadingFinished" :class="{ fadeIn: textVisible }" class="text-container">
      <h1 class="title">JPG + Ikoner = 💔</h1>
      <p>
        Når du vælger ikonformat til din hjemmeside, er JPG ikke ligefrem en vinder. Det understøtter ikke gennemsigtighed, hvilket kan gøre dine grafiske elementer mindre elegante.
        <br /><br />
        Derudover er JPG ofte større i filstørrelse, hvilket betyder langsommere indlæsningstider og mere energiforbrug. Det er ikke bare dårligt for din side – det er også skidt for miljøet!
        <br /><br />
        Overvej i stedet PNG eller SVG: PNG giver skarpe detaljer med transparens, mens SVG er vektorbaseret og skaleres uden kvalitetstab. Gør dit valg med omtanke!
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
      </div>
    </v-container>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'FeedbackPopIconBad',
  components: {
    // Register the component
  },
  data() {
    return {
      iconSet: [
        { src: "home.jpg", alt: 'Icon by UIcons' },
        { src: "cart.jpg", alt: "Icon by UIcons" },
        { src: "calendar.jpg", alt: "Icon by UIcons" },
        { src: "likes.jpg", alt: "Icon by UIcons" }
      ], // Forskellige ikoner
      loadingFinished: false, // Kontrollerer synligheden af ikonerne
      textVisible: false, // Kontrollerer synligheden af teksten
    };
  },
  mounted() {
    setTimeout(() => {
      this.loadingFinished = true; // Vis tekst efter hjerte ikonerne er færdige
      this.fadeInText(); // Kalder metoden fadeInText
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
  0% { transform: translateY(0); opacity: 0; }
  50% { transform: translateY(-20px); opacity: 1; }
  100% { transform: translateY(0); opacity: 0; }
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
  width: 80px;
  height: auto;
  margin: 0 10px;
  opacity: 0;
  animation: fadeIn 0.8s ease forwards;
  animation-delay: 0;
}

@keyframes fadeIn {
  0% { opacity: 0; transform: scale(0.4); }
  100% { opacity: 1; transform: scale(1); }
}
</style>
