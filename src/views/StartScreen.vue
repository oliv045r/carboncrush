<template>
  <div>
    <!-- Start-skærm -->
    <div v-if="!isLoading" class="start-screen animate__animated animate__fadeIn">
      <div class="content">
        <h1>{{ title }}</h1>
        <p class="description">{{ description }}</p>

        <!-- Hvis brugernavn er gemt, vis velkomst og fortsæt spil -->
        <div v-if="savedUserName">
          <h2>Velkommen tilbage {{ savedUserName }}!</h2>
          <div class="button-container">
            <button @click="startGame" class="start-btn">Fortsæt spil</button>
            <button @click="resetUserData" class="reset-btn">Start forfra</button>
          </div>
        </div>

        <!-- Ellers inputboks til at indtaste navn -->
        <div v-else>
          <div class="input-container">
            <input 
              v-model="userName" 
              type="text" 
              :placeholder="savedUserName ? savedUserName : 'Indtast dit navn'" 
              class="name-input"
            />
          </div>

          <div class="button-container">
            <button @click="startGame" class="start-btn">Start spillet</button>
          </div>
        </div>
        
        <!-- "Sådan spiller du"-knappen vises altid -->
        <div class="button-container">
          <button @click="HowTo" class="howto-btn">Sådan spiller du</button>
        </div>
      </div>
    </div>

    <!-- Loading-skærm med glidende fade effekt -->
    <transition name="smooth-fade">
      <div v-if="isLoading" class="loading-screen">
        <h2>Hej {{ userName || savedUserName }}!</h2>
        <p>Er du klar til at designe din egen hjemmeside?</p>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'StartScreen',
  props: {
    title: {
      type: String,
      default: 'Carbon Crush'
    },
    description: {
      type: String,
      default: 'Ved du, hvad der skal til for at skabe bæredygtigt design? Sæt din viden på prøve, og oplev udfordringerne ved at designe en hjemmeside, der både er miljøvenlig og funktionel.'
    }
  },
  data() {
    return {
      userName: '', // Brugerens navn, som de indtaster
      savedUserName: '', // Gemmer brugerens navn fra serveren (hvis tilgængeligt)
      isLoading: false, // Loading state
    };
  },
  async created() {
    // Tjek om brugeren har et gemt navn på serveren (kan f.eks. via en brugersession eller API)
    const userId = localStorage.getItem('userId');
    if (userId) {
      try {
        const response = await fetch(`http://localhost:3000/api/users/${userId}`);
        if (response.ok) {
          const user = await response.json();
          this.savedUserName = user.name;
        }
      } catch (error) {
        console.error('Fejl ved hentning af bruger:', error);
      }
    }
  },
  methods: {
    // Start spillet og gem brugerens navn
    async startGame() {
      if (this.userName.trim() === '' && !this.savedUserName) {
        alert('Venligst indtast et navn!');
        return;
      }

      // Hvis brugeren har indtastet navn, gem det i backend
      if (this.userName.trim() !== '' && !this.savedUserName) {
        // Vis loading-skærm med personlig besked
        this.isLoading = true;

        try {
          // Vent kort tid, så brugeren kan se loading beskeden
          await new Promise(resolve => setTimeout(resolve, 2000)); // 2 sekunders forsinkelse

          // Send brugerens navn til API'en og gem det i databasen
          const response = await fetch('http://localhost:3000/api/users', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name: this.userName })
          });

          if (!response.ok) {
            throw new Error('Der opstod et problem med at gemme navnet.');
          }

          const data = await response.json();
          console.log('Navn gemt i databasen:', data);

          // Gem brugerens ID i Local Storage
          localStorage.setItem('userId', data.id);
          this.savedUserName = data.name;

          // Naviger til næste skærm efter loading
          this.isLoading = false; // Deaktiver loading før navigation
          this.$router.push('/background-select');
        } catch (error) {
          console.error('Fejl:', error);
          alert('Der opstod en fejl. Prøv igen.');
          this.isLoading = false;
        }
      } else {
        // Hvis navnet allerede er gemt (savedUserName), så fortsæt spillet
        this.$router.push('/background-select');
      }
    },

    // Naviger til "Sådan spiller du"
    HowTo() {
      this.$router.push('/info');
    },

    // Funktion til at slette brugerens data og starte forfra
    async resetUserData() {
      const userId = localStorage.getItem('userId');
      if (!userId) {
        alert('Ingen bruger fundet.');
        return;
      }

      try {
        // Slet brugerens data fra backend
        const response = await fetch(`http://localhost:3000/api/users/${userId}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          // Slet data fra LocalStorage
          localStorage.removeItem('userId');
          this.savedUserName = ''; // Fjern navnet fra den lokale state
          this.userName = ''; // Fjern navnet fra inputfeltet
          alert('Indtast dit navn igen!');
        } else {
          alert('Der opstod en fejl med at slette brugerdata.');
        }
      } catch (error) {
        console.error('Fejl ved sletning af brugerdata:', error);
        alert('Der opstod en fejl. Prøv igen.');
      }
    }
  }
};
</script>

<style scoped>
/* Styling for inputboks */
.input-container {
  margin-bottom: 20px;
}

.name-input {
  padding: 10px;
  font-size: 16px;
  width: 250px;
  margin: 0 auto;
  border: 2px solid #61dafb;
  color: #e0e0e0;
  border-radius: 4px;
  text-align: center;
  outline: none;
  transition: border-color 0.3s ease;
}

.name-input:focus {
  border-color: #21a1f1;
}

/* Øvrig styling */
.start-screen {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #282c34;
  color: #ffffff;
  text-align: center;
  padding: 20px; /* Tilføjet padding for at sikre, at indholdet ikke sidder helt op ad kanterne */
}

.content {
  max-width: 800px;
  padding: 20px;
  width: 100%;
}

h1 {
  font-size: 2.5em;
  margin-bottom: 0.5em;
  color: #61dafb;
}

.description {
  font-size: 1.1em;
  line-height: 1.6;
  margin: 0.5em 0;
  color: #e0e0e0;
  opacity: 0.9;
  text-align: center;
}

/* Styling for knapper */
.button-container {
  display: flex;
  flex-direction: column;
  align-items: center; /* Centrerer knapperne */
  gap: 30px; /* Øget gap mellem knapperne */
  margin-top: 30px;
}

/* Generel styling for knapper */
button {
  padding: 12px 24px;
  font-size: 16px;
  background-color: #61dafb;
  border: none;
  border-radius: 8px; /* Øget radius for rundere knapper */
  cursor: pointer;
  color: #282c34;
  transition: all 0.3s ease;
  width: 250px;
  margin: 0 auto;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* Skaber en let skyggeeffekt */
}

button:hover {
  background-color: #21a1f1;
  transform: translateY(-2px); /* Løfter knappen lidt op ved hover */
  box-shadow: 0 6px 10px rgba(0, 0, 0, 0.15); /* Øget skyggeeffekt ved hover */
}

button:focus {
  outline: none;
}

/* Loading-skærm styling */
.loading-screen {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #282c34;
  color: #61dafb;
  font-size: 2em;
  text-align: center;
  opacity: 1;
}

/* Transition for glidende fade effekt */
.smooth-fade-enter-active, .smooth-fade-leave-active {
  transition: opacity 0.6s ease-in-out;
}
.smooth-fade-enter-from, .smooth-fade-leave-to {
  opacity: 0;
}
</style>
