import type {FormItemRule} from 'element-plus'


/**
 * 默认触发时机
 */
const trigger = ['blur', 'change']
const idCardRegexp = /^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/
function checkIdCard(idCard: string) {
  if (idCard?.length !== 18 || !idCardRegexp.test(idCard)) {
    return false
  }
  const idCardWi = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2]
  const idCardY = ['1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2']
  let sum = 0
  for (let i = 0; i < 17; i++) {
    sum += parseInt(idCard.charAt(i), 10) * idCardWi[i]
  }
  return idCardY[sum%11] === idCard.charAt(17)
}

/**
 * 表单参数校验
 * @type {Record<string, FormValidateRuleGenerate>}
 */
export const Rules = {
  /**
   * 不能为空, 如果是数组, 则不能为空数组
   * @param message 提示消息(可自动生成)
   */
  must(message = '不能为空') {
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
  /**
   * 字符串长度
   * @param min 最小长度
   * @param max 最大长度
   * @param message 错误信息
   */
  strLen(min?: number, max?: number, message?: string) {
    return {
      validator: (rule, value, callback) => {
        if (!value || !max) {
          return callback()
        }
        const length = String(value).length
        const validate = (condition: boolean, defaultMessage: string) => {
          callback(condition ? message ?? defaultMessage : undefined)
        }
        if (min && max) {
          if (min === max) {
            return validate(length !== min, `请输入 ${min} 个字符`)
          }
          return validate(length < min || length > max, `请输入 ${min} - ${max} 个字符`)
        }
        if (min) {
          return validate(length < min, `长度不能少于 ${min}`)
        }
        if (max) {
          return validate(length > max, `长度应在 ${max} 个字符以内`)
        }
        callback()
      },
      trigger
    } as FormItemRule
  },
  /**
   * 手机号
   * @param message 错误信息
   */
  mobilePhone(message = '请留意手机号格式') {
    return {
      validator: (rule, value, callback) => {
        if (!value) {
          return callback()
        }
        const regex = /^1[3-9]\d{9}$/
        if (!regex.test(value)) {
          return callback(message)
        }
        callback()
      },
      trigger
    } as FormItemRule
  },
  /**
   * 邮箱
   * @param message 错误信息
   * @return {{validator: (rule, value, callback) => (any), trigger: string[]}}
   */
  email(message = '请留意邮箱格式') {
    return {
      validator: (rule, value, callback) => {
        if (!value) {
          return callback()
        }
        const regex = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/
        if (!regex.test(value)) {
          return callback(message)
        }
        callback()
      },
      trigger
    } as FormItemRule
  },
  /**
   * 身份证号
   * @param message 错误信息
   * @return {{validator: (rule, value, callback) => (any), trigger: string[]}}
   */
  idCard(message = '请留意身份证号格式') {
    return {
      validator: (rule, value, callback) => {
        if (!value) {
          return callback()
        }
        if (!checkIdCard(value)) {
          return callback(message)
        }
        callback()
      },
      trigger
    } as FormItemRule
  }

}
