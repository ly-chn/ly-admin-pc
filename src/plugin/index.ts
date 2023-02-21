import type {App} from 'vue'
import {Rules} from '@/plugin/ly-rules'
import {lyTodo} from '@/plugin/ly-todo'

export const LyPlugin = {
  install(app: App){
    app.config.globalProperties.$rules = Rules
    app.config.globalProperties.$todo = lyTodo
  }
}