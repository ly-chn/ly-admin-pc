<template>
  <div class="flex">
    <div v-if="$slots.aside" class="mr-4" style="min-height: 80vh;overflow-x: auto">
      <slot name="aside"/>
    </div>
    <area-search-main :context="context">
      <template #default><slot/></template>
      <template #table><slot name="table"/></template>
    </area-search-main>
  </div>
</template>

<script lang="ts" setup>

import type {CrudContext} from '@/use/simple-crud'
import type {PropType} from 'vue'
import AreaSearchMain from '@/components/area/component/area-search-main.vue'

defineProps({
  context: {
    type: Object as PropType<CrudContext>,
    required: true
  }
})
</script>
