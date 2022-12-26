<script lang="ts" setup>
import {computed, provide, reactive, toRefs} from 'vue'
import {useAutoLabelWidth} from '@/components/form/util/form-util'
import {LyFormContext, lyFormCtxSymbol, LyFormItemContext, lyFormProps} from '@/components/form/util/form-ctx'

const props = defineProps({...lyFormProps})

const formClassList = computed(() => {
  return []
})
const fields = new Set<LyFormItemContext>()

const addField: LyFormContext['addField'] = fields.add
const removeField: LyFormContext['removeField'] = fields.delete
const clearValidate: LyFormContext['clearValidate'] = () => {
  fields.forEach((field) => field.clearValidate())
}
const validate = async () => {
  await Promise.allSettled([...fields].map((field) => field.validate()))
}
provide(
  lyFormCtxSymbol,
  reactive({
    ...toRefs(props),
    // resetFields,
    clearValidate,
    addField,
    removeField,
    ...useAutoLabelWidth(props.maxLabelWidth)
  })
)

defineExpose({
  validate,
  clearValidate
})


</script>
<template>
  <form :class="formClassList">
    <el-row>
      <slot/>
      <el-col v-if="searchForm" :span="24" class="flex">
        <div class="flex-1">
          <slot name="operation"/>
        </div>
        <ly-btn-search v-if="$attrs.onSearch" :loading="loading" @click="$emit('search')"/>
        <ly-btn-reset v-if="$attrs.onReset" :loading="loading" @click="$emit('reset')"/>
      </el-col>
    </el-row>
  </form>
</template>
