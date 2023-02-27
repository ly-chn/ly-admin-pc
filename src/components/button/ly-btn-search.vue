<template>
  <ly-btn icon="el-icon-Search" type="primary" :link="isLink">搜索</ly-btn>
</template>

<script setup lang="ts">
import {useBtnLink} from '@/components/button/util/ly-btn-util'

const props = defineProps({
  link: Boolean,
})
const isLink = useBtnLink(props)
</script>