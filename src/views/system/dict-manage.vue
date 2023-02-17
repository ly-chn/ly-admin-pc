<template>
  <ly-area-search :context="searchCtx">
    <template #aside>
      <ly-table style="min-width: 200px" :data="tableData">
        <ly-column label="字典名称" :key="'字典名称'" prop="dictName">
          <template #header>
            <el-input/>
          </template>
          nihc
        </ly-column>
      </ly-table>
    </template>
    <ly-form quarter search-form>
      <ly-input label="字典名称" v-model="searchForm.dictName"/>
      <ly-input label="字典编码" v-model="searchForm.dictCode"/>
      <template #operation>
        <el-button>新增</el-button>
      </template>
    </ly-form>
    <template #table>
      <ly-table adjust-column>
        <ly-column-index/>
        <ly-column label="字典名称" :key="'字典名称'" prop="dictName"/>
        <ly-column label="字典编码" :key="'字典编码'" prop="dictCode">
          <ly-column label="字典类型" :key="'字典类型'" prop="dictType"/>
          <ly-column label="创建时间" prop="createTime"/>
        </ly-column>
      </ly-table>
    </template>
  </ly-area-search>
</template>

<script setup>
import {useSearchPage} from '@/use/search-page'
import {dictApi} from '@/api/system/dict'

const searchCtx = useSearchPage(dictApi)
const {searchForm, tableData} = searchCtx
</script>
