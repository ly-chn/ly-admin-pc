<script lang="ts" setup>
import {LyPropType} from '@/components/util/ly-prop-type'
import {PropType, ref, watchEffect} from 'vue'
import {ElTable, TableProps} from 'element-plus'
import {useFieldModel} from '@/components/form/util/form-util'
import {getRowIdentity} from '@/components/table/ly-table-util'

const props = defineProps({
  // 显示的数据
  data: Array,
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
  // 加载子节点数据的函数，lazy 为 true 时生效
  load: Function as PropType<TableProps<any>['load']>,
  // 已选中的内容(v-model)
  selectedRowKeys: Array
})
const table = ref<InstanceType<typeof ElTable>>()
const emits = defineEmits(['update:selectedRowKeys'])

const selectRowKeys = useFieldModel(props, emits, 'selectedRowKeys')
const handleRowSelect = () => {
  selectRowKeys.value = (table.value?.getSelectionRows() as []).map(it => getRowIdentity(it, props.rowKey))
}
watchEffect(() => {
  table.value?.clearSelection()
  props.data?.filter(it => selectRowKeys.value?.includes(getRowIdentity(it, props.rowKey)))
    .forEach(row => table.value?.toggleRowSelection(row, true))
})
</script>
<template>
  <el-table ref="table"
            :data="data"
            :height="height"
            :lazy="lazy"
            :load="load"
            :max-height="maxHeight"
            :row-key="rowKey"
            :size="size"
            :span-method="spanMethod"
            border
            fit
            highlight-current-row
            resizable
            stripe
            style="width: 100%"
            @select="handleRowSelect"
            @select-all="handleRowSelect">
    <template #default>
      <slot></slot>
    </template>
  </el-table>
</template>