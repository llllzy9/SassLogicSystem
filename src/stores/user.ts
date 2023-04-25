import { ref, reactive, toRefs } from "vue";
import { defineStore } from "pinia";

interface Info {
    id:number
    role:number
    token:string
    nickname:string
    avatar:string
    clsName:string
    email:string
    phoneNumber:number
    school:string
    sex:string
    username:string
}

export const useUserStore = defineStore('user', () => {
    const userInfo = reactive<Info>({
        id:0,
        role:0,
        token:'',
        nickname:'',
        avatar:'',
        clsName:'',
        email:'',
        phoneNumber:0,
        school:'',
        sex:'',
        username:''
    })

    const avatarImg = (avatar?:string):string => `http://154.204.60.38:8000/img/user/${userInfo.username}/${avatar || userInfo.avatar}` 
    const courseImg = (avatar?:string):string => `http://154.204.60.38:8000/img/user/course/${avatar}`  

    return {
        userInfo,
        avatarImg,
        courseImg
    }
})