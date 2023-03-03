import clipboardCopy from 'clipboard-copy'
import {ElMessage} from 'element-plus'

/**
 * 粘贴板相关工具类
 */
export class ClipboardUtil {
  static async copy(text: string) {
    await clipboardCopy(text)
    ElMessage.success('已复制')
  }
}