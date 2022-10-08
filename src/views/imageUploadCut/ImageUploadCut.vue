<template>
  <div class="image-cut" id="image-cut">
        <!-- 图片上传比例 -->
        <upload-image ref="uploadImage" :aspectRatio="fm / fz" @change="uploadCoursePic"></upload-image>
        <p>裁切比例分母:<a-input style="width:200px" v-model="fm" placeholder="请输入比分母"/></p>
        <p>裁切比例分子:<a-input style="width:200px" v-model="fz"  placeholder="请输入比分子" /></p>
        <a-button @click="openUploadImage('uploadImage')">打开按比例图片上传</a-button>
        <!-- 图片上传固定宽高 -->
        <upload-image ref="uploadImageFixed" :cutWidth="+cutWidth" :cutHeight="+cutHeight" @change="uploadCoursePic" :proportion="true" ></upload-image>
        <p>裁切比例宽度(px):<a-input style="width:200px" v-model="cutWidth" placeholder="请输入宽度"/></p>
        <p>裁切比例高度(px):<a-input style="width:200px" v-model="cutHeight"  placeholder="请输入高度" /></p>
        <a-button @click="openUploadImage('uploadImageFixed')">打开固定宽高图片上传</a-button>
        <div>
          <p>裁剪后的预览图片</p>
          <img style="height: 200px" :src="imageSrc" alt="预览图片">
        </div>
  </div>
</template>

<script>
import uploadImage from '@/components/ImageUpload/uploadImage.vue'
export default {
  name: "ImageUploadCut",
  components: { 
      uploadImage
   },
  data() {
    return {
        imageSrc:'',
        fm:1, // 分母
        fz:1, // 分子
        cutWidth:0, // 需要裁切的宽度
        cutHeight:0, // 需要裁切的高度
    };
  },
  computed: {},
  methods: {
    uploadCoursePic(src){
      this.imageSrc = src
    },
    // 打开图片上传
    openUploadImage(refType) {
      this.$refs[refType].open();
    },
  },
  mounted() {
    
  },
  destroyed() {
    
  }
};
</script>

<style scoped>

</style>
