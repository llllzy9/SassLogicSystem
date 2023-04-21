import {request} from './index'

export function getAllCourse() {
    return request({
        url:'/teacher/getCourse',
        method:'get',
    })
}