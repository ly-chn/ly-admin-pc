<template>
  <el-checkbox v-model="show.date">show date</el-checkbox>
  <el-checkbox v-model="show.name">show name</el-checkbox>
  <el-checkbox v-model="show.info">show info</el-checkbox>
  <el-checkbox v-model="show.state">show state</el-checkbox>
  <Comp :columns="tableColumns" :table-data="tableData"></Comp>
</template>

<script lang="ts" setup>
import {computed, reactive} from 'vue'
import Comp from './Comp.vue'

const show = reactive({
  date: true,
  info: true,
  name: true,
  state: true
})

const tableColumns = computed(() => {
  return [
    {
      label: '#',
      type: 'index',
      show: true
    },
    {
      label: 'Date',
      prop: 'date',
      show: show.date,
      childColumns: [
        {
          label: 'Name',
          prop: 'name',
          show: show.name
        },
        {
          label: 'Delivery Info',
          prop: '',
          show: show.info && show.state,
          childColumns: [
            {
              label: 'State',
              prop: 'state',
              show: show.state
            }
          ]
        }
      ]
    }
  ]
})


const tableData = [
  {
    date: '2016-05-03',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036'
  }
]
</script>
