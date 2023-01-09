<template>
  <el-table-column label="#" type="index" align="center" width="60" :fixed="fixed"/>
</template>

<script lang="ts" setup>
import {PropType} from 'vue'

defineProps({
  fixed: [Boolean, String] as PropType<true | 'left' | 'right'>
})
</script>