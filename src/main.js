import { createApp } from 'vue';
import App from './App.vue';
import vuetify from './plugins/vuetify';
import router from './router';
import 'animate.css'; // Import Animate.css
import store from './plugins/store'; // Import the Vuex store
import './plugins/reset-vuetify.css'; // Import the global CSS reset

createApp(App)
  .use(vuetify)
  .use(router) // Use the router
  .use(store)  // Use the Vuex store
  .mount('#app');
