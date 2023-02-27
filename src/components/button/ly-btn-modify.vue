<template>
  <ly-btn type="primary" icon="el-icon-Edit" :link="isLink" @click="emits('click')">编辑</ly-btn>
</template>

<script setup lang="ts">
import {useBtnLink} from '@/components/button/util/ly-btn-util'

const props = defineProps({
  link: Boolean
})
const emits = defineEmits(['click'])
const isLink = useBtnLink(props)
</script>