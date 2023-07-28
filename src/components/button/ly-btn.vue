<template>
  <el-button :circle="circle"
             :class="{'is-disabled': disabled}"
             :link="link"
             :loading="loading"
             :plain="plain"
             :size="size"
             :text="text"
             :type="type"
             class="ly-btn"
             @click="handleClick">
    <template v-if="showIcon" #icon>
      <ly-icon :type="icon"/>
    </template>
    <template v-if="slots.default" #default>
      <slot/>
    </template>
  </el-button>
</template>

<script lang="ts" setup>
import type {PropType} from 'vue'
import {computed, useSlots} from 'vue'
import {LyPropType} from '@/components/util/ly-prop-type'
import {IconifyIconType} from '@/types/iconify'
import {ElMessage} from 'element-plus'

const props = defineProps({
  /**
   * 图标
   */
  icon: String as PropType<IconifyIconType>,
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
   * 禁用原因, 将作为提示展示给用户
   */
  disabledTips: String,
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

const emits = defineEmits(['click'])

const slots = useSlots()
const showIcon = computed(() => {
  return props.icon && !(props.link && slots.default)
})

const unClickAble = computed(()=>props.disabled || props.loading)

const handleClick = () => {
  if (unClickAble.value && props.disabledTips) {
    return ElMessage.info(props.disabledTips)
  } else if (!unClickAble.value) {
    emits('click')
  }
}
</script>
