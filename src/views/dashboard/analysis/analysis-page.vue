<template>
  <div>
    <ly-icon type="el-edit"/>
    <ly-form>
      <ly-input label="名称" v-model="form.name" placeholder="请输入名称" :rules="[{required: true, message: '请输入名称'}]"/>
    </ly-form>
  </div>
</template>

<script>

export default {
  name: 'HomePage',
  data() {
    return {
      form: {
        name: '张三'
      }
    }
  },
}
</script>
