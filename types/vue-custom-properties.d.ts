import {Rules} from '@/plugin/ly-rules'
import {lyTodo} from '@/plugin/ly-todo'

declare module '@vue/runtime-core' {
  /**
   * todo: 995 WebStorm 又 not working 了
   */
  export interface ComponentCustomProperties {
    $rules: typeof Rules
    $todo: typeof lyTodo
  }
}
