<template>
  <ly-btn :title="title" icon="ep:document" link type="primary" @mouseenter="refreshTitle" @click.stop="handleClick"/>
</template>

<script lang="ts" setup>

import {ClipboardUtil} from '@/util/clipboard-util'
import {ref} from 'vue'

const props = defineProps<{
  text: string | (() => string)
}>()

const handleClick = function () {
  if (!props.text) {
    console.warn('未提供复制的内容')
    return
  }
  if (typeof props.text === 'string') {
    ClipboardUtil.copy(props.text)
  } else {
    ClipboardUtil.copy(props.text())
  }
}
const title = ref<string>('点击复制')
const refreshTitle = () => title.value = typeof props.text === 'function' ? props.text() : props.text
</script>
