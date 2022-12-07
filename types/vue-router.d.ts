import 'vue-router'

export {}

declare module 'vue-router' {
  interface RouteMeta {
    title?: string,
    hidden?: boolean
  }
  interface _RouteRecordBase{
    id: string | number | symbol
  }
}