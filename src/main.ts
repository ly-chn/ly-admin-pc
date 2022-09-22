import {createApp} from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './app.vue'
import '/src/assets/style/global.scss'
import router from './router'

const app = createApp(App)
app.use(router)
  .use(ElementPlus)
  .mount('#app')
