import LyIcon from '/@/components/special/ly-icon.vue'
import LyInput from '/@/components/form/form-item/ly-input.vue'
import LyForm from '/@/components/form/form/ly-form.vue'
import LyFormItem from '/@/components/form/form-item/ly-form-item.vue'
import LyToggle from '/@/components/special/ly-toggle.vue'
export const LyComponent = {
  install: (app: import('vue').App) => {
    app.component('LyIcon', LyIcon)
    app.component('LyInput', LyInput)
    app.component('LyForm', LyForm)
    app.component('LyFormItem', LyFormItem)
    app.component('LyToggle', LyToggle)
  }
}
