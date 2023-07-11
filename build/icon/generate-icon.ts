import inquirer from 'inquirer'
import collections from '@iconify/json/collections.json'
import * as fs from 'fs'

export {}

(async function () {
  const choices = Object.entries(collections).map(([key, v]) => ({key, name: v.name}))
  choices.sort((a, b) => a.name.localeCompare(b.name))

  const {iconSet}: { iconSet: string[] } = await inquirer.prompt([{
    type: 'checkbox',
    name: 'iconSet',
    choices,
    message: '选择要使用的图表集'
  }])
  if (!iconSet.length) {
    console.warn('未选择图标集, 将清空所有图标')
  }
  const choseKeys = choices.filter(it => iconSet.includes(it.name)).map(it => it.key)
  let allIcon: string[] = []
  for (const iconId of choseKeys) {
    const iconData: { prefix: string, icons: string[] } = await import('@iconify/json/json/' + iconId + '.json')
    if (iconData) {
      const {prefix, icons} = iconData
      allIcon = allIcon.concat(Object.keys(icons).map(icon => `i-${prefix}:${icon}`))
    }
  }
  fs.writeFileSync('src/components/special/icon/iconify.ts',
    `export const IconifyIcons = '${allIcon.join(',')}'`)
  fs.writeFileSync('types/iconify.d.ts', `export type IconifyIconType = ${allIcon.map(it => `'${it}'`).join('|')}`)
})()

