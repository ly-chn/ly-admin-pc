<template>
  <div>
    <el-checkbox v-model="show.date">show date</el-checkbox>
    <el-checkbox v-model="show.name">show name</el-checkbox>
    <el-checkbox v-model="show.info">show info</el-checkbox>
    <el-checkbox v-model="show.state">show state</el-checkbox>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column label="#" :key="'#'" type="index"/>
      <el-table-column label="Date" :key="'Date'" v-if="show.date && (show.name || show.state)" prop="date">
        <el-table-column label="Name" :key="'Name'" v-if="show.name" prop="name"/>
        <el-table-column label="Delivery Info" :key="'Delivery Info'" v-if="show.info && show.state">
          <el-table-column label="State" :key="'State'" v-if="show.state" prop="state"/>
        </el-table-column>
      </el-table-column>
    </el-table>
  </div>
</template>

<script lang="ts" setup>
import {ref} from 'vue'

const show = ref({
  date: false,
  name: false,
  info: false,
  state: false
})
const tableData = [
  {
    date: '2016-05-03',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036'
  },
  {
    date: '2016-05-02',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036'
  },
  {
    date: '2016-05-04',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036'
  },
  {
    date: '2016-05-01',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036'
  },
  {
    date: '2016-05-08',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036'
  },
  {
    date: '2016-05-06',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036'
  },
  {
    date: '2016-05-07',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036'
  }
]

</script>
