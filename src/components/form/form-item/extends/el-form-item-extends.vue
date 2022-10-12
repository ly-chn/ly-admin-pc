<script lang="ts">
import {defineComponent} from 'vue'
import {ElFormItem} from 'element-plus'

export default defineComponent({
  name: 'LyFormItemExtends',
  extends: ElFormItem,
  setup(...args) {
    console.log(...args)
    console.log(ElFormItem, (ElFormItem as any).setup(...args))
    return {...(ElFormItem as any).setup(...args)}
  },
})

</script>
