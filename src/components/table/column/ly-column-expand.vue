<template>
  <el-table-column type="expand" align="center" width="40" :fixed="fixed"/>
</template>

<script setup lang="ts">
import {PropType} from 'vue'

defineProps({
  fixed: [Boolean, String] as PropType<true | 'left' | 'right'>
})
</script>
