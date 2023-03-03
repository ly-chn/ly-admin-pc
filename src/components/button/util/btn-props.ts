import type {ExtractPropTypes} from 'vue'

export const lyBtnProps = {
  /**
   * 是否为link样式
   */
  link: Boolean,
  /**
   * 是否禁用
   */
  disabled: Boolean,
  /**
   * 禁用原因
   */
  disabledTips: String
}

export type LyBtnProps = ExtractPropTypes<typeof lyBtnProps>