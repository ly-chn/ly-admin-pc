import {createApp} from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './app.vue'
import '/src/assets/style/global.scss'
import router from './router'
import {ElIcon} from '/@/components/element-ui/el-icon'


const app = createApp(App)
app.use(router)
  .use(ElementPlus)
  .use(ElIcon)
  .mount('#app')
