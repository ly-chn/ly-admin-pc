<template>
  <el-table-column :width="width" :fixed="fixed" label="操作" align="center">
    <template #default="{ row, column, $index }">
        <slot v-bind="{ row, column, $index }"/>
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

