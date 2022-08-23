import {defineComponent, toRefs, watchEffect} from 'vue'
import {useRender} from '/@/components/util/useRender'

export const LyToggle = defineComponent({
  props: {
    modelValue: {},
    onValue: {},
    offValue: {}
  },
  slots: {},
  emits: {
    'update:modelValue': null,
  },
  setup(props, {emit, slots}) {
    const {modelValue, onValue, offValue} = toRefs(props)
    watchEffect(() => {
      if (![onValue.value, offValue.value].includes(modelValue.value)) {
        emit('update:modelValue', offValue.value)
      }
    })

    function onClick() {
      if (modelValue.value === onValue.value) {
        emit('update:modelValue', offValue.value)
      } else {
        emit('update:modelValue', onValue.value)
      }
    }
    useRender(() => {
      return (<div onClick={onClick}>
        {slots.default ? slots.default({modelValue, onValue, offValue}) : String(modelValue.value)}
      </div>)
    })

    return {}
  }
})
