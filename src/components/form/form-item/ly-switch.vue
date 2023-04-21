<template>
  <ly-form-item :label="label" :tips="tips" :rules="rules" :value="model">
    <!--todo: 找一个修改文本的方式-->
    <el-switch
        v-model="model"
        :disabled="disabled"
        active-text="是"
        inactive-text="否"
        inline-prompt
    />
  </ly-form-item>
</template>

<script lang="ts" setup>
import {formFieldProps} from '@/components/form/util/form-props'
import {useFormField} from '@/components/form/util/form-util'

const props = defineProps({
  ...formFieldProps
})
const emit = defineEmits(['update:modelValue'])
const {model, disabled} = useFormField(props, emit)
</script>
