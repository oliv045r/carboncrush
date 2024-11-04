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
import FeedbackImage from '@/components/FeedbackImage.vue';
import ScoreDisplay from '@/components/ScoreDisplay.vue'; // Ensure this component exists
import EndGame from '@/components/EndGame.vue';

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
  {
    path: '/feedback-image',
    name: 'FeedbackImage',
    component: FeedbackImage,
  },
  {
    path: '/end-screen',
    name: 'EndGame',
    component: EndGame,
  },
  {
    path: '/score', // Add this route if you want to display the score here
    name: 'ScoreDisplay',
    component: ScoreDisplay,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
