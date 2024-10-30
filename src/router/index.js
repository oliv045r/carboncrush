import { createRouter, createWebHistory } from 'vue-router';
import StartScreen from '../components/StartScreen.vue'; // Korriger sti til StartScreen
import BackgroundSelect from '../components/BackgroundSelect.vue'; // Korriger sti til BackgroundSelect
import FontSelect from '../components/FontSelect.vue'; // Korriger sti til FontdSelect
import ImageFormat from '../components/ImageFormat.vue'; // Ny import til ImageFormat
import ImageQuality from '../components/ImageQuality.vue'; // Ny import til ImageQuality

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

  {
    path: '/image-format', // Ny rute til ImageFormat
    name: 'ImageFormat',
    component: ImageFormat
  },

  {
    path: '/Image-Quality', // Ny rute til ImageQuality
    name: 'ImageQuality',
    component: ImageQuality
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
