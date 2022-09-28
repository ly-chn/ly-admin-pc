<script lang="ts" setup>
import {computed, inject} from 'vue'

const props = defineProps({
  /**
   * 标签文本
   */
  label: String,
  /**
   * 表单验证规则
   */
  rules: {
    type: [Array, Function, Object]
  },
  /**
   * 为true时，表单不可编辑
   */
  disabled: Boolean,
  modelValue: null,
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
  placeholder: String
})
const emit = defineEmits(['update:modelValue'])
const formItemInstance = inject('formItemInstance', undefined) as any
const formInstance = inject('formInstance', undefined) as any
const disabledItem = computed(() => props.disabled || formItemInstance?.disabled || formInstance?.disabled)
const usefulRules = computed(() => [].concat(props.rules as [], formItemInstance?.rules)
  .filter(it => !!it).map(it => typeof it === 'function' ? (it as () => object)() : it))
const usefulLabel = computed(() => props.label || formItemInstance?.label)
const setCurrentValue = (value: any) => emit('update:modelValue', value)
</script>
<template>
  <ly-form-item :label="usefulLabel" :rules="usefulRules">
    <el-input :disabled="disabledItem"
              :maxlength="maxlength"
              :minlength="minlength"
              :placeholder="placeholder"
              :show-password="showPassword"
              :show-word-limit="Boolean(maxlength)"
              :value="modelValue"
              @input="setCurrentValue" />
  </ly-form-item>
</template>
