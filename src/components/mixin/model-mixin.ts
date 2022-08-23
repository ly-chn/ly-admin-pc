import {defineComponent} from 'vue'

export const ModelMixin = defineComponent({
  props: {
    /**
     * 用于双向绑定
     */
    modelValue: {
      required: true
    }
  },
  emits: {
    /**
     * v-model change
     */
    change: null
  },
  computed: {
    value: {
      get() {
        return this.modelValue
      },
      set(val: unknown) {
        this.$emit('change', val)
      },
    },
  }
})
