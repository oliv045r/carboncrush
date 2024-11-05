<template>
  <div class="container">
    <!-- Tekstsektion med fade-in-effekt -->
    <v-container :class="{ 'fade-in': textVisible }" class="text-container">
      <h1 class="title">De er alle gode valg, men</h1>
      <p>
        Når du vælger billedformat, skal du tænke over både kvalitet og filstørrelse – lidt som at
        finde den perfekte balance mellem stil og komfort. Klassiske formater som JPG og PNG klarer sig fint, men de
        nyere formater WEBP og AVIF giver både høj kvalitet og langt mindre filstørrelse.
        <br /><br />
        Det bedste valg af billedformat gør ikke kun din side hurtigere; det gør også en forskel for miljøet. Mindre
        filstørrelser betyder lavere energiforbrug, så du får en side, der både performer godt og er lidt grønnere.
      </p>
    </v-container>

    <!-- GIF display section -->
    <div class="gif-container" v-if="textVisible">
      <img src="@/images/king-of-the-hill-jpeg.gif" alt="King Of The Hill Jpeg GIF" class="gif-image" />
    </div>
  
  </div>
</template>

<script>
export default {
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
};
</script>

<style scoped>
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
