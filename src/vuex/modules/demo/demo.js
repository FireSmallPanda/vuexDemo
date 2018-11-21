/**
 * Created by Administrator on 2017/6/20.
 */
import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);
const name1 = "name1"; // 名称1
const name2 = "name2"; // 名称2
export default {
    state: {
        data: { // 数据
            name1:"a",
            name2:"b"
        }
    },
    getters: {
        [name1]: state => { // 名称1
            return state.data.name1;
        },
        [name2]: state => { // 名称2
            return state.data.name2;
        }
    },
    mutations: {
        [name1](state, data) { // 改变path
            state.data.name1 = data;
        },
        [name2](state, data) { // 改变path
            state.data.name2 = data;
        }
        
    },

    actions: {
        [name1]({ commit }, data) { // 改变path
            commit(name1, data);
        },
        [name2]({ commit }, data) { // 改变path
            commit(name2, data);
        },
    }

}
