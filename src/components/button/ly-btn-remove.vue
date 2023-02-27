<template>
  <ly-btn type="primary" icon="el-icon-Delete" :link="isLink" @click="emits('click')">删除</ly-btn>
</template>

<script setup lang="ts">
import {useBtnLink} from '@/components/button/util/ly-btn-util'

const props = defineProps({
  link: Boolean
})
const emits = defineEmits(['click'])
const isLink = useBtnLink(props)
</script>