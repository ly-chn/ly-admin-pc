<template>
  <ly-table v-model:selected-row-keys="selectedRowKeys" :data="data">
    <ly-column-expand/>
    <ly-column-selection/>
    <ly-column-index/>
    <ly-column label="id" prop="id" width="180"/>
    <ly-column label="name" prop="name"/>
    <ly-column label="age" prop="age" width="180"/>
  </ly-table>
</template>

<script lang="ts" setup>
import {ref} from 'vue'
import LyColumnExpand from '@/components/table/column/ly-column-expand.vue'
import LyColumn from '@/components/table/column/ly-column.vue'

const data = ref<any[]>([])
const selectedRowKeys = ref([])

for (let i = 0; i < 10; i++) {
  data.value?.push({
    id: i + 1,
    name: '武翠柔/毛青香/金夏旋/秦依柔/宋白梅/史云心/漕晋玉/孔绿春/汤寒梦/龚梅风/毛友蕊'.split('/')[i],
    age: ~~(Math.random() * 10) + 5
  })
}
</script>
