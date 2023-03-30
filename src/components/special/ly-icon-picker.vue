<template>
  <div>

  </div>
</template>

<script lang="ts" setup>
import {useFieldModel} from '@/components/form/util/form-util'
import {IconifyIcons} from '@/components/special/icon/iconify'

const iconTypeList = IconifyIcons.split(',')

const props = defineProps<{
  modelValue: string
}>()
const emits = defineEmits<{
  (e: 'update:modelValue', value?: string): void
}>()
const model = useFieldModel(props, emits)
</script>
