import type {BasicTree} from '#/utility-type'
import type {Ref} from 'vue'
import {computed, unref} from 'vue'
import {TreeUtil} from '@/util/tree-util'

/**
 * 树节点过滤
 * @example
 * ```typescript
 * const treeData = userTreeFilter([{name: '张三', age: '18', children: []}], ref('张'))
 * ```
 * @param tree 树内容
 * @param keywords 关键词
 * @param childrenKey 子节点key
 * @param keyList 允许搜索的key
 * @return 过滤后的树
 */
export function useTreeFilter<K extends Extract<keyof T, string>, T extends BasicTree<K>>
(tree: Ref<T[]> | T[], keywords: Ref<string> | string, childrenKey: K, keyList?: K[]) {
  return computed(() => TreeUtil.filter(unref(tree), unref(keywords), childrenKey, keyList))
}