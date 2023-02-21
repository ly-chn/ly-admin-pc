<template>
  <el-table-column :fixed="fixed" type="selection" width="40"/>
</template>

<script lang="ts" setup>
import type {PropType} from 'vue'

defineProps({
  // 列是否固定在左侧或者右侧。 true 表示固定在左侧
  fixed: [Boolean, String] as PropType<true | 'left' | 'right'>,
  // Function 的返回值用来决定这一行的 CheckBox 是否可以勾选
  selectable: Function as PropType<(row: any, index: number) => boolean>
})
</script>

