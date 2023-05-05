import { ref, reactive, toRefs } from "vue";
import { defineStore } from "pinia";
import {getAllClass} from '@/network/user'

export const useCourseStore = defineStore('course', () => {

    const informationList = ref([])
    const deleteInfor = (id:any):void => {
        informationList.value.forEach((item:any,index) => {
            if(item.id === id){
                informationList.value.splice(index,1)
            }
        })
    }

    // const inforNum = ():number => informationList.value.filter( item => item.state === 0 ).length
    const inforState = (state?:number):boolean => state === 0
    const courseImg = (avatar?:string):string => `http://154.204.60.38:8000/img/user/course/${avatar}`  

    return {
        informationList,
        inforState,
        courseImg,
        // inforNum,
        deleteInfor,
    }
})