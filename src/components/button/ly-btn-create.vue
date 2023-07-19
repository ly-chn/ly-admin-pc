<template>
  <ly-btn :link="link"
          icon="ep:plus"
          type="primary"
          :loading="loading"
          :disabled-tips="disabledTips"
          :disabled="disabled"
          v-on="bridgeEmits">
    <slot>新增</slot>
  </ly-btn>
</template>

<script lang="ts" setup>
import {lyBtnProps} from '@/components/button/util/btn-props'
import {useBridgeEmits} from '@/use/bridge-emits'

defineProps({...lyBtnProps})
const emits = defineEmits(['click'])
const bridgeEmits = useBridgeEmits(emits, ['click'])
</script>
