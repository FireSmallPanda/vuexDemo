// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import vuex from 'vuex'
import store from './vuex/index' // 导入 vuex配置 src/vuex/index.js
Vue.config.productionTip = false

Vue.use(vuex);//使用vuex
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
