<template>
  <!--todo: 增加鱼眼效果?-->
  <el-popover :width="314"
              placement="bottom">
    <template #reference>
      <ly-icon :type="model || 'ep:grid'"/>
    </template>
    <el-input v-model="searchValue" placeholder="检索图标" size="small"/>
    <div class="flex flex-wrap">
      <div v-for="icon in visibleIcon"
           :key="icon"
           class="inline-flex border rounded border-solid hover:border-primary p-2 m-0.5"
           @click="model = icon">
        <ly-icon :type="icon"/>
      </div>
    </div>
    <ly-paging v-model:page-num="pageNum"
               :page-size="80"
               :total="sourceList.length"
               hide-on-single-page
               layout="prev, pager, next"/>
  </el-popover>
</template>

<script lang="ts" setup>
import {useFieldModel} from '@/components/form/util/form-util'
import {IconifyIcons} from '@/components/special/icon/iconify'
import {computed, ref} from 'vue'
import LyPaging from '@/components/special/ly-paging.vue'
import type {IconifyIconType} from '#/iconify'

const iconTypeList = IconifyIcons.split(',') as IconifyIconType[]

const props = defineProps<{
  modelValue?: string
}>()
const emits = defineEmits<{
  (e: 'update:modelValue', value?: string): void
}>()
const model = useFieldModel(props, emits)

const searchValue = ref<string>()
const pageNum = ref(1)
const sourceList = computed(() => {
  const s = searchValue.value?.trim()
  return s ? iconTypeList.filter(it => it.includes(s)) : iconTypeList
})
const visibleIcon = computed(() => sourceList.value.slice((pageNum.value - 1) * 80, pageNum.value * 80))
</script>
