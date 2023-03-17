<script lang="ts" setup>
import {dictOptionsProps, formFieldProps} from '@/components/form/util/form-props'
import {useDictOption, useFormField} from '@/components/form/util/form-util'

const props = defineProps({
  ...dictOptionsProps,
  ...formFieldProps
})
const emit = defineEmits(['update:modelValue'])

const options = useDictOption(props)

const {disabled, modelValue} = useFormField(props, emit)
</script>
<template>
  <ly-form-item :label="props.label" :rules="props.rules" :value="modelValue">
    <el-radio-group :disabled="disabled" v-model="modelValue">
      <el-radio v-for="option in options" :key="option.value" :label="option.value" :title="option.tips">{{ option.label}}</el-radio>
    </el-radio-group>
  </ly-form-item>
</template>
