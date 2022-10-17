<script lang="ts" setup>
import {computed, provide, reactive, toRefs} from 'vue'
import {lyFormCtxSymbol, lyFormProps} from './ly-form-key'
import {useAutoLabelWidth} from '/@/components/form/util/form-util'

const props = defineProps(lyFormProps)

provide(lyFormCtxSymbol, reactive({
  ...toRefs(props),
  ...useAutoLabelWidth(props.maxLabelWidth)
}))

const formClassList = computed(() => {
  return []
})
</script>
<template>
  <form :class="formClassList">
    <el-row>
      <slot/>
    </el-row>
  </form>
</template>
