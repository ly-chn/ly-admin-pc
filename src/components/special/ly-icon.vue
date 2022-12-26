<script lang="ts" setup>
import {PropType} from 'vue'
import {ElIconName} from '#/element-plus'

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
