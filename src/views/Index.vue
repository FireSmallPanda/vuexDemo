<template>
  <div id="id-index">
    <div
      class="link-item"
      v-for="(item, index) in links"
      :key="index"
      @click="toLink(item)"
    >
      {{ item.text }}
    </div>
  </div>
</template>

<script>
export default {
  name: "Index",
  data() {
    return {
      links: [
        { text: "vuex", name: "car" },
        { text: "vue导出Excel", name: "excel" },
        { text: "自定义的首页", name: "indexLive" },
        { text: "可拖拽的组件", name: "draggable" },
        { text: "动画背景", name: "liveBackGround" },
        { text: "Vue修饰符", name: "modifier" },
        { text: "毛玻璃", name: "filterBlur" },
        { text: "vue导入Excel", name: "excelImportPage" },
      ],
    };
  },
  computed: {},
  methods: {
    // 跳转链接
    toLink(item) {
      this.$router.push({ name: item.name });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
