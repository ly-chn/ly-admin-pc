<template>
  <ly-area-search :context="dictItemCtx">
    <template #aside>
      <ly-area-crud :context="dictCtx">
        <div class="flex">
          <el-input v-model="keywords" class="flex-1" placeholder="过滤..."/>
          <ly-btn-create title="添加字典" @click="dictCtx.handleEdit"/>
        </div>
        <ly-tree :data="dictTreeData"
                 :props="{label: 'dictName'}"
                 style="min-width: 300px"
                 :keywords="keywords"
                 @current-change="handleCurrentChange">
          <template #default="{data}">
            <div class="flex flex-1 justify-between">
              {{ data.dictName }}
              <div v-if="data.id">
                <ly-to-clipboard :text="data.dictCode"/>
                <ly-btn-modify link @click="dictCtx.handleEdit(data)"/>
                <ly-btn-remove link @click="handleRemoveDict(data.id)"/>
              </div>
            </div>
          </template>
        </ly-tree>
        <dict-edit/>
      </ly-area-crud>
    </template>

    <ly-form search-form>
      <ly-input label="名称" v-model="searchForm.label"/>
      <ly-input label="编码" v-model="searchForm.value"/>
      <template #operation>
        <ly-btn-create :disabled="!currentDict" disabled-tips="请选择一个字典" @click="dictItemCtx.handleEdit"/>
      </template>
      <dict-item-edit/>
    </ly-form>

    <template #table>
      <ly-table adjust-column>
        <ly-column-index/>
        <ly-column label="名称" prop="label">
          <template #default="{row}">
            <ly-dict-render v-model="row.value" :dict-code="currentDict.dictCode"/>
          </template>
        </ly-column>
        <ly-column label="编码" prop="value"/>
        <ly-column label="排序值" prop="orderWeight"/>
        <ly-column label="提示" prop="tips"/>
        <ly-column label="备注" prop="remark"/>
        <ly-column label="最新更新" prop="updateTime"/>
        <ly-column-action>
          <template #default="{row}">
            <ly-btn-modify @click="dictItemCtx.handleEdit(row)"/>
            <ly-btn-remove @click="dictItemCtx.handleRemove(row.id)"/>
          </template>
        </ly-column-action>
      </ly-table>
    </template>
  </ly-area-search>
</template>

<script setup>
import {dictApi} from '@/api/system/dict'
import {dictItemApi} from '@/api/system/dict-item'
import LyDictRender from '@/components/special/ly-dict-render.vue'
import LyToClipboard from '@/components/special/ly-to-clipboard.vue'
import {useDictStore} from '@/store/dict'
import {useCrud} from '@/use/simple-crud'
import DictEdit from '@/views/system/component/dict-edit.vue'
import DictItemEdit from '@/views/system/component/dict-item-edit.vue'
import {computed, reactive, ref, watch} from 'vue'

const currentDict = reactive({id: null, dictCode: null})

const keywords = ref()
const dictItemCtx = useCrud(dictItemApi, {
  beforeSearch: (params) => {
    if (!currentDict.id) {
      return null
    }
    params.dictId = currentDict.id
    return params
  },
  beforeEdit(record) {
    record.value.dictId = currentDict.id
  },
  name: 'dict-item'
})
const {searchForm} = dictItemCtx

const dictCtx = useCrud(dictApi, {noPaging: true, name: 'dict'})

/**
 * 移除字典, 清空字典项
 */
async function handleRemoveDict(id) {
  await dictCtx.handleRemove(id)
  currentDict.id = null
  currentDict.dictCode = null
  dictItemCtx.tableData.value = []
}

const dictStore = useDictStore()
const dictType = dictStore.dictPool['dict_type']

const dictTreeData = computed(() => {
  return dictType.value.map(it => {
    return {
      dictName: it.label,
      children: dictCtx.tableData.value.filter(dict => dict.dictType === it.value)
    }
  })
})

function handleCurrentChange(data) {
  currentDict.id = data.id
  currentDict.dictCode = data.dictCode
  dictItemCtx.handleSearch()
}

// after edit dict item, refresh dict
watch(()=> dictItemCtx.editing, value=> {
  console.log('watch value')
  !value && dictStore.refresh(currentDict.dictCode)
})

</script>
