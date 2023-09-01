<script lang="ts" setup>
import type {PropType} from 'vue'
import {computed, watchEffect} from 'vue'
import {useFormField} from '@/components/form/util/form-util'
import {IconType} from '@/types/icon'

const props = defineProps({
  modelValue: null,
  // 真值
  onValue: {
    default: true
  },
  // 假值
  offValue: {
    default: false
  },
  // 禁用
  disabled: Boolean,
  // 真值对应图标
  onIcon: String as PropType<IconType>,
  // 假值对应图标
  offIcon: String as PropType<IconType>,
  // 真值对应文本
  onText: String,
  // 假值对应文本
  offText: String,
  cleanUp: Boolean
})
const emit = defineEmits(['update:modelValue'])
const {disabled, model} = useFormField(props, emit)

watchEffect(() => {
  if (![props.onValue, props.offValue].includes(props.modelValue)) {
    model.value = props.offValue
  }
})
const activated = computed(() => props.modelValue === props.onValue)
const renderIcon = computed(() => props.onIcon && props.offIcon)
const handleClick = () => {
  if (!disabled.value) {
    model.value = activated.value ? props.offValue : props.onValue
  }
}
</script>
<template>
  <span class="select-none dark" @click="handleClick">
    <slot v-bind="{modelValue, onValue, offValue}">
      <ly-icon v-if="renderIcon" :type="activated?onIcon!:offIcon!"/>
      <span v-else>{{ activated ? onText : offText }}</span>
    </slot>
  </span>
</template>
