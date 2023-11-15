import request from '@/utils/request'

export function getList(){
    return request({
        url: '/brand/listAll',
        method: 'get'
    })
}