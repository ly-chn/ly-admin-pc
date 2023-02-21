import {Rules} from '@/plugin/ly-rules'
import {lyTodo} from '@/plugin/ly-todo'

declare module '@vue/runtime-core' {
  export interface ComponentCustomProperties {
    $rules: typeof Rules
    $todo: typeof lyTodo
  }
}
