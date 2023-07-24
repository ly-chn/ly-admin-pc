<script lang="ts" setup>
import {ObjectDirective, ref} from 'vue'

const count = ref(0)
const handleClick = () => count.value++
const directiveCount = ref(0)
const handleDirectiveClick = () => directiveCount.value++

const vNodeClick: ObjectDirective<HTMLButtonElement> = {
  mounted(el) {
    el.addEventListener('click', handleDirectiveClick)
  },
  beforeUnmount(el) {
    el.removeEventListener('click', handleDirectiveClick)
  }
}
</script>

<template>
  <button @click="handleClick" v-node-click>按钮1</button>
  <button @click="handleClick">按钮2</button>
  <button @click="handleClick">按钮3</button>
  <button @click="handleClick">按钮4</button>
  <button @click="handleClick">按钮5</button>
  <div>
    按钮被点击数: {{ count }}
  </div>
</template>

<style lang="scss" scoped>

</style>
