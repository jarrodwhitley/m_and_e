import { createApp } from 'vue'
import { createPinia} from "pinia";
import './style.css'
import App from './src/App.vue'
import { useAppStore } from './src/store'

const pinia = createPinia()
const app = createApp(App)
app.use(pinia)

const store = useAppStore(pinia)
store.initializeDateContext()
store.loadBookmarksFromStorage()

app.mount('#app')

if ('serviceWorker' in navigator && import.meta.env.PROD) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register(`${import.meta.env.BASE_URL}service-worker.js`)
            .catch((err) => console.error('Service Worker registration failed:', err))
    })
}

