import { createApp } from 'vue'
import App from './App.vue'
import router from './router.js'
import store from './store/index.js'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'

import BaseContainer from './components/UI/BaseContainer.vue'
import BaseButtonFooter from './components/UI/BaseButtonFooter.vue'
import TheHeader from './components/Layouts/TheHeader.vue'
import TheFooter from './components/Layouts/TheFooter.vue'

const app = createApp(App);

app.use(router);
app.use(store);
app.component('base-container', BaseContainer);
app.component('base-button-footer', BaseButtonFooter);
app.component('the-header', TheHeader);
app.component('the-footer', TheFooter);

router.isReady();

app.mount('#app');
