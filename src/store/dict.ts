import {defineStore} from 'pinia'
import type {LyDictItem} from '@/components/form/util/form-props'
import {CallCache} from '@/util/call-cache'
import {dictItemApi} from '@/api/system/dict-item'
import type {ShallowRef} from 'vue'
import {shallowReactive, shallowRef} from 'vue'

export const useDictStore = defineStore('dict', (): DictStore => {
  const dictPool = shallowReactive(new Proxy({}, {
    get(target: Record<string | symbol, ShallowRef<LyDictItem[]>>, dictCode: string | symbol): any {
      if (typeof dictCode !== 'string' || dictCode.startsWith?.('__v_')) {
        return target[dictCode]
      }
      // 字典不存在, 初始化字典
      if (!target[dictCode]) {
        target[dictCode] = shallowRef([])
        setTimeout(async () => {
          target[dictCode].value = await CallCache.call(dictItemApi.getByDictCode, 5, dictCode)
        })
      }
      return target[dictCode]
    }
  }))

  const refresh = async (dictCode: string) => {
    console.debug('update dictCode', dictCode)
    if (dictCode) {
      const value = await CallCache.call(dictItemApi.getByDictCode, 5, dictCode)
      dictPool[dictCode] ??= shallowRef([])
      dictPool[dictCode].value = value
      return
    }
    await Promise.all(Object.keys(dictPool)
      .map(dictCode => CallCache.call(dictItemApi.getByDictCode, 5, dictCode)
        .then(value => {
          dictPool[dictCode] ??= shallowRef([])
          dictPool[dictCode].value = value
        })))
  }
  return {
    dictPool,
    refresh
  }
})

export type DictStore = {
  /**
   * 字典池, key为字典编码, value为字典项
   */
  dictPool: Record<string, ShallowRef<LyDictItem[]>>
  /**
   * 刷新字典编码
   * @param {string} dictCode, 指定字典编码, 如果不指定, 则刷新所有
   * @return {Promise<void>}
   */
  refresh(dictCode?: string): Promise<void>
}
