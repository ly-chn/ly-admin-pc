<template>
  <ly-area-search>
    <ly-form quarter search-form @reset="()=>{}" @search="()=>{}">
      <ly-input label="字典名称"/>
      <ly-input label="字典编码"/>
      <template #operation>
        <el-button>新增</el-button>
      </template>
    </ly-form>
    <template #table>

    </template>
  </ly-area-search>
  字典管理
</template>

<script lang="ts" setup>

</script>
