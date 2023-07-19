<template>
  <ly-btn type="primary"
          icon="ep:edit"
          :link="link"
          :loading="loading"
          :disabled-tips="disabledTips"
          :disabled="disabled"
          v-bind="bridgeEmits">
    <slot>修改</slot>
  </ly-btn>
</template>

<script setup lang="ts">
import {lyBtnProps} from '@/components/button/util/btn-props'
import {useBridgeEmits} from '@/use/bridge-emits'

defineProps({...lyBtnProps})
const emits = defineEmits(['click'])
const bridgeEmits = useBridgeEmits(emits, ['click'])

</script>
