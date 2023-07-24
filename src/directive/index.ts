import {App, Plugin} from 'vue'
import {AutoBlur} from '@/directive/auto-blur'

export const LyDirective: Plugin = {
  install(Vue: App){
    Vue.directive('AutoBlur', AutoBlur)
  }
}
