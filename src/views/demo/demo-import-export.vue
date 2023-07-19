<script lang="ts" setup>
import {demoImportExportApi} from '@/api/system/demo-import-export'
import {ElMessage} from 'element-plus'

const handleImport = async (file) => {
  // 导入成功或失败都会走then方法, 成功返回成功消息, 失败则返回Excel并自动下载, then中的回调值为null
  demoImportExportApi.demoImport(file).then(msg => msg && ElMessage.success(msg))
    .catch(console.log)
}
</script>

<template>
  <div>
    <ly-btn-import template-name="student.xlsx" @click="handleImport"/>
    <ly-btn-export @click="demoImportExportApi.demoExport"/>
  </div>
</template>
