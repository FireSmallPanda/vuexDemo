<template>
  <div class="axios-page">
    <div>
      实例
      <button @click="getDicts">get方法</button>
    </div>
  </div>
</template>

<script>
// axios实例
import axios from "axios";
export default {
  name: "axios-sl",
  data() {
    return {
      instance:null
    };
  },
  computed: {},
  methods: {
    // 初始化axios
   initAxios(){
       this.instance = axios.create({
           baseURL:"https://www.woheyun.com/", // base路径
           timeout:5000 // 5s内超时
       })
   },
   getDicts(){
          let form = {}
          form.id = '11'
          this.instance.get('api/cgwas/systemAction/getSystemDicts.json',form).then((res) => {
            console.log(res)
            }).catch((err) => {
            console.log(err)
            })
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
