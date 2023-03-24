<template>
  <ly-btn icon="???"
          type="primary"
          :link="isLink"
          @click="emitClick"
          :class="cssClass">
    <slot>搜索</slot>
  </ly-btn>
</template>

<script setup lang="ts">
import {useBtnHolder} from '@/components/button/util/ly-btn-util'
import {lyBtnProps} from '@/components/button/util/btn-props'

const props = defineProps({...lyBtnProps})
const emits = defineEmits(['click'])
const {isLink, emitClick, cssClass} = useBtnHolder(props, emits)
</script>
