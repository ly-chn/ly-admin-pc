<script lang="ts" setup>
import {dictOptionsProps, formFieldProps} from '@/components/form/util/form-props'
import {useDictOption, useFormField} from '@/components/form/util/form-util'

const props = defineProps({
  ...dictOptionsProps,
  ...formFieldProps
})
const emit = defineEmits(['update:modelValue'])

const options = useDictOption(props)

const {disabled, model} = useFormField(props, emit)
</script>
<template>
  <ly-form-item :label="props.label" :rules="props.rules" :value="model">
    <el-select-v2 v-model="model" :disabled="disabled" :options="options" :placeholder="placeholder">
      <template #default="scope">
        <slot v-bind="scope">
          <div :title="scope.item.tips">{{ scope.item.label }}</div>
        </slot>
      </template>
    </el-select-v2>
  </ly-form-item>
</template>
