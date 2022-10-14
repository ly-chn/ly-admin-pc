<script lang="ts" setup>
import {computed, provide, reactive, toRef, toRefs} from 'vue'
import {lyFormCtxSymbol, lyFormProps} from './ly-form-key'
import {useAutoLabelWidth} from '/@/components/form/util/auto-label-width'

const props = defineProps(lyFormProps)

const reactiveForm =reactive({
  ...toRefs(props),
  ...useAutoLabelWidth(props.maxLabelWidth)
})
console.log(reactiveForm)
// todo: 为什么会出现类型不匹配的情况, 好难受啊
provide(lyFormCtxSymbol, reactive({
  // ...toRefs(props),
  ...useAutoLabelWidth(props.maxLabelWidth)
}))

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
