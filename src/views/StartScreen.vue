<template>
  <div class="start-screen animate__animated animate__fadeIn">
    <div class="content">
      <h1>{{ title }}</h1>
      <p class="description">{{ description }}</p>

      <!-- Velkomstbesked eller input til brugernavn -->
      <div class="input-container">
        <template v-if="userExists">
          <p class="welcome-message">Velkommen tilbage, {{ username }}!</p>
        </template>
        <template v-else>
          <input type="text" v-model="username" placeholder="Indtast dit navn" class="username-input" />
        </template>
      </div>

      <!-- Start spillet og knapper -->
      <div class="button-container">
        <!-- Hvis brugeren allerede findes -->
        <button v-if="userExists" @click="navigateToGame" class="start-btn">
          Fortsæt spillet
        </button>
        <button v-if="userExists" @click="deleteUser" class="reset-btn">
          Slet bruger og start forfra
        </button>

        <!-- Hvis brugeren ikke findes -->
        <button v-if="!userExists" @click="startGame" class="start-btn">Start spillet</button>
        <button @click="HowTo" class="howto-btn">Sådan spiller du</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "StartScreen",
  data() {
    return {
      username: "", // Brugernavn fra inputfeltet eller localStorage
      userExists: false, // Holder styr på, om der allerede er en bruger
    };
  },
  props: {
    title: {
      type: String,
      default: "Carbon Crush",
    },
    description: {
      type: String,
      default:
        "Ved du, hvad der skal til for at skabe bæredygtigt design? Sæt din viden på prøve, og oplev udfordringerne ved at designe en hjemmeside, der både er miljøvenlig og funktionel. Klarer du balancen mellem æstetik, brugervenlighed og bæredygtighed?",
    },
  },
  created() {
    // Tjek om der allerede er gemt et brugernavn og bruger-ID
    const storedUsername = localStorage.getItem("username");
    const storedUserId = localStorage.getItem("user_id");

    if (storedUsername && storedUserId) {
      this.username = storedUsername;
      this.userExists = true; // Sæt userExists til true, hvis brugerdata findes
    }
  },
  methods: {
    async startGame() {
      if (!this.username.trim()) {
        alert("Indtast venligst dit navn for at starte spillet!");
        return;
      }

      try {
        // Send brugernavn til backend
        const response = await axios.post("http://localhost:3000/api/users", {
          username: this.username,
        });

        // Gem brugerdata i localStorage
        localStorage.setItem("username", this.username);
        localStorage.setItem("user_id", response.data.id);

        console.log("Bruger oprettet eller fundet:", response.data);

        // Naviger til næste skærm
        this.$router.push("/background-select");
      } catch (error) {
        console.error("Fejl ved oprettelse af bruger:", error.response?.data || error.message);
        alert("Der opstod en fejl: " + (error.response?.data?.error || "Prøv igen senere."));
      }
    },
    async deleteUser() {
      const userId = localStorage.getItem("user_id");

      if (!userId) {
        alert("Ingen bruger at slette.");
        return;
      }

      if (!confirm("Er du sikker på, at du vil slette brugeren og starte forfra?")) {
        return;
      }

      try {
        // Send DELETE-anmodning til backend
        await axios.delete(`http://localhost:3000/api/users/${userId}`);

        console.log("Sletter bruger med ID:", userId);

        // Ryd brugerdata fra localStorage
        localStorage.removeItem("username");
        localStorage.removeItem("user_id");

        // Nulstil state
        this.username = "";
        this.userExists = false;

        alert("Brugeren er blevet slettet og spillet er nulstillet.");
      } catch (error) {
        console.error("Fejl ved sletning af bruger:", error.response?.data || error.message);
        alert("Der opstod en fejl under sletning af brugeren.");
      }
    },
    navigateToGame() {
      // Naviger direkte til næste skærm
      this.$router.push("/background-select");
    },
    HowTo() {
      this.$router.push("/info");
    },
    resetGame() {
      // Fjern brugernavn fra localStorage
      localStorage.removeItem("username");
      localStorage.removeItem("user_id");
      this.username = "";
      this.userExists = false; // Opdater userExists til false

      alert("Spillet er blevet nulstillet. Du kan starte forfra.");
    },
  },
};
</script>

<style scoped>
.start-screen {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #282c34;
  color: #ffffff;
  text-align: center;
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

.input-container {
  margin-top: 20px;
}

.username-input {
  padding: 10px 15px;
  font-size: 16px;
  border: none;
  border-radius: 4px;
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
  display: block;
  box-sizing: border-box;
}

.button-container {
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-top: 30px;
}

button {
  padding: 12px 24px;
  font-size: 16px;
  background-color: #61dafb;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  color: #282c34;
  transition: background-color 0.3s ease;
  width: 250px;
  margin: 0 auto;
}

button:hover {
  background-color: #21a1f1;
}

.start-btn {
  background-color: #61dafb;
}

.start-btn:hover {
  background-color: #21a1f1;
}

.howto-btn {
  background-color: #61dafb;
  color: #282c34;
}

.howto-btn:hover {
  background-color: #21a1f1;
}

.reset-btn {
  background-color: #ff6347;
  color: #ffffff;
}

.reset-btn:hover {
  background-color: #d9534f;
}

.welcome-message {
  font-size: 1.2em;
  color: #61dafb;
  margin-bottom: 20px;
}
</style>
