import {type ObjectDirective} from 'vue'

const blur = (ev: MouseEvent) => (ev.target as HTMLButtonElement).blur?.()

export const AutoBlur: ObjectDirective<HTMLButtonElement> = {
  beforeMount(el) {
    el.addEventListener('click', blur)
  },
  beforeUnmount(el) {
    el.removeEventListener('click', blur)
  }
}
