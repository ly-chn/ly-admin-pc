<template>
  <ly-btn :link="link"
          icon="ep:download"
          type="primary"
          :disabled-tips="disabledTips"
          :disabled="disabled"
          v-bind="bridgeEmits">
    <slot>导入</slot>
    <div class="hidden">下载导入模板</div>
  </ly-btn>
</template>

<script lang="ts" setup>
import {lyBtnProps} from '@/components/button/util/btn-props'
import {useBridgeEmits} from '@/use/bridge-emits'

defineProps({...lyBtnProps})

const emits = defineEmits(['click'])
const bridgeEmits = useBridgeEmits(emits, ['click'])

</script>
