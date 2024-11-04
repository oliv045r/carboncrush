<template>
    <div>
      <v-container  fluid class="top-left-header">
        <v-speed-dial
          v-model="fab"
          location="bottom left"
          transition="fade-transition"
          open-on-hover
        >
          <template v-slot:activator="{ props: activatorProps }">
            <v-fab
              v-bind="activatorProps"
              size="large"
              color="primary"
              icon="mdi-menu"
              class="main-fab"
            ></v-fab>
          </template>
  
          <!-- Button to go to StartScreen -->
          <v-btn
            key="1"
            icon="mdi-home"
            @click="goToStartScreen"
            class="speed-dial-btn1"
          ></v-btn>
  
          <!-- Button to go to GameInformation -->
          <v-btn
            key="2"
            icon="mdi-information"
            @click="goToGameInformation"
            class="speed-dial-btn2"
          ></v-btn>
        </v-speed-dial>
      </v-container>
    </div>
  </template>
  
  <script>

  export default {
    name: 'TopNav',
     
     data() {
      return {
        fab: false, // Controls speed dial open/close state
      };
    },
    methods: {
      goToStartScreen() {
        this.$router.push('/'); // Navigate to the StartScreen route
      },
      goToGameInformation() {
        this.$router.push('/info'); // Navigate to the GameInformation route
      },
    },
  };
  </script>
  
  <style scoped>

  .top-left-header {
    position: fixed; /* Fixed position to stay in view */
    top: 20px; /* Distance from the top of the viewport */
    left: 20px; /* Distance from the left of the viewport */
    max-width: 30px; /* Set a maximum width for the header */
    padding: 10px; /* Padding for the header */
    z-index: 1000; /* Ensure the header is above other content */
  }
  
  /* Styling for the main FAB */
  .main-fab {
    margin-bottom: 16px; /* Space below the FAB to separate from the buttons */
  }
  
  /* Styling for the buttons within the speed dial */
  .speed-dial-btn1 {
    margin-top: 30px; /* Spacing between buttons */
  }

  .speed-dial-btn1, .speed-dial-btn2 {
    background-color: #f5f5f5; /* Light background for buttons */
    border-radius: 50%; /* Rounded buttons */
    transition: background-color 0.3s ease; /* Smooth transition for hover effect */
    left: 7px;
  }
  
  /* Hover effect for buttons */
  .speed-dial-btn1:hover, .speed-dial-btn2:hover {
    background-color: #e0e0e0; /* Change color on hover */
  }

  :deep(.v-application__wrap) {
    min-height: fit-content;
  }

  :deep(.bg-primary) {
  background-color: black !important; /* Replace with your desired color */
  color: #FFFFFF !important; /* Replace with your desired text color */
}

  </style>
  