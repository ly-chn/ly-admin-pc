<template>
  <ly-btn icon="el-icon-Search"
          type="primary"
          :link="isLink"
          @click="emits('click')"
          :disabled="disabled">搜索
  </ly-btn>
</template>

<script setup lang="ts">
import {useBtnLink} from '@/components/button/util/ly-btn-util'

const props = defineProps({
  link: Boolean,
  disabled: Boolean
})
const emits = defineEmits(['click'])
const isLink = useBtnLink(props)
</script>