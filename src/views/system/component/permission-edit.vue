<template>
  <ly-dialog v-model="editing" title="权限编辑" @ok="handleOk">
    <ly-form only>
      <ly-radio label="权限类型" v-model="record.permissionType" dict-code="permission_type"/>
      <template v-if="record.permissionType === 'btn'">
        <ly-input label="权限名称" v-model="record.name"/>
        <ly-input label="所属菜单" v-model="record.parentId"/>
        <ly-input label="权限标识" v-model="record.auth_symbol"/>
      </template>

      <template v-else>
        <ly-input label="菜单名称" v-model="record.name"/>
        <ly-input label="上级菜单" v-model="record.parentId"/>
        <ly-input label="访问路径" v-model="record.path"/>
        <ly-input label="前端组件" v-model="record.component"/>
        <ly-input label="组件名称" v-model="record.componentName"/>
        <ly-input label="默认跳转" v-model="record.redirect"/>
        <!--todo: 后台遗忘此属性-->
        <ly-input label="图标" v-model="record.icon"/>
        <ly-input label="排序" v-model="record.orderWeight"/>
        <ly-switch label="是否缓存" v-model="record.keepAlive"/>
        <ly-switch label="是否隐藏" v-model="record.hidden"/>
      </template>
      <ly-switch label="是否禁用" v-model="record.disabled"/>
    </ly-form>
  </ly-dialog>
</template>

<script setup>
import {useCrudEdit} from '@/use/simple-crud'
import {ref} from 'vue'

const formRef = ref()
const {editing, record, handleOk} = useCrudEdit(formRef)
</script>
