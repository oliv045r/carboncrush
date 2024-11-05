<template>
  <div class="container">
    <!-- Tekstsektion med fade-in-effekt -->
    <v-container :class="{ 'fade-in': textVisible }" class="text-container">
      <h1 class="title">Interessant valg, men ...</h1>
      <p>
        Når du vælger en skrifttype, der er integreret i HTML, kan det have en positiv indvirkning på din hjemmesides ydeevne. Websikre skrifttyper, som Arial, Verdana eller Georgia, er generelt lettere at indlæse, da de er tilgængelige på de fleste enheder uden behov for ekstra filoverførsler. 
        <br> <br>

        Dette sparer båndbredde og reducerer energiforbruget, når siden indlæses.
<br> <br>
Moderne skrifttyper, der skal downloades som webfonte, kan derimod øge belastningen på serveren og kræve mere tid og data at indlæse, hvilket kan føre til et højere CO2-aftryk. Dette gælder især for skrifttyper med mange vægte og stilarter, da hver variation kræver sin egen fil.
<br> <br>
Ved at vælge en simpel og effektiv skrifttype kan du dermed optimere din hjemmesides hastighed og bæredygtighed, hvilket i sidste ende hjælper med at reducere dens samlede CO2-aftryk. Gør dit valg med omtanke, og se, hvordan det kan gøre en forskel!
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
