<template>
  <ly-btn icon="el-icon-Search" type="primary">搜索</ly-btn>
</template>

<script setup lang="ts">
import type {PropType} from 'vue'
import type {ElIconName} from '#/element-plus'

defineProps({
  type: String as PropType<ElIconName>,
})
</script>