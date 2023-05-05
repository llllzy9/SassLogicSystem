
import { message } from 'ant-design-vue';
const roles = sessionStorage.getItem('roles')

// export async function roleRequest<T>(teac:Promise<T>,std:Promise<T>,data?:any) {
//     try {
//       const rolePromise = roles === '2' ? teac : std;
//       const res = await rolePromise(data);
//       if(res.data.code === 200){
//         message.success(res.data.msg);
//         return res.data.data;
//       } else {
//         message.error(res.data.msg);
//         throw new Error(res.data.msg);
//       }
//     } catch (err) {
//       message.error('请求失败');
//       console.error(err);
//       throw err;
//     }
//   }