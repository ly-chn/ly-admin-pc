<template>
  <ly-area-search :context="searchCtx">
    <ly-form quarter search-form>
      <ly-input label="字典名称" v-model="searchForm.dictName"/>
      <ly-input label="字典编码" v-model="searchForm.dictCode"/>
      <template #operation>
        <el-button>新增</el-button>
      </template>
    </ly-form>
    <template #table>
      <ly-table>
        <ly-column-index/>
        <ly-column label="字典名称" prop="dictName"/>
        <ly-column label="字典编码" prop="dictCode"/>
        <ly-column label="字典类型" prop="dictType"/>
        <ly-column label="创建时间" prop="createTime"/>
        <ly-column-action>删除</ly-column-action>
      </ly-table>
    </template>
  </ly-area-search>
</template>

<script setup>
import {useSearchPage} from '@/use/search-page'
import {dictApi} from '@/api/system/dict'
import LyColumn from '@/components/table/column/ly-column.vue'
import LyColumnAction from '@/components/table/column/ly-column-action.vue'

const searchCtx = useSearchPage(dictApi)
const searchForm = searchCtx.searchForm
</script>
