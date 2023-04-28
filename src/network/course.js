import {request} from './index'

// //获取所有课程
// export function getAllCourse() {
//     return request({
//         url:'/teacher/getCourse',
//         method:'get',
//     })
// }

//获取学生的课程
export function getStudentCourse() {
    return request({
        url:'/student/getStudentCourse',
        method:'get',
    })
}

//获取学生的作业
export function getHomework(data) {
    return request({
        url:'/student/getHomework',
        method:'get',
        params:data
    })
}

//提交作业
export function submitHomework(data) {
    return request({
        url:'/student/submitHomework',
        method:'post',
        data:data
    })
}

//修改提交的作业
export function modifyHomework(data) {
    return request({
        url:'/student/modifyHomework',
        method:'post',
        data:data
    })
}

//获取信息
export function getMessage() {
    return request({
        url:'/student/getMessage',
        methdo:'get'
    })
}

//设置信息已读
export function setMessageState(data) {
    return request({
        url:'/student/setMessageState',
        method:'get',
        params:data
    })
}

//老师添加课程
export function addCourse(data) {
    return request({
        url:'/teacher/addCourse',
        method:'post',
        data:data
    })
}

//老师下发作业
export function distributeHomework(data) {
    return request({
        url:'/teacher/distributeHomework',
        method:'post',
        data:data
    })
}

//获取老师下发的作业
export function getDistributeHomework() {
    return request({
        url:'/teacher/getDistributeHomework',
        method:'get'
    })
}

//获取老师自己教的课程
export function getCourse() {
    return request({
        url:'/teacher/getCourse',
        method:'get'
    })
}