<template>
  <ly-area-search :context="ctx">
    <template #default>
      <ly-form search-form>
        <ly-input label="名称" v-model="searchForm.name"/>
        <template #operation>
          <ly-btn-create @click="ctx.handleEdit({permissionType: 'route'})"/>
        </template>
      </ly-form>
    </template>
    <template #table>
      <ly-table adjust-column>
        <ly-column-index/>
        <ly-column label="权限类型" dict-code="permission_type" prop="permissionType"/>
        <ly-column label="名称" prop="name">
          <template #default="{row}">
            <ly-icon :type="row.icon"/> {{row.name}}
          </template>
        </ly-column>
        <ly-column label="路径" prop="path"/>
        <ly-column-action #default="{row}">
          <ly-btn-modify @click="ctx.handleEdit(row)"/>
          <ly-btn-remove @click="ctx.handleRemove(row.id)"/>
          <ly-btn-create @click="ctx.handleEdit({parentId: row.id, permissionType: 'route'})">添加子项</ly-btn-create>
        </ly-column-action>
      </ly-table>
      <permission-edit :tableData="ctx.tableData.value"/>
    </template>
  </ly-area-search>
</template>

<script setup>
import {permissionApi} from '@/api/system/permission'
import {useCrud} from '@/use/simple-crud'
import PermissionEdit from '@/views/system/component/permission-edit.vue'

const ctx = useCrud(permissionApi, {
  noPaging: true
})
const {searchForm} = ctx
</script>
