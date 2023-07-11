import {defineConfig, presetUno} from 'unocss'
import presetIcons from '@unocss/preset-icons'
import {IconifyIcons} from './src/components/special/icon/iconify'

export default defineConfig({
  presets: [
    presetUno(),
    presetIcons({
      extraProperties: {
        display: 'inline-block',
        'vertical-align': '-0.125em'
      }
    })
  ],
  // 将icon图标集添加到safelislt
  safelist: [].concat(IconifyIcons.split(',').map(it => `i-${it}`))
})
