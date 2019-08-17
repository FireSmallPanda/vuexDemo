<template>
  <div class="axios-page">
      <div><button @click="postForm">post方法</button></div>
      <div><button @click="putForm">put方法</button></div>
      <div><button @click="deleteForm">删除方法</button></div>
      <br />
      <div><button @click="toAxiosAll">跳转AXIOS并发请求</button></div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: "axios-page",
  data() {
    return {
      msg: "Welcome to Your Vue.js App"
    };
  },
  computed: {},
  methods: {
      // get 获取字典
      getDicts(){
          let form = {}
          form.id = '11'
          axios({
              method:'get',
              url:'/recommed/slide',
              parms:form
          }).then(res =>{
              console.log(res)
          })
      },
      // get 获取字典(第二种写法)
      getDicts2(){
          let form = {}
          form.id = '11'
          axios.get('https://www.woheyun.com/api/cgwas/systemAction/getSystemDicts.json',form).then((res) => {
            console.log(res)
            }).catch((err) => {
            console.log(err)
            })
      },
      // post 
      // form-data 表单提交(图片上传 文件上传)
      // application/json
      postForm(){
          let form = {}
          form.id = '11'

            // form-data
            let fromData = new FormData()
            for(let key in data){
                fromData.append(key,data[key])
                // 提交 fromData
            }

          axios.post('https://www.woheyun.com/api/cgwas/systemAction/getSystemDicts.json',form).then((res) => {
            console.log(res)
            }).catch((err) => {
            console.log(err)
            })
      },
      // put
      putForm(){
          let form = {}
          form.id = '11'
           axios.post('https://www.woheyun.com/api/cgwas/systemAction/getSystemDicts.json',form).then((res) => {
            console.log(res)
            }).catch((err) => {
            console.log(err)
            })
      },
      // delete
      deleteForm(){
          axios.delete('api/delete',{id:'11'}).then(res=>{
              console.log(res)
          })
      },
      // 跳转并发请求
      toAxiosAll(){
          this.$router.push("/axiosPageAll")
      }
  },
  mounted(){
      this.getDicts2()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
