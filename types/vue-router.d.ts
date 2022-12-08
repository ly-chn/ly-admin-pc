import 'vue-router'

export {}

declare module 'vue-router' {
  interface RouteMeta {
    // 菜单标题
    title?: string,
    // 隐藏菜单
    hidden?: boolean,
    /**
     * 当路由设置了该属性，则会高亮相对应的侧边栏。
     * 这在某些场景非常有用，比如：一个文章的列表页路由为：/article/list
     * 点击文章进入文章详情页，这时候路由为/article/1，但你想在侧边栏高亮文章列表的路由，就可以进行如下设置
     */
    activeMenu?:string
  }
  interface _RouteRecordBase{
    id: string | number | symbol
  }
}