<template>
   <div class="background-select animate__animated animate__fadeIn">
      <!-- Info sektion -->
      <v-card
         class="mx-auto px-10 py-10 rounded-lg elevation-0 bg-transparent"
         max-width="600">
         <v-card-title class="text-h4 font-weight-bold">Vælg animationsgrad</v-card-title>
         <v-card-text> Hold musen over knapperne for at se de forskellige animationer. Den første knap har den mindst iøjnefaldende animation, mens den sidste knap har den mest markante animation. </v-card-text>
      </v-card>
      <div class="info-section">
         <!-- Knapper med forskellige animationer -->
         <div class="button-container">
            <button
               class="animated-button button1"
               :class="{ active: activeButton === 'button1' }"
               @click="setActiveButton('button1')"
               aria-label="Vælg minimal animation">
               Knap 1
            </button>
            <button
               class="animated-button button2"
               :class="{ active: activeButton === 'button2' }"
               @click="setActiveButton('button2')"
               aria-label="Vælg medium animation">
               Knap 2
            </button>
            <button
               class="animated-button button3"
               :class="{ active: activeButton === 'button3' }"
               @click="setActiveButton('button3')"
               @mouseover="bounceButton"
               aria-label="Vælg stor animation">
               Knap 3
            </button>
            <button
               class="animated-button button4"
               :class="{ active: activeButton === 'button4' }"
               @click="setActiveButton('button4')"
               aria-label="Vælg maksimal animation">
               Knap 4
            </button>
         </div>
      </div>
      <v-btn
         class="mt-10"
         @click="
            showFeedbackPopup = true;
            updateShowNextButton(true);
         "
         color="primary"
         aria-label="Næste"
         >Next</v-btn
      >
   </div>
   <FeedbackPop
      v-if="showFeedbackPopup"
      @close="showFeedbackPopup = false"
      :title="feedbackTitle"
      :content="feedbackContent"
      :imageUrl="feedbackImageUrl">
   </FeedbackPop>
</template>

<script>
import { mapActions, mapState } from "vuex";
import FeedbackPop from "@/components/feedback/FeedbackPop.vue";

export default {
   components: {
      FeedbackPop,
   },
   data() {
      return {
         showFeedbackPopup: false, // Kontrollerer synligheden af popup
         feedbackTitle: "Spændende!", // Titel til FeedbackPop
         feedbackContent:
            "Når du vælger animationer til din hjemmeside, er det vigtigt at balancere visuel effekt og ydeevne. Flere animationer kan se godt ud, men kan også belaste systemet og øge indlæsningstiden. For mange animationer kan påvirke både ydeevne og bæredygtighed, så vælg en passende mængde for en bedre brugeroplevelse og mindre energiforbrug.", // Indhold til FeedbackPop
         feedbackImageUrl: require("@/images/AnimationMeme3.png"), // Billede URL til FeedbackPop
         activeButton: null, // Sporer den aktive knap
      };
   },
   computed: {
      ...mapState(["showNextButton"]),
   },
   methods: {
      ...mapActions(["updateSelectedFont", "updateShowNextButton"]),

      goBack() {
         this.$router.push("/"); // Navigerer tilbage til hovedsiden
      },
      goForward() {
         this.$router.push("/another-route"); // Navigerer til en anden side
      },
      bounceButton(event) {
         const button = event.target;
         button.classList.remove("bounce"); // Fjerner bounce-animationen
         void button.offsetWidth; // Tvinger reflow for at genstarte animationen
         button.classList.add("bounce"); // Tilføjer bounce-animationen
      },
      setActiveButton(button) {
         this.activeButton = button; // Sætter den aktive knap
      },
   },
};
</script>

<style scoped>
.background-select {
   height: 100vh;
   width: 100vw;
   display: flex;
   flex-direction: column;
   align-items: center;
   justify-content: center;
}

.info-section {
   text-align: center;
   max-width: 600px;
}

.description {
   font-size: 1.1em;
   line-height: 1.6;
   margin: 1em 0;
}

.button-container {
   display: flex;
   gap: 10px;
   justify-content: center;
}

.animated-button {
   margin: 0 5px; /* Afstand mellem knapperne */
   padding: 10px 20px;
   font-size: 16px;
   background-color: #e0e0e0;
   border: none;
   border-radius: 4px;
   cursor: pointer;
   transition: all 0.3s ease;
}

.animated-button.active {
   background-color: #6fa3ef; /* Ændrer baggrundsfarven for den aktive knap */
}

.button1:hover {
   transform: scale(1.05); /* Skalerer knappen ved hover */
}

.button2 {
   position: relative;
   display: inline-block;
   padding: 10px 20px;
   border: none;
   background-color: #e0e0e0;
   cursor: pointer;
   overflow: hidden;
   transition: all 0.3s ease;
}

.button2::after {
   content: "";
   position: absolute;
   top: 0;
   left: -100%;
   width: 100%;
   height: 100%;
   clip-path: polygon(10% 0, 70% 0, 90% 100%, 30% 100%);
   background-color: rgba(255, 255, 255, 0.6);
   transition: all 300ms ease;
}

.button2:hover::after {
   left: 100%;
}

.button2:hover {
   transform: scale(1.1);
}

.button3.bounce {
   animation: bounce 1s;
}

.button4 {
   position: relative;
   display: inline-block;
   padding: 10px 20px;
   border: none;
   background-color: #e0e0e0;
   cursor: pointer;
   --angle: 0deg; /* Initial vinkel */
}

.button4::before {
   content: "";
   position: absolute;
   top: -4px;
   left: -4px;
   right: -4px;
   bottom: -4px;
   border: 4px solid transparent; /* Oprindeligt transparent */
   pointer-events: none; /* Forhindrer interaktion med pseudo-elementet */
}

.button4:hover {
   transform: scale(1.2); /* Skalerer knappen ved hover */
   animation: rotate-gradient 2s linear infinite; /* Animerer gradienten */
}

.button4:hover::before {
   border-image: conic-gradient(from var(--angle), red, yellow, lime, aqua, blue, magenta, red) 1; /* Anvender en konisk gradient som kant */
   animation: rotate 2s linear infinite; /* Animerer rotationen af gradienten */
}

@keyframes rotate {
   to {
      --angle: 360deg; /* Roterer pseudo-elementet */
   }
}

@property --angle {
   syntax: "<angle>"; /* Definerer syntaksen for CSS-egenskaben */
   initial-value: 0deg; /* Initial værdi */
   inherits: false; /* Egenskaben arves ikke */
}

@keyframes bounce {
   0%,
   20%,
   80%,
   100% {
      transform: translateY(0);
   }
   30% {
      transform: translateY(-20px);
   }
   60% {
      transform: translateY(-25px);
   }

   90% {
      transform: translateY(-5px);
   }
}

.nav-button {
   background-color: transparent;
   border: none;
   color: #333333;
   font-size: 2rem;
   cursor: pointer;
   position: absolute;
   top: 50%;
   transform: translateY(-50%);
}

.left {
   left: 20px;
}

.right {
   right: 20px;
}
</style>
