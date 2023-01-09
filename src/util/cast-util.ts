/**
 * 类型转换工具类
 */
export class CastUtil {
  static array(v: string | string[] | undefined) {
    if (!v) {
      return []
    }
    if (Array.isArray(v)) {
      return v
    }
    return v?.split(',') ?? []
  }
}