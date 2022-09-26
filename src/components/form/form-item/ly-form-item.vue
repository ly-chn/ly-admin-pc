<script lang="ts">
import {computed, defineComponent, inject} from 'vue'
import ElFormItemExtends from './extends/el-form-item-extends.vue'
export default defineComponent({
  name: 'LyFormItem',
  components: {ElFormItemExtends},
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
    value: null
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
  <el-col :span="usefulSpan" class="ly-form-item-col">
    <el-form-item-extends ref="formItem"
                          :label="usefulLabel"
                          :rules="usefulRules"
                          :value="value"
                          class="ly-form-item"
                          size="small">
      <slot />
    </el-form-item-extends>
  </el-col>
</template>
