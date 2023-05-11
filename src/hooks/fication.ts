import { ref, reactive } from 'vue'

export function dataClassification(array: any[], str: string, key:string): { trueArray: any[], falseArray: any[] }  {

    const trueArray = <any[]>[]
    const falseArray = <any[]>[]

    array.filter((item: any) => {
        if(str === 'date'){
            if (deadlineTime(item[key])) {
                trueArray.push(item)
            } else {
                falseArray.push(item)
            }
        }else if(str === 'status'){
            if (item[key]) {
                trueArray.push(item)
            } else {
                falseArray.push(item)
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