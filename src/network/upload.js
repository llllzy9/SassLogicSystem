import {request} from './index'

//上传图片
export function uploadImage(data){
    return request({
        url:'/file/uploadImage',
        method:'post',
        data:data
    })
}

//获取上传图片
export function getImage(params){
    return request({
        url:'/file/getImage',
        method:'get',
        params:params
    })
}

//上传文件
export function uploadFile(data){
    return request({
        url:'/file/uploadFile',
        method:'post',
        data:data
    })
}

//下载文件
export function downloadLocal(params){
    return request({
        url:'/downloadLocal',
        method:'get',
        params:params,
        responseType:'blob'
    })
}