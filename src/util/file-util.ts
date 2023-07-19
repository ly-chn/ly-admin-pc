export class FileUtil {
  static #input = document.createElement('input')
  static {
    this.#input.type = 'file'
  }

  /**
   * 选择图片
   */
  static selectImg() {
    return this.#selectFile('images/*')
  }

  /**
   * 选择excel
   */
  static selectXlsx() {
    return this.#selectFile('application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
  }

  /**
   * 文件选择, 设为私有, 因为后面有可能有需求去处理内容
   * @param {HTMLInputElement.prototype.accept} accept 文件支持的属性
   */
  static #selectFile(accept: string): Promise<File> {
    return new Promise((resolve, reject) => {
      this.#input.accept = accept
      const cancelDetector = () => {
        window.removeEventListener('focus', cancelDetector)
        setTimeout(() => {
          // 想要reject, 但是又无法确定, 只能这样了
          reject('cancel')
        }, 500)
      }
      this.#input.addEventListener('click', () => {
        window.addEventListener('focus', cancelDetector)
      })
      this.#input.addEventListener('change', () => {
        window.removeEventListener('focus', cancelDetector)
        resolve(this.#input.files[0])
      })
      this.#input.click()
    })
  }
}
