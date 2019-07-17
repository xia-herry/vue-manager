import Vue from 'vue'
import Router from 'vue-router'


Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      name: 'home',
      component: () => import('@/public/home.vue'),
      children:[
       {
        path: '/employee',
        name: 'employee',
        component: () => import('@/views/system/employee.vue'),
        meta:{
          name:'/employee',
          title:'员工管理'

        }
       },
       {
        path: '/employee/add',
        name: 'add',
        component: () => import('@/views/system/subComps/add.vue'),
        meta:{
          name:'/employee',
          title:'员工管理'

        }
       },
       {
        path: '/department',
        name: 'department',
        component: () => import('@/views/system/department.vue'),
        meta:{
          name:'/department',
          title:'部门管理'
        }
       },
       
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/login/index.vue')
    },
  ]
})
