/**
 * 类型转换工具类
 */
export class CastUtil {
  static array<T>(target: T|T[]) {
    if (!target) {
      return [] as T[]
    }
    if (Array.isArray(target)) {
      return target
    }
    if (target instanceof String) {
      return target.split(',') as unknown[] as T[]
    }
    return []
  }
}
