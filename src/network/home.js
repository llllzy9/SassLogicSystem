import { request } from "./index";

export function getMessage() {
    return request({
        url:'/student/getMessage',
        method:'get'
    })
}

export function getHomework(data) {
    return request({
        url:'/student/getHomework',
        method:'get',
        params:data
    })
}