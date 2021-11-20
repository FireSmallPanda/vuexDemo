<template>
  <div id="id-index">
    <div
      class="link-item"
      v-for="(item, index) in links"
      :key="index"
      @click="toLink(item)"
    >
      {{ item.name }}
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
        { text: "vuex导出Excel", name: "excel" },
        { text: "自定义的首页", name: "indexLive" }
      ]
    };
  },
  computed: {},
  methods: {
    // 跳转链接
    toLink(item) {
      this.$router.push({ name: item.name });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
