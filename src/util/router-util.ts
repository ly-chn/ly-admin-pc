export class RouterUtil {
  static #nameRegex = /<filename>([a-zA-Z-]+)\.vue$/
  static #schemaRegex = /^<schema>([a-zA-Z]+):/

  /**
   * 通过路径获取文件名, 用作默认vue组件名, 如非vue文件, 则为undefined
   *
   * @param path 组件路径
   * @return {string|undefined} 组件名称
   * @example
   * getName('http://www.baidu.com') // undefined
   * getName('http://www.baidu.com/abc.dev.vue') // undefined
   * getName('/abc/def.vue') // def
   * getName('/abc/def.hij.vue') // hij
   */
  static getName(path?: string): string | void {
    if (this.hasSchema(path)) {
      return undefined
    }
    return path?.match(this.#nameRegex)?.groups?.filename
  }

  /**
   * 判断是否为外链, 存在协议则表示外链
   * @example
   * hasSchema('http://www.baidu.com') // true
   * hasSchema() // false
   * hasSchema('/system/dict-manage.vue') // false
   */
  static hasSchema(path?: string) {
    return !!path && this.#schemaRegex.test(path)
  }
}
