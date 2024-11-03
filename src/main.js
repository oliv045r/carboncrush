import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import 'animate.css';
import '@mdi/font/css/materialdesignicons.css';
import 'vuetify/styles'; // Import Vuetify styles

import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components'; // Import Vuetify components
import * as directives from 'vuetify/directives'; // Import Vuetify directives

// Create the Vuetify instance
const vuetify = createVuetify({
  components,
  directives,
});

createApp(App)
  .use(router) // Use the router
  .use(vuetify) // Use Vuetify
  .mount('#app');
