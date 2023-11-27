import request from '@/utils/request'
export function fetchList(){
    return request({
        url: '/productCategory/list/withChildren',
        method: 'get'
    })
}