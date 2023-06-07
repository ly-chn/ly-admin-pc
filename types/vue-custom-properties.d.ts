import {type Rules} from '../src/plugin/ly-rules'
import {type lyTodo} from '../src/plugin/ly-todo'

export {}

declare module '@vue/runtime-core' {
  // won't work when pnpm
  export interface ComponentCustomProperties {
    $rules: typeof Rules
    $todo: typeof lyTodo
  }
}
