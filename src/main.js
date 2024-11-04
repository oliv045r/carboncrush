import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import 'animate.css';
import '@mdi/font/css/materialdesignicons.css';
import 'vuetify/styles'; // Import Vuetify styles
import store from './plugins/store'; // Import the Vuex store
import './plugins/reset-vuetify.css'; // Import the global CSS reset

import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components'; // Import Vuetify components
import * as directives from 'vuetify/directives'; // Import Vuetify directives

// Create the Vuetify instance
const vuetify = createVuetify({
  components,
  directives,
});

createApp(App)
  .use(vuetify)
  .use(router) // Use the router
  .use(store)  // Use the Vuex store
  .mount('#app');
