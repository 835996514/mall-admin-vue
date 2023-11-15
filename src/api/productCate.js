import request from '@/utils/request'

export function listWithChildren(){
    return request({
        url: '/productCategory/list/withChildren',
        method: 'get'
    })
}