<template>
  <div class="modifier" id="modifier" @scroll.passive="onScroll" >
    <p>lazy</p>
    <input type="text" v-model.lazy="lazyValue">
    <div>{{lazyValue}}</div>
    <p>trim</p>
    <input type="text" v-model.trim="trimValue">
    <div>{{trimValue}}</div>

    <p>number</p>
    <input type="text" v-model.number="numberValue">
    <div>{{numberValue}}</div>
    <!-- 保留两位小数的价格 -->
    <input type="text" onkeyup="value=value.replace(/^\D*(\d*(?:\.\d{0,2})?).*$/g, '$1')" > 
    


    <p>stop</p>
    <div class="out-box" @click="clickEvent(2)" >
        触发输出2
        <div class="in-box" @click.stop="clickEvent(1)">触发输出1</div>
    </div>

    <p>capture</p>
    <div class="out-box" @click.capture="clickEvent(2)" >
        触发输出2
        <div class="in-box" @click="clickEvent(1)">触发输出1</div>
    </div>
    <p>self</p>
    <div class="out-box" @click.self="clickEvent(2)" >
        触发输出2
        <div class="in-box" @click="clickEvent(1)">触发输出1</div>
    </div>

    <p>once</p>
    <div class="out-box" @click="clickEvent(2)" >
        触发输出2
        <div class="in-box" @click.once="clickEvent(1)">触发输出1</div>
    </div>

    <p>prevent</p>
    <a href="http://www.w3school.com.cn" @click.prevent="clickEvent(1)">点击A标签</a>
    <p>native</p>
    <!--子组件要是没有emit click事件 就执行不了--> 
    <Child @click="clickEvent(1)"></Child>
    <!--可以执行-->  
    <Child @click.native="clickEvent(1)"></Child>
    
    <p>.left，.right，.middle</p>
    <div class="out-box" @click.left="clickEvent('left')" @click.middle="clickEvent('middle')" @click.right="clickEvent('right')">鼠标各键触发</div>

    <p>.passive</p>
    
    
    <p>.sync</p>
    {{trimValue}}
    <!-- <Child  :childValue="trimValue" @changeChildValue="value=>trimValue = value"></Child> -->
    <Child  :childValue.sync="trimValue" ></Child>

    <p>.keyCode</p>
    <input type="text" value="enter" @keyup.enter="clickEvent('enter')">
    <input type="text" value="delete" @keyup.delete="clickEvent('delete')">
    <input type="text" value="space" @keyup.space="clickEvent('space')">
    <div style="height:1000px"></div>
  </div>
</template>

<script>
import Child  from '@/views/modifier/Child.vue'

export default {
  name: "modifier",
  components: {
      Child
  },
  data() {
    return {
        lazyValue:"100",
        trimValue:"100",
        numberValue:"100"
    }
  },
  computed: {},
  methods: {
    // 点击事件
   clickEvent(num){
       console.log('出发输出:'+num);
   },
   onScroll(){
        let dom = document.querySelector("#modifier");
         var t = dom.scrollTop || document.body.scrollTop;
        console.log(t)
   }
  },
  mounted() {
   
  }
};
</script>

<style lang="less" scoped>
.modifier{
    padding: 20px;
    overflow-y: auto;
    height: 100vh;
    p{
        margin-top: 20px;
    }
    .out-box{
        background-color: skyblue;
        height: 200px;
        width: 200px;
        display: flex;
        align-items: center;
        justify-content: center;
        .in-box{
            color: #FFF;
            background-color: blue;
            height: 100px;
            width: 100px;
        }
    }
}
</style>
