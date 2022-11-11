import {isFunction} from '@vueuse/core'

/**
 * 目前来说全部是其他工具类的二封, 防止后续工具类被废弃后重写大部分内容
 */
export class IsInstance{
  static func(val: unknown) {
    return isFunction(val)
  }
}
