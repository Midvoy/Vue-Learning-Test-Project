import request from "@/utils/request"

export function getAllFarmAPI(){
    return request({
        url:'/Farm/Get_All_Farm',
        method:'get',
    })
}