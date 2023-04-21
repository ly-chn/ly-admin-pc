export class RouterUtil {
  static #nameRegex = /[a-zA-Z-]+/g
  static getNameByPath(path?: string): string | undefined {
    return path?.match(this.#nameRegex)?.join('-')
  }
}
