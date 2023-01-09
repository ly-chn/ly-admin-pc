<template>
  <el-table-column type="selection" width="40" :fixed="fixed"/>
</template>

<script setup lang="ts">
import {PropType} from 'vue'

defineProps({
  fixed: [Boolean, String] as PropType<true | 'left' | 'right'>
})
</script>

