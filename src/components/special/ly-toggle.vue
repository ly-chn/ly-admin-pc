<script lang="ts" setup>
import {computed, watchEffect} from 'vue'

const props = defineProps({
  modelValue: null,
  /**
   * 启用时的值
   */
  onValue: {
    default: true
  },
  offValue: {
    default: false
  }
})
const emit = defineEmits(['update:modelValue'])
watchEffect(() => {
  if (![props.onValue, props.offValue].includes(props.modelValue)) {
    emit('update:modelValue', props.offValue)
  }
})
const activated = computed(() => props.modelValue === props.onValue)

</script>
<template>
  <div @click="emit('update:modelValue', activated ? offValue : onValue)">
    <slot v-bind="{modelValue, onValue, offValue}">{{ modelValue }}</slot>
  </div>
</template>
