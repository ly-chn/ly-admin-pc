/**
 * 默认公共响应对象
 */
export type CommonRes<T> = {
  // 0表示成功, 其余失败
  status: number
  // 如果成功, 则为响应信息, 否则无意义
  data: T | null
  // 如果失败, 则返回错误信息, 否则无意义
  message: string
}

/**
 * 分页返回结果
 */
export type PagingVO<T> = {
  // 总数
  total: number
  // 列表数据
  list: T[]
  // 页码
  pageNum: number
  // 分页大小
  pageSize: number
  // 总页数
  pages: number
}

/**
 * 数据对象, 一律包含id
 */
export type DataRecord = {
  id?: string
} & Record<string, unknown>