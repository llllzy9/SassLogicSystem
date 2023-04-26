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

export function getMessage() {
    return request({
        url:'/student/getMessage',
        methdo:'get'
    })
}

export function setMessageState(data) {
    return request({
        url:'/student/setMessageState',
        method:'get',
        params:data
    })
}

export function addCourse(data) {
    return request({
        url:'/teacher/addCourse',
        method:'post',
        data:data
    })
}

export function distributeHomework(data) {
    return request({
        url:'/teacher/distributeHomework',
        method:'post',
        data:data
    })
}

export function getDistributeHomework() {
    return request({
        url:'/teacher/getDistributeHomework',
        method:'get'
    })
}