import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia';
import type { App as AppType } from 'vue'
import App from './App.vue'
import router from './router'

const app: AppType = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')