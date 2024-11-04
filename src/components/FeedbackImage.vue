<template>
  <div class="container">
    <button class="nav-button left" @click="goBack">←</button>
    <!-- Apply fade-in class with dynamic binding -->
    <v-container :class="{ 'fade-in': textVisible }" class="text-container">
      <h1 class="title">De er alle gode valg, men ...</h1>
      <p>
        Når du vælger billedformat til din hjemmeside, er det vigtigt at tænke på kvalitet og filstørrelse, og med det blotte øje er der sjældent forskel på formaterne. Formater som JPEG og PNG er almindeligt anvendte, men nyere formater som WEBP og AVIF tilbyder bedre kompression og kvalitet.
        <br /><br />
        JPEG er ideelt til fotografier og giver en god balance mellem størrelse og kvalitet, mens PNG er bedre til billeder med gennemsigtighed. WEBP og AVIF kan reducere filstørrelserne betydeligt, hvilket forbedrer indlæsningstiderne og sparer båndbredde.
        <br /><br />
        Det rigtige valg kan også påvirke tilgængeligheden, da hurtigere indlæsning giver en bedre brugeroplevelse. Vær opmærksom på, hvordan dit valg kan optimere både ydeevne og bæredygtighed. Gør dit valg med omtanke!
      </p>
    </v-container>

    <!-- Polaroid images with staggered fade-in effect -->
    <div class="polaroids" v-if="textVisible">
      <div
        v-for="(image, index) in images"
        :key="index"
        class="polaroid"
        :style="{ 
          transform: `rotate(${Math.random() * 10 - 5}deg)`, 
          transitionDelay: `${index * 0.5}s`, // Delay for staggered effect
          opacity: polaroidVisible[index] ? 1 : 0 // Control opacity based on visibility
        }"
        @transitionend="handleTransitionEnd"
      >
        <img :src="image" alt="Polaroid Image" />
      </div>
    </div>
    <button class="nav-button right" @click="goForward">→</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      textVisible: false, // Controls when the text and images should fade in
      images: [
        require('@/images/polaroid1.png'), // Adjust the path to your images
        require('@/images/polaroid2.png'),
        require('@/images/polaroid3.png'),
        require('@/images/polaroid4.png'),
      ],
      polaroidVisible: [false, false, false, false], // Control visibility of each polaroid
    };
  },
  mounted() {
    // Trigger the fade-in effect for text
    setTimeout(() => {
      this.textVisible = true;
      this.showPolaroids(); // Start showing polaroids after text
    }, 100);
  },
  methods: {
    showPolaroids() {
      this.images.forEach((_, index) => {
        setTimeout(() => {
          this.polaroidVisible[index] = true; // Directly modify the array for visibility
        }, index * 500); // Show each polaroid with a 500ms interval
      });
    },
    handleTransitionEnd() {
      // No specific action needed at the moment
    },
    goBack() {
        this.$router.push('/image-format');
      },
      goForward() {
        this.$router.push('/icon-format');
      }
  },
};
</script>

<style scoped>
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
/* Container styling */
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
}

/* Initial hidden state */
.text-container {
  text-align: center;
  opacity: 0; /* Start hidden */
  transition: opacity 1s ease; /* Smooth fade-in */
  width: 100%;
  max-width: 700px;
}

/* Class that triggers fade-in effect */
.fade-in {
  opacity: 1; /* Fades to full opacity */
}

/* Polaroid styling */
.polaroids {
  position: relative;
  display: flex;
  justify-content: center; /* Center the polaroids */
  margin-top: 30px;
}

.polaroid {
  position: relative; /* Change to relative to allow slight overlap */
  margin: 0 -15px; /* Negative margin to overlap slightly */
  width: 200px; /* Adjust width as necessary */
  height: auto; /* Auto height based on the image aspect ratio */
  opacity: 0; /* Start hidden */
  transition: opacity 0.5s ease; /* Smooth fade-in for each polaroid */
}

.polaroid img {
  width: 100%; /* Full width of the polaroid container */
  border-radius: 5px; /* Optional rounded corners */
}
</style>
