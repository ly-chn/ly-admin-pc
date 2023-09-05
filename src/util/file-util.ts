import {ref} from 'vue'

export class FileUtil {
  static #input = document.createElement('input')
  static #tagA = document.createElement('a')
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
   * 保存文件
   */
  static saveBlob(file: Blob, filename: string) {
    this.#tagA.download = filename
    const url = URL.createObjectURL(file)
    this.#tagA.href = url
    this.#tagA.click()
    URL.revokeObjectURL(url)
  }

  /**
   * 文件选择, 设为私有, 因为后面有可能有需求去处理内容
   * @param {HTMLInputElement.prototype.accept} accept 文件支持的属性
   */
  static #selectFile(accept: string): Promise<File> {
    return new Promise((resolve, reject) => {
      this.#input.accept = accept
      this.#input.value = ''
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
        resolve(this.#input.files?.[0] as File)
      })
      this.#input.click()
    })
  }

  /**
   * 文件上传 自动切片
   * @param file
   * @return
   */
  static upload(file: File) {
    console.log('file is', file)
    const process = ref(0)
    return {process}
  }
}
