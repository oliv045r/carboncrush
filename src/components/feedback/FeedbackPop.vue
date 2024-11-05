<template>
  <div class="container px-10 py-10" :style="containerStyles">
    <!-- Tekstsektion med fade-in-effekt -->
    <v-container :class="{ 'fade-in': textVisible }" class="text-container">
      <h1 class="title">Interessant valg, men ...</h1>
      <p>
        Mørkere farver som sort bruger typisk mindre energi på de fleste skærme, hvilket gør dem til et grønnere valg.
        <br> <br>
        På mange skærmtyper, især OLED (Organic Light Emitting Diode) skærme, bruger mørkere farver mindre energi, fordi hver pixel selv udsender lys. Når en pixel skal vise sort, er den i princippet slukket eller reduceret til minimal lysstyrke, hvilket reducerer energiforbruget.      </p>
    </v-container>

    <!-- GIF display section -->
    <div class="gif-container" v-if="textVisible">
      <img src="@/images/king-of-the-hill-jpeg.gif" alt="King Of The Hill Jpeg GIF" class="gif-image" />
    </div>
  
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'FeedbackPop',
  data() {
    return {
      textVisible: false, // Controls when the text and GIF should fade in
    };
  },
  mounted() {
    // Trigger fade-in effect for text
    setTimeout(() => {
      this.textVisible = true;
    }, 100);
  },
  computed: {
    ...mapState(['backgroundColor']), // Map the backgroundColor state from Vuex
    containerStyles() {
      return {
        backgroundColor: this.backgroundColor, // Use the backgroundColor from Vuex
      };
    },
  },
};
</script>

<style scoped>
/* Container styling */
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;}

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

/* GIF styling */
.gif-container {
  margin-top: 30px;
  text-align: center;
}

.gif-image {
  max-width: 50%; /* Responsive image */
  height: auto; /* Maintain aspect ratio */
}
</style>
