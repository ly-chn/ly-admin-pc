<template>
  <el-table-column :label="label" :prop="prop" :width="width" :min-width="minWidth" :fixed="fixed" :sortable="sortable" :align="align">
    <template #default="{ row, column, $index }" v-if="$slots.default">
      <slot v-bind="{ row, column, $index }"></slot>
    </template>
  </el-table-column>
</template>

<script lang="ts" setup>
import {dictOptionsProps} from '@/components/form/util/form-props'
import {LyPropType} from '@/components/util/ly-prop-type'
import {PropType} from 'vue'

defineProps({
  ...dictOptionsProps,
  // 显示的标题
  label: {
    type: String,
    required: true
  },
  // 字段名称 对应列内容的字段名， 也可以使用 property 属性
  prop: {
    type: String,
    required: true
  },
  // 对应列的宽度
  width: LyPropType.sideLength,
  // 对应列的最小宽度， 对应列的最小宽度，与 width 的区别是 width 是固定的，min-width 会把剩余宽度按比例分配给设置了 min-width 的列
  minWidth: LyPropType.sideLength,
  // 列是否固定在左侧或者右侧。 true 表示固定在左侧
  fixed: [Boolean, String] as PropType<true | 'left' | 'right'>,
  // 为true表示可排序, 表现为分页处理
  sortable: Boolean,
  // 对齐方式
  align: String as PropType<'left' | 'center' | 'right'>
})
</script>