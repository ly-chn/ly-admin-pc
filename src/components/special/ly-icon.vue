<script lang="ts" setup>
import {computed} from 'vue'
import type {IconifyIconType} from '@/types/iconify'
import {StyleUtil} from '@/components/util/style-util'

const props = defineProps<{
  // 图标类型
  type?: IconifyIconType,
  // 图标颜色
  color?: string,
  // 图标选择状态
  spin?: boolean,
  // 大小
  size?: number | string,
  // 图标旋转角度(0-360)
  rotate?: number
}>()

const style = computed(() => {
  return {
    color: props.color,
    size: StyleUtil.addUnit( props.size)
  }
})
</script>

<template>
  <i :class="[$attrs.class, spin && 'icon-spinner', `i-${props.type}`, 'ly-icon']"
     :style="style"/>
</template>
