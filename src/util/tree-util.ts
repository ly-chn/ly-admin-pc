import type  {BasicTree} from '#/utility-type'

export class TreeUtil {
  /**
   * 查找树中的节点
   * @param tree 树结构
   * @param nodeKey 要查找的节点key, 如id, label
   * @param target 目标值, 与nodeKey对应
   * @param childrenKey 子节点key
   * @return 如未找到, 返回undefined, 否则返回该节点
   */
  static findNode<T, K extends keyof T>(tree: T[], nodeKey: K, target: T[K], childrenKey: K = 'children' as K): T | undefined {
    if (!tree) {
      return undefined
    }
    for (const node of tree) {
      if (node[nodeKey] === target) {
        return node
      }
      if ((node[childrenKey] as unknown as T[])?.length) {
        const findNode = this.findNode(node[childrenKey] as unknown as T[], nodeKey, target, childrenKey)
        if (findNode) {
          return findNode
        }
      }
    }
  }

  /**
   * 过滤树节点
   * @param tree 目标树
   * @param keywords 关键词
   * @param keyList 允许匹配的key列表, 如果不传或空数组, 则匹配所有key
   * @return 过滤后的树
   */
  static filter<K extends Extract<keyof T, string>, T extends BasicTree>
  (tree: T[] | undefined, keywords: string,  keyList?: K[]): T[] {
    keywords = keywords?.trim()
    console.log(tree)
    if (!keywords || !tree) {
      return []
    }
    const validNode = new Set<BasicTree>()
    function valid(node: BasicTree): boolean {
      if (!keyList?.length) {
        return false
      }
      if (validNode.has(node)) {
        return true
      }
      const nodeElement: BasicTree[] = node.children
      const valueCollect = Object.keys(node)
        .filter(key => keyList.includes(key as K))
        .map(key => node[key as keyof  BasicTree]).join('')
      const res = valueCollect.includes(keywords) || nodeElement?.some(it => valid(it)) || false
      if (res) {
        validNode.add(node)
        return true
      }
      return false
    }
    function filter(list?:BasicTree[]) {
      const res = list?.filter(t => valid(t)) || []
      res.forEach(item => item.children ? filter(item.children) : item.children)
      return res
    }
    return filter(tree) as T[]
  }
}
