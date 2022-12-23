import {computed, inject, reactive, ref, watchEffect} from 'vue'
import {DictOptionsProps, LyColSpanProps, LyDictItem, LyFormFieldProps} from '@/components/form/util/form-props'
import {lyFormCtxSymbol} from '@/components/form/util/form-ctx'

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
  const formInstance = inject(lyFormCtxSymbol, undefined)
  const disabled = computed(() => props.disabled || formInstance?.disabled || false)
  const emitValue = (value: any, ...others: any[]) => {
    emit('update:modelValue', value, ...others)
  }
  const modelValue = computed({
    get() {
      return props.modelValue
    },
    set(v) {
      emit('update:modelValue', v)
    }
  })
  return reactive({disabled, emitValue, modelValue})
}

export function useDictOption<T extends DictOptionsProps>(props: T) {
  const options = ref<LyDictItem[]>()
  watchEffect(()=>{
    if (props.options) {
      options.value = props.options
    }else{
      options.value = []
    }
  })
  return options
}