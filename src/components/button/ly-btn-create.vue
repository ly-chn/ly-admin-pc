<template>
  <ly-btn :disabled="disabled"
          :link="isLink"
          icon="el-icon-Plus"
          type="primary"
          @click="emits('click')">新增
  </ly-btn>
</template>

<script lang="ts" setup>
import {useBtnLink} from '@/components/button/util/ly-btn-util'

const props = defineProps({
  link: Boolean,
  disabled: Boolean
})

const emits = defineEmits(['click'])
const isLink = useBtnLink(props)
</script>