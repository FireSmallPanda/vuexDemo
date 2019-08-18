<template>
  <div class="axios-page">
    <div>
      取消请求
      <button @click="getDicts">get方法</button>
      <button @click="cancel">取消请求</button>
    </div>
  </div>
</template>

<script>
// axios实例
import axios from "axios";
export default {
  name: "axios-cancel",
  data() {
    return {
      instance:null,
      source:null 
    };
  },
  computed: {},
  methods: {
    // 初始化axios
   initAxios(){
      // 设置token
       this.source = axios.CancelToken.source()
       // 设置请求时间是 30s
       axios.defaults.timeout = 30000
   },
   // 请求
   getDicts(){
          let form = {}
          form.id = '11'
          axios.get('/recommed/data1',{
            cancelToken:this.source.token
          }).then((res) => {
            console.log(res)
            }).catch((err) => {
              
            console.log(err)
            })
    },
    // 取消请求
    cancel(){
      // 取消请求会到 .catch里
      this.source.cancel("你取消了请求")
    }
  },
  created(){
    this.initAxios()
  },
  mounted() {
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
