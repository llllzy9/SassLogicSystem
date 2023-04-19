import { request } from "./index";

export function getUserInfo() {
    return request({
        url:'user/getInfo',
        method:'get'
    })
}