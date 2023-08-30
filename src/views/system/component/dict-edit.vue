<template>
  <ly-dialog v-model="editing" title="编辑字典" width="500" @ok="handleOk">
    <ly-form ref="formRef" only>
      <ly-input label="字典名称" v-model="record.dictName"/>
      <ly-input label="字典编码" v-model="record.dictCode"/>
      <ly-select label="字典类型" v-model="record.dictType" dict-code="dict_type"/>
    </ly-form>
  </ly-dialog>
</template>

<script setup>
import {useCrudEdit} from '@/use/simple-crud'
import {ref} from 'vue'

const formRef = ref()
const {editing, record, handleOk} = useCrudEdit(formRef)
</script>
