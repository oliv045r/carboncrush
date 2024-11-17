<template>
    <div>
      <!-- Dummy panel -->
      <div
        :class="['dummy-panel', { expanded: isExpanded }]"
        :style="{ backgroundColor: backgroundColor }"
      >
        <div class="news-article" :style="{ fontFamily }">
          <!-- Artikel header med overskrift og underoverskrift -->
          <header class="article-header">
            <h1 class="article-title">{{ title }}</h1>
            <h2 class="article-subtitle">{{ subtitle }}</h2>
            <p class="article-date">{{ date }}</p>
          </header>
  
          <!-- Billede relateret til artiklen -->
          <div class="article-image">
            <img :src="imageSrc" :alt="imageAlt" />
          </div>
  
          <!-- Artikel indhold -->
          <div class="article-body">
            <p v-for="(paragraph, index) in content" :key="index">
              {{ paragraph }}
            </p>
          </div>
  
          <!-- Afslutning med forfatter info eller opfordring -->
          <footer class="article-footer">
            <p>{{ footer }}</p>
          </footer>

          <!-- Ny knap under teksten -->
          <button class="under-text-btn" @click="onUnderTextButtonClick">Læs mere om emnet her!</button>
        </div>
        <!-- Lukke-knap -->
        <button class="close-btn" @click="togglePanel">×</button>
      </div>
  
      <!-- Åbn-knap -->
      <button class="toggle-dummy-btn" @click="togglePanel">
        {{ isExpanded ? "Luk forhåndsvisning" : "Se dit design" }}
      </button>
    </div>
  </template>
  
  <script>
  import { mapState } from "vuex";
  
  export default {
    name: "DummyContent",
    props: {
      fontFamily: {
        type: String,
        default: 'selectedFont',
      },
      title: {
        type: String,
        default: "Hvordan bæredygtige valg kan redde planeten",
      },
      subtitle: {
        type: String,
        default: "Få indsigt i de små handlinger, der gør en stor forskel",
      },
      date: {
        type: String,
        default: "15. november 2024",
      },
      imageSrc: {
        type: String,
        default: "https://via.placeholder.com/800x400",
      },
      imageAlt: {
        type: String,
        default: "Bæredygtighed",
      },
      content: {
        type: Array,
        default: () => [
          "I dagens verden er bæredygtighed ikke længere bare et buzzword – det er en nødvendighed.",
          "At vælge bæredygtige produkter, reducere energiforbrug og genbruge materialer er nogle af de måder, vi kan bidrage til en grønnere fremtid.",
          "Læs videre for at få flere tips til, hvordan du kan implementere bæredygtighed i din hverdag, og hvordan disse ændringer ikke kun er godt for miljøet, men også for din økonomi.",
        ],
      },
      footer: {
        type: String,
        default: "Skrevet af: Grøn Fremtid Teamet",
      },
    },
    computed: {
      ...mapState(["backgroundColor"]),
    },
    data() {
      return {
        isExpanded: false,
      };
    },
    methods: {
      togglePanel() {
        this.isExpanded = !this.isExpanded;
      },
      onPanelBottomButtonClick() {
        alert("Panelets knap blev klikket!");
      },
      onBottomPageButtonClick() {
        alert("Knap nederst på siden blev klikket!");
      },
      onUnderTextButtonClick() {
        alert("Knap under teksten blev klikket!");
      },
    },
  };
  </script>
  
  <style scoped>
  /* Dummy panel */
  .dummy-panel {
    position: fixed; /* Sørg for at panelet er "fixed" på siden, så det ikke påvirker andet indhold */
    top: 0;
    right: 0; /* Starter med at vise 10% på skærmen */
    width: 8%; /* Standard synlighed - 10% af skærmen */
    height: 100%;
    box-shadow: -5px 0 10px rgba(0, 0, 0, 0.2);
    z-index: 100; /* Sørg for, at panelet vises over andre elementer */
    border: 2px solid white; /* Border omkring panelet */
    border-radius: 10px;
    padding-left: 20px;
    transition: width 0.5s ease-in-out; /* Glide-effekt for bredden */
    overflow: hidden; /* Skjul det, der går uden for panelet */
    pointer-events: auto; /* Sørg for, at panelet kan interageres med */
  }
  
  .dummy-panel.expanded {
    width: 60%; /* Udvides til 60% af skærmen, når knappen trykkes */
    overflow: auto; /* Når det er udvidet, skal brugeren kunne scrolle indholdet */
  }
  
  /* Indholdsstyling */
  .news-article {
    width: 800px; /* Fastsat bredde for at forhindre, at indholdet tilpasses panelets bredde */
    text-align: left;
    padding: 20px;
  }
  
  .article-header {
    margin-bottom: 20px;
  }
  
  .article-title {
    font-size: 2.5rem;
    font-weight: bold;
  }
  
  .article-subtitle {
    font-size: 1.5rem;
    margin-top: 5px;
  }
  
  .article-date {
    font-size: 1rem;
    margin-top: 10px;
  }
  
  .article-image img {
    width: 60%;
    height: auto;
    border-radius: 8px;
    margin-top: 20px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
  
  .article-body p {
    line-height: 1.6;
    font-size: 1.1rem;
    margin-bottom: 20px;
  }
  
  .article-footer {
    margin-top: 40px;
    font-size: 1rem;
  }
  
  .article-footer p {
    margin: 5px 0;
  }

  /* Ny knap under teksten */
  .under-text-btn {
    margin-top: 20px;
    background-color: #3498db;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    font-size: 1rem;
    cursor: pointer;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }

  .under-text-btn:hover {
    background-color: #2980b9;
  }
  
  /* Lukke-knap */
  .close-btn {
    position: absolute;
    top: 10px;
    left: 10px;
    background: none;
    border: none;
    font-size: 1.5rem;
    color: #333;
    cursor: pointer;
    z-index: 110; /* Højere end panelet for at sikre synlighed */
  }
  
  /* Åbn-knap */
  .toggle-dummy-btn {
    position: fixed; /* Fast position, så knappen forbliver synlig uanset paneltilstand */
    top: 70%;
    right: 0;
    background-color: #3498db;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 5px 0 0 5px;
    font-size: 1.4rem;
    cursor: pointer;
    z-index: 110; /* Sørg for, at knappen vises over paneler og andre elementer */
    box-shadow: -3px 0 5px rgba(0, 0, 0, 0.2);
  }
  
  .toggle-dummy-btn:hover {
    background-color: #2980b9;
  }

 
  </style>
