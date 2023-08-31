import request from "@/utils/request"
//商品显示
export function getPageInfoAPI(){
    return request({
        url:'/ProductManagement/PageInfo',
        method:'get',
    })
}
//商品编辑
export function putProductModifyAPI(params) {
    return request({
        url: '/ProductManagement/ProductModify',
        method: 'put',
        params: {product_id: params.product_id, photo: params.photo,detail: params.detail,price: params.price}
    })
}
//优惠查看
export function getPromotionNowAPI(params){
    return request({
        url:'/ProductManagement/PromotionNow',
        method:'get',
        params: {product_id: params.product_id}
    })
}
//查看某件商品历史优惠信息
export function getPromotionHistoryAPI(params){
    return request({
        url:'/ProductManagement/PromotionHistory',
        method:'get',
        params: {product_id: params.product_id}
    })
}

//添加折扣
export function postPromotionCreateAPI(params){
    return request({
        url:'/ProductManagement/PromotionCreate',
        method:'post',
        params: {
            product_id: params.product_id,
            salesperson_id:params.salesperson_id,
            percent:params.percent
        }
    })
}
//终止折扣
export function putEndPromotionAPI(params) {
    return request({
        url: '/ProductManagement/EndPromotion',
        method: 'put',
        params: {product_id: params.product_id}
    })
}
//查看销售记录
export function getBillHistoryAPI(params){
    return request({
        url:'/ProductManagement/BillHistory',
        method:'get',
        params: {product_id: params.product_id,timespan:params.timespan}
    })
}
//查看销售总量
export function getSaleSumAPI(params){
    return request({
        url:'/ProductManagement/SaleSum',
        method:'get',
        params: {product_id: params.product_id}
    })
}
