import type {RouteRecordRaw} from 'vue-router'
import {createRouter, createWebHistory} from 'vue-router'
import {visitorRoutes} from './routes'
import type {App} from 'vue'

const whiteRouteNameList: string[] = [];
// generate visitor routes
(function createVisitorRoutes(routes: RouteRecordRaw[]) {
  routes.map(it => whiteRouteNameList.push(<string>it.name) && createVisitorRoutes(it.children || []))
})(visitorRoutes)
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL), routes: visitorRoutes, strict: true, scrollBehavior: () => ({left: 0, top: 0})
})

// 重置路由
export function resetRouter() {
  router.getRoutes().forEach((route) => {
    const {name} = route
    if (name && !whiteRouteNameList.includes(name as string)) {
      router.hasRoute(name) && router.removeRoute(name)
    }
  })
}

export default {
  install(app: App) {
    app.use(router)
  }
}
