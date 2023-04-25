<script lang="ts" setup>
import {computed, inject, provide, reactive, toRefs} from 'vue'
import {useAutoLabelWidth} from '@/components/form/util/form-util'
import type {LyFormContext, LyFormItemContext} from '@/components/form/util/form-ctx'
import {lyFormCtxKey, lyFormProps} from '@/components/form/util/form-ctx'
import {searchAreaCtxKey} from '@/components/area/area-ctx'

const props = defineProps({...lyFormProps})

const formClassList = computed(() => {
  return []
})
const fields = new Set<LyFormItemContext>()

const clearValidate: LyFormContext['clearValidate'] = () => {
  fields.forEach((field) => field.clearValidate())
}
const validate = async () => {
  await Promise.allSettled([...fields].map((field) => field.validate()))
}
provide(
  lyFormCtxKey,
  reactive({
    ...toRefs(props),
    // resetFields,
    clearValidate,
    addField: fields.add,
    removeField: fields.delete,
    // todo
    validateField: null as any,
    ...useAutoLabelWidth(props.maxLabelWidth)
  })
)

defineExpose({
  validate,
  clearValidate
})

const searchCtx = inject(searchAreaCtxKey, null)

</script>
<template>
  <form :class="formClassList">
    <el-row>
      <slot/>
      <el-col v-if="searchForm" :span="24" class="flex">
        <div class="flex-1">
          <slot name="operation"/>
        </div>
        <ly-btn-search :loading="searchCtx?.loading.value" @click="searchCtx.handleSearch"/>
        <ly-btn-reset :loading="searchCtx?.loading.value" @click="searchCtx.handleReset"/>
      </el-col>
    </el-row>
  </form>
</template>
