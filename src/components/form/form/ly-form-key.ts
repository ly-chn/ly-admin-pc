import {ExtractPropTypes, InjectionKey, PropType, UnwrapRef} from 'vue'
import {FormItemContext, FormItemProp, FormValidateCallback, FormValidationResult} from 'element-plus'
import {Arrayable} from 'element-plus/es/utils'
import {useAutoLabelWidth} from '/@/components/form/util/auto-label-width'
import {colSpanProps} from '/@/components/form/util/form-props'


export const lyFormProps = {
  /**
   * 为true时，表单不可编辑
   */
  disabled: {
    type: Boolean
  },
  /**
   * 表单rule变化时触发校验
   */
  validateOnRuleChange: Boolean,
  /**
   * 用于控制该表单内组件的尺寸
   */
  size: String as PropType<'large' | 'default' | 'small'>,
  /**
   * 当校验失败时，滚动到第一个错误表单项
   */
  scrollToError: Boolean,
  maxLabelWidth: {
    type: Number,
    default: 999
  },
  ...colSpanProps
}
export type LyFormProps = ExtractPropTypes<typeof lyFormProps>
export type LyFormContext = LyFormProps & UnwrapRef<ReturnType<typeof useAutoLabelWidth>> & {
  // expose
  addField: (field: FormItemContext) => void
  removeField: (field: FormItemContext) => void
  resetFields: (props?: Arrayable<FormItemProp>) => void
  clearValidate: (props?: Arrayable<FormItemProp>) => void
  validateField: (
    props?: Arrayable<FormItemProp>,
    callback?: FormValidateCallback
  ) => FormValidationResult
}
export const lyFormCtxSymbol: InjectionKey<LyFormContext> = Symbol.for('ly:form-ctx')