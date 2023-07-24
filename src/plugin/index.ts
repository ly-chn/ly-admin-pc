import type {App} from 'vue'
import {Rules} from '@/plugin/ly-rules'
import {lyTodo} from '@/plugin/ly-todo'

// todo: 叫plugin不合适, 过于宽泛
export const LyPlugin = {
  install(app: App){
    app.config.globalProperties.$rules = Rules
    app.config.globalProperties.$todo = lyTodo
  }
}
