import {BasicTree} from '#/utility-type'
import {computed, Ref} from 'vue'
import {TreeUtil} from '@/util/tree-util'

/**
 * lu
 * @param tree
 * @param keywords
 * @param childrenKey
 * @param keyList
 * @return {ComputedRef<any>}
 */
export function useTreeFilter<K extends Extract<keyof T, string>, T extends BasicTree<K>>
(tree: Ref<T[]>, keywords: Ref<string>, childrenKey: K = 'children' as K, keyList?: K[]) {
  return computed(() => TreeUtil.filter(tree.value, keywords.value, childrenKey, keyList))
}