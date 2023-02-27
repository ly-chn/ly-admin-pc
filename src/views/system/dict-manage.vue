<template>
  <ly-area-search :context="dictItemCtx">
    <template #aside>
      <ly-area-crud :context="dictCtx">
        <el-input v-model="keywords" placeholder="过滤..." style="min-width: 300px"/>
        <ly-tree :data="dictCtx.tableData.value" :props="{label: 'dictName'}" @current-change="handleCurrentChange">
          <template #default="{data}">
            <div class="flex flex-1 justify-between">
              {{ data.dictName }}
              <div>
                <ly-btn-modify link @click="dictCtx.handleEdit(data)"/>
                <ly-btn-remove link @click="dictCtx.handleRemove(data.id)"/>
              </div>
            </div>
          </template>
        </ly-tree>
        <dict-edit/>
      </ly-area-crud>
    </template>

    <ly-form quarter search-form>
      <ly-input label="字典标签" v-model="searchForm.label"/>
      <ly-input label="字典值" v-model="searchForm.value"/>
      <template #operation>
        <ly-btn-create @click="dictItemCtx.handleEdit" :disabled="!currentDictId"/>
      </template>
      <dict-item-edit/>
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
import LyAreaCrud from '@/components/area/ly-area-crud.vue'
import LyBtnCreate from '@/components/button/ly-btn-create.vue'
import LyBtnRemove from '@/components/button/ly-btn-remove.vue'
import LyTree from '@/components/tree/ly-tree.vue'
import {useCrud} from '@/use/simple-crud'
import DictEdit from '@/views/system/component/dict-edit.vue'
import DictItemEdit from '@/views/system/component/dict-item-edit.vue'
import {ref} from 'vue'

const currentDictId = ref()

const keywords = ref()
const dictItemCtx = useCrud(dictItemApi, {
  beforeSearch: (params) => {
    if (!currentDictId.value) {
      return null
    }
    params.dictId = currentDictId.value
    return params
  }
})
const {searchForm} = dictItemCtx

const dictCtx = useCrud(dictApi, {noPaging: true})
// const dictList = ref()
// dictApi.all().then(res => dictList.value = res)

// todo: 根据字典类型分组
function handleCurrentChange(data){
  currentDictId.value = data.id
  dictItemCtx.handleSearch()
}
</script>
