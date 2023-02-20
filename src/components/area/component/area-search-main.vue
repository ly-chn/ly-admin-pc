<template>
  <div class="flex-1">
    <slot/>
    <div style="height: 20px" v-if="$slots.default"></div>
    <slot name="table"/>
  </div>
</template>

<script setup lang="ts">
import {PropType, provide} from 'vue'
import {SearchPageContext} from '@/use/search-page'
import {searchAreaCtxKey} from '@/components/area/area-ctx'

const props = defineProps({
  context: {
    type: Object as PropType<SearchPageContext>,
    required: true
  }
})
provide(searchAreaCtxKey, props.context)

</script>
