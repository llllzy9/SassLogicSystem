import { request } from "./index";

export function getUserInfo() {
    return request({
        url:'user/getInfo',
        method:'get'
    })
}

export function changeUserInfo(data) {
    return request({
        url:'/user/changeInfo',
        method:'post',
        params:data
    })
}

export function changePassword(data) {
    return request({
        url:'/user/changePassword',
        method:'post',
        params: data
    })
}

export function getAllClass(data) {
    return request({
        url:'/cls/all',
        method:'get',
        params:data
    })
}