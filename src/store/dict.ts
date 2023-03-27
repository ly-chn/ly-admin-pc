import {defineStore} from 'pinia'
import type {LyDictItem} from '@/components/form/util/form-props'
import {shallowRef} from 'vue'
import type {ShallowRef} from 'vue'
import {CallCache} from '@/util/call-cache'
import {dictItemApi} from '@/api/system/dict-item'

export const useDictStore = defineStore('dict', () => {
  const dictCache = new Map<string, ShallowRef<LyDictItem[]>>()
  /**
   * 获取字典, 注意: 不要修改字典数据, 如需修改, 手动copy一份
   * @param dictCode 字典编码
   * @return {ShallowRef<LyDictItem[]>} 字典数据
   */
  const getDict = (dictCode: string) => {
    // set default
    dictCache.has(dictCode) || dictCache.set(dictCode, shallowRef<LyDictItem[]>([]))
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    CallCache.call(dictItemApi.getByDictCode, 5, dictCode).then(res => dictCache.get(dictCode)!.value = res)
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return dictCache.get(dictCode)!
  }
  /**
   * 刷新字典数据
   * @param dictCode 字典编码
   */
  const refreshDict = (dictCode: string) => {
    // set default
    dictCache.has(dictCode) || dictCache.set(dictCode, shallowRef<LyDictItem[]>([]))
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    dictItemApi.getByDictCode(dictCode).then(res => dictCache.get(dictCode)!.value = res)
  }
  return {getDict, refreshDict}
})
