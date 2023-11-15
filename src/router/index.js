import Vue from 'vue'
import Router from 'vue-router'

// 解决路由重复报错：Avoided redundant navigation to current location
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}
Vue.use(Router)

import Layout from '@/views/layout/Layout'

export const constantRouteMap = [
    { path: '/test', component: () => import('@/views/test/index'), hidden: true },
    { path: '/login', component: () => import('@/views/login/index'), hidden: true },
    { path: '/register', component: () => import('@/views/login/index'), hidden: true },
    { path: '/404', component: () => import('@/views/404'), hidden: true },
    {
        path: '',
        component: Layout,
        redirect: '/home',
        children: [{
            path: 'home',
            name: 'home',
            component: () => import('@/views/home/index'),
            meta: { title: '首页', icon: 'iconfont icon-shouyefill' }
        }]
    }
]

export const asyncRouteMap = [
    {
        path: '/pms',
        component: Layout,
        redirect: '/pms/product',
        name: 'pms',
        meta: { title: '商品', icon: 'el-icon-goods' },
        children: [
            {
                path: 'product',
                name: 'product',
                component: () => import('@/views/pms/product/index'),
                meta: { title: '商品列表', icon: 'el-icon-guide' }
            },
            {
                path: 'addProduct',
                name: 'addProduct',
                component: () => import('@/views/pms/product/add'),
                meta: { title: '添加商品', icon: 'product-add' }
            },
            {
                path: 'updateProduct',
                name: 'updateProduct',
                component: () => import('@/views/pms/product/update'),
                meta: { title: '修改商品', icon: 'product-add' },
                hidden: true
            },
        ]
    },
    { path: '*', redirect: '/404', hidden: true },
]

export default new Router({
    mode: 'hash',
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRouteMap
})