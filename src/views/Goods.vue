<template>
  <div class="hello">
    <div>页面B</div>
    <div>name1:{{name1}} name2:{{name2}}</div>
    <div><input type="text" v-model="demo.name1" /></div>
    <div><button @click="toCar">发送</button></div>
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
       toCar(){
           this.$store.dispatch('name1', this.demo.name1);
           this.$router.push("/")
       }
   }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
