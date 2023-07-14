<template>
  <ly-btn :link="link"
          icon="ep:delete"
          type="primary"
          :disabled="disabled"
          :disabled-tips="disabledTips"
          v-bind="bridgeEmits">
    <slot>删除</slot>
  </ly-btn>
</template>

<script lang="ts" setup>
import type {PropType} from 'vue'
import {lyBtnProps} from '@/components/button/util/btn-props'
import {useBridgeEmits} from '@/use/bridge-emits'

defineProps({
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
const bridgeEmits = useBridgeEmits(emits, ['click'])

</script>
