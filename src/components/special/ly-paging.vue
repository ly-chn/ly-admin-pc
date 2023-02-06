<script lang="ts" setup>

import {useFieldModel} from '@/components/form/util/form-util'

const props = defineProps({
  /**
   * 页面大小
   */
  pageSize: Number,
  /**
   * 当前页
   */
  pageNum: Number,
  /**
   * 总数
   */
  total: Number
})

const emits = defineEmits(['update:pageSize', 'update:pageNum'])

const pageSize = useFieldModel(props, emits, 'pageSize')
const pageNum = useFieldModel(props, emits, 'pageNum')
</script>
<template>
  <el-pagination v-model:current-page="pageNum"
                 v-model:page-size="pageSize"
                 :page-sizes="[10, 20, 30, 50]"
                 :total="total"/>
</template>
