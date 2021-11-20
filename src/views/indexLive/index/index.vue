<template>
  <div class="index-live">
    <div class="index-content">
      <!-- 遍历组件 -->
      <component
        :is="item.name"
        v-for="item in componentList"
        :key="item.id"
        :content="item.content"
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
        { id: 1, name: "pics", content: { title: "图片组件1", picType: 1 } },
        { id: 2, name: "pics", content: { title: "图片组件2", picType: 2 } }
      ]
    };
  },
  computed: {},
  methods: {}
};
</script>

<style scoped>
#index-live {
}
</style>
