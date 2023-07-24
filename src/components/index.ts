import LyIcon from '@/components/special/ly-icon.vue'
import LyInput from '@/components/form/form-item/ly-input.vue'
import LyForm from '@/components/form/form/ly-form.vue'
import LyFormItem from '@/components/form/form-item/ly-form-item.vue'
import LyToggle from '@/components/special/ly-toggle.vue'
import type {App, Plugin} from 'vue'
import LySelect from '@/components/form/form-item/ly-select.vue'
import LyBtnSearch from '@/components/button/ly-btn-search.vue'
import LyBtnReset from '@/components/button/ly-btn-reset.vue'
import LyAreaSearch from '@/components/area/ly-area-search.vue'
import LyTable from '@/components/table/ly-table.vue'
import LyColumnIndex from '@/components/table/column/ly-column-index.vue'
import LyColumnSelection from '@/components/table/column/ly-column-selection.vue'
import LyBtn from '@/components/button/ly-btn.vue'
import LyDialog from '@/components/dialog/ly-dialog.vue'
import LyColumn from '@/components/table/column/ly-column.vue'
import LyColumnAction from '@/components/table/column/ly-column-action.vue'
import LyTree from '@/components/tree/ly-tree.vue'
import LyBtnCreate from '@/components/button/ly-btn-create.vue'
import LyBtnRemove from '@/components/button/ly-btn-remove.vue'
import LyBtnModify from '@/components/button/ly-btn-modify.vue'
import LyAreaCrud from '@/components/area/ly-area-crud.vue'
import LyRadio from '@/components/form/form-item/ly-radio.vue'
import LySwitch from '@/components/form/form-item/ly-switch.vue'
import LyInputIcon from '@/components/form/form-item/ly-input-icon.vue'
import LyIconPicker from '@/components/special/ly-icon-picker.vue'
import LyTreeSelect from '@/components/form/form-item/ly-tree-select.vue'
import LyBtnImport from '@/components/button/ly-btn-import.vue'
import LyBtnExport from '@/components/button/ly-btn-export.vue'

export const LyComponent: Plugin = {
  // webstorm暂时无法识别自动注册/name形式注册组件
  install: (Vue: App) => {
    Vue.component('LyIcon', LyIcon)
    Vue.component('LyToggle', LyToggle)

    Vue.component('LyForm', LyForm)
    Vue.component('LyFormItem', LyFormItem)
    Vue.component('LyInput', LyInput)
    Vue.component('LyInputIcon', LyInputIcon)
    Vue.component('LySelect', LySelect)
    Vue.component('LyRadio', LyRadio)
    Vue.component('LySwitch', LySwitch)
    Vue.component('LyTreeSelect', LyTreeSelect)

    Vue.component('LyTable', LyTable)
    Vue.component('LyColumnSelection', LyColumnSelection)
    Vue.component('LyColumnIndex', LyColumnIndex)
    Vue.component('LyColumn', LyColumn)
    Vue.component('LyColumnAction', LyColumnAction)

    Vue.component('LyAreaSearch', LyAreaSearch)
    Vue.component('LyAreaCrud', LyAreaCrud)

    Vue.component('LyDialog', LyDialog)
    Vue.component('LyTree', LyTree)
    Vue.component('LyIconPicker', LyIconPicker)

    Vue.component('LyBtn', LyBtn)
    Vue.component('LyBtnSearch', LyBtnSearch)
    Vue.component('LyBtnReset', LyBtnReset)
    Vue.component('LyBtnCreate', LyBtnCreate)
    Vue.component('LyBtnRemove', LyBtnRemove)
    Vue.component('LyBtnModify', LyBtnModify)
    Vue.component('LyBtnImport', LyBtnImport)
    Vue.component('LyBtnExport', LyBtnExport)
  }
}
