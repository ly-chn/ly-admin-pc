<script lang="ts" setup>
import {computed, PropType, useSlots} from 'vue'
import {ColSpanProps} from '/@/components/form/form-item/form-item'

const props = defineProps({
  /**
   * 为true时，表单不可编辑
   */
  disabled: Boolean,
  /**
   * 表单rule变化时触发校验
   */
  validateOnRuleChange: Boolean,
  /**
   * 用于控制该表单内组件的尺寸
   */
  size: String as PropType<'large' | 'default' | 'small'>,
  /**
   * 当校验失败时，滚动到第一个错误表单项
   */
  scrollToError: Boolean,
  rules: Array,
  label: String,
  // ...colSpanProps
})
const slots = useSlots()
const hasLabel = computed(() => props.label || slots.label)
</script>
<template>
  <div v-if="hasLabel" ref="labelWrap" class="el-form-item__label">
    <slot name="label">{{ label }}</slot>
  </div>
  <div class="ly-form-item-content">
    <slot />
  </div>
</template>
<style scoped>

</style>
