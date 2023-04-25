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
        <ly-tree-select v-if="record.permissionType==='menu'" label="上级菜单" :props="{label: 'name'}" v-model="record.parentId" :data="parentTree"/>
        <ly-input-icon label="图标" v-model="record.icon"/>
        <ly-input label="访问路径" v-model="record.path"/>
        <ly-select label="布局组件"
                   v-if="record.permissionType === 'fold'"
                   v-model="record.component"
                   :options="layoutComponentList"/>
        <ly-tree-select label="前端组件" v-else v-model="record.component" :data="viewsData"/>
        <ly-input label="组件名称" v-model="record.componentName" :placeholder="componentNamePlaceholder"/>
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
import {TreeUtil} from '@/util/tree-util'
import {ViewsScan} from '@/util/views-scan'
import {computed, ref} from 'vue'

const props = defineProps({
  tableData: Array
})
// 页面组件树
const viewsData = ViewsScan.tree()

const parentTree = computed(() => TreeUtil.filter(props.tableData, 'fold', 'permissionType'))

/**
 * 布局组件
 * @type {LyDictItem[]}
 */
const layoutComponentList = [{
  label: '常规页面',
  value: 'layouts/page-layout/page-layout'
}]

const componentNamePlaceholder = computed(() => {
  return RouterUtil.getName(record.component)
})
const formRef = ref()
const {editing, record, handleOk} = useCrudEdit(formRef)
</script>
