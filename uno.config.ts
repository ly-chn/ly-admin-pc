import {defineConfig, presetUno} from 'unocss'
import presetIcons from '@unocss/preset-icons'
import {IconifyIcons} from './src/components/special/icon/iconify'
import {FileSystemIconLoader} from '@iconify/utils/lib/loader/node-loaders'

const loader = FileSystemIconLoader('./src/assets/svg-icon')
const test = (name: string) => {
  return loader(name)
}
export default defineConfig({
  presets: [
    presetUno(),
        presetIcons({
          extraProperties: {
            display: 'inline-block',
            'vertical-align': '-0.125em'
          },
          collections: {
            //ly: test,
            'ly': FileSystemIconLoader('./src/assets/icons', svg => svg.replace(/(<svg.*(width|height)=").*"(.*>)/, ''))
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
  // 将icon图标集添加到safelislt
  safelist: ['i-ly:duanxin'].concat(IconifyIcons.split(',').map(it => `i-${it}`))
})
