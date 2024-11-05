<template>
  <div class="container">
    <!-- Apply fade-in class with dynamic binding -->
    <v-container :class="{ 'fade-in': textVisible }" class="text-container">
      <h1 class="title">Godt valg!</h1>
      <p>
        Når du vælger ikonformat til din hjemmeside, er det vigtigt at overveje kvalitet, filstørrelse og bæredygtighed.
        JPG, PNG og SVG er almindeligt anvendte formater, men PNG og SVG er de bedste valg.
        <br /><br />
        PNG er ideelt til ikoner, der kræver gennemsigtighed og skarpe detaljer, hvilket gør det velegnet til grafiske elementer. SVG er det absolut bedste valg, da det er et vektorformat, hvilket betyder, at det kan skaleres ubegribeligt uden tab af kvalitet. Dette gør SVG perfekt til både små og store skærme.
        <br /><br />
        Valget af format kan også påvirke bæredygtigheden. Mindre filstørrelser, som dem der typisk findes i SVG-filer, resulterer i hurtigere indlæsningstider, hvilket reducerer energi- og båndbreddeforbruget. Desuden mindsker skalerbarheden af SVG behovet for at gemme flere versioner af det samme ikon, hvilket sparer plads og energi i datacentrene.
      </p>
    </v-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      textVisible: false, // Controls when the text should fade in
    };
  },
  mounted() {
    // Trigger the fade-in effect by setting textVisible to true after a short delay
    setTimeout(() => {
      this.textVisible = true;
    }, 100); // Small delay to ensure initial opacity is applied
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
  max-width: 600px;
  width: 100%;
}

/* Class that triggers fade-in effect */
.fade-in {
  opacity: 1; /* Fades to full opacity */
}
</style>
