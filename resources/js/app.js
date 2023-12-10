import './bootstrap';
import { createApp } from 'vue';
import router from './src/routes/routes';
import { createPinia } from 'pinia';

const app = createApp({});
const pinia = createPinia();

app.use(router);
app.use(pinia);

app.mount('#app');
