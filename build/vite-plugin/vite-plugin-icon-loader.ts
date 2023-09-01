// 自动生成自定义图标的ts泛型和UnoCss的代码提示safelist
import type {Plugin} from 'vite'
import type collections from '@iconify/json/collections.json'
import fs from 'fs'
import {createRequire} from 'node:module'

const require = createRequire(import.meta.url)
type IconLoaderOptions = {
  // 要使用的iconify图标集
  collections?: (keyof typeof collections)[] | keyof typeof collections
  // 自己的svg图标目录
  svgDir?: string
}

const VitePluginIconLoader = (options?: IconLoaderOptions): Plugin => {
  const reloadIcons = async () => {
    let iconifyCollections = options?.collections
    const svgDir = options?.svgDir
    const allIconifyIcons: string[] = []
    const allCustomIcons: string[] = []
    if (iconifyCollections) {
      if (!Array.isArray(iconifyCollections)) {
        iconifyCollections = [iconifyCollections]
      }
      for (const iconId of iconifyCollections) {
        const iconData = require('@iconify/json/json/' + iconId + '.json')
        if (iconData) {
          const {
            prefix,
            icons
          } = iconData
          Object.keys(icons).forEach(icon => allIconifyIcons.push(`${prefix}:${icon}`))
        }
      }
    }
    if (svgDir) {
      const files = fs.readdirSync(svgDir)
      for (const file of files) {
        if (file.endsWith('.svg')) {
          allCustomIcons.push(file.substring(0, file.lastIndexOf('.')))
        }
      }
    }
    fs.writeFileSync('src/components/special/icon/project-icon.ts',
      `export const iconifyIcons = '${allIconifyIcons.map(i=>'i-'+i).join(',')}'\n`
      + `export const iustomIcons = '${allCustomIcons.map(i=>'i-ly:'+i).join(',')}'\n`
      +'export const iconList = (iconifyIcons+ \',\' + iustomIcons).split(\',\')')
    fs.writeFileSync('src/types/icon.d.ts',
      `export type IconifyIcons = ${allIconifyIcons.map(i=>`'${i}'`).join('|')}\n`
      + `export type CustomIcons = ${allCustomIcons.map(i=>`'ly:${i}'`).join('|')}\n`
      +'export type IconType = IconifyIcons | CustomIcons')
  }
  return {
    name: 'vite-plugin-icon-loader',
    handleHotUpdate: reloadIcons,
    buildStart: reloadIcons
  }
}
export default VitePluginIconLoader
