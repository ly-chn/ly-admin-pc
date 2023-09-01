import {defineConfig, presetUno} from 'unocss'
import presetIcons from '@unocss/preset-icons'
import {IconifyIcons} from './src/components/special/icon/iconify'
import {FileSystemIconLoader} from '@iconify/utils/lib/loader/node-loaders'

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
                console.log(collection, icon, props)
                props.width = '14px'
                props.height = '14px'
              }
            }
          }
        }) as any
  ],
})
