import LyIcon from '/@/components/special/ly-icon.vue'
import LyInput from '/@/components/form/form-item/ly-input.vue'
import LyForm from '/@/components/form/form/ly-form.vue'
import LyFormItem from '/@/components/form/form-item/ly-form-item.vue'
import LyToggle from '/@/components/special/ly-toggle.vue'
import type {App} from 'vue'

export const LyComponent = {
  install: (Vue: App) => {
    Vue.component(LyIcon.name, LyIcon)
    Vue.component(LyInput.name, LyInput)
    Vue.component(LyForm.name, LyForm)
    Vue.component(LyFormItem.name, LyFormItem)
    Vue.component(LyToggle.name, LyToggle)
  }
}
