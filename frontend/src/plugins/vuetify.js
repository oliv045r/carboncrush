import { createVuetify } from 'vuetify';
import 'vuetify/styles'; // Ensure Vuetify styles are imported
import '@mdi/font/css/materialdesignicons.css'; // Ensure MDI icons are imported
import * as components from 'vuetify/lib/components';
import * as directives from 'vuetify/lib/directives';

export default createVuetify({
  components,
  directives,
  icons: {
    defaultSet: 'mdi',
  },
});