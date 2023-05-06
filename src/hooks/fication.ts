import { ref, reactive } from 'vue'

export function dataClassification(array: any, str: string, key:string) {
    
    interface List {

    }
    const allArray = ref<List[]>([])
    const trueArray = ref<List[]>([])
    const falseArray = ref<List[]>([])

    array.filter((item: any) => {
        if(str === 'date'){
            if (deadlineTime(item[key])) {
                trueArray.value.push(item)
            } else {
                falseArray.value.push(item)
            }
        }else if(str === 'status'){
            if (item[key]) {
                trueArray.value.push(item)
            } else {
                falseArray.value.push(item)
            }
        }

    })

    return {
        trueArray,
        falseArray
    }
}

export function deadlineTime(date: string) {
    const deadline = new Date(date).getTime()
    const timeNow = new Date().getTime()
    if (timeNow > deadline) return true
    else return false
}