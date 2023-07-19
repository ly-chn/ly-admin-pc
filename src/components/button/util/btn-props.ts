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
  disabledTips: String,
  /**
   * 加载状态
   */
  loading: Boolean
}

export type LyBtnProps = ExtractPropTypes<typeof lyBtnProps>
