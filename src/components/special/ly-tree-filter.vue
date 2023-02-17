<template>
  <slot :data="data"></slot>
</template>

<script setup lang="ts">
import {TreeUtil} from '@/util/tree-util'
import {computed, PropType} from 'vue'

const props = defineProps({
  data: {type: Array, required: true},
  keywords: {type: String, required: true},
  childrenKey: {
    type: String,
    default: 'children'
  },
  keyList: {
    type: Array as PropType<string[]>
  }
})
const data = computed(()=>TreeUtil.filter(props.data as any, props.keywords, props.childrenKey, props.keyList))
</script>
