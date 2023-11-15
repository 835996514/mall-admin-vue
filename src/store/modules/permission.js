import {asyncRouteMap,constantRouteMap} from '@/router/index'

//判断是否有权限访问该菜单
function hasPermission(menus,route){
    //如果该路由有 name 值，则进行验证，没有则直接通过权限
    if(route.name){
        const menu = getMenu(menus,route)
        //比对含有该路由的菜单 -> 权限通过，设置菜单
        if(menu != null){
            if(menu.title && menu.title !== ''){
                route.meta.title = menu.title
            }
            if(menu.icon && menu.icon !== ''){
                route.meta.icon = menu.icon
            }
            if(menu.hidden != null){
                route.hidden = menu.hidden
            }
            if(menu.sort != null){
                route.sort = menu.sort
            }
            return true
        }else{
            //比对不含该路由的菜单，但是路由hidden为false，即也可访问
            route.sort = 0
            if(route.hidden !== undefined && route.hidden == true){
                route.sort = -1
                return true
            }else{
                return false
            }
        }
    }else{
        return true
    }
}

//获取符合路由菜单
function getMenu(menus,route){
    for(let i=0; i<menus.length; i++){
        const menu = menus[i]
        if(menu.name == route.name){
            return menu
        }
    }
    return null;
}

//菜单路由排序
function sortRoutes(accessRouters){
    for(let i=0; i<accessRouters.length; i++){
        const child = accessRouters[i].children
        if(child && child.length > 0){
            child.sort(compare('sort'))
        }
    }
    accessRouters.sort(compare('sort'))
}

//降序比较函数
function compare(p){
    return function(m,n){
        return n[p] - m[p]
    }
}

const permission = {
    state: {
        routers: constantRouteMap,
        addRouters: []
    },
    mutations: {
        SET_ROUTES: (state,routers) => {
            state.addRouters = routers;
            state.routers = constantRouteMap.concat(routers)
        }
    },
    actions: {
        GenerateRoutes({commit},data){
            return new Promise(resolve => {
                const menus = data
                const accessRouters = asyncRouteMap.filter(v => {
                    if(hasPermission(menus,v)){
                        if(v.children && v.children > 0){
                            v.children = v.children.filter(c => {
                                if(hasPermission(menus,c)){
                                    return c
                                }
                                return false
                            });
                        }
                        return v
                    }
                    return false
                });
                //对菜单路由进行排序
                sortRoutes(accessRouters)
                commit('SET_ROUTES',accessRouters)
                resolve();
            })
        }
    }
}

export default permission;