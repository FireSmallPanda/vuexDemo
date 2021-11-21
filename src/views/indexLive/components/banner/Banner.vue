<template>
  <div class="banner">
    <div class="banner-content" v-if="dataList">
      <img src="@/assets/images/Banner.png" alt="图片" />
    </div>

    <!-- 骨架屏 -->
    <div class="skeleton-content" :style="{ height: skHight }" v-else>
      <div class="skeleton-item" :style="{ height: skHight }"></div>
    </div>
  </div>
</template>

<script>
import "@/views/indexLive/index/common.css";
export default {
  name: "Banner",
  props: {
    content: {
      type: Object,
      required: true,
      default: () => {
        return {};
      }
    },
    skHight: {
      type: "",
      required: true,
      default: "100px"
    }
  },
  data() {
    return {
      times: null, // 计时器
      dataList: null // 从后端请求的数据
    };
  },
  computed: {},
  methods: {
    getData() {
      this.times = setTimeout(() => {
        this.dataList = [
          {
            name: "后端请求的数据"
          }
        ];
        console.log(`${this.content.title}数据加载完成`);
      }, 1000);
    }
  },
  mounted() {
    this.getData();
  },
  beforeDestroy() {
    if (this.times) {
      clearTimeout(this.times);
    }
  }
};
</script>

<style scoped>
.banner {
  width: 100%;
}
.banner img {
  width: 100%;
}
</style>
