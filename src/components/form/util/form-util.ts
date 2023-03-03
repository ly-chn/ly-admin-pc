import {computed, inject, reactive} from 'vue'
import type {DictOptionsProps, LyColSpanProps, LyFormFieldProps} from '@/components/form/util/form-props'
import {lyFormCtxKey} from '@/components/form/util/form-ctx'
import type {Prefix} from '#/utility-type'
import {useDictStore} from '@/store/dict'

export function useAutoLabelWidth(maxLabelWidth: number) {
  const labelWidthMap = reactive(new Map<symbol, number>())
  const autoLabelWidth = computed(() => {
    if (labelWidthMap.size === 0) {
      return ''
    }
    const max = Math.min(Math.max(80, ...Array.from(labelWidthMap.values())), maxLabelWidth)
    return max ? `${max}px` : ''
  })
  const registerLabelWidth = (key: symbol, width: number) => {
    labelWidthMap.set(key, width)
  }
  const deregisterLabelWidth = (key: symbol) => {
    labelWidthMap.delete(key)
  }
  return {
    autoLabelWidth,
    registerLabelWidth,
    deregisterLabelWidth
  }
}

export function useColSpan(props?: LyColSpanProps) {
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

export function useFormField(props: LyFormFieldProps, emit: (event: 'update:modelValue', ...args: any[]) => void) {
  return {
    disabled: useFieldDisabled(props),
    modelValue: useFieldModel(props, emit)
  }
}

export function useFieldDisabled(props: LyFormFieldProps) {
  const formInstance = inject(lyFormCtxKey, undefined)
  return computed(() => props.disabled || formInstance?.disabled)
}

export function useDictOption(props: DictOptionsProps) {
  return computed(() => {
    if (props.options) {
      return props.options
    } else if (props.dictCode) {
      return useDictStore().getDict(props.dictCode).value
    } else {
      console.warn('需要提供dictCode / dictOptions')
      return []
    }
  })
}

/**
 * 生成可写的对象, 用于统一v-model用法
 * @param props 组件props
 * @param key 组件props中的key
 * @param emit 组件emit
 * @param transformGet computed get转换, 参数为props[key]的值, 返回值作为computed的get返回值
 * @param transformSet computed set转换, 参数为set的参数, 返回值作为emit的参数
 * @return 可写计算属性
 */
export function useFieldModel<T extends Record<string, any>, K extends Extract<keyof T, string>>
(props: T,
  emit: (event: Prefix<'update:', K>, ...args: any[]) => void,
  key: K = 'modelValue' as K,
  transformGet: (v: T[K]) => any = v => v,
  transformSet: (v: T[K]) => T[K] = v => v) {
  return computed({
    get() {
      return transformGet(props[key])
    },
    set(v: T[K]) {
      // 值没有发生改变, 则不触发emit
      if (transformGet(props[key]) === v) {
        return
      }
      emit(`update:${key}`, transformSet(v))
    }
  })
}