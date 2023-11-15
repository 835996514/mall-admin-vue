import NProgress from 'nprogress'
import router from '@/router'
import store from '@/store'
import { getToken } from '@/utils/auth'
import whiteList from './utils/whiteList'
import { Message } from 'element-ui'

router.beforeEach((to, from, next) => {    
    NProgress.start()
    //获取token，是否验证，没验证则走白名单或重定向登录页
    if (getToken()) {
        if (to.path == '/login') {
            next({ path: '/' })
            NProgress.done()
        } else {
            //没有权限信息则进行拉取，反之放行
            if (store.getters.roles.length == 0) {
                store.dispatch('GetInfo').then(res => { //拉取用户信息
                    let menus = res.data.menus
                    store.dispatch('GenerateRoutes', menus).then(() => {    //生成可访问的路由表
                        let routers = store.getters.addRouters
                        if (routers.length > 0) router.addRoutes(routers)    //动态添加可访问路由表
                        next({...to,replace: true})
                    })
                }).catch(err => {
                    store.dispatch('FedLogOut').then(() => {
                        Message.error(err || 'Verification failed, Please login again')
                        next({ path: '/' })
                    })
                })
            } else {
                next()
            }
        }
    } else {
        if (whiteList.includes(to.path)) {
            next()
        } else {
            next('/login')
            NProgress.done()
        }
    }
})

router.afterEach(() => {
    NProgress.done()    //结束progress进度
})