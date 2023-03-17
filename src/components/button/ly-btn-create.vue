<template>
  <ly-btn :class="cssClass"
          :link="isLink"
          icon="el-icon-Plus"
          type="primary"
          @click="emitClick">
    <slot>新增</slot>
  </ly-btn>
</template>

<script lang="ts" setup>
import {useBtnHolder} from '@/components/button/util/ly-btn-util'
import {lyBtnProps} from '@/components/button/util/btn-props'

const props = defineProps({...lyBtnProps})

const emits = defineEmits(['click'])
const {isLink, emitClick, cssClass} = useBtnHolder(props, emits)
</script>
