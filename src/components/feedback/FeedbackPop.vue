<template>
  <div class="popup-container px-10 py-10" :style="containerStyles">
    <!-- Tekstsektion med fade-in-effekt -->
      <h1 class="title">{{title}}</h1>
      <p class="w-50"  v-html="content"></p>
      <div class="img-container">
        <img class="feedback-img" :src="imageUrl" alt="">
      </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'FeedbackPop',
  props: {
        title: {
            type: String,
            required: true
        },
        content: {
            type: String,
            required: true
        },
        imageUrl: {
      type: String,
      required: true
    }
      }
    ,
  data() {
    return {
      textVisible: false, // Controls when the text and GIF should fade in
    };
  },
  mounted() {
    // Trigger fade-in effect for text
    setTimeout(() => {
      this.textVisible = true;
    }, 100);
  },
  computed: {
    ...mapState(['backgroundColor']), // Map the backgroundColor state from Vuex
    containerStyles() {
      return {
        backgroundColor: this.backgroundColor, // Use the backgroundColor from Vuex
      };
    },
  },
  
};
</script>

<style scoped>
.popup-container {
  position: absolute;
  left: calc(10vw);
  height: 800px;
  top: calc(50vh - 400px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 80vw;}

/* Initial hidden state */
.text-container {
  text-align: center;
  opacity: 0; /* Start hidden */
  transition: opacity 1s ease; /* Smooth fade-in */
  width: 100%;
  max-width: 700px;
}

/* Class that triggers fade-in effect */
.fade-in {
  opacity: 1; /* Fades to full opacity */
}

/* GIF styling */
.img-container {
  margin-top: 30px;
  text-align: center;
}

.feedback-img {
  max-width: 50%; /* Responsive image */
  height: auto; /* Maintain aspect ratio */
}
</style>
