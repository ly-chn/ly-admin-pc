<template>
  <el-table-column label="#" type="index" align="center" width="60" :fixed="fixed"/>
</template>

<script lang="ts" setup>
import {PropType} from 'vue'

defineProps({
  // 列是否固定在左侧或者右侧。 true 表示固定在左侧
  fixed: [Boolean, String] as PropType<true | 'left' | 'right'>
})
</script>