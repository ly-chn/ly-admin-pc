<template>
  <el-input v-model="filterText" placeholder="Filter keyword"/>

  <ly-tree
      :data="data"
      :keywords="filterText"
      :props="defaultProps"
      class="filter-tree"/>
</template>

<script lang="ts" setup>
import {ref} from 'vue'
import LyTree from '@/components/tree/ly-tree.vue'

interface Tree {
  id: number
  label: string
  children?: Tree[]
}

const filterText = ref('')

const defaultProps = {
  children: 'children',
  label: 'label'
}

const data: Tree[] = [
  {
    id: 1,
    label: '节点 1',
    children: [
      {
        id: 4,
        label: 'Level two 1-1',
        children: [
          {
            id: 9,
            label: 'Level three 1-1-1'
          },
          {
            id: 10,
            label: 'Level three 1-1-2'
          }
        ]
      }
    ]
  },
  {
    id: 2,
    label: 'Level one 2',
    children: [
      {
        id: 5,
        label: 'Level two 2-1'
      },
      {
        id: 6,
        label: 'Level two 2-2'
      }
    ]
  },
  {
    id: 3,
    label: 'Level one 3',
    children: [
      {
        id: 7,
        label: '节点 two 3-1'
      },
      {
        id: 8,
        label: 'Level two 3-2'
      }
    ]
  }
]
</script>
