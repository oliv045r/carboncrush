<!-- src/components/GameInformation.vue -->
<template>
    <v-container>
      <v-row>
        <v-col cols="12" class="text-center">
          <h1>Game Information</h1>
          <p>
            Welcome to Carbon Crush! This page provides all the information you need to get started.
            Explore tips, gameplay mechanics, and FAQs to enhance your experience.
          </p>
        </v-col>
      </v-row>
  
      <v-row>
        <v-col cols="12" md="6">
          <v-card class="mb-4">
            <v-card-title>How to Play</v-card-title>
            <v-card-text>
              In Carbon Crush, your goal is to reduce carbon emissions by making strategic choices.
              As you navigate different levels, you’ll face challenges that require you to think
              sustainably. Collect points, overcome obstacles, and aim for a low carbon footprint!
            </v-card-text>
          </v-card>
        </v-col>
  
        <v-col cols="12" md="6">
          <v-card class="mb-4">
            <v-card-title>Game Tips</v-card-title>
            <v-card-text>
              - Look for hidden bonuses that reward low-energy actions.<br>
              - Use resources wisely to avoid penalties.<br>
              - Keep an eye on the energy meter and adjust strategies accordingly.
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
  
      <v-row>
        <v-col cols="12">
          <v-card class="mb-4">
            <v-card-title>FAQs</v-card-title>
            <v-card-text>
              <strong>Q:</strong> How do I earn points?<br>
              <strong>A:</strong> Points are earned by completing tasks that reduce emissions.<br><br>
              <strong>Q:</strong> Can I replay levels to improve my score?<br>
              <strong>A:</strong> Yes! Replay any level to aim for a higher score or better carbon rating.<br><br>
              <strong>Q:</strong> Is there a multiplayer mode?<br>
              <strong>A:</strong> Currently, Carbon Crush is single-player, but we may add multiplayer features in the future!
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
  