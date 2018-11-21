/**
 * Created by Administrator on 2017/6/20.
 */
import Vue from 'vue';
import Vuex from 'vuex';

import demo from './modules/demo/demo';

Vue.use(Vuex);
const store = new Vuex.Store({
  modules:{
    demo
  },
})

export default store;
