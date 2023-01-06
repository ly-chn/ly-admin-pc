<script lang="ts" setup>
import {LyPropType} from '@/components/util/ly-prop-type'
import {PropType, ref} from 'vue'
import {TableProps} from 'element-plus'
import {useFieldModel} from '@/components/form/util/form-util'

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
const table = ref()
const emits = defineEmits(['update:selectedRowKeys'])
const selectRowKeys = useFieldModel(props, emits, 'selectedRowKeys')
const handleRowSelect = ()=>{
  selectRowKeys.
}
</script>
<template>
  <el-table :data="data"
            :fit="false"
            ref="table"
            :height="height"
            :lazy="lazy"
            :load="load"
            @select="handleRowSelect"
            :max-height="maxHeight"
            :row-key="rowKey"
            :size="size"
            :span-method="spanMethod"
            border
            highlight-current-row
            resizable
            stripe
            style="width: 100%">
    <template #default>
      <slot></slot>
    </template>
  </el-table>
</template>