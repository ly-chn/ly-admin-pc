<template>
  <slot></slot>
</template>
<script lang="ts" setup>
import {LyFormItemContext} from '/@/components/form/util/form-ctx'
import {provide} from 'vue'

const fields: LyFormItemContext[] = []
const addField = (field: LyFormItemContext) => {
  // todo: 向上更新
  fields.push(field)
}
const removeField = (field: LyFormItemContext) => {
  // todo: 向上更新
  fields.splice(fields.indexOf(field), 1)
}
const validate = async () => {
  await Promise.all(fields.map(field => field.validate('')))
}
const clearValidate = async () => {
  await Promise.all(fields.map(field => field.clearValidate()))
}

provide('todo: 定义key', {
  addField, removeField, validate, clearValidate
})
</script>
