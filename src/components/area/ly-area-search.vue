<template>
  <div>
    <slot></slot>
    <div style="height: 20px"></div>
    <slot name="table"></slot>
  </div>
</template>

<script setup lang="ts">
import {SearchPageContext} from '@/use/search-page'
import {PropType, provide} from 'vue'
import {searchAreaCtxKey} from '@/components/area/area-ctx'

const props = defineProps({
  context: {
    type: Object as PropType<SearchPageContext>,
    required: true
  }
})

provide(searchAreaCtxKey, props.context)
</script>