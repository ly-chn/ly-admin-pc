<script lang="ts" setup>
import {formFieldProps} from '@/components/form/util/form-props'
import {useFormField} from '@/components/form/util/form-util'
import LyIconPicker from '@/components/special/ly-icon-picker.vue'

const props = defineProps({
  ...formFieldProps
})
const emit = defineEmits(['update:modelValue'])
const {model, disabled} = useFormField(props, emit)
</script>
<template>
  <ly-form-item :label="props.label" :rules="props.rules" :value="model">
    <el-input v-model="model"
              :disabled="disabled"
              :placeholder="placeholder">
      <template #append>
        <ly-icon-picker v-model="model"/>
      </template>
    </el-input>
  </ly-form-item>
</template>
