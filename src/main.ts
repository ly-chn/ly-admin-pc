import {createApp} from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './app.vue'
import '/src/assets/style/global.scss'
import router from './router'
import {LyComponent} from '@/components/ly-component'
import LyRules from '@/components/util/ly-rules'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

const app = createApp(App)

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(`ElIcon${key}`, component)
}
app.use(router)
  .use(ElementPlus)
  .use(LyComponent)
  .use(LyRules)
  .mount('#app')
