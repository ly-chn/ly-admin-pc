import type {ExtractPropTypes, PropType} from 'vue'
import type {FormItemRule} from 'element-plus'
import type {Arrayable} from 'element-plus/es/utils'

export const formFieldProps = {
  // 用于v-model
  modelValue: null,
  // 表单label
  label: String,
  // 校验规则
  rules: [Object, Function, Array] as PropType<FormValidateRule>,
  // 为true时，表单不可编辑
  disabled: Boolean,
  // 占位文字
  placeholder: String,
  // 提示文案
  tips: [String, Function] as PropType<string | (()=> string)>,
  // 如果为true, 当表单组件销毁时, 将自动清空表单值
  cleanUp: Boolean,
}
export type LyFormFieldProps = ExtractPropTypes<typeof formFieldProps>
// 布局通用
export const colSpanProps = {
  // all of 24
  only: Boolean,
  // 12 of 24
  half: Boolean,
  // 8 of 24
  oneThird: Boolean,
  // 6 of 24
  quarter: Boolean,
  // custom 1-24
  span: Number
}
export type LyColSpanProps = ExtractPropTypes<typeof colSpanProps>

export type LyDictItem = {
  // 显示的文字
  label: string
  // 值
  value: string
  // 字典项说明,会显示给前端
  tips?: string
}

// 字典项通用
export const dictOptionsProps = {
  // 可选项, 如果不提供的话将通过字典项获取
  options: Array as PropType<LyDictItem[]>,
  // 字典编码, 通过它取系统字典/动态字典
  dictCode: String
}

export type DictOptionsProps = ExtractPropTypes<typeof dictOptionsProps>

export type FormValidateRuleGenerate = ((...args: unknown[]) => FormItemRule)

// 表单校验
export type FormValidateRule = Arrayable<FormItemRule | FormValidateRuleGenerate>
