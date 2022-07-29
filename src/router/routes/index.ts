import { RouteRecordRaw } from 'vue-router'

export const PageLayout = () => import('/@/layouts/page-layout/index.vue');
export const RootRoute: RouteRecordRaw = {
    path: '/',
    name: 'Root',
    redirect: '/dashboard',
    meta: {
        title: 'Root'
    }
}
const dashboard: RouteRecordRaw = {
    path: '/dashboard',
    name: 'Dashboard',
    component: PageLayout,
    redirect: '/dashboard/analysis',
    meta: {
        title: '首页'
    },
    children: [
        {
            path: 'analysis',
            name: 'Analysis',
            component: () => import('/@/views/dashboard/analysis/index.vue'),
            meta: {
                // affix: true,
                title: 'analysis'
            }
        }
    ]
}
// Basic routing without permission
export const visitorRoutes = [
    RootRoute,
    dashboard
]
