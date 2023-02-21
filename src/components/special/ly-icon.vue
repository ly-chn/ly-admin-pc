<script lang="ts" setup>
import type {ElIconName} from '#/element-plus'
import type {PropType} from 'vue'

defineProps({
  type: String as PropType<ElIconName>,
  color: String,
  size: [String, Number]
})

</script>
<template>
  <el-icon :color="color" :size="size">
    <component :is="type"/>
  </el-icon>
</template>
