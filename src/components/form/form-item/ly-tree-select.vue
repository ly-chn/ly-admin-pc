<script setup lang="ts">
import {formFieldProps} from '@/components/form/util/form-props'
import {useFormField} from '@/components/form/util/form-util'

const props = defineProps({
  data: Array,
  ...formFieldProps
})
const emit = defineEmits(['update:modelValue'])
const {model, disabled} = useFormField(props, emit)
</script>
<template>
  <ly-form-item :label="props.label" :rules="props.rules" :value="model">
    <el-tree-select :data="data" v-model="model" :disabled="disabled"/>
  </ly-form-item>
</template>
