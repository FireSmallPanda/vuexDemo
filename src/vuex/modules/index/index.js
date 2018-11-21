/**
 * Created by Administrator on 2017/6/20.
 */
import Vue from 'vue';
import Vuex from 'vuex';
import session from '@/common/js/sessionstorageUtil.js';
Vue.use(Vuex);
const changePath  = "changePath"; // 改变路径
const webPath = "webPath";
const alertShow  = "alertShow"; // 显示提示框
const menuTabIdShow = "menuTabIdShow";

const isPrivilege = "isPrivilege"; // 请求权限菜单
const saveRe = "saveRe";
export default{
  state: {
    data:{ // 数据
		renyuanList:[],
    },
    config:{ // 控制
      path:[
        {name:'xx',url:'/index'}
      ],
      webPath:"http://zhangyuefeng.oss-cn-hangzhou.aliyuncs.com/",
      alertInfo:{ // 显示alert
        value:null,
        flag:false,
        type:'err'
      },
      tel:"",
      password:"",
      smsFlag:false,
      menuTabId:0,
      menuAll:[] // 所有菜单
    ,
  }},
  getters: {
    [webPath]: state => { // 性别
      return state.config.webPath;
    },
    [isPrivilege]: state => { // 权限的菜单
      return state.config.menuAll;
    },
  },
  mutations: {
    [changePath](state,data) { // 改变path
      state.config.path = data;
    },
    [alertShow](state,data) { // 改变alert");
      state.config.alertInfo.value= data.info;
      if(data.type){
        state.config.alertInfo.type= data.type;
      }else{
        state.config.alertInfo.type= 'err';
      }
      if(!state.config.alertInfo.flag){
        state.config.alertInfo.flag = true;
        setTimeout(()=>{state.config.alertInfo.flag=false},5000); // 两秒后关闭
      }
    },
    [menuTabIdShow](state,data) { // 改变path
      state.config.path = data;
    },
    [isPrivilege](state,data){
      state.config.menuAll = data;
    },
  [saveRe](state,data){
      state.config.tel = data.tel;
      state.config.password = data.password;
  }
  },

  actions: {
    [changePath]({commit},data){ // 改变path
		commit(changePath,data);
    },
    [alertShow]({commit},info){ // 改变alert
      commit(alertShow,info);
    },
    [menuTabIdShow]({commit},info){ // 改变id
      commit(menuTabIdShow,info);
    },
    // [registerTel]({commit},info){ // 改变id
    //   commit(registerTel,info);
    // },
    // [registerPassword]({commit},info){ // 改变id
    //   commit(registerPassword,info);
    // },
    [isPrivilege]({commit},datas){
      // 获取人员菜单遍历列表p2
        var forsmals={};
        forsmals.id = datas.id;
//      forsmals.user_id=18;
        $.ajax({
          type: "post",
          url: 'api/cgwas/privilegeInfoAction/isPrivilege.json',
          data:forsmals,
        }).then((response) => {
          console.log(response);
          if(response.state) {
            // this.all = response.data.list;
            var list=response.data.list;
            list.forEach((item) => {
              item.title = item.privilege_name;
              item.tab = item.privilege_url;
            });
            commit(isPrivilege,list);
            // session.save("menuTab",list);
          }
          //   this.all.forEach((item) => {
          //     item.title = item.privilege_name;
          //     item.tab = item.privilege_url;
          //   });
          //   if( this.all.length>8){
          //     this.mid = _.chunk( this.all,8)[0];
          //     this.right = _.chunk( this.all,8)[1];
          //   }else{
          //     this.mid = this.all;
          //   }
          //   this.tabFlag = this.mid[0].tab;
          //   this.searchContents();//请求数据
          //   this.searchQuan = true;//搜索数据
          // }
          else{
            var das={};
            das.info= response.message;
            //das.type='ok';
            this.$store.dispatch('alertShow',das);//错误提示框
            this.userManagement = false;//关闭内容窗口
            this.tabFlag = "";
            this.searchQuan = false;
            this.userTableShow=false;//员工tab隐藏
          }
        }).catch((response)=>{
          console.log(response.message)
        })
    },
    [saveRe]({commit},data){ // 保存注册账号密码
      commit(saveRe,data);
    }
  }

}
