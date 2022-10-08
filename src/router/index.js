import Vue from 'vue';
import Router from 'vue-router';

import Goods from '@/views/Goods';
import Index from '@/views/Index';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: Index
    },
    {
      path: '/goods',
      name: 'Goods',
      component: Goods
    },
    {
      // axios相关
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
    },
    {
      // 动背景
      path: '/liveBackGround',
      name: 'liveBackGround',
      component: () => import('@/views/liveBackGround/LiveBackGround.vue')
    },
    {
      // Vue修饰符
      path: '/modifier',
      name: 'modifier',
      component: () => import('@/views/modifier/Modifier.vue')
    },
    {
      // 毛玻璃效果
      path: '/filterBlur',
      name: 'filterBlur',

      component: () => import('@/views/filterBlur/FilterBlur.vue')
    },
    {
      // 批量导入
      path: '/excelImportPage',
      name: 'excelImportPage',

      component: () => import('@/views/excelImport/ExcelImportPage.vue')
    },
    {
      // word导入
      path: '/wordImportPage',
      name: 'wordImportPage',
      component: () => import('@/views/wordImport/WordImportPage.vue')
    },
    {
      // 图片剪切
      path: '/imageUploadCut',
      name: 'imageUploadCut',
      component: () => import('@/views/imageUploadCut/ImageUploadCut.vue')
      
    },
    {
      // 网页转图片
      path: '/dom2Image',
      name: 'dom2Image',
      component: () => import('@/views/Dom2Image/Dom2Image2.vue')
      
    }
  ]
});
