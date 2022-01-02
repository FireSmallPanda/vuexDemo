<template>
  <div class="child" >
    我是一个子组件
    <p @click="changeChildValue">更改传参</p>
  </div>
</template>

<script>
export default {
  name: "child",
  props:['childValue'],
  components: {},
  data() {
    return {
     
    }
  },
  computed: {},
  methods: {
   changeChildValue(){
       this.$emit('update:childValue', '子修改过的值')
   }
  },
  mounted() {
    
  }
};
</script>

<style lang="less" scoped>
.child{
    height: 50px;
    width: 150px;
    color: #FFF;
    background-color: coral;
}
</style>
