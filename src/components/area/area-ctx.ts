import type {InjectionKey} from 'vue'
import type {SearchPageContext} from '@/use/search-page'

export const searchAreaCtxKey: InjectionKey<SearchPageContext> = Symbol('search-area')