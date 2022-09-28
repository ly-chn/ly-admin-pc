<script lang="ts" setup>
import {computed, inject} from 'vue'
import {formItemProps} from '/@/components/form/form-item/form-item'

const props = defineProps({
  ...formItemProps
})

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const formItemInstance = inject('formItemInstance', undefined) as any
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const formInstance = inject('formInstance', undefined) as any
const usefulRules = computed(() => [].concat(props.rules as [], formItemInstance?.rules)
  .filter(it => !!it).map(it => typeof it === 'function' ? (it as () => object)() : it))
const usefulLabel = computed(() => props.label || formItemInstance?.label)
const usefulSpan = computed(() => formItemInstance?.colSpan || formInstance?.colSpan || 4)

</script>
<template>
  <el-col :span="usefulSpan" class="ly-form-item-col">
    <el-form-item ref="formItem"
                  :label="usefulLabel"
                  :rules="usefulRules"
                  :value="modelValue"
                  class="ly-form-item">
      <slot />
    </el-form-item>
  </el-col>
</template>
