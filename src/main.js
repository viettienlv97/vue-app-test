import { createApp } from 'vue'
import store from './store/index.js'
import './style.css'
import App from './App.vue'
import router from './routes/index.js'

let app = createApp(App)
app.use(store)
app.use(router)
app.mount('#app')

