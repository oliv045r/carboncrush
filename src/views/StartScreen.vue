<template>
  <div class="start-screen animate__animated animate__fadeIn">
    <div class="content">
      <h1>{{ title }}</h1>
      <p class="description">{{ description }}</p>
      <button @click="startGame">Start Game</button>
    </div>
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
      default: 'Ved du, hvad der skal til for at skabe bæredygtigt design? Sæt din viden på prøve, og oplev udfordringerne ved at designe en hjemmeside, der både er miljøvenlig og funktionel. Klarer du balancen mellem æstetik, brugervenlighed og bæredygtighed?'
    }
  },
  methods: {
    startGame() {
      this.$router.push('/background-select'); // Naviger til BackgroundSelect
    }
  }
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

button {
  margin-top: 20px;
  padding: 10px 20px;
  font-size: 16px;
  background-color: #61dafb;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  color: #282c34;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #21a1f1;
}
</style>