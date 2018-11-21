import Vue from 'vue'
import Router from 'vue-router'
import Car from '@/views/Car'
import Goods from '@/views/Goods'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Car',
      component: Car
    },
    {
      path: '/goods',
      name: 'Goods',
      component: Goods
    },
  ]
})
