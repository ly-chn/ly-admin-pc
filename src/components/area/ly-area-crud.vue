<template>
  <slot></slot>
</template>

<script lang="ts" setup>
import type {PropType} from 'vue'
import {provide} from 'vue'
import type {CrudContext} from '@/use/simple-crud'
import {searchAreaCtxKey} from '@/components/area/area-ctx'

const props = defineProps({
  context: {
    type: Object as PropType<CrudContext>,
    required: true
  }
})

provide(searchAreaCtxKey, props.context)
</script>
