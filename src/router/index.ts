import { createRouter, createWebHistory } from 'vue-router'
import { message } from 'ant-design-vue';


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/login/index.vue')
    },
    {
      path: '/container',
      name: 'container',
      redirect: '/container/home',
      component: () => import('../views/container/index.vue'),
      children: [
        {
          path: 'home',
          name: 'home',
          meta: {
            title: '主页'
          },
          component: () => import('../views/container/home/index.vue')
        },
        {
          path: 'actManage',
          name: 'actManage',
          meta: {
            title: '账号管理'
          },
          redirect: '/container/actManage/basicInfo',
          component: () => import('../views/container/actManage/index.vue'),
          children: [
            {
              path: 'basicInfo',
              name: 'basicInfo',
              meta: {
                title: '基础资料'
              },
              component: () => import('../views/container/actManage/basicInfo/index.vue')
            },
            {
              path: 'passManage',
              name: 'passManage',
              meta: {
                title: '密码管理'
              },
              component: () => import('../views/container/actManage/passManage/index.vue')
            },
          ]
        },
        {
          path: 'labCourse',
          name: 'labCourse',
          meta: {
            title: '实验课程'
          },
          component: () => import('../views/container/labCourse/index.vue'),
        },
        {
          path: 'courseDetail',
          name: 'courseDetail',
          meta: {
            title: '课程详情'
          },
          redirect:'courseDetail/homeWork',
          component: () => import('../views/container/labCourse/courseDetail/index.vue'),
          children:[
            {
              path:'homeWork',
              name:'homeWork',
              meta:{
                title:'我的作业'
              },
              component:() => import('../views/container/labCourse/homeWork/index.vue')
            },
            {
              path:'myInformation',
              name:'myInformation',
              meta:{
                title:'我的信息'
              },
              component:() => import('../views/container/labCourse/myInformation/index.vue')
            }
          ]
        },
        {
          path: 'jobInfo',
          name: 'jobInfo',
          meta: {
            title: '作业信息'
          },
          component: () => import('../views/container/jobInfo/index.vue')
        },
        {
          path: 'correcting',
          name: 'correcting',
          meta: {
            title: '作业批改'
          },
          component: () => import('../views/container/jobInfo/teacherView/correcting/index.vue')
        }
      ]
    },
    {
      path: '/404',
      name: 'NotFound',
      meta: {
        title: 'Page not found',
      },
      component: () => import('../views/notFound/404.vue')
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: '/404'
    }

  ]
})

//路由前置拦截器
router.beforeEach((to, from, next) => {
  if (to.path === '/login') return next()
  let token = sessionStorage.getItem('token')
  if (!token) {
    message.error('token已失效,请重新登录')
    return next('/login')
  }
  next()
})

export default router
