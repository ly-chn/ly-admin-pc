<script lang="ts" setup>
import {computed, inject, onBeforeUnmount, onMounted, ref, useSlots, watchEffect} from 'vue'
import {colSpanProps} from '/@/components/form/util/form-props'
import {useResizeObserver} from '@vueuse/core'
import {useColSpan} from '/@/components/form/util/form-util'
import {lyFormCtxSymbol} from '/@/components/form/util/form-ctx'

const compKey = Symbol.for('ly-form-item')

const formCtx = inject(lyFormCtxSymbol)
const props = defineProps({
  /**
   * 最大label宽度
   */
  maxLabelWidth: {
    type: Number,
    default: 0
  },
  /**
   * 为true时，表单不可编辑
   */
  disabled: Boolean,
  rules: Array,
  label: String,
  ...colSpanProps
})

const validateStatus = ref<'' | 'ing' | 'fail' | 'ok'>('')
const slots = useSlots()
const labelRef = ref<HTMLDivElement>()

const hasLabel = computed(() => props.label || slots.label)
const updateLabelWidth = (width: number) => {
  formCtx?.registerLabelWidth(compKey, width)
}

const getLabelWidth = () => {
  if (labelRef.value) {
    const width = window.getComputedStyle(labelRef.value).width
    return Math.ceil(Number.parseFloat(width))
  } else {
    return 0
  }
}

useResizeObserver(
  () => (labelRef.value?.firstElementChild ?? null) as HTMLElement | null,
  () => updateLabelWidth(getLabelWidth())
)

onMounted(() => {
  updateLabelWidth(getLabelWidth())
})

onBeforeUnmount(() => {
  updateLabelWidth(0)
})
watchEffect(() => {
  if (labelRef.value && formCtx?.autoLabelWidth) {
    labelRef.value.style.minWidth = formCtx.autoLabelWidth
  }
})

const usefulSpan = computed(() => {
  return useColSpan(props) || useColSpan(formCtx)
})
</script>
<template>
  <el-col :span="usefulSpan" class="flex ly-form-item">
    <div v-if="hasLabel" ref="labelRef" class="el-form-item__label ly-form-item__label">
      <slot name="label">{{ label }}</slot>
    </div>
    <div class="ly-form-item__content">
      <slot />
    </div>
  </el-col>
</template>

<style scoped>
.el-form-item__label {
  @apply w-auto overflow-hidden text-ellipsis text-justify inline-block;
  text-align-last: justify;
  text-justify: distribute;
}

.ly-form-item {
  @apply px-4 mb-4
}

.ly-form-item__content {
  @apply flex-1
}
</style>
