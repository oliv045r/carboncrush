import { createRouter, createWebHistory } from 'vue-router';
import StartScreen from '../components/StartScreen.vue'; // Korriger sti til StartScreen
import BackgroundSelect from '../components/BackgroundSelect.vue'; // Korriger sti til BackgroundSelect
import FontSelect from '../components/FontSelect.vue'; // Korriger sti til FontdSelect

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
  {
    path: '/font-select',
    name: 'FontSelect',
    component: FontSelect
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
