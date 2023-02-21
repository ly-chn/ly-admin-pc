<template>
  <el-table-column type="expand" align="center" width="40" :fixed="fixed"/>
</template>

<script setup lang="ts">
import type {PropType} from 'vue'

defineProps({
  // 列是否固定在左侧或者右侧。 true 表示固定在左侧
  fixed: [Boolean, String] as PropType<true | 'left' | 'right'>
})
</script>
