<template>
  <div class="draggable" >
      <div>手机端组件</div>
      <div class="mobile-box">
          <div class="com-list">
            <!-- 拖拽 -->
            <vuedraggable class="wrapper"  v-model="mobileComList">
              <div class="com"  :class="{'active':activeId === item.id}" @click="slectCom(item)" v-for="item in mobileComList" :key="item.id">
                  <!-- 遍历组件 -->
                <component
                    :is="item.name"
                    :key="item.id"
                    :content="item.content"
                    skHight="180px"
                ></component>
              </div>
            </vuedraggable>
            <button @click="save">提交数据</button>
          </div>
          <div class="group-box">
              <div class="group">
                  本次迭代加班人员
                  <vuedraggable v-model="arr1" group="site" >
                    <transition-group>
                        <div class="item active" v-for="item in arr1" :key="item.id">{{item.name}}</div>
                    </transition-group>
                </vuedraggable>
              </div>
              <div class="group">
                  不参与本次迭代人员
                  <vuedraggable v-model="arr2" group="site" >
                    <transition-group>
                        <div class="item" v-for="item in arr2" :key="item.id">{{item.name}}</div>
                    </transition-group>
                </vuedraggable>
              </div>
              <div>
                  <button @click="savePeo">提交数据</button>
              </div>
          </div>
      </div>
  </div>
</template>

<script>
import common from "@/views/indexLive/index/common.js";
import vuedraggable from 'vuedraggable';
export default {
  name: "indexLive",
  components: { ...common ,vuedraggable},
  data() {
    return {
        // 手机端组件
      mobileComList:[
        {
          id: 4,
          name: "banner", // 所选用的组件
          content: { title: "banner图" }, // 传递给组件的参数
        },
        {
          id: 3,
          name: "menus",
          content: { title: "金刚区" },
        },
        {
          id: 1,
          name: "pics",
          content: { title: "图片组件", type: 1 },
        },
        {
          id: 5,
          name: "goods",
          content: { title: "商品区", type: 2 },
        }],
        activeId:-1, // 选中的组件id
        arr1:[{id:1,name:'小凌'},{id:2,name:'小铁'},{id:3,name:'小伟'},{id:4,name:'小涵'}],
        arr2:[{id:1,name:'酒桶'},{id:2,name:'木兰'},{id:3,name:'典韦'},{id:4,name:'瑞兹'}]
    };
  },
  computed: {},
  methods: {
      // 选择当前组件
    slectCom(obj){
        this.activeId = obj.id
    },
    // 保存数据
    save(){
        let saveList = []
        this.mobileComList.forEach(item => saveList.push(item.content.title));
        alert(saveList.join(','))
    },
    savePeo(){
        let saveList = [] // 参与本次迭代
        let noJoinList = [] // 不参与本次迭代
        this.arr1.forEach(item => saveList.push(item.name));
        this.arr2.forEach(item => noJoinList.push(item.name));
        alert(`参与本次迭代人员：${saveList.join(',')}; \n 不参与本次迭代人员：${noJoinList.join(',')}`)
    }
  },
  mounted() {
    
  }
};
</script>

<style lang="less" scoped>
.draggable{
    overflow: auto;
    height: 100vh;
    .mobile-box{
        .com-list{
           width: 375px;
           .com{
               border: 2px solid #FFF;
               &.active{
                   border: 2px dashed blueviolet;
               }
           }
        }
        
    }
    .group-box{
        display: flex;
        margin-bottom: 800px;
        margin-top: 300px;
        .group{
            width: 200px;
            padding: 20px;
           
            .item{
                 &.active{
                    background-color: blueviolet;
                    color: #FFF;
                }
                background-color: #CCC;
                margin-top: 8px;
            }
        }
    }
}
</style>
