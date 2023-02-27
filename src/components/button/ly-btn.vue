<template>
  <el-button :disabled="disabled"
             :link="link"
             :loading="loading"
             :circle="circle"
             :plain="plain"
             :size="size"
             :text="text"
             :type="type">
    <template v-if="icon" #icon>
      <ly-icon :type="icon"/>
    </template>
    <template #default v-if="$slots.default">
      <slot/>
    </template>
  </el-button>
</template>

<script lang="ts" setup>
import type {PropType} from 'vue'
import type {ElIconName} from '#/element-plus'
import {LyPropType} from '@/components/util/ly-prop-type'

defineProps({
  /**
   * 图标
   */
  icon: String as PropType<ElIconName>,
  /**
   * 尺寸
   */
  size: LyPropType.size,
  /**
   * 类型
   */
  type: String as PropType<'primary' | 'success' | 'warning' | 'info' | 'danger'>,
  /**
   * 按钮是否为禁用状态
   */
  disabled: Boolean,
  /**
   * 是否为加载中状态
   */
  loading: Boolean,
  /**
   * 是否为朴素按钮
   */
  plain: Boolean,
  /**
   * 是否为文字按钮
   */
  text: Boolean,
  /**
   * 是否为链接按钮
   */
  link: Boolean,
  /**
   * 是否为圆形按钮
   */
  circle: Boolean
})
</script>