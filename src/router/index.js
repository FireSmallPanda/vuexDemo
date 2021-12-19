import Vue from 'vue'
import Router from 'vue-router'
import Car from '@/views/Car'
import Goods from '@/views/Goods'
import Index from '@/views/Index'
Vue.use(Router)

export default new Router({
  routes: [{
      path: '/',
      name: 'index',
      component: Index
    },
    {
      path: '/goods',
      name: 'Goods',
      component: Goods
    },
    { // axios相关
      path: '/axiosPage',
      name: 'axiosPage',
      component: () => import('@/views/axios/AxiosPage')
    },
    {
      path: '/axiosPageAll',
      name: 'axiosPageAll',
      component: () => import('@/views/axios/AxiosPageAll')
    },
    {
      path: '/axiosPageSL',
      name: 'axiosPageSL',
      component: () => import('@/views/axios/axiosPageSL')
    },
    {
      path: '/axiosPageAOP',
      name: 'axiosPageAOP',
      component: () => import('@/views/axios/axiosPageAOP')
    },
    {
      path: '/axiosPageCancel',
      name: 'axiosPageCancel',
      component: () => import('@/views/axios/axiosPageCancel')
    },
    {
      path: '/excel',
      name: 'excel',
      component: () => import('@/views/excel/Excel')

    },
    {
      path: '/excel',
      name: 'excel',
      component: () => import('@/views/excel/Excel')

    },
    {
      // 自定义首页
      path: '/indexLive',
      name: 'indexLive',
      component: () => import('@/views/indexLive/index/index.vue')

    },
    {
      // 可拖拽组件
      path: '/draggable',
      name: 'draggable',
      component: () => import('@/views/draggable/Draggable.vue')

    }
  ]
})
