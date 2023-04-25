import {createApp} from 'vue'
import ElementPlus from 'element-plus'
import 'virtual:windi.css'

import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/dark/css-vars.css'
import App from './app.vue'
import router from './router'
import {LyComponent} from '@/components/ly-component'
import {LyPlugin} from '@/plugin'
import {createPinia} from 'pinia'
import {ViewsScan} from '@/util/views-scan'

const app = createApp(App)
app.use(createPinia())
  .use(router)
  .use(ElementPlus)
  .use(LyComponent)
  .use(LyPlugin)
  .mount('#app')

console.log(ViewsScan.tree())
