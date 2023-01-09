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