import LyIcon from '@/components/special/ly-icon.vue'
import LyInput from '@/components/form/form-item/ly-input.vue'
import LyForm from '@/components/form/form/ly-form.vue'
import LyFormItem from '@/components/form/form-item/ly-form-item.vue'
import LyToggle from '@/components/special/ly-toggle.vue'
import {App} from 'vue'
import LySelect from '@/components/form/form-item/ly-select.vue'

export const LyComponent = {
  install: (Vue: App) => {
    Vue.component('LyIcon', LyIcon)
    Vue.component('LyInput', LyInput)
    Vue.component('LyForm', LyForm)
    Vue.component('LyFormItem', LyFormItem)
    Vue.component('LyToggle', LyToggle)
    Vue.component('LySelect', LySelect)
  }
}
