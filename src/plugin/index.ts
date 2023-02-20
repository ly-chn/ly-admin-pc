import {App} from 'vue'
import {Rules} from '@/plugin/ly-rules'
import {todo} from '@/plugin/todo'

export const LyPlugin = {
  install(app: App){
    app.config.globalProperties.$rules = Rules
    app.config.globalProperties.$todo = todo
  }
}