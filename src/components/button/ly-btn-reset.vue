<template>
  <ly-btn type="info" icon="el-icon-Refresh" :link="isLink" @click="emits('click')">重置</ly-btn>
</template>

<script setup lang="ts">
import {useBtnLink} from '@/components/button/util/ly-btn-util'

const props = defineProps({
  link: Boolean
})
const emits = defineEmits(['click'])
const isLink = useBtnLink(props)
</script>