<template>
  <div>
    <v-container fluid class="top-left-header">
      <!-- Vi har placeret den i en v-container for at sikre responsitivt og at den forbliver i top-left hjørne-->
      <v-speed-dial v-model="fab" location="bottom left" transition="fade-transition" open-on-hover>
        <template v-slot:activator="{ props: activatorProps }">
          <!-- v-slot:activator er en måde at "låne" nogle specielle indstillinger (props) til en knap -->
          <v-fab v-bind="activatorProps" size="large" color="primary" icon="mdi-menu" class="main-fab"></v-fab>
        </template>
        <v-tooltip text="Tilbage til start">
          <template v-slot:activator="{ props }">
            <v-btn key="1" icon="mdi-home" v-bind="props" @click="goToStartScreen" class="speed-dial-btn1"></v-btn>
          </template>
        </v-tooltip>

        <v-tooltip text="Hjælp til spillet">
          <template v-slot:activator="{ props }">
            <v-btn key="2" icon="mdi-information" v-bind="props" @click="goToGameInformation"
              class="speed-dial-btn2"></v-btn>
          </template>
        </v-tooltip>

        <!-- Button to go to articles-->
        <v-tooltip text="Læs artiklerne">
          <template v-slot:activator="{ props }">
            <v-btn key="3" icon="mdi-library" v-bind="props" @click="goToArticleLibrary"
              class="speed-dial-btn2"></v-btn>
          </template>
        </v-tooltip>
        <!-- Button to go to reset game and return to start-->
        <v-tooltip text="Genstart / Nulstil valg">
          <template v-slot:activator="{ props }">
            <v-btn key="3" icon="mdi-reload" v-bind="props" @click="resetLocalStorage" class="speed-dial-btn2"></v-btn>
          </template>
        </v-tooltip>

      </v-speed-dial>
    </v-container>
  </div>
</template>

<script>

export default {
  name: 'TopNav',

  data() {
    return {
      fab: false, // sætter fab til false som standard
    };
  },
  methods: {
    goToStartScreen() {
      this.$router.push('/'); // Navigate til StartScreen route
    },
    goToGameInformation() {
      this.$router.push('/info'); // Navigate tilGameInformation route
    },
    goToArticleLibrary() {
      this.$router.push('/article-library'); // Navigate til GameInformation route
    },
    resetLocalStorage() {
      // Clear cache fra lokal storage
      localStorage.removeItem('backgroundColor');
      localStorage.removeItem('selectedFont');
      localStorage.removeItem('textColor');

      this.$router.push('/').then(() => {
        location.reload(); // Refresh the page
      });
    },
  },
};
</script>

<style scoped>
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

/* Styling for the buttons within the speed dial */
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