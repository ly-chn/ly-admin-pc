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
      <el-checkbox v-model="show.dictName">show dictName</el-checkbox>
      <el-checkbox v-model="show.dictCode">show dictCode</el-checkbox>
      <el-checkbox v-model="show.dictType">show dictType</el-checkbox>
      <el-checkbox v-model="show.createTime">show createTime</el-checkbox>

      <ly-table>
        <ly-column-index/>
        <ly-column label="字典名称"
                   :key="'字典名称'"
                   prop="dictName">
          <ly-column label="字典编码" :key="'字典编码'" prop="dictCode"/>
          <ly-column label="字典类型" :key="'字典类型'" prop="dictType">
            <ly-column label="创建时间" :key="'创建时间'" prop="createTime"/>
          </ly-column>
        </ly-column>
        <!--<ly-column label="创建时间" prop="createTime"/>-->
        <!--<ly-column-action>删除</ly-column-action>-->
      </ly-table>
    </template>
  </ly-area-search>
</template>

<script setup>
import {useSearchPage} from '@/use/search-page'
import {dictApi} from '@/api/system/dict'
import LyColumn from '@/components/table/column/ly-column.vue'
import {ref} from 'vue'

const show = ref({
  dictName: true,
  dictCode: true,
  dictType: true,
  createTime: true
})
const searchCtx = useSearchPage(dictApi)
const searchForm = searchCtx.searchForm
</script>
