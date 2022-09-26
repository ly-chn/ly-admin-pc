<script lang="ts">
import {defineComponent, provide, reactive, toRefs} from 'vue'

export default defineComponent({
  name: 'LyForm',
  props: {
    /**
     * 计划去掉
     */
    model: null,
    labelWidth: {
      type: [Number, String],
      default: 'auto'
    },
    /**
     * 为true时，表单不可编辑
     */
    disabled: {
      type: Boolean
    }
  },
  setup(props, {emit}) {
    provide('formInstance',   reactive({
      ...toRefs(props),
      emit
    }))
    return {}
  }
})

</script>
<template>
  <el-form :model="model" :label-width="labelWidth" @submit.prevent>
    <el-row>
      <slot />
    </el-row>
  </el-form>
</template>
