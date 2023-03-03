import {defineStore} from 'pinia'
import type {LyDictItem} from '@/components/form/util/form-props'
import {reactive, type ComputedRef} from 'vue'
import {computed} from 'vue'
import {CallCache} from '@/util/call-cache'
import {dictItemApi} from '@/api/system/dict-item'

export const useDictStore = defineStore('dict', () => {
  const dictCache: Record<string, LyDictItem[]> = reactive({})
  const computedMap = new Map<string,  ComputedRef<LyDictItem[]>>()
  const getDict = (dictCode: string) => {
    if (!computedMap.has(dictCode)) {
      computedMap.set(dictCode, computed(() => {
        if (!dictCache[dictCode]) {
          CallCache.call(dictItemApi.getByDictCode, 5, dictCode).then(res => dictCache[dictCode] = res)
        }
        return JSON.parse(JSON.stringify(dictCache[dictCode] || []))
      }))
    }
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return computedMap.get(dictCode)!
  }
  return {getDict}
})