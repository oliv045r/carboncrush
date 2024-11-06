import { createRouter, createWebHistory } from 'vue-router';
import StartScreen from '@/views/StartScreen.vue';
import BackgroundSelect from '@/views/BackgroundSelect.vue';
import ImageFormat from '@/views/ImageFormat.vue';
import IconFormat from '@/views/IconFormat.vue';
import FeedbackIcon from '@/components/feedback/FeedbackIcon.vue';
import FeedbackTemplate from '@/components/feedback/FeedbackTemplate.vue';
import FeedbackIconBad from '@/components/feedback/FeedbackIconBad.vue';
import AppHeader from '@/components/navigation/TopNav.vue';
import GameInformation from '@/views/GameInformation.vue';
import FeedbackImage from '@/components/feedback/FeedbackImage.vue';
import ScoreDisplay from '@/components/ScoreDisplay.vue'; // Ensure this component exists
import EndGame from '@/views/EndGame.vue';
import AnimationSelect from '@/views/AnimationSelect.vue'; // Ny import til Animation
import ImageQuality from '../views/ImageQuality.vue'; // Ny import til ImageQuality
import FontColorSelect from '../views/FontColorSelect.vue'; // Korriger sti til FontColorSelect
import FontSelect from '../views/FontSelect.vue'; // Korriger sti til FontdSelect
import FeedbackBackground from '../components/feedback/FeedbackBackground.vue'; // Korriger sti til FeedbackBackground
import FeedbackFont from '@/components/feedback/FeedbackFont.vue';
import FeedbackPop from '@/components/feedback/FeedbackPop.vue';
import FeedbackPopIcon from '@/components/feedback/FeedbackPopIcon.vue';
import FeedbackPopIconBad from '@/components/feedback/FeedbackPopIconBad.vue';
import ArticleLibrary from '@/views/ArticleLibrary.vue';
import ArticleSingle from '@/components/articles/ArticleSingle.vue';



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
    path: '/font-select',
    name: 'FontSelect',
    component: FontSelect
},
  {
    path: '/font-color-select',
    name: 'FontColorSelect',
    component: FontColorSelect
  },

  {
    path: '/image-format', // Ny rute til ImageFormat
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
    path: '/feedback-pop',
    name: 'FeedbackPop',
    component: FeedbackPop,
  }, 
  {
    path: '/feedback-pop-icon',
    name: 'FeedbackPopIcon',
    component: FeedbackPopIcon,
  }, 
  {
    path: '/feedback-pop-icon-bad',
    name: 'FeedbackPopIconBad',
    component: FeedbackPopIconBad,
  }, 
  {
    path: '/feedback-Background',
    name: 'FeedbackBackground',
    component: FeedbackBackground,
  },
  {
    path: '/feedback-font',
    name: 'FeedbackFont',
    component: FeedbackFont,
  },
  
  {
    path: '/feedback-icon-bad',
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
    path: '/article-library',
    name: 'ArticleLibrary',
    component: ArticleLibrary,
  },
  {
    path: '/article-single',
    name: 'ArticleSingle',
    component: ArticleSingle,
  },
  {
    path: '/feedback-image',
    name: 'FeedbackImage',
    component: FeedbackImage,
  },
  {
    path: '/end-game',
    name: 'EndGame',
    component: EndGame,
  },
  {
    path: '/score', // Add this route if you want to display the score here
    name: 'ScoreDisplay',
    component: ScoreDisplay,
  },

  {
    path: '/Image-Quality', // Ny rute til ImageQuality
    name: 'ImageQuality',
    component: ImageQuality
  },

  {
    path: '/animation-select', // Ny rute til Animation
    name: 'AnimationSelect',
    component: AnimationSelect
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
