import {RouteRecordRaw} from 'vue-router'
import {IdUtil} from '@/util/id-util'

export const PageLayout = () => import('@/layouts/page-layout/page-layout.vue')
// Basic routing without permission
export const visitorRoutes: RouteRecordRaw[] = [
  {
    id: IdUtil.nextId(),
    path: '/',
    name: 'Dashboard',
    component: PageLayout,
    redirect: '/dashboard/analysis',
    meta: {
      title: '首页'
    },
    children: [
      {
        id: IdUtil.nextId(),
        path: '/dashboard/analysis',
        name: 'Analysis',
        component: () => import('@/views/dashboard/analysis/analysis-page.vue'),
        meta: {
          title: 'analysis'
        }
      }
    ]
  }, {
    id: IdUtil.nextId(),
    path: '/system',
    name: 'SystemManage',
    component: PageLayout,
    meta: {
      title: '系统管理'
    },
    children: [{
      id: IdUtil.nextId(),
      path: 'user-manage',
      component: () => import('@/views/system/user-manage.vue'),
      meta: {
        title: '用户管理'
      }
    }, {
      id: IdUtil.nextId(),
      path: 'role-manage',
      component: () => import('@/views/system/role-manage.vue'),
      meta: {
        title: '角色管理'
      }
    }, {
      id: IdUtil.nextId(),
      path: 'dict-manage',
      component: () => import('@/views/system/dict-manage.vue'),
      meta: {
        title: '字典管理'
      }
    }]
  }
]
