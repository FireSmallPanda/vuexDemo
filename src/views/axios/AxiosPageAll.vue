<template>
  <div class="axios-page">
    <div>
      <button @click="getAllAxios">post方法</button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "axios-page",
  data() {
    return {
      msg: "Welcome to Your Vue.js App"
    };
  },
  computed: {},
  methods: {
    // get all并发请求
    getAllAxios() {
      axios
        .all([axios.get("/recommed/slide"), axios.get("/recommed/data1")])
        .then(axios.spread((...ress) => {
            console.log(ress)
        }));
    }
  },
  mounted() {
    this.getAllAxios();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
