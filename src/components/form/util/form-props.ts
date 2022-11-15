import {ExtractPropTypes, PropType} from 'vue'
import {FormItemRule} from 'element-plus'
import {Arrayable} from 'element-plus/es/utils'

export const formFieldProps = {
  /**
   * 用于v-model
   */
  modelValue: null,
  /**
   * 表单label
   */
  label: String,
  /**
   * 校验规则
   */
  rules: [Object, Function, Array] as PropType<FormValidateRule>,
  /**
   * 为true时，表单不可编辑
   */
  disabled: Boolean,
  /**
   * 占位文字
   */
  placeholder: String
}
export type LyFormFieldProps = ExtractPropTypes<typeof formFieldProps>
// 布局通用
export const colSpanProps = {
  /**
   * all of 24
   */
  only: Boolean,
  /**
   * 12 of 24
   */
  half: Boolean,
  /**
   * 8 of 24
   */
  oneThird: Boolean,
  /**
   * 6 of 24
   */
  quarter: Boolean,
  /**
   * custom 1-24
   */
  span: {
    type: Number
  }
}
export type LyColSpanProps = ExtractPropTypes<typeof colSpanProps>

// 字典项通用 todo: 去掉, 改成vueUse, 入参是dictCode, options也可以考虑保留, 其余不要了
export const dictOptionsProps = {
  /**
   * 可选项, 如果不提供的话将通过字典项获取
   */
  options: {
    type: Array
  },
  /**
   * 字典编码, 通过它取系统字典/动态字典
   */
  dictCode: {
    type: String
  },
  /**
   * 为true表示如果值不存在于字典项中, 则清空对应值
   */
  clearInvalid: {
    type: Boolean,
    default: true
  },
  /**
   * key of label
   */
  ofLabel: {
    type: String,
    default: 'label'
  },
  /**
   * key of label
   */
  ofDesc: {
    type: String,
    default: 'desc'
  },
  /**
   * key of value
   */
  ofValue: {
    type: String,
    default: 'value'
  },
  /**
   * 为true表示允许自己创建
   */
  allowCreate: Boolean
}

export type FormValidateRuleGenerate = ((...args: unknown[]) => FormItemRule)

// 表单校验
export type FormValidateRule = Arrayable<FormItemRule | FormValidateRuleGenerate>
