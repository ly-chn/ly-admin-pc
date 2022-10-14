import {computed, reactive, watchEffect} from 'vue'

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
  console.log('labelWidthMap', labelWidthMap)
  return {
    autoLabelWidth,
    registerLabelWidth,
    deregisterLabelWidth
  }
}
