<script lang="ts" setup>
import {computed, provide, reactive, toRefs} from 'vue'
import {colSpanProps} from '/@/components/form/form-item/form-item'

const props = defineProps({
  /**
   * label宽度
   */
  labelWidth: {
    type: [Number, String],
    default: 'auto'
  },
  /**
   * 为true时，表单不可编辑
   */
  disabled: {
    type: Boolean
  },
  ...colSpanProps
})

provide('formInstance', reactive({
  ...toRefs(props),
}))
console.log(props)
const formClassList = computed(() => {
  return []
})
</script>
<template>
  <form :class="formClassList">
    <el-row>
      <slot />
    </el-row>
  </form>
</template>
