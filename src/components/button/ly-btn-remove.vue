<template>
  <ly-btn type="primary" icon="el-icon-Delete" :link="isLink">删除</ly-btn>
</template>

<script setup lang="ts">
import {useBtnLink} from '@/components/button/util/ly-btn-util'

const props = defineProps({
  link: Boolean,
})
const isLink = useBtnLink(props)
</script>