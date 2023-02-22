<template>
  <ly-area-search :context="dictItemSearchCtx">
    <template #aside>
      <el-input v-model="keywords" placeholder="过滤"/>
      <ly-tree :data="dictList" :props="{label: 'dictName'}" @current-change="handleCurrentChange">
        <template #default="{data}">
          {{ data.dictName }}
        </template>
      </ly-tree>
    </template>

    <ly-form quarter search-form>
      <ly-input label="字典标签" v-model="searchForm.label"/>
      <ly-input label="字典值" v-model="searchForm.value"/>
      <template #operation>
        <ly-btn-create @click="handleEdit"/>
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
import LyBtnCreate from '@/components/button/ly-btn-create.vue'
import LyTree from '@/components/tree/ly-tree.vue'
import {useSearchPage} from '@/use/search-page'
import {ref} from 'vue'

const currentDictId = ref()

const keywords = ref()
const dictItemSearchCtx = useSearchPage(dictItemApi, {
  beforeSearch: (params) => {
    if (!currentDictId.value) {
      return null
    }
    params.dictId = currentDictId.value
    return params
  }
})
const {searchForm, handleEdit} = dictItemSearchCtx

const dictList = ref()
dictApi.all().then(res => dictList.value = res)

// todo: 根据字典类型分组
function handleCurrentChange(data){
  currentDictId.value = data.id
  dictItemSearchCtx.handleSearch()
}
</script>
