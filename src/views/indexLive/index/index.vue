<template>
  <div class="index-live" id="scroll-box">
    <div class="index-content" id="index-content" ref="content">
      <!-- 遍历组件 -->
      <component
        :is="item.name"
        v-for="item in componentList"
        :key="item.id"
        :content="item.content"
        :skHight="item.skHight"
      ></component>
    </div>
  </div>
</template>

<script>
import common from "./common.js";
export default {
  name: "indexLive",
  components: { ...common },
  data() {
    return {
      // 组件内容
      componentList: [
        {
          id: 4,
          name: "banner", // 所选用的组件
          content: { title: "banner图" }, // 传递给组件的参数
          skHight: "180px" // 骨架屏
        },
        {
          id: 3,
          name: "menus",
          content: { title: "金刚区" },
          skHight: "180px"
        },
        {
          id: 1,
          name: "pics",
          content: { title: "图片组件1", type: 1 },
          skHight: "180px"
        },
        {
          id: 2,
          name: "pics",
          content: { title: "图片组件2", type: 2 },
          skHight: "180px"
        },

        {
          id: 5,
          name: "goods",
          content: { title: "商品区1", type: 2 },
          skHight: "180px"
        },
        {
          id: 6,
          name: "goods",
          content: { title: "商品区2" },
          skHight: "180px"
        },
        {
          id: 7,
          name: "goods",
          content: { title: "商品区3", type: 2 },
          skHight: "180px"
        },
        {
          id: 8,
          name: "goods",
          content: { title: "商品区4" },
          skHight: "180px"
        },
        {
          id: 9,
          name: "pics",
          content: { title: "图片组件3", type: 1 },
          skHight: "180px"
        },
        {
          id: 10,
          name: "pics",
          content: { title: "图片组件4", type: 2 },
          skHight: "180px"
        }
      ],
      showComponentList: [],
      initNum: 5 // 初始化显示几个
    };
  },
  computed: {},
  methods: {
    lazyLoad(index) {
      this.initData();
    },
    initData() {
      this.showComponentList = this.componentList.slice(0, this.initNum);
    },
    handleScroll(e) {
      let dom = document.getElementById("scroll-box");
      let scrollTop = dom.scrollTop || document.body.scrollTop;
      let clientHeight = dom.clientHeight;
      let scrollHeight = dom.scrollHeight;
      let bottomOfWindow = scrollTop + clientHeight >= scrollHeight - 100;
      if (bottomOfWindow) {
        if (this.initNum <= this.componentList.length + 1) {
          this.initNum = this.initNum + 1;
          this.lazyLoad(this.initNum);
        }
      }
    }
  },
  mounted() {
    this.initData();
    window.addEventListener("scroll", this.handleScroll, true);
  },
  destroyed() {
    window.removeEventListener("scroll", this.handleScroll);
  }
};
</script>

<style scoped>
#index-live {
}
#scroll-box {
  height: 100vh;
  overflow-y: auto;
}
</style>
