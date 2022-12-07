export class IdUtil {
  static #id = -1

  static nextId() {
    return this.#id--
  }
}