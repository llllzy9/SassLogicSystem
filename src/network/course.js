import {request} from './index'

export function getAllCourse() {
    return request({
        url:'/teacher/getCourse',
        method:'get',
    })
}

export function getHomework() {
    return request({
        url:'/student/getHomework',
        method:'get'
    })
}