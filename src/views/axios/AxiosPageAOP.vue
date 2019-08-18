<template>
  <div class="axios-page">
    <div>
      拦截器
      <button @click="getDicts">get方法</button>
      <button @click="getDictsError">错误处理get方法</button>
      
    </div>
  </div>
</template>

<script>
// axios实例
import axios from "axios";
export default {
  name: "axios-aop",
  data() {
    return {
      instance:null
    };
  },
  computed: {},
  methods: {
    // 初始化axios(拦截器)
   initAxios(){
       // 请求拦截器
       axios.interceptors.request.use(config=>{
         // 在发送请求前
         return config
       },err =>{
         return Promise.reject(err)
       })
       // 相应拦截器
       axios.interceptors.response.use(res =>{
         // 返回到 .then
         return res
       },err=>{
         // 相应错误
         // 返回到 .catch
         return Promise.reject(err)
       })
      // 取消拦截器
      let interceptors =  axios.interceptors.request.use(config=>{
        // // 错误写法
        // config.headers = {
        //   auth:"123456",
        //   token:"asd"
        // }
      
        // 正确写法
        config.headers.auth = "123456"
        config.headers.token = "asd"
         // 在发送请求前
         return config
      })
      axios.interceptors.request.eject(interceptors)
   },
   initAxiosTest(){
      // 请求拦截器
      axios.interceptors.request.use(config=>{
        console.log(config)
        // 在发送请求前
        return config
      },err =>{
        return Promise.reject(err)
      })
      // 相应拦截器
      axios.interceptors.response.use(res =>{
        console.log(res)
        // 返回到 .then
        return res
      },err=>{
        // 相应错误
        // 返回到 .catch
        return Promise.reject(err)
      })
   }, 
   // 错误捕获实例
  initAxiosError(){
    // 创建一个实例
    this.instance = axios.create({})
    // 请求拦截器
    this.instance.interceptors.request.use(config=>{
      console.log(config)
      // 在发送请求前
      return config
    },err =>{
      // 错误捕获(400 404)
      // 弹窗
      return Promise.reject(err)
    })
    // 相应拦截器
    this.instance.interceptors.response.use(res =>{
      console.log(res)
      // 返回到 .then
      return res
    },err=>{
      // 相应错误 500 502
      // 返回到 .catch 弹窗
      return Promise.reject(err)
    })
   }, 
   getDicts(){
          let form = {}
          form.id = '11'
        axios.get('https://www.woheyun.com/api/cgwas/systemAction/getSystemDicts.json',form).then((res) => {
          console.log(res)
          }).catch((err) => {
          console.log(err)
          })
    },
    getDictsError(){
          let form = {}
          form.id = '11'
        this.instance.get('https://www.woheyun.com/api/cgwas/systemAction/getSystemDictsxxx.json',form).then((res) => {
          console.log(res)
          }).catch((err) => {
          console.log(err)
          })
    }
  },
  created(){
    this.initAxiosTest()
    // 初始化错误处理的实例
    this.initAxiosError()
  },
  mounted() {
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
