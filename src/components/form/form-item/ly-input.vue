<script lang="ts" setup>
import {formFieldProps} from '@/components/form/util/form-props'
import {useFormField} from '@/components/form/util/form-util'

const props = defineProps({
  /**
   * 原生属性，最大输入长度
   */
  maxlength: Number,
  /**
   * 原生属性，最小输入长度
   */
  minlength: Number,
  /**
   * 是否显示切换密码图标
   */
  showPassword: Boolean,
  /**
   * 输入框头部图标
   */
  prefixIcon: String,
  /**
   * 输入框尾部图标
   */
  suffixIcon: String,
  ...formFieldProps
})
const emit = defineEmits(['update:modelValue'])
const {model, disabled} = useFormField(props, emit)
</script>
<template>
  <ly-form-item :label="props.label" :rules="props.rules" :value="model">
    <el-input v-model="model"
              clearable
              :disabled="disabled"
              :maxlength="maxlength"
              :minlength="minlength"
              :placeholder="placeholder"
              :show-password="showPassword"
              :show-word-limit="Boolean(maxlength)"/>
  </ly-form-item>
</template>
