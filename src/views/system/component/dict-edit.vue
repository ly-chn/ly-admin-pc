<template>
  <ly-dialog v-model="editing" @ok="handleOk">
    <ly-form ref="formRef" only>
      <ly-input label="字典名称" v-model="record.dictName"/>
      <ly-input label="字典名称" v-model="record.dictCode"/>
      <ly-input label="字典名称" v-model="record.dictType"/>
    </ly-form>
  </ly-dialog>
</template>

<script setup>
import {useSearchPageEdit} from '@/use/search-page'
import {ref} from 'vue'

const formRef = ref()
const {editing, record, handleOk} = useSearchPageEdit(formRef)
</script>