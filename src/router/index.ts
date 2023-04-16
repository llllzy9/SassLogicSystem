import { createRouter, createWebHistory } from 'vue-router'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: () => import('../views/login/index.vue')
    },
    {
      path: '/container',
      name: 'container',
      redirect:'/container/home',
      component: () => import('../views/container/index.vue'),
      children:[
        {
          path: 'home',
          name: 'home',
          meta:{
            title:'主页'
          },
          component: () => import('../views/container/home/index.vue')
        },
        {
          path: 'actManage',
          name: 'actManage',
          meta:{
            title:'账号管理'
          },
          redirect:'actManage/basicInfo',
          component: () => import('../views/container/actManage/index.vue'),
          children:[
            {
              path: 'basicInfo',
              name: 'basicInfo',
              component: () => import('../views/container/actManage/basicInfo/index.vue')
            },
            {
              path: 'passManage',
              name: 'passManage',
              component: () => import('../views/container/actManage/passManage/index.vue')
            },
          ]
        },
        {
          path: 'labCourse',
          name: 'labCourse',
          meta:{
            title:'实验课程'
          },
          component: () => import('../views/container/labCourse/index.vue')
        },
        {
          path: 'jobInfo',
          name: 'jobInfo',
          meta:{
            title:'作业信息'
          },
          component: () => import('../views/container/jobInfo/index.vue')
        }
      ]
    },

  ]
})

export default router
