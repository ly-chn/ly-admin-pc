<script lang="ts" setup>
// import {defineProps} from 'vue'

import {computed, watchEffect} from 'vue'

const {onValue, offValue, modelValue} = defineProps({
  /**
   * 开启时的值
   */
  onValue: {},
  /**
   * 关闭时的值
   */
  offValue: {},
  modelValue: {}
})
const emit = defineEmits(['update:modelValue'])
watchEffect(() => {
  if (![onValue, offValue].includes(modelValue)) {
    emit('update:modelValue', offValue)
  }
})
const value = computed({
  get() {
    return modelValue
  },
  set() {
    if (modelValue === onValue) {
      emit('update:modelValue', offValue)
    } else {
      emit('update:modelValue', onValue)
    }
  },
})
</script>
<template>
  <div @click="value=1">
    {{ modelValue }}
    <slot v-if="modelValue === onValue" name="on" @click="value=offValue">on</slot>
    <slot v-else name="off" @click="value=onValue">off</slot>
  </div>
</template>
