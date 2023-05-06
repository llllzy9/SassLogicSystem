import { ref, reactive, toRefs } from "vue";
import { defineStore } from "pinia";

interface Info {
    id: number
    nickname: string
    avatar: string
    clsName: string
    email: string
    phoneNumber: number
    school: string
    sex: string
    username: string,
    roles:string,
}

export const useUserStore = defineStore('user', () => {
    const userInfo = reactive<Info>({
        id: 0,
        nickname: '',
        avatar: '',
        clsName: '',
        email: '',
        phoneNumber: 0,
        school: '',
        sex: '',
        username: '',
        roles:'',
    })
    const isTeacher = ref<boolean | undefined>(undefined)
    const isStudent = ref<boolean | undefined>(undefined)

    const avatarImg = (avatar?: string) => `http://154.204.60.38:8000/img/user/avatar/${userInfo.id}/${avatar}`

    const rolesState = () => {
        const role = sessionStorage.getItem('roles')
        if (role === '2') {
            userInfo.roles = 'teacher'
            isTeacher.value = true
            isStudent.value = false
        } else if (role === '3') {
            userInfo.roles = 'student'
            isTeacher.value = false
            isStudent.value = true
        } else {
            userInfo.roles = 'admin'
        }
    }

    return {
        userInfo,
        avatarImg,
        rolesState,
        isTeacher,
        isStudent
    }
})