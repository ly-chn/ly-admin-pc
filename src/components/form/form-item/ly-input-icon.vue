<script lang="ts" setup>
import {formFieldProps} from '@/components/form/util/form-props'
import {useFormField} from '@/components/form/util/form-util'
import LyIconPicker from '@/components/special/ly-icon-picker.vue'
import LyToClipboard from '@/components/special/ly-to-clipboard.vue'

const props = defineProps({
  ...formFieldProps
})
const emit = defineEmits(['update:modelValue'])
const {model, disabled} = useFormField(props, emit)
</script>
<template>
  <ly-form-item :label="label" :tips="tips" :rules="rules" :value="model">
    <el-input :model-value="model"
              clearable
              @clear="model = undefined"
              :placeholder="placeholder">
      <template #suffix>
        <ly-to-clipboard :text="model" v-if="model"/>
      </template>
      <template #append>
        <ly-icon-picker v-model="model" :disabled="disabled"/>
      </template>
    </el-input>
  </ly-form-item>
</template>
