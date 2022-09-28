<template>
  <div>
    <ly-icon type="el-edit"/>
    <ly-form>
      <ly-input label="名称" v-model="form.name" placeholder="请输入名称" :rules="[{required: true, message: '请输入名称'}]"/>
    </ly-form>
  </div>
</template>

<script>
import LyIcon from '../../../components/special/ly-icon.vue'
import LyInput from '../../../components/form/form-item/ly-input.vue'
import LyForm from '../../../components/form/form/ly-form.vue'
export default {
  name: 'HomePage',
  components: {LyForm, LyInput, LyIcon},
  data() {
    return {
      form: {
        name: '张三'
      }
    }
  },
}
</script>
