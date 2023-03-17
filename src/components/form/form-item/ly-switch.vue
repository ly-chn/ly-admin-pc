<template>
  <ly-form-item :label="props.label" :rules="props.rules" :value="modelValue">
    <!--todo: 找一个修改文本的方式-->
    <el-switch
        v-model="modelValue"
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
const {modelValue, disabled} = useFormField(props, emit)
</script>
