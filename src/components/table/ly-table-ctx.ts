import {InjectionKey} from 'vue'

export type LyColumnCollectorContext = {
  /**
   * 注册列
   */
  addColumn(column: LyTableColumnCollector): void
}

export type LyTableColumnCollector = {
  label: string,
  children: LyTableColumnCollector[]
}

export const lyTableColumnCollectCtxSymbol: InjectionKey<LyColumnCollectorContext> = Symbol.for('ly:table-column-collect-ctx')
export const lyTableColumnCustomerCtxSymbol: InjectionKey<{showAbleColumns: string[]}> = Symbol.for('ly:table-column-customer-ctx')
