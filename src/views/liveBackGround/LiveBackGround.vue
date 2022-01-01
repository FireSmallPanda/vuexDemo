<template>
  <div class="live-back-ground" >
      <span>小凌爱前端 Love You</span>
  </div>
</template>

<script>
export default {
  name: "liveBackGround",
  components: {},
  data() {
    return {
    }
  },
  computed: {},
  methods: {
   
  },
  mounted() {
    
  }
};
</script>

<style lang="less" scoped>

.live-back-ground{
    font-size: 15px;
    margin: 0;
    min-height: 100vh;
    background-color: #e4930d;
    background-image:radial-gradient(closest-side,rgba(235,105,78,1),rgba(235,105,78,0)),
    radial-gradient(closest-side,rgba(243,11,164,1),rgba(243,11,164,0)),
    radial-gradient(closest-side,rgba(254,234,131,1),rgba(254,234,131,0)),
    radial-gradient(closest-side,rgba(170,142,254,1),rgba(170,142,254,0)),
    radial-gradient(closest-side,rgba(248,192,147,1),rgba(248,192,147,0));
    background-size: 130vmax 130vmax,80vmax 80vmax,90vmax 90vmax,110vmax 110vmax,90vmax 90vmax;
    background-position: -80vmax -80vmax,60vmax -30vmax,10vmax 10vmax,-30vmax -10vmax,50vmax 50vmax;
    background-repeat: no-repeat;
    animation: 3s identifier linear infinite;
}
.live-back-ground::after{
    content:'';
    display: block;
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    backdrop-filter: blur(10px) ;
    -webkit-backdrop-filter: blur(10px);
}
span{
    position: relative;
    z-index: 10;
    display: flex;
    min-height: 100vh;
    width: 100%; 
    justify-content: center;
    align-items: center ;
    font-size: 5rem;
    color: transparent;
    text-shadow:0px 0px 1px rgba(255, 255, 255,.6),
    0px 4px 4px rgba(0, 0, 0,.05);

}
@keyframes identifier {
    0%,100%{
        background-size: 130vmax 130vmax,80vmax 80vmax,90vmax 90vmax,110vmax 110vmax,90vmax 90vmax;
        background-position: -80vmax -80vmax,60vmax -30vmax,10vmax 10vmax,-30vmax -10vmax,50vmax 50vmax;
    }
    25%{
        background-size: 100vmax 100vmax,90vmax 90vmax,100vmax 100vmax,90vmax 90vmax,60vmax 60vmax;
        background-position: -60vmax -90vmax,50vmax -40vmax,0vmax -20vmax,-40vmax -20vmax,40vmax 60vmax;
    }
}
</style>
