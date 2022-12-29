<script setup lang="ts">

import {useModel} from '@/components/form/util/form-util'

const props = defineProps({
  pageSize: Number,
  currentPage: Number,
  total: Number
})

const emits = defineEmits(['update:pageSize', 'update:currentPage'])

const pageSize = useModel(props, 'pageSize', emits)
const currentPage = useModel(props, 'currentPage', emits)
</script>
<template>
  <el-pagination v-model:page-size="pageSize" v-model:current-page="currentPage" :total="total" :page-sizes="[10, 20, 30, 50]"/>
</template>
