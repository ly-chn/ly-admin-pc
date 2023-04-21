export class RouterUtil {
  static #nameRegex = /[a-zA-Z-]+/g
  static getNameByPath(path?: string): string | undefined {
    // todo: https://cn.vuejs.org/guide/built-ins/keep-alive.html#include-exclude
    return path?.match(this.#nameRegex)?.join('-')
  }
}
