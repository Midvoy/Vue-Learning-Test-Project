import request from "@/utils/request"
export function getProductListAPI(){
    return request({
        url:'/ProductManagement/PageInfo',
        method:'get',
    })
}