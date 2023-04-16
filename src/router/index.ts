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
          component: () => import('../views/container/actManage/index.vue')
        },
        {
          path: 'labCourse',
          name: 'labCourse',
          meta:{
            title:'实验课程'
          },
          component: () => import('../views/container/labCourse/index.vue'),
          children:[
            {
              path: 'courseDetail',
              name: 'courseDetail',
              meta:{
                title:'课程详情'
              },
              component: () => import('../views/container/labCourse/courseDetail/index.vue')
            },]
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
