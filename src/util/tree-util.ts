export class TreeUtil {
  static findNode<T, K extends keyof T>(tree: T[], nodeKey: K, target: T[K], childrenKey: K = 'children' as K): T | undefined {
    if (!tree) {
      return undefined
    }
    for (const node of tree) {
      if (node[nodeKey] === target) {
        return node
      }
      if ((node[childrenKey] as T[])?.length) {
        const findNode = this.findNode(node[childrenKey] as T[], nodeKey, target, childrenKey)
        if (findNode) {
          return findNode
        }
      }
    }
  }
}