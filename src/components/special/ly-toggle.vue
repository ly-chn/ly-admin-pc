<script lang="ts">
import {computed, defineComponent, toRefs, watchEffect} from 'vue'

export default defineComponent({
  props: {
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
  },
  emits: {
    'update:modelValue': null,
  },
  setup(props, {emit, slots}) {
    const {modelValue, onValue, offValue} = toRefs(props)
    watchEffect(() => {
      if (![onValue.value, offValue.value].includes(modelValue.value)) {
        emit('update:modelValue', offValue.value)
      }
    })
    const activated = computed(() => modelValue.value === onValue.value)
    return {
      activated,
      emit,
      slots
    }
  }
})

</script>
<template>
  <div @click="emit('update:modelValue', activated ? offValue : onValue)">
    <slot v-bind="{modelValue, onValue, offValue}">{{ modelValue }}</slot>
  </div>
</template>
