<template>
  <slot :data="data"/>
</template>

<script lang="ts" setup>
import {PropType} from 'vue'
import {useTreeFilter} from '@/use/tree-filter'
import {BasicTree} from '#/utility-type'

const props = defineProps({
  data: {type: Array as PropType<BasicTree<string>[]>, required: true},
  keywords: {type: String, required: true},
  childrenKey: {
    type: String,
    default: 'children'
  },
  keyList: {
    type: Array as PropType<string[]>
  }
})
const data = useTreeFilter(props.data, props.keywords, props.childrenKey, props.keyList)
</script>
