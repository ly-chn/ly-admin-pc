import {inject} from 'vue'
import {computed} from 'vue'
import {lyTableColumnCustomerCtxSymbol} from '@/components/table/ly-table-ctx'
import {ElMessage} from 'element-plus'
import type {LyBtnProps} from '@/components/button/util/btn-props'

export function useBtnHolder<T extends LyBtnProps>(props: T, emits: (event: 'click') => void) {
  const tableCtx = inject(lyTableColumnCustomerCtxSymbol, null)
  return {
    isLink: computed(() => !!tableCtx || props.link),
    emitClick: () => {
      if (props.disabled && props.disabledTips) {
        return ElMessage.info(props.disabledTips)
      } else if (!props.disabled) {
        emits('click')
      }
    },
    cssClass: computed(()=>({'is-disabled': props.disabled}))
  }
}