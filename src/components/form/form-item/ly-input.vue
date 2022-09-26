<script lang="ts">
import {computed, defineComponent, inject} from 'vue'
import LyFormItem from './ly-form-item.vue'
export default defineComponent({
  name: 'LyFormItem',
  components: {LyFormItem},
  props: {
    /**
     * 标签文本
     */
    label: {
      type: String
    },
    /**
     * 表单验证规则
     */
    rules: {
      type: [Array, Function, Object]
    },
    /**
     * 为true时，表单不可编辑
     */
    disabled: {
      type: Boolean
    },
    value: null,
    /**
     * 原生属性，最大输入长度
     */
    maxlength: Number,
    /**
     * 原生属性，最小输入长度
     */
    minlength: Number,
    /**
     * 为true表示只读
     */
    readonly: Boolean,
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
    suffixIcon: String
  },
  setup(props) {
    const formItemInstance = inject('formItemInstance', undefined) as any
    const formInstance = inject('formInstance', undefined) as any
    const disabledItem = computed(() => props.disabled || formItemInstance?.disabled || formInstance?.disabled)
    const usefulRules = computed(() => [].concat(props.rules as [], formItemInstance.rules)
      .filter(it => !!it).map(it => typeof it === 'function' ? (it as () => object)() : it))
    const usefulLabel = computed(() => props.label || formItemInstance.label)
    const usefulSpan = computed(() => formItemInstance.colSpan)
    return {disabledItem, usefulRules, usefulLabel, usefulSpan}
  }
})
</script>
<template>
  <ly-form-item>
    <el-input :disabled="disabled"
              :maxlength="maxlength"
              :minlength="minlength"
              :placeholder="placeholder"
              :readonly="readonly"
              :show-password="showPassword"
              :show-word-limit="Boolean(maxlength)"
              :value="value"
              @input="setCurrentValue"/>
  </ly-form-item>
</template>
