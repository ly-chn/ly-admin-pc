<template>
  <ly-btn icon="el-icon-DocumentCopy" title="点击复制" link @click="handleClick"/>
</template>

<script lang="ts" setup>

import {ClipboardUtil} from '@/util/clipboard-util'

const props = defineProps<{
  text: string | (()=>string)
}>()

const handleClick = function () {
  if (!props.text) {
    console.log('未提供复制的内容')
    return
  }
  if (typeof props.text === 'string') {
    ClipboardUtil.copy(props.text)
  }else{
    ClipboardUtil.copy(props.text())
  }
}
</script>
