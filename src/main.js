import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import 'animate.css'; // Importer Animate.css
import '@mdi/font/css/materialdesignicons.css';

createApp(App)
  .use(router) // hvis du bruger router
  .mount('#app');
