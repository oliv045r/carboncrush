<template>
  <div>
    <!-- Container der holder Speed Dial-menuen fast i øverste venstre hjørne -->
    <v-container fluid class="top-left-header">

      <!-- Speed Dial-menu, som åbner når brugeren holder musen over eller klikker på den -->
      <v-speed-dial v-model="fab" location="bottom left" transition="fade-transition" open-on-hover>
      <!--V-model bruges til at binde en data-egenskab til et element-->
        <!-- FAB-knap som fungerer som aktiveringsknap for Speed Dial -->
        <template v-slot:activator="{ props: activatorProps }">
          <v-fab v-bind="activatorProps" size="large" color="primary" icon="mdi-menu" class="main-fab"></v-fab>
        </template>

        <!-- Knappen til at gå tilbage til startsiden med en tooltip -->
        <v-tooltip text="Tilbage til start">
          <template v-slot:activator="{ props }">
            <v-btn key="1" icon="mdi-home" v-bind="props" @click="goToStartScreen" class="speed-dial-btn1"></v-btn>
          </template>
        </v-tooltip>

        <!-- Knappen til spilinformation med tooltip -->
        <v-tooltip text="Hjælp til spillet">
          <template v-slot:activator="{ props }"> <!--V-slot bruges til at indsætte indhold i et komponent. Named scoped slot 'activator' er indbygget i komponenten v-tooltip som sikrer at den vises korrekt-->
            <v-btn key="2" icon="mdi-information" v-bind="props" @click="goToGameInformation"
              class="speed-dial-btn2"></v-btn>
              <!-- key bruges til at identificere knappen så Vue kan genkende den. Ved at give hver knap en unik key sikrer jeg, at Vue ved præcist, hvilken knap der blev opdateret, tilføjet eller fjernet.-->
          </template>
        </v-tooltip>

        <!-- Knappen til at åbne artikler med tooltip -->
        <v-tooltip text="Læs artiklerne">
          <template v-slot:activator="{ props }">
            <v-btn key="3" icon="mdi-library" v-bind="props" @click="goToArticleLibrary"
              class="speed-dial-btn2"></v-btn>
          </template>
        </v-tooltip>

        <!-- Knappen til at nulstille spillet og starte forfra -->
        <v-tooltip text="Genstart / Nulstil valg">
          <template v-slot:activator="{ props }">
            <v-btn key="4" icon="mdi-reload" v-bind="props" @click="resetLocalStorage" class="speed-dial-btn2"></v-btn>
          </template>
        </v-tooltip>
        <!--Vi bruger v-slot:activator i stedet for manuelt at skulle bruge @mouseover og @mouseleave-->

      </v-speed-dial>
    </v-container>
  </div>
</template>

<script>
export default {
  name: 'TopNav', // komponent kan eksporteres og man kan bruge navnet TopNav

  data() {
    return {
      fab: false, // Styrer om Speed Dial-menuen er åben (true) eller lukket (false)
    };
  },
  methods: {
    // De forskellige metoder til at navigere til de forskellige sider
    goToStartScreen() {
      this.$router.push('/'); // Brug Vue Router til at navigere til startsiden
    },

    // Navigerer til spilinformationssiden
    goToGameInformation() {
      this.$router.push('/info'); // Naviger til GameInformation-ruten
    },

    // Navigerer til artikelbiblioteket
    goToArticleLibrary() {
      this.$router.push('/article-library'); // Naviger til Article Library-ruten
    },

    // Nulstiller brugerens valg og genstarter spillet
    resetLocalStorage() {
      // Fjerner specifikke elementer fra local storage
      localStorage.removeItem('backgroundColor');
      localStorage.removeItem('selectedFont');
      localStorage.removeItem('textColor');

      // Går til startsiden og opdaterer siden
      this.$router.push('/').then(() => {
        location.reload(); // Genindlæser siden for at anvende ændringer
      });
    },
  },
};
</script>

<style scoped>
/* Styling for containeren der holder Speed Dial fast i øverste venstre hjørne */
.top-left-header {
  position: fixed;
  top: 20px;
  left: 20px;
  max-width: 30px;
  z-index: 1000;
}

.main-fab {
  margin-bottom: 16px;
}

.speed-dial-btn1 {
  margin-top: 30px;
}

.speed-dial-btn1,
.speed-dial-btn2,
.speed-dial-btn3 {
  background-color: #f5f5f5;
  border-radius: 50%;
  transition: background-color 0.3s ease;
  left: 7px;
}

/* Hover-effekt for knapper */
.speed-dial-btn1:hover,
.speed-dial-btn2:hover {
  background-color: #e0e0e0;
}

:deep(.v-application__wrap) {
  min-height: fit-content;
}

:deep(.bg-primary) {
  background-color: black !important;
  color: #FFFFFF !important;
}
</style>
