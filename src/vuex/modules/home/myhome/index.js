/**
 * Created by Administrator on 2017/6/20.
 */
import Vue from 'vue';
import Vuex from 'vuex';
import session from '@/common/js/sessionstorageUtil.js';
Vue.use(Vuex);
const changePath  = "changePath"; // 改变路径



export default{
  state: {
    data:{ // 数据
      renyuanList:[],
    },
    config:{ // 控制
      path:[
        {name:'xx',url:'/index'}
      ],
    },
  },

  mutations: {
    [changePath](state,data) { // 改变path
      state.config.path = data;
    },
  },

  actions: {
    [changePath]({commit},data){ // 改变path
      commit(changePath,data);
    },

  }

}
