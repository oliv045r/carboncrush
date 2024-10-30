import { createApp } from 'vue';
import App from './App.vue';
import vuetify from './plugins/vuetify';
import router from './router';
import 'animate.css'; // Importer Animate.css

createApp(App)
  .use(vuetify)
  .use(router) // hvis du bruger router
  .mount('#app');
