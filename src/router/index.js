import { createRouter, createWebHistory } from 'vue-router';
import StartScreen from '../components/StartScreen.vue'; // Korrigeret sti til StartScreen
import BackgroundSelect from '../components/BackgroundSelect.vue'; // Korrigeret sti til BackgroundSelect
import ImageFormat from '../components/ImageFormat.vue'; // Ny import til ImageFormat
import IconFormat from '@/components/IconFormat.vue';
import FeedbackTemplate from '@/components/FeedbackTemplate.vue';

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
    path: '/image-format', // Ny rute til ImageFormat
    name: 'ImageFormat',
    component: ImageFormat
  },
  {
    path: '/icon-format', // Ny rute til ImageFormat
    name: 'IconFormat',
    component: IconFormat
  },
  {
    path: '/feedback-template', // Ny rute til ImageFormat
    name: 'FeedbaclTemplate',
    component: FeedbackTemplate
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
