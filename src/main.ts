// import './assets/main.css'
import './index.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './routes'

const app = createApp(App)

app.use(createPinia()).use(router)

app.mount('#app')
