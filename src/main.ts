import {createApp} from 'vue'
import ElementPlus from 'element-plus'
import 'virtual:windi.css'

import 'element-plus/dist/index.css'
import App from './app.vue'
import router from './router'
import {LyComponent} from '@/components/ly-component'
import {LyPlugin} from '@/plugin'
import {createPinia} from 'pinia'

const app = createApp(App)
app.use(createPinia())
  .use(router)
  .use(ElementPlus)
  .use(LyComponent)
  .use(LyPlugin)
  .mount('#app')
