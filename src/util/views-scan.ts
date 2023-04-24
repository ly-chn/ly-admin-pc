import type {BasicTree} from '#/utility-type'

export type ViewsTree = BasicTree<{ label: string, value: string }>

export class ViewsScan {
  static tree() {

    const baseDir = '/src/views/'
    console.log(import.meta.glob('@/views/**/*.vue'))
    const fileList = Object.keys(import.meta.glob('@/views/**/*.vue'))
      .map(it => it.replace(baseDir, ''))
      .filter(it => !it.includes('component'))
      .sort((a, b) => a.localeCompare(b))
    return this.#arrayToTree(fileList)
  }

  static #arrayToTree(array: string[]): ViewsTree[] {
    const tree: ViewsTree[] = []
    array.forEach(path => {
      const pathArr = path.split('/')
      let cursor = tree
      pathArr.forEach((label, index) => {
        if (index === pathArr.length - 1) {
          cursor.push({label: label, value: path})
        } else {
          let child = cursor.find(node => node.label === label)
          !child && cursor.push(child = {label, value: pathArr.slice(0, index + 1).join('/')})
          cursor = child.children || (child.children = [])
        }
      })
    })
    return tree
  }
}
