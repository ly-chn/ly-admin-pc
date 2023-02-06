import {InjectionKey} from 'vue'
import {SearchPageContext} from '@/use/search-page'

export const searchAreaCtxKey: InjectionKey<SearchPageContext> = Symbol('search-area')