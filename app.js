import { createApp } from 'vue'
import { createPinia} from "pinia";
import './style.css'
import App from './src/App.vue'
import './spurgeon_icon_color.png'

const app = createApp(App)
app.use(createPinia())
app.mount('#app')
