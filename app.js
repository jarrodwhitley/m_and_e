import { createApp } from 'vue'
import { createPinia} from "pinia";
import './style.css'
import App from './src/App.vue'
import './spurgeon_icon_color.png'
import { useAppStore } from './src/store'

const pinia = createPinia()
const app = createApp(App)
app.use(pinia)

const store = useAppStore(pinia)
store.initializeDateContext()
store.loadBookmarksFromStorage()

app.mount('#app')
