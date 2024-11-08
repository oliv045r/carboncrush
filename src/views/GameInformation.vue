<!-- src/components/GameInformation.vue -->
<template>
  <v-container>
    <v-row>
      <v-col cols="12" class="text-center">
        <h1>Spilinformation</h1>
        <p>
          Velkommen til Carbon Crush! Denne side giver dig alle de oplysninger, du har brug for at komme i gang.
          Udforsk tips, gameplay-mekanik og ofte stillede spørgsmål for at forbedre din oplevelse.
        </p>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" md="6">
        <v-card class="mb-4">
          <v-card-title>Sådan Spiller Du</v-card-title>
          <v-card-text>
            I Carbon Crush er dit mål at reducere CO₂-udledninger ved at træffe strategiske valg.
            Når du navigerer gennem forskellige niveauer, vil du møde udfordringer, der kræver, at du tænker bæredygtigt.
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" md="6">
        <v-card class="mb-4">
          <v-card-title>Spiltips</v-card-title>
          <v-card-text>
            
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12">
        <v-card class="mb-4">
          <v-card-title>Ofte Stillede Spørgsmål (FAQs)</v-card-title>
          <v-card-text>
            <strong>Spørgsmål:</strong> Kan jeg spille niveauer igen for at forbedre min score?<br>
            <strong>Svar:</strong> Ja! Spil ethvert niveau igen for at sigte efter en højere score eller bedre CO₂-vurdering.<br><br>
            <strong>Spørgsmål:</strong> Er der en multiplayer-tilstand?<br>
            <strong>Svar:</strong> Lige nu er Carbon Crush kun for én spiller, men vi planlægger måske at tilføje multiplayer-funktioner i fremtiden!
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "GameInformation",
};
</script>

<style scoped>
h1 {
  font-size: 2em;
  margin-bottom: 0.5em;
}
</style>
