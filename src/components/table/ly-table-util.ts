import {lyTableColumnCollectCtxSymbol, LyTableColumnCollector} from '@/components/table/ly-table-ctx'
import {provide, Ref, ref} from 'vue'
import {TreeUtil} from '@/util/tree-util'

/**
 * 来自element-plus, 待其export后将移除
 */
export const getRowIdentity = (
  row: any,
  rowKey: string | ((row: any) => string) | undefined
): any => {
  if (!row) throw new Error('Row is required when get row identity')
  if (typeof rowKey === 'string') {
    if (!rowKey.includes('.')) {
      return `${row[rowKey as any]}`
    }
    const key = rowKey.split('.')
    let current = row
    for (const element of key) {
      current = current[element]
    }
    return `${current}`
  } else if (typeof rowKey === 'function') {
    return rowKey.call(null, row)
  }
}

export const useColumnCollect = function () {
  const columns: Ref<LyTableColumnCollector[]> = ref([])
  provide(lyTableColumnCollectCtxSymbol, {
    // 多级表头, 会存在重复添加的问题
    addColumn: (column: LyTableColumnCollector) => columns.value.some(it => it.label === column.label) || columns.value.push(column)
  })
  return columns
}

/**
 * 计算显示的列, 以label为唯一标志
 */
export function calcShowAbleColumn(columns: Ref<LyTableColumnCollector[]>, checkedColumns: string[]) {
  // todo: 优化这段代码
  function shouldShow(column?: LyTableColumnCollector): boolean {
    if (!column) {
      return false
    }
    // 不必显示
    if (!checkedColumns.includes(column.label)) {
      return false
    }
    // 没有子节点, 可以显示
    if (!column?.children.length) {
      return true
    }
    return column.children.some(it => shouldShow(it))
  }

  const result = checkedColumns.filter(it => shouldShow(TreeUtil.findNode(columns.value, 'label', it, 'children')))
  console.log('显示的列', result)
  return result
}