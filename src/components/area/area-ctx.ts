import type {InjectionKey} from 'vue'
import type {CrudContext} from '@/use/simple-crud'

export const searchAreaCtxKey: InjectionKey<CrudContext> = Symbol('search-area')