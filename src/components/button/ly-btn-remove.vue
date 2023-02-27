<template>
  <ly-btn type="primary"
          icon="el-icon-Delete"
          :link="isLink"
          @click="handleClick">删除
  </ly-btn>
</template>

<script setup lang="ts">
import {useBtnLink} from '@/components/button/util/ly-btn-util'
import {ElMessageBox} from 'element-plus'
import type {PropType} from 'vue'

const props = defineProps({
  link: Boolean,
  disabled: Boolean,
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
const isLink = useBtnLink(props)

async function handleClick() {
  if (!props.unimportant) {
    await ElMessageBox.confirm(props.tips?.() ?? '确认删除吗? 该操作不可还原', '警告', {type: 'warning'})
  }
  emits('click')
}
</script>