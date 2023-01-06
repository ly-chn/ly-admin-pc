import {PropType} from 'vue'

/**
 * 一些通用的类型
 */
export const LyPropType = {
  // 常规大小
  size: String as PropType<'large' | 'default' | 'small'>,
  // 边长, 即长或宽
  sideLength: [String, Number],
  // boolean默认true
  boolTrue: {
    type: Boolean,
    default: true
  },
  // 支持的key类型
  key: [Number, String, Symbol],
  // 用于v-for key
  keyAble: [Number, String, Symbol] as PropType<string | number | symbol | ((...args: any[]) => string | number | symbol)>
}