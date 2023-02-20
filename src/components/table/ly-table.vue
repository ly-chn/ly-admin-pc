<script lang="ts" setup>
import {LyPropType} from '@/components/util/ly-prop-type'
import {
  computed,
  CSSProperties,
  inject,
  nextTick,
  onMounted,
  PropType,
  provide,
  reactive,
  ref,
  toRaw,
  watchEffect
} from 'vue'
import {ElPopover, ElTable, ElTree, TableProps} from 'element-plus'
import {useFieldModel} from '@/components/form/util/form-util'
import {calcShowAbleColumn, getRowIdentity, tableStore, useColumnCollect} from '@/components/table/ly-table-util'
import {searchAreaCtxKey} from '@/components/area/area-ctx'
import LyPaging from '@/components/special/ly-paging.vue'
import {Paging} from '@/use/search-page'
import {lyTableColumnCustomerCtxSymbol} from '@/components/table/ly-table-ctx'
import {useRoute} from 'vue-router'

const props = defineProps({
  // 显示的数据
  data: Array,
  // 分页
  paging: Object as PropType<Paging>,
  // 将应用到table
  style: [Object, String] as PropType<CSSProperties>,
  // loading状态
  loading: Boolean,
  // Table 的尺寸
  size: LyPropType.size,
  /**
   * Table 的高度， 默认为自动高度。
   * 如果 height 为 number 类型，单位 px；
   * 如果 height 为 string 类型，则这个高度会设置为 Table 的 style.height 的值，
   * Table 的高度会受控于外部样式。
   */
  height: LyPropType.sideLength,
  // Table 的最大高度。 合法的值为数字或者单位为 px 的高度。
  maxHeight: LyPropType.sideLength,
  /**
   * 行数据的 Key，用来优化 Table 的渲染；
   * 在使用reserve-selection功能与显示树形数据时，该属性是必填的。
   * 类型为 String 时，支持多层访问：user.info.id，但不支持 user.info[0].id，此种情况请使用 Function。
   */
  rowKey: {
    type: [String, Function] as PropType<TableProps<any>['rowKey']>,
    default: 'id'
  },
  // 合并行或列的计算方法
  spanMethod: Function as PropType<TableProps<any>['spanMethod']>,
  // 是否懒加载子节点数据
  lazy: Boolean,
  // 是否显示表头
  showHeader: {
    type: Boolean,
    default: true
  },
  // 加载子节点数据的函数，lazy 为 true 时生效
  load: Function as PropType<TableProps<any>['load']>,
  // 已选中的内容(v-model)
  selectedRowKeys: Array,
  // 表格唯一标识, 用于存储表格相关设置, 如果一个页面中包含多个表格, 则需要配置此参数, 否则可根据路由生成
  tableId: {
    type: String,
    default: ''
  },
  // 允许自定义列
  adjustColumn: Boolean
})
const table = ref<InstanceType<typeof ElTable>>()
const emits = defineEmits(['update:selectedRowKeys'])

// 选择列
const selectRowKeys = useFieldModel(props, emits, 'selectedRowKeys')
const handleRowSelect = () => {
  selectRowKeys.value = (table.value?.getSelectionRows() as []).map(it => getRowIdentity(it, props.rowKey))
}
watchEffect(() => {
  table.value?.clearSelection()
  props.data?.filter(it => selectRowKeys.value?.includes(getRowIdentity(it, props.rowKey)))
    .forEach(row => table.value?.toggleRowSelection(row, true))
})

// 检索搭配
const searchCtx = inject(searchAreaCtxKey, null)
const finalData = computed(() => props.data ?? searchCtx?.tableData.value)
const finalPaging = computed(() => props.paging ?? searchCtx?.paging.value)
const finalLoading = computed(() => props.loading || searchCtx?.loading.value)

// 自定义列
const route = useRoute()
const tableId = `${route.path}#${props.tableId}`

const columns = useColumnCollect()
const showAbleColumns = ref<string[]>([])
const checkedColumns = ref<string[]>([])

function handleChangeColumnVisible() {
  checkedColumns.value = configColumnsRef.value?.getCheckedKeys() as string[]
  showAbleColumns.value = calcShowAbleColumn(columns, checkedColumns.value)
  nextTick(() => {
    console.log(table.value)
    table.value?.doLayout()
  })
}

const configColumnsRef = ref<InstanceType<typeof ElTree>>()
const  handleStoreColumnConfig=()=> tableStore.setItem('checkedColumn' + tableId, toRaw(checkedColumns.value))
onMounted(async () => {
  if (!props.adjustColumn) {
    return
  }
  const storeCheckedColumn = await tableStore.getItem<string[]>('checkedColumn' + tableId)
  if (storeCheckedColumn?.length) {
    configColumnsRef.value?.setCheckedKeys(storeCheckedColumn)
    checkedColumns.value = storeCheckedColumn
    showAbleColumns.value = calcShowAbleColumn(columns, storeCheckedColumn)
  }
})
provide(lyTableColumnCustomerCtxSymbol, reactive({
  showAbleColumns: props.adjustColumn ? showAbleColumns : []
}))
const columnsRenderModel = computed(() => JSON.parse(JSON.stringify(columns.value)))
</script>
<template>
  <div v-if="adjustColumn" class="mb-0.5 text-right">
    <el-popover
        :width="200"
        placement="bottom-start"
        title="自定义显示的列"
        trigger="hover"
        @hide="handleStoreColumnConfig">
      <template #default>
        <el-tree ref="configColumnsRef"
                 :data="columnsRenderModel"
                 default-expand-all
                 node-key="label"
                 show-checkbox
                 @check="handleChangeColumnVisible"/>
      </template>
      <template #reference>
        <ly-btn icon="el-icon-Setting" size="small"/>
      </template>
    </el-popover>
  </div>
  <el-table ref="table"
            v-loading="finalLoading"
            :data="finalData"
            :height="height"
            :lazy="lazy"
            :load="load"
            :max-height="maxHeight"
            :row-key="rowKey"
            :show-header="showHeader"
            :size="size"
            :span-method="spanMethod"
            :style="style"
            border
            fit
            flexible
            highlight-current-row
            resizable
            stripe
            style="width: 100%"
            @select="handleRowSelect"
            @select-all="handleRowSelect">
    <template #default>
      <slot/>
    </template>
  </el-table>
  <ly-paging v-if="finalPaging"
             v-model:page-num="finalPaging.pageNum"
             v-model:page-size="finalPaging.pageSize"
             v-model:total="finalPaging.total"
             class="mt-1"/>
</template>