import { createApp } from 'vue';
import { VueQueryPlugin, VueQueryPluginOptions } from "@tanstack/vue-query";
import './style.css';
import App from './App.vue';

createApp(App)
  .use(VueQueryPlugin, { queryClientConfig: { defaultOptions: { queries: { refetchOnWindowFocus: false } } } } as VueQueryPluginOptions)
  .mount('#app');
