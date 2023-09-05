import {defineConfig, presetUno} from 'unocss'
import presetIcons from '@unocss/preset-icons'
import {FileSystemIconLoader} from '@iconify/utils/lib/loader/node-loaders'
import {iconList} from './src/components/special/icon/project-icon'

const whRegex = /(width|height)="\d+(\.\d+)?px"\s?/g
export default defineConfig({
  presets: [
    presetUno(),
        presetIcons({
          extraProperties: {
            display: 'inline-block',
            'vertical-align': '-0.125em'
          },
          collections: {
            'ly': FileSystemIconLoader('./src/assets/svg-icon', svg => svg.replace(whRegex, ''))
          },
          customizations: {
            iconCustomizer(collection, icon, props) {
              if (collection === 'ly') {
                props.width = '14px'
                props.height = '14px'
              }
            }
          }
        }) as any
  ],
  safelist: iconList.map(it=>`i-${it}`)
})
