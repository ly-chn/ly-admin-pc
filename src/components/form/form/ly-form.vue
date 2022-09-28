<script lang="ts" setup>
import {provide, reactive, toRefs} from 'vue'
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
</script>
<template>
  <el-form :label-width="labelWidth" @submit.prevent>
    <el-row>
      <slot />
    </el-row>
  </el-form>
</template>
