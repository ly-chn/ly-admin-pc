<template>
  <ly-btn :disabled="disabled"
          :disabled-tips="disabledTips"
          :link="link"
          :loading="loading"
          icon="ep:upload"
          type="primary"
          v-on="bridgeEmits">
    <slot>上传</slot>
  </ly-btn>
</template>

<script lang="ts" setup>
import {lyBtnProps} from '@/components/button/util/btn-props'
import {useBridgeEmits} from '@/use/bridge-emits'

defineProps({
  ...lyBtnProps
})

const emits = defineEmits(['click'])
const bridgeEmits = useBridgeEmits(emits, ['click'])
</script>
