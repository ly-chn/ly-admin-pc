import {inject} from 'vue'
import {computed} from 'vue'
import {lyTableColumnCustomerCtxSymbol} from '@/components/table/ly-table-ctx'

export function useBtnLink<T extends { link: boolean }>(props: T) {
  const tableCtx = inject(lyTableColumnCustomerCtxSymbol, null)
  return computed(() => !!tableCtx || props.link)
}