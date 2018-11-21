/**
 * Created by Administrator on 2017/6/20.
 */
import Vue from 'vue';
import Vuex from 'vuex';
import session from '@/common/js/sessionstorageUtil.js';
Vue.use(Vuex);
const changePath = "changePath"; // 改变路径
const webPath = "webPath";


export default {
  state: {
    data: {
      userInfo: {},
    }
  },
  getters: {
    getUserInfo: state => state.data.userInfo
  },
  mutations: {
    setUserInfo: (state,data) => {
      let obj = {}
      obj['value'] = data
      Vue.set(state.data, 'userInfo', obj)
    }
  },
}
