<template>
  <div>
    <ly-form search-form quarter @search="()=>{}" @reset="()=>{}">
      <ly-input label="字典名称"/>
      <ly-input label="字典编码"/>
      <template #operation>
        <el-button>新增</el-button>
      </template>
    </ly-form>
     字典管理
  </div>
</template>

<script setup lang="ts">

</script>
