import type {InjectionKey} from 'vue'

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

export type LyTableContext = {
  // 需要显示的列, 如果为空, 则表示全部显示
  showAbleColumns: string[]
}

export const lyTableColumnCollectCtxSymbol: InjectionKey<LyColumnCollectorContext> = Symbol.for('ly:table-column-collect-ctx')
export const lyTableColumnCustomerCtxSymbol: InjectionKey<LyTableContext> = Symbol.for('ly:table-column-customer-ctx')
