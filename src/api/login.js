import request from '@/utils/request'
import qs from 'qs'

export function login(username, password) {
    return request({
        url: '/admin/login',
        method: 'post',
        data: {
            username,
            password
        }
    })
}

export function getInfo() {
    return request({
        url: '/admin/info',
        method: 'get'
    })
}

export function fetchList(params) {
    return request({
        url: '/admin/list',
        method: 'get',
        params: params
    })
}

export function logout() {
    return request({
        url: '/admin/logout',
        method: 'post'
    })
}

export function createAdmin(data) {
    return request({
        url: '/admin/register',
        method: 'post',
        data
    })
}

export function updateAdmin(id, params) {
    return request({
        url: '/admin/update/' + id,
        method: 'post',
        params
    })
}

export function updateStatus(id, params) {
    return request({
        url: '/admin/'
    })
}

export function deleteAdmin(id) {
    return request({
        url: '/admin/delete' + id,
        method: 'post'
    })
}