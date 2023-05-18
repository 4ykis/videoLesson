import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createManager } from '@vue-youtube/core';
import './style.css'
import App from './App.vue'

createApp(App)
    .use(createPinia())
    .use(createManager())
    .mount('#app')
