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
        <ly-input-icon label="图标" v-model="record.icon"/>
        <ly-input label="访问路径" v-model="record.path"/>
        <ly-select label="布局组件" v-if="record.permissionType === 'fold'" :options="layoutComponentList" v-model="record.component"/>
        <ly-tree-select label="前端组件" v-else :data="viewsData" v-model="record.component"/>
        <ly-input label="组件名称" :placeholder="componentNamePlaceholder" v-model="record.componentName"/>
        <ly-input label="默认跳转" v-model="record.redirect"/>
        <ly-input label="排序" v-model="record.orderWeight"/>
        <ly-switch label="新标签页" v-model="record.createTab"/>
        <ly-switch label="是否缓存" v-model="record.keepAlive"/>
        <ly-switch label="是否隐藏" v-model="record.hidden"/>
      </template>
      <ly-switch label="是否禁用" v-model="record.disabled"/>
    </ly-form>
  </ly-dialog>
</template>

<script setup>
import {useCrudEdit} from '@/use/simple-crud'
import {RouterUtil} from '@/util/router-util'
import {ViewsScan} from '@/util/views-scan'
import {computed, ref} from 'vue'
// 页面组件树
const viewsData = ViewsScan.tree()

/**
 * 布局组件
 * @type {LyDictItem[]}
 */
const layoutComponentList = [{
  label: '常规页面',
  value: 'layouts/page-layout/page-layout'
}]

const componentNamePlaceholder = computed(()=> {
  return RouterUtil.getName(record.component)
})
const formRef = ref()
const {editing, record, handleOk} = useCrudEdit(formRef)
</script>
