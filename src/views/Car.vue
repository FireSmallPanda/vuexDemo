<template>
  <div class="hello">
    <div>页面A</div>
    <div>name1:{{name1}} name2:{{name2}}</div>
    <div><input type="text" v-model="demo.name2" /></div>
    <div><button @click="toGoods">发送</button></div>
  </div>
</template>

<script>
import {
    mapState,
    mapGetters,
    mapMutations
} from 'vuex';
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  computed: {
      ...mapState({
        demo: state => state.demo,
      }),
      ...mapGetters(['name1','name2']),
    },
   methods:{
       toGoods(){
           this.$store.dispatch('name2', this.demo.name2);
           this.$router.push("/goods")
       }
   }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
