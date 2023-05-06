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



//学生获取信息
export function stdGetMessage() {
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



//老师发布信息
export function publishMessage(data) {
    return request({
        url:'/teacher/publishMessage',
        method:'post',
        data:data
    })
}


//删除信息
export function deleteMessage(params){
    return request({
        url:'/teacher/deleteMessage',
        method:'delete',
        params:params
    })
}

//获取老师发的信息
export function tecGetMessage(params) {
    return request({
        url:'/teacher/getMessage',
        method:'get',
        params:params
    })
}

//获取老师自己教的课程
export function getCourse() {
    return request({
        url:'/teacher/getCourse',
        method:'get'
    })
}

//删除课程
export function deleteCourse(id) {
    return request({
        url:'/teacher/deleteCourse',
        method: 'delete',
        params:id
    })
}