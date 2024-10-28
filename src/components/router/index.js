import { createRouter, createWebHistory } from 'vue-router';
import StartScreen from '../components/StartScreen.vue'; // Korriger sti til StartScreen
import BackgroundSelect from '../components/BackgroundSelect.vue'; // Korriger sti til BackgroundSelect

const routes = [
  {
    path: '/',
    name: 'Home',
    component: StartScreen
  },
  {
    path: '/background-select',
    name: 'BackgroundSelect',
    component: BackgroundSelect
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
