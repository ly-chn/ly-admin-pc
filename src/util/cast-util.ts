import {ValueGetter} from '@/types/utility-type'

/**
 * 类型转换工具类
 */
export class CastUtil {
  /**
   * 给定数组值, 则返回数组, 否则原样返回
   * @example
   * CastUtil.array('1') // ['1']
   * CastUtil.array(['1']) // ['1']
   */
  static array<T>(target: T | T[]) {
    if (!target) {
      return [] as T[]
    }
    if (Array.isArray(target)) {
      return target
    }
    if (typeof target === 'string') {
      return target.split(',') as unknown[] as T[]
    }
    return []
  }

  /**
   * 给定函数值则返回执行结果, 否则原样返回
   * @example
   * CastUtil.unwrap('1') // '1'
   * CastUtil.unwrap(()=>"1") // '1'
   * CastUtil.unwrap() // undefined
   */
  static unwrap<T>(target?: ValueGetter<T>): T | undefined {
    if (typeof target === 'function') {
      return (target as () => T)()
    }
    return target as T
  }
}
