<template>
    <v-container class="d-flex justify-center align-center" fluid>
      <v-row class="text-center" justify="center">
        <v-col cols="12" class="text-center mb-4">
          <h1 class="font-weight-bold">Godt valg!</h1>
        </v-col>
  
        <v-col cols="10" md="8" lg="6" class="text-center">
          <div class="info-section">
            <p class="description">
              Når du vælger fontfarve, er det vigtigt at tage hensyn til både læsbarhed og tilgængelighed.
              Den rette farve kan gøre en stor forskel i brugeroplevelsen, uanset hvilken baggrundsfarve der er valgt.
            </p>
            <p class="description">
              For at sikre optimal læsbarhed er det vigtigt at skabe en god kontrast mellem tekst og baggrund.
              En høj kontrast, såsom mørk tekst på en lys baggrund, forbedrer læsbarheden for de fleste brugere,
              herunder dem med synsnedsættelser. Det anbefales at følge retningslinjerne for kontrastforhold,
              der hjælper med at sikre, at dit indhold er tilgængeligt for alle.
            </p>
            <p class="description">
              Det er også vigtigt at overveje, at lysere farver typisk kræver mere energi at vise på skærme,
              især på OLED-enheder. Derfor kan det være en god idé at vælge mørkere farver, da de kan spare energi
              og reducere dit hjemmesides CO2-aftryk.
            </p>
            <p class="description">
              Husk, at tilgængelighed ikke kun handler om visuel læsbarhed; det handler også om at skabe en oplevelse,
              hvor alle kan interagere med dit indhold effektivt. Ved at vælge en fontfarve, der både er visuelt tiltalende
              og energieffektiv, kan du forbedre din hjemmesides ydeevne og samtidig sikre, at den er tilgængelig for
              alle brugere. Gør dit valg med omtanke!
            </p>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  <script>
  export default {
    methods: {
      goLeft() {
        console.log("Left arrow clicked");
      },
      goRight() {
        console.log("Right arrow clicked");
      }
    }
  };
  </script>
  
  <style scoped>
  h1 {
    font-size: 2.5rem;
    font-weight: 700;
    color: #4A4A4A;
    margin-bottom: 1rem;
  }
  
  .info-section {
    max-width: 800px; /* Maksimal bredde for info-sektionen */
    margin: 0 auto; /* Centrerer sektionen horisontalt */
  }
  
  .description {
    font-size: 1.1rem;
    line-height: 1.6;
    margin: 1em 0;
    color: #666666;
  }
  
  .v-icon {
    font-size: 2rem;
    cursor: pointer;
    color: #007BFF; /* Primær farve for ikoner */
    transition: color 0.3s; /* Glidende farveovergang */
  }
  
  .v-icon:hover {
    color: #0056b3; /* Mørkere farve ved hover-effekt */
  }
  </style>
  