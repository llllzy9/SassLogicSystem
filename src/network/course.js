import {request} from './index'

export function getAllCourse() {
    return request({
        url:'/teacher/getCourse',
        method:'get',
    })
}

export function getStudentCourse() {
    return request({
        url:'/student/getStudentCourse',
        method:'get',
    })
}

export function getHomework(data) {
    return request({
        url:'/student/getHomework',
        method:'get',
        params:data
    })
}

export function submitHomework(data) {
    return request({
        url:'/student/submitHomework',
        method:'post',
        data:data
    })
}

export function modifyHomework(data) {
    return request({
        url:'/student/modifyHomework',
        method:'post',
        data:data
    })
}