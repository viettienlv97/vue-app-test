import { createApp } from 'vue'
import store from './store/index.js'
import './style.css'
import App from './App.vue'
import router from './routes/index.js'
import PrimeVue from 'primevue/config';
// import 'primevue/resources/themes/aura-light-green/theme.css'

let app = createApp(App)
app.use(store)
app.use(router)
app.use(PrimeVue);
app.mount('#app')

