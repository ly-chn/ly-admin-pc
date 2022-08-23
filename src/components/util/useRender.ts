import type { VNode } from 'vue'
import {getCurrentInstance} from 'vue'

export function useRender (render: () => VNode): void {
  const vm = getCurrentInstance() as any
  vm.render = render
}
