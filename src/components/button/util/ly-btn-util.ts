import {inject} from 'vue'
import {lyTableColumnCustomerCtxSymbol} from '@/components/table/ly-table-ctx'
import {computed} from 'vue'

export function useBtnLink<T extends {link: boolean}>(props: T) {
  const tableCtx = inject(lyTableColumnCustomerCtxSymbol)
  return computed(()=>!!tableCtx || props.link)
}