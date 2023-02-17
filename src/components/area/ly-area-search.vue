<template>
  <div class="flex">
    <div v-if="$slots.aside" class="mr-4">
      <slot name="aside"></slot>
    </div>
    <area-search-main :context="context">
      <template #default><slot></slot></template>
      <template #table><slot name="table"></slot></template>
    </area-search-main>
  </div>
</template>

<script lang="ts" setup>
import {SearchPageContext} from '@/use/search-page'
import {PropType} from 'vue'
import AreaSearchMain from '@/components/area/component/area-search-main.vue'

defineProps({
  context: {
    type: Object as PropType<SearchPageContext>,
    required: true
  }
})
</script>