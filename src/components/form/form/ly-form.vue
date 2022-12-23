<script lang="ts" setup>
import {computed, provide, reactive, toRefs} from 'vue'
import {useAutoLabelWidth} from '@/components/form/util/form-util'
import {lyFormCtxSymbol, lyFormProps} from '@/components/form/util/form-ctx'

const props = defineProps({...lyFormProps})

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
