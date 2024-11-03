import { createApp } from 'vue';
import App from './App.vue';
import vuetify from './plugins/vuetify';
import router from './router';
import 'animate.css'; // Import Animate.css
import store from './plugins/store'; // Import the Vuex store

createApp(App)
  .use(vuetify)
  .use(router) // Use the router
  .use(store)  // Use the Vuex store
  .mount('#app');
