import { createApp } from 'vue'
import "survey-core/defaultV2.css";
import "survey-creator-core/survey-creator-core.css";
import '@mdi/font/css/materialdesignicons.css'; // Ensure you import the Material Design Icons CSS

import App from './App.vue'
import router from './router'
import { surveyCreatorPlugin } from "survey-creator-vue";
import { surveyPlugin } from 'survey-vue3-ui';
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import './index.css'
import store from './store';
import Clipboard from 'v-clipboard'

const vuetify = createVuetify({
  components,
  directives,
})
store.dispatch('fetchUser'); // Fetch the user on app initialization

const app = createApp(App)
app.use(store);
app.use(Clipboard);
app.use(surveyPlugin)
app.use(surveyCreatorPlugin).use(router);
app.use(vuetify);
app.mount('#app')
