<template>
  <div class="dom-2-image" id="dom-2-image">
    <!--保存图片-->
    <div class="savethepage" @click="cropCar">保存图片</div>
    <div class="save-html" >
        <p>需要保存的内容</p>
        <img src="src/assets/images/banner.png" width="100%" alt="图片"/>
    </div>
    <img :src="imgUrl" width="100%" alt="保存后的图片"/>
  </div>
</template>

<script>
import domtoimage from 'dom-to-image';

export default {
  name: "Dom2Image",
  components: { 
      
   },
  data() {
    return {
        boxdis:true,
        imgUrl:"",
    }
  },
  computed: {},
  methods: {
    boxClose(){
        this.boxdis = false;
        this.tests = true;
    },
    cropCar() {
        let self = this;
        // 获取dom结构
        //let card_target = this.refs.copyCardArea;
        let card_target = document.querySelector('.dom-2-image');
        console.log(card_target)
        domtoimage.toJpeg(card_target, { quality: 0.95 })
            .then(function (dataUrl) {
                self.imgUrl = dataUrl;
                self.boxdis = true;
            });
        this.tests=false
    },
  },
  mounted() {
    
  },
  destroyed() {
    
  }
};
</script>

<style scoped>
.savethepage{
    width: 20%;
    height: 1.3rem;
    text-align: center;
    font-size: 0.8rem;
    line-height: 1.3rem;
    border-radius: 0.3rem;
    color: white;
    background-color: #FC0019;
}
.mask{
    position:fixed;
    left:0;
    right:0;
    top:0;
    bottom:0;
    background:rgba(0,0,0,0.2);
}
.iclose{
    position:absolute;
    top:0;
    right:0;
    width:10%;
    height:10%;
    img {
        width: 100%;
        height: 100%;
    }
}
.mybox{
   position:fixed;
   top:5rem;
   width:85%;
   height:50%;
   margin:0 auto;
   left:0;
   right:0;
   text-align : center;
   background:#fff;
   border : 1px solid #000;
}
</style>
