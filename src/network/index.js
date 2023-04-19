import axios from 'axios'
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

export function request(config){
    let instance = axios.create({
        baseURL:'http://154.204.60.38:8000/',
        timeout:5000
    })

    instance.interceptors.request.use(config => {
        NProgress.start()
        if(config.url === '/user/login' || config.url === '/user/register') return config
        config.headers.Authorization = 'Bearer ' + sessionStorage.getItem('token')
        return config
    })

    instance.interceptors.response.use(response => {
        NProgress.done()
        return response
    })

    return instance(config)
}