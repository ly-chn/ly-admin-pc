<template>
  <div class="flex-1">
    <slot/>
    <div v-if="$slots.default" style="height: 20px"></div>
    <slot name="table"/>
  </div>
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
