import { request } from "./index";

export function loginRequest(formData){
    return request({
        url:'/user/login',
        method:'post',
        params:{
            username:formData.username,
            password:formData.password
        }
    })
}

export function registerRequest(formData){
    return request({
        url:'/user/register',
        method:'post',
        params:formData
    })
}