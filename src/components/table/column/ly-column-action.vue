<template>
  <el-table-column label="操作" :fixed="fixed" :width="width" align="center">
    <template #default="{ row, column, $index }">
      <slot :column="column" :row="row" v-bind="{$index: $index}"/>
    </template>
  </el-table-column>
</template>

<script lang="ts" setup>
import {LyPropType} from '@/components/util/ly-prop-type'
import type {PropType} from 'vue'

defineProps({
  width: LyPropType.sideLength,
  fixed: [Boolean, String] as PropType<boolean | 'left' | 'right'>
})
</script>
