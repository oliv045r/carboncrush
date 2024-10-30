<template>
  <div :style="{ backgroundColor: color }" class="background-select animate__animated animate__fadeIn">
    <!-- Gå tilbage pil -->
    <v-btn class="position-absolute left-20 left" @click="goBack">←</v-btn>
    <!-- Info boks til baggrundsfarve valg -->

    <v-card class="mx-auto mb-15 px-10 py-10 rounded-lg elevation-4 bg-grey" max-width="600" title="Vælg skrifttype" text="Tid til at vælge baggrundsfarven for din hjemmeside! Din farvebeslutning har faktisk betydning for bæredygtigheden: forskellige farver bruger forskellige mængder energi, når de vises på skærmen."></v-card>

    <!-- Circular color carousel -->
    <div></div>
    </div>

    <p>Valgt font: {{ color }}</p>

    <!-- Gå frem pil -->
    <v-btn class="position-absolute left-20 right" @click="goForward">→</v-btn>

</template>

<script>
import { VBtn } from 'vuetify/lib/components'; // Import Vuetify button component
import { VCard } from 'vuetify/lib/components'; // Import Vuetify button component


export default {
  name: 'FontSelect',
  components: {
    VBtn,
    VCard, // Register Vuetify button component
  },
  data() {
    return {
    };
  },
  methods: {
    goBack() {
      this.$router.push('/background-select');
    },
    goForward() {
      this.$router.push('/another-route');
    }
  }
};
</script>

<style scoped>
.background-select {
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #ffffff;
}


.left {
  left: 20px;
}

.right {
  right: 20px;
}
</style>