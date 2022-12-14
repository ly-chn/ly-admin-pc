import LyIcon from '@/components/special/ly-icon.vue'
import LyInput from '@/components/form/form-item/ly-input.vue'
import LyForm from '@/components/form/form/ly-form.vue'
import LyFormItem from '@/components/form/form-item/ly-form-item.vue'
import LyToggle from '@/components/special/ly-toggle.vue'
import {App} from 'vue'
import LySelect from '@/components/form/form-item/ly-select.vue'
import LyBtnSearch from '@/components/button/ly-btn-search.vue'
import LyBtnReset from '@/components/button/ly-btn-reset.vue'
import LyAreaSearch from '@/components/area/ly-area-search.vue'
import LyTable from '@/components/table/ly-table.vue'
import LyColumnIndex from '@/components/table/column/ly-column-index.vue'
import LyColumnSelection from '@/components/table/column/ly-column-selection.vue'

export const LyComponent = {
  install: (Vue: App) => {
    Vue.component('LyIcon', LyIcon)
    Vue.component('LyInput', LyInput)
    Vue.component('LyForm', LyForm)
    Vue.component('LyFormItem', LyFormItem)
    Vue.component('LyToggle', LyToggle)
    Vue.component('LySelect', LySelect)
    Vue.component('LyBtnSearch', LyBtnSearch)
    Vue.component('LyBtnReset', LyBtnReset)
    Vue.component('LyAreaSearch', LyAreaSearch)
    Vue.component('LyTable', LyTable)
    Vue.component('LyColumnIndex', LyColumnIndex)
    Vue.component('LyColumnSelection', LyColumnSelection)
  }
}
