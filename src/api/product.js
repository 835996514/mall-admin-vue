import request from '@/utils/request'
import qs from 'qs'

export function productCreate(data) {
    return request({
        url: '/product/create',
        method: 'post',
        data
    })
}

export function productUpdateInfo(id) {
    return request({
        url: '/product/updateInfo/' + id,
        method: 'get'
    })
}

export function productUpdate(id, data) {
    return request({
        url: '/product/update/' + id,
        method: 'post',
        data
    })
}

export function productList(params) {
    return request({
        url: '/product/list',
        method: 'get',
        params
    })
}

export function productSimpleList(keyword) {
    return request({
        url: 'product/simpleList',
        method: 'get',
        params: {
            keyword
        }
    })
}

export function updateVerifyStatys(ids, verifyStatus, detail) {
    return request({
        url: '/product/update/verifyStatyus',
        method: 'post',
        data: {
            ids,
            verifyStatus,
            detail
        }
    })
}

export function updatePublishStatus(params) {
    return request({
        url: '/product/update/publishStatus',
        method: 'post',
        params
    })
}

export function updateRecommendStatus(params) {
    return request({
        url: '/product/update/recommendStatus',
        method: 'post',
        params
    })
}

export function updateNewStatus(params) {
    return request({
        url: '/product/update/newStatus',
        method: 'post',
        params
    })
}

export function updateDeleteStatus(params) {
    return request({
        url: '/product/update/deleteStatus',
        method: 'post',
        params
    })
}