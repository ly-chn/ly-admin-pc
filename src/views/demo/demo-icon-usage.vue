<script setup lang="ts">
import {reactive} from 'vue'

const form =  reactive<Record<string, string|undefined>>({})
</script>

<template>
<div>
  <div>图标选择器</div>
  <div><ly-icon-picker v-model="form.icon"/></div>
  <hr>
  <div>图标输入</div>
  <div><ly-input-icon v-model="form.icon1"/></div>
  <hr>
  <div>自定义图标</div>
  <div>
    <ly-btn icon="ly:duanxin">短信</ly-btn>
    <ly-icon type="ly:duanxin"></ly-icon>
  </div>
</div>
</template>

<style scoped lang="scss">

</style>
