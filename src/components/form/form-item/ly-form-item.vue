<script lang="ts" setup>
import {
  computed,
  inject,
  onBeforeUnmount,
  onMounted,
  PropType,
  provide,
  reactive,
  ref,
  useSlots,
  watchEffect
} from 'vue'
import {colSpanProps, FormValidateRule, FormValidateRuleGenerate} from '@/components/form/util/form-props'
import {refDebounced, useResizeObserver} from '@vueuse/core'
import {useColSpan} from '@/components/form/util/form-util'
import {lyFormCtxKey} from '@/components/form/util/form-ctx'
import {
  FormItemContext,
  formItemContextKey,
  FormItemRule,
  FormItemValidateState,
  FormValidateFailure, useNamespace, useSize
} from 'element-plus'
import {IsInstance} from '@/util/is-instance'
import {castArray} from 'lodash'
import type { RuleItem } from 'async-validator'
import AsyncValidator from 'async-validator'
import {LyFormConstant} from '@/components/form/util/ly-form-constant'
import {Rules} from '@/plugin/ly-rules'

const compKey = Symbol.for('ly-form-item')

const formCtx = inject(lyFormCtxKey)
const props = defineProps({
  /**
   * 最大label宽度
   */
  maxLabelWidth: {
    type: Number,
    default: 0
  },
  /**
   * 为true时，表单不可编辑
   */
  disabled: Boolean,
  /**
   * 校验规则
   */
  rules: {
    type: [Object, Array, Function] as PropType<FormValidateRule>,
  },
  /**
   * 标签文本
   */
  label: String,
  /**
   * true表示必填
   */
  required: Boolean,
  /**
   * 当前表单值, 用于表单校验时使用
   */
  value: null,
  ...colSpanProps
})

const validateState = ref<FormItemValidateState>('')
const slots = useSlots()
const labelRef = ref<HTMLDivElement>()

const hasLabel = computed(() => props.label || slots.label)
const updateLabelWidth = (width: number) => {
  formCtx?.registerLabelWidth(compKey, width)
}

const getLabelWidth = () => {
  if (labelRef.value) {
    const width = window.getComputedStyle(labelRef.value).width
    return Math.ceil(Number.parseFloat(width))
  } else {
    return 0
  }
}
useResizeObserver(
  () => (labelRef.value?.firstElementChild) as HTMLElement | null,
  () => updateLabelWidth(getLabelWidth())
)
onMounted(() => {
  updateLabelWidth(getLabelWidth())
})
onBeforeUnmount(() => {
  updateLabelWidth(0)
})
watchEffect(() => {
  if (labelRef.value && formCtx?.autoLabelWidth) {
    labelRef.value.style.minWidth = formCtx.autoLabelWidth
  }
})


const inputIds = ref<string[]>([])
const addInputId = (id: string) => {
  if (!inputIds.value.includes(id)) {
    inputIds.value.push(id)
  }
}
const removeInputId = (id: string) => {
  inputIds.value = inputIds.value.filter((listId) => listId !== id)
}
const labelFor = computed<string | undefined>(() => {
  return inputIds.value?.[0]
})

const finalSpan = computed(() => {
  return useColSpan(props) || useColSpan(formCtx)
})


const validateMessage = ref('')
const normalizedRules = computed(() => {
  const rules: FormValidateRule[] = []
  if (props.rules) {
    rules.push(...castArray(props.rules))
  }
  const result = rules.map(rule => {
    if (rule === Rules.must) {
      return Rules.must(`${props.label ?? '此项'}不能为空`)
    }
    if (IsInstance.func(rule)) {
      return (rule as FormValidateRuleGenerate)()
    }
    return rule
  }) as FormItemRule[]
  if (result.some(it => it.required)) {
    result.push({required: true, message: '自动生成的非空校验'})
  }
  return result
})
const setValidationState = (state: FormItemValidateState) => {
  validateState.value = state
}
const getFilteredRule = (trigger: string) => normalizedRules.value
  .filter(rule=>!rule.trigger || !trigger || castArray(rule.trigger).includes(trigger))
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  .map(({trigger, ...rule}) => rule)
const onValidationFailed = (error: FormValidateFailure) => {
  const { errors, fields } = error
  if (!errors || !fields) {
    console.error(error)
  }
  setValidationState('error')
  validateMessage.value = errors?.[0]?.message ?? '校验失败'
}
const doValidate = async (rules: RuleItem[]): Promise<any> => {
  const validator = new AsyncValidator({
    target: rules,
  })
  return validator.validate({ target: props.value }, LyFormConstant.validateOptions)
    .then(() => {
      setValidationState('success')
      return true as const
    })
    .catch((err: FormValidateFailure) => {
      onValidationFailed(err as FormValidateFailure)
      return Promise.reject(err)
    })
}
const validate: FormItemContext['validate'] = async (trigger, callback) => {
  if (callback) {
    throw Error('sorry, 并不支持回调')
  }
  const hasCallback = IsInstance.func(callback)
  const rules = getFilteredRule(trigger)
  if (rules.length === 0) {
    return true
  }
  setValidationState('validating')
  return doValidate(rules)
    .then(() => {
      return true as const
    })
    .catch((err: FormValidateFailure) => {
      const {fields} = err
      return hasCallback ? false : Promise.reject(fields)
    })
}
const clearValidate: FormItemContext['clearValidate'] = () => {
  setValidationState('')
  validateMessage.value = ''
}
const ns = useNamespace('form-item')
const size = useSize(undefined, { formItem: false })

const formItemClasses = computed(() => [
  ns.b(),
  ns.m(size.value),
  ns.is('error', validateState.value === 'error'),
  ns.is('validating', validateState.value === 'validating'),
  ns.is('success', validateState.value === 'success'),
  ns.is('required', normalizedRules.value.some((rule) => rule.required) || props.required),
])
const validateStateDebounced = refDebounced(validateState, 100)


const context = reactive({
  validateState,
  addInputId,
  removeInputId,
  clearValidate,
  validate
})
provide(formItemContextKey, context)

defineExpose({
  size,
  validate
})
</script>
<template>
  <el-col :span="finalSpan" class="flex ly-form-item" :class="formItemClasses">
    <component :is="labelFor?'label':'div'"
               v-if="hasLabel"
               ref="labelRef"
               :for="labelFor"
               class="el-form-item__label ly-form-item__label">
      <slot name="label">{{ label }}</slot>
    </component>
    <div :class="ns.e('content')">
      <slot />
      <transition :name="`${ns.namespace.value}-zoom-in-top`">
        <slot v-if="validateStateDebounced==='error'" name="error" :error="validateMessage">
          <div :class="ns.e('error')">
            {{ validateMessage }}
          </div>
        </slot>
      </transition>
    </div>
  </el-col>
</template>

<style scoped>
.el-form-item__label {
  @apply w-auto overflow-hidden text-ellipsis text-justify inline-block;
  text-align-last: justify;
  text-justify: distribute;
}

.ly-form-item {
  @apply px-2 mb-4
}

.ly-form-item__content {
  @apply flex-1
}
</style>
