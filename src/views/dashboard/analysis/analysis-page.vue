<template>
  <div>
    <ly-icon type="el-edit"/>
    <ly-form ref="formRef" one-third>
      <ly-input label="姓名" v-model="form.name" :rules="$rules.must"/>
      <ly-input label="手机号" v-model="form.mobile"/>
      <ly-input label="身份证" v-model="form.idCard"/>
      <ly-select label="性别" v-model="form.sex" dict-code="sex" :rules="$rules.must"/>
    </ly-form>
    <ly-btn-search/>
  </div>
</template>

<script lang="ts" setup>
import {reactive, ref} from 'vue'
import LyBtnSearch from '@/components/button/ly-btn-search.vue'

const form: Record<string, unknown> = reactive({})

const formRef = ref(null)
</script>
