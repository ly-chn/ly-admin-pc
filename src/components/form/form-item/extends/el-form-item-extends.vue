<script lang="ts">
import {computed, defineComponent} from 'vue'

export default defineComponent({
  name: 'LyFormItemExtends',
  props: {
    value: {},
    prop: {
      type: String,
      default: 'auto-prop'
    }
  },
  setup(props) {
    const fieldValue = computed(() => props.value)
    return {fieldValue}
  }
})

</script>
