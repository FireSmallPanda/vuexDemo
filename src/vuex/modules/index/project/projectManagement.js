/**
 * Created by Administrator on 2017/6/20.
 */
import Vue from 'vue';
import Vuex from 'vuex';
import session from '@/common/js/sessionstorageUtil.js';
Vue.use(Vuex);
const changeSearchProject  = "project/changeSearchProject"; // 改变路径



export default{
  state: {
    data:{ // 数据

    },
    config:{ // 控制
      searchProject:{ // 搜索项目详情参数
        id:'',
        is_parent_project:''
      }
    },
  },

  mutations: {
    [changeSearchProject](state,data) { // 改变path
      state.config.searchProject = data;
    },
  },

  actions: {
    [changeSearchProject]({commit},data){ // 改变path
      commit(changeSearchProject,data);
    },

  }

}
