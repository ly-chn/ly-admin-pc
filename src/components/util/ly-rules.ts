import {FormItemRule} from 'element-plus'
import {App} from 'vue'


const trigger = ['blur', 'change']
/**
 * 表单参数校验
 * @type {Record<string, FormValidateRuleGenerate>}
 */
export const Rules = {
  /**
   * 不能为空
   * @param message 提示消息(可自动生成)
   */
  must(message = 'this is required') {
    return {
      required: true,
      validator: (rule, value, callback) => {
        if (value === true || value === false || typeof value === 'number') {
          return callback()
        }
        if (typeof value === 'string') {
          value = value.trim()
        }
        if (!value || !value.length) {
          return callback(message)
        }
        callback()
      },
      trigger
    } as FormItemRule
  },
}

export default {
  install(app: App) {
    app.config.globalProperties.$rules = Rules
  }
}

declare module '@vue/runtime-core' {
  export interface ComponentCustomProperties {
    $rules: typeof Rules
  }
}
