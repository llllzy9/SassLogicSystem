import {request} from './index'

//学生获取的作业
export function getHomework(data) {
    return request({
        url:'/student/getHomework',
        method:'get',
        params:data
    })
}

//学生获取自己提交的作业
export function getSubmitHomework(data) {
    return request({
        url:'/student/getSubmitHomework',
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




//老师下发作业
export function distributeHomework(data) {
    return request({
        url:'/teacher/distributeHomework',
        method:'post',
        data:data
    })
}

//老师获取自己下发的作业
export function getDistributeHomework() {
    return request({
        url:'/teacher/getDistributeHomework',
        method:'get'
    })
}


//删除作业
export function deleteHomeWork(params) {
    return request({
        url:'/teacher/deleteHomework',
        method:'delete',
        params:params
    })
}


//获取学生提交的作业
export function getStudentHomework(params) {
    return request({
        url:'/teacher/getStudentHomework',
        method:'get',
        params:params
    })
}
//给作业打分
export function markStudentHomework(params) {
    return request({
        url:'/teacher/markStudentHomework',
        method:'post',
        params:params
    })
}
//打回作业
export function returnStudentHomework(params) {
    return request({
        url:'/teacher/returnStudentHomework',
        method:'post',
        params:params
    })
}