import type {ComputedRef} from 'vue'
import {computed, type ExtractPropTypes, inject, onUnmounted, reactive} from 'vue'
import type {DictOptionsProps, LyColSpanProps, LyDictItem} from '@/components/form/util/form-props'
import {lyFormCtxKey} from '@/components/form/util/form-ctx'
import {useDictStore} from '@/store/dict'
import type {Prefix} from '@/types/utility-type'

// 最小化表单项props
export type LyUseFieldProp = ExtractPropTypes<{
  modelValue: null,
  disabled: boolean,
  cleanUp?:boolean
}>

// 自动处理label宽度, 最大120px
export function useAutoLabelWidth(maxLabelWidth: number) {
  const labelWidthMap = reactive(new Map<symbol, number>())
  // label宽度
  const autoLabelWidth = computed(() => {
    if (labelWidthMap.size === 0) {
      return ''
    }
    const max = Math.min(Math.max(80, ...Array.from(labelWidthMap.values())), maxLabelWidth) + 6
    return `${max}px`
  })
  // 表单项更新label宽度
  const registerLabelWidth = (key: symbol, width: number) => {
    labelWidthMap.set(key, width)
  }
  // 表单项注销label宽度
  const deregisterLabelWidth = (key: symbol) => {
    labelWidthMap.delete(key)
  }
  return {
    autoLabelWidth,
    registerLabelWidth,
    deregisterLabelWidth
  }
}

// 表单项自适应布局
export function useColSpan(props?: LyColSpanProps) {
  if ((props as any)?.searchForm) {
    return 6
  }
  if (props?.only) {
    return 24
  }
  if (props?.half) {
    return 12
  }
  if (props?.oneThird) {
    return 8
  }
  if (props?.quarter) {
    return 6
  }
  if (props?.span) {
    return props.span
  }
}

// 表单项禁用 / 表单项modelValue
export function useFormField(props: LyUseFieldProp, emit: (event: 'update:modelValue', ...args: any[]) => void) {
  const formInstance = inject(lyFormCtxKey, undefined)
  return {
    // 表单禁用状态
    disabled: computed(() => props.disabled || formInstance?.disabled),
    // 表单值, 可set
    model: useFieldModel(props, emit)
  }
}

// 字典项
export function useDictOption(props: DictOptionsProps): ComputedRef<LyDictItem[]> {
  return computed((): LyDictItem[] => {
    if (props.options) {
      return props.options
    } else if (props.dictCode) {
      return useDictStore().dictPool[props.dictCode].value
    } else {
      console.debug('需要提供dictCode / dictOptions')
      return []
    }
  })
}

/**
 * 生成可写的对象, 用于统一v-model用法
 * @param props 组件props
 * @param key 组件props中的key
 * @param emit 组件emit
 * @return 可写计算属性
 */
export function useFieldModel<T extends LyUseFieldProp, K extends Extract<keyof T, string>>
(props: T,
  emit: (event: Prefix<'update:', K>, ...args: any[]) => void,
  key: K = 'modelValue' as K) {
  const model = computed({
    get() {
      return props[key]
    },
    set(v: T[K]) {
      // 禁用表单, 无法触发任何值的改变
      if (props.disabled) {
        return
      }
      // 值没有发生改变, 则不触发emit
      if (props[key] === v) {
        return
      }
      emit(`update:${key}`, v)
    }
  })
  onUnmounted(() => {
    if (props.cleanUp) {
      model.value = undefined as unknown as T[K]
    }
  })
  return model
}
