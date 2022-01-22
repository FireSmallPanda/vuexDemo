<template>
  <div class="filter-blur" >
      <div class="login-box">毛玻璃效果</div>
  </div>
</template>

<script>
export default {
  name: "filter-blur",

  data() {
    return {};
  },
  computed: {},
  methods: {
    
  },
  mounted() {
    
  }
};
</script>

<style lang="less" scoped>
.filter-blur{
  height: 100vh;
  background-image: url('https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e28727c5e4234ea99e8cbb58705e3d38~tplv-k3u1fbpfcp-zoom-crop-mark:1304:1304:1304:734.awebp?');
  background-repeat: no-repeat;
  background-size: 100%;
  .login-box{
    width: 400px;
    height: 250px;
    margin: 0 auto;
    margin-top: 200px;
    background-color: rgba(255, 255, 255, 0);
    backdrop-filter:blur(30px);
    box-shadow: 1px 1px 5px;
    border-radius: 4px;
  }
}
</style>
