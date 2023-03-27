<template>
  <ly-btn :class="cssClass"
          :link="isLink"
          icon="ep:delete"
          type="primary"
          @click="handleClick">
    <slot>删除</slot>
  </ly-btn>
</template>

<script lang="ts" setup>
import {useBtnHolder} from '@/components/button/util/ly-btn-util'
import {ElMessageBox} from 'element-plus'
import {ElMessage} from 'element-plus'
import type {PropType} from 'vue'
import {lyBtnProps} from '@/components/button/util/btn-props'

const props = defineProps({
  ...lyBtnProps,
  /**
   * 如果配置此项, 则将其作为提示文案
   */
  tips: Function as PropType<() => string>,
  /**
   * 为true表示非重要数据, 无需二次确认
   */
  unimportant: Boolean
})
const emits = defineEmits(['click'])
const {isLink, cssClass} = useBtnHolder(props, emits)

async function handleClick() {
  if (props.disabled && props.disabledTips) {
    return ElMessage.info(props.disabledTips)
  } else if (!props.disabled) {
    if (!props.unimportant) {
      await ElMessageBox.confirm(props.tips?.() ?? '确认删除吗? 该操作不可还原', '警告', {type: 'warning'})
    }
    emits('click')
  }
}
</script>
