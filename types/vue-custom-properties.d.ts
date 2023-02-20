import {Rules} from '@/plugin/ly-rules'
import {todo} from '@/plugin/todo'

declare module '@vue/runtime-core' {
  export interface ComponentCustomProperties {
    $rules: typeof Rules
    $todo: typeof todo
  }
}
