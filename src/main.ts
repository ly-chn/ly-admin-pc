import {createApp} from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './app.vue'
import router from './router'
import {LyComponent} from '@/components/ly-component'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import {LyPlugin} from '@/plugin'
import {createPinia} from 'pinia'
import 'virtual:windi.css'

const app = createApp(App)

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(`ElIcon${key}`, component)
}
app.use(createPinia())
  .use(router)
  .use(ElementPlus)
  .use(LyComponent)
  .use(LyPlugin)
  .mount('#app')
