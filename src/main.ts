import {createApp} from 'vue'
import ElementPlus from 'element-plus'
import 'virtual:uno.css'
import '@/assets/style/index.scss'
import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/dark/css-vars.css'
import App from './app.vue'
import router from './router'
import {LyComponent} from '@/components'
import {LyPlugin} from '@/plugin'
import {createPinia} from 'pinia'
import {LyDirective} from '@/directive'

const app = createApp(App)
app.use(createPinia())
  .use(router)
  .use(ElementPlus)
  .use(LyComponent)
  .use(LyDirective)
  .use(LyPlugin)
  .mount('#app')
