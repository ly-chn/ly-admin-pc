export interface CallAble<T extends (...args: any) => any> {
  (...args: Parameters<T>): ReturnType<T>
}

/**
 * 函数调用结果缓存工具
 */
export class CallCache {
  // 函数<参数序列化, [请求结果有效期截止时间, 函数返回值]>
  static #callMap = new Map<CallAble<any>, Map<string, [number, any]>>()

  /**
   * 返回缓存函数调用结果, 如果没有缓存则重新执行函数
   * 如果是函数返回Promise, 将在reject时清理该缓存
   * @param method 目标函数
   * @param activeSeconds 缓存时间: 秒
   * @param params 目标函数的参数
   *
   * @example
   * const fn = (a: string, b: number)=> a + b
   * const s = CallCache.call(fn, 5, '1', 2) // s is 'string'
   */
  static call<T extends (...args: any[]) => any>(method: T, activeSeconds: number, ...params: Parameters<T>): ReturnType<T> {
    if (!this.#callMap.has(method)) {
      this.#callMap.set(method, new Map())
    }
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const keyResMap = this.#callMap.get(method)!
    const key = JSON.stringify(params)

    this.#clear()
    if (keyResMap?.has(key)) {
      return keyResMap?.get(key)?.[1]
    }
    const result = method(...params)
    if (result instanceof Promise) {
      result.catch(error => {
        keyResMap?.delete(key)
        throw error
      })
    }
    keyResMap.set(key, [~~(new Date().getTime() / 1000) + activeSeconds, result])
    return result
  }

  static #clear() {
    const now = ~~(new Date().getTime() / 1000)
    for (const keyMethod of this.#callMap.keys()) {
      const keyResMap = this.#callMap.get(keyMethod)
      if (keyResMap) {
        for (const keyKey of keyResMap.keys()) {
          if ((keyResMap.get(keyKey)?.[0] ?? 0) < now) {
            keyResMap.delete(keyKey)
          }
        }
      }
    }
  }
}
