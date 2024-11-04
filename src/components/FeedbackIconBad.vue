<template>
     <div>
      <AppHeader />
  <div class="container">
    <div class="wave-container" v-if="!loadingFinished">
      <img
        v-for="(icon, index) in icons"
        :key="index"
        :src="require(`@/images/broken_heart.png`)"
        alt="Wave Icon"
        class="wave-icon"
        :style="{ animationDelay: `${index * 0.1}s` }"
      />
    </div>
    <v-container v-if="loadingFinished" :class="{ fadeIn: textVisible }" class="text-container">
      <h1 class="title">JPG + Ikoner = 💔</h1>
<p>
  Når du vælger ikonformat til din hjemmeside, er JPG ikke ligefrem en vinder. Det understøtter ikke gennemsigtighed, hvilket kan gøre dine grafiske elementer mindre elegante.
  <br /><br />
  Derudover er JPG ofte større i filstørrelse, hvilket betyder langsommere indlæsningstider og mere energiforbrug. Det er ikke bare dårligt for din side – det er også skidt for miljøet!
  <br /><br />
  Overvej i stedet PNG eller SVG: PNG giver skarpe detaljer med transparens, mens SVG er vektorbaseret og skaleres uden kvalitetstab. Gør dit valg med omtanke!
</p>

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
  </div>
</template>

<script>
 // Import the AppHeader component at the top
 import AppHeader from '@/components/TopNav.vue'; // Adjust the path based on your file structure
  export default {
    components: {
    AppHeader // Register the component
  },
  data() {
    return {
      icons: Array(6).fill(0), // Initial wave icons
      iconSet: [
        { src: "home.svg", alt: 'Icon by UIcons' },
        { src: "cart.svg", alt: "Icon by UIcons" },
        { src: "calendar.svg", alt: "Icon by UIcons" },
        { src: "likes.svg", alt: "Icon by UIcons" }
      ], // Different icons with alt text
      loadingFinished: false, // Control when to show the text
      textVisible: false, // Control when to fade in the text and icons
    };
  },
  mounted() {
    setTimeout(() => {
      this.loadingFinished = true; // Show text container
      this.fadeInText(); // Call fade in text function
    }, 2000); // Adjust time until text appears
  },
  methods: {
    fadeInText() {
      setTimeout(() => {
        this.textVisible = true; // Fade in text after a slight delay
      }, 300); // Delay for 300ms after the icons finish
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
