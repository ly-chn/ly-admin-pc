<template>
  <ly-dialog v-model="editing" @ok="handleOk" title="编辑字典项">
    <ly-form ref="formRef" only>
      <ly-input label="展示文本" v-model="record.label"/>
      <ly-input label="值" v-model="record.value"/>
      <ly-input label="展示类型" v-model="record.tagType"/>
      <ly-input label="排序值" v-model="record.orderWeight"/>
      <ly-input label="提示" v-model="record.tips"/>
      <ly-input label="备注" v-model="record.remark"/>
    </ly-form>
  </ly-dialog>
</template>

<script setup>
import {useCrudEdit} from '@/use/simple-crud'
import {ref} from 'vue'

const formRef = ref()
const {editing, record, handleOk} = useCrudEdit(formRef)
</script>