import { createRouter, createWebHistory } from 'vue-router';
import StartScreen from '@/components/StartScreen.vue';
import BackgroundSelect from '@/components/BackgroundSelect.vue';
import ImageFormat from '@/components/ImageFormat.vue';
import IconFormat from '@/components/IconFormat.vue';
import FeedbackIcon from '@/components/FeedbackIcon.vue';
import FeedbackTemplate from '@/components/FeedbackTemplate.vue';
import FeedbackIconBad from '@/components/FeedbackIconBad.vue';
import AppHeader from '@/components/AppHeader.vue';
import GameInformation from '@/components/GameInformation.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: StartScreen,
  },
  {
    path: '/background-select',
    name: 'BackgroundSelect',
    component: BackgroundSelect,
  },
  {
    path: '/image-format',
    name: 'ImageFormat',
    component: ImageFormat,
  },
  {
    path: '/icon-format',
    name: 'IconFormat',
    component: IconFormat,
  },
  {
    path: '/feedback-icon',
    name: 'FeedbackIcon',
    component: FeedbackIcon,
  },
  {
    path: '/feedback-icon-wrong',
    name: 'FeedbackIconBad',
    component: FeedbackIconBad,
  },
  {
    path: '/feedback-template',
    name: 'FeedbackTemplate',
    component: FeedbackTemplate,
  },
  {
    path: '/header-component',
    name: 'AppHeader',
    component: AppHeader,
  },
  {
    path: '/info',
    name: 'GameInformation',
    component: GameInformation,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
