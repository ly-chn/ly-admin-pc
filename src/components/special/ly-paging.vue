<script lang="ts" setup>

import {useFieldModel} from '@/components/form/util/form-util'

const props = defineProps({
  pageSize: Number,
  currentPage: Number,
  total: Number
})

const emits = defineEmits(['update:pageSize', 'update:currentPage'])

const pageSize = useFieldModel(props, emits, 'pageSize')
const currentPage = useFieldModel(props, emits, 'currentPage')
</script>
<template>
  <el-pagination v-model:current-page="currentPage"
                 v-model:page-size="pageSize"
                 :page-sizes="[10, 20, 30, 50]"
                 :total="total"/>
</template>
