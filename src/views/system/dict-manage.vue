<template>
  <ly-area-search :context="dictItemSearchCtx">
    <template #aside>
      <el-input v-model="keywords" placeholder="过滤"/>
      <ly-tree :data="dictList" :props="{label: 'dictName'}">
        <template #default="{data}">
          {{ data.dictName }}
        </template>
      </ly-tree>
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
import {dictApi} from '@/api/system/dict'
import {dictItemApi} from '@/api/system/dict-item'
import {useSearchPage} from '@/use/search-page'
import {ref} from 'vue'
import LyTree from '@/components/tree/ly-tree.vue'

const keywords = ref()
const dictItemSearchCtx = useSearchPage(dictItemApi)
const {searchForm} = dictItemSearchCtx

const dictList = ref()
dictApi.all().then(res => dictList.value = res)
</script>
