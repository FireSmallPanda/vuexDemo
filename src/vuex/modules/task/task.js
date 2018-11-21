/**
 * Created by Administrator on 2017/6/20.
 */
import Vue from 'vue';
import Vuex from 'vuex';
import session from '@/common/js/sessionstorageUtil.js';
Vue.use(Vuex);
const taskShow = "taskShow";
export default{
  state: {
    data:{ // 数据
      hi:"",
      roleList:[]
    },
    config:{ // 控制
    }},
  getters: {
    [taskShow]: state => { // 性别
      return state.data.roleList;
    },
  },
  mutations: {
    [taskShow](state,data) { // 改变path
      state.data.roleList = data;
    },
  },

  actions: {
    [taskShow]({commit},datas){
        var that=this;
//            if(type==='reloads'){
        $.ajax({
          url:'api/cgwas/gRoleAction/listModel.json',
          type:'post',
          dataType:'json',
          data:{
            project_id:datas.project_id ,//this.projectId,//项目id:56
            is_parent_poject:datas.is_parent_poject//this.is_parent_project
          },
          success:function (rel) {
            console.log(rel);
            if(rel.state){
              //组装管理层级的数据

              commit(taskShow,rel.data.gRolelist);
            //   that.datas.data=rel.data.gRolelist;//管理层级
            }
          }
        })
//            }
      },

  }

}
