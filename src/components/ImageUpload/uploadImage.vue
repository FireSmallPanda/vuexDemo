<template src="./uploadImage.html"></template>
<style src="./uploadImage.less" lang="less" scoped></style>

<script>
import VueCropper from 'vue-cropperjs';
import 'cropperjs/dist/cropper.css';
export default {
  name: 'uploadImage',
  data() {
    return {
      // 裁切数据
      cropData: null,
      // input提交的文件
      file: null,
      // 图片url
      imageURL: null,
      setTime: null, // 节流
      visible: false,
    };
  },
  props: {
    // 允许上传的图片格式
    accept: {
      type: String,
      default: '.jpg,.jpeg,.png,.gif,.bmp',
    },
    // 裁切比例
    aspectRatio: {
      type: Number,
      default: null,
    },
    // 裁切输出的图片宽度
    width: {
      type: Number,
      default: 0,
    },
    // 裁切输出的图片高度
    height: {
      type: Number,
      default: 0,
    },
    maxWidth: {
      type: Number,
      default: 2560,
    },
    maxHeight: {
      type: Number,
      default: 1280,
    },
    cutWidth: {
      // 需要裁剪的宽度
      type: Number,
      default: 0,
    },
    cutHeight: {
      // 需要裁剪的高度
      type: Number,
      default: 0,
    },
    noCut: {
      // 是否不裁切直接上传
      type: Boolean,
      default: false,
    },
  },
  components: {
    VueCropper,
  },
  watch: {
    aspectRatio(val) {
      this.$refs.cropper.setAspectRatio(val);
    },
  },
  methods: {
    // 开启
    open() {
      this.$nextTick(() => {
        this.$refs.upload.click();
      });
    },

    /**
     * 获取文件的回调
     */
    handleFileChange(event) {
      this.visible = true;
      this.$nextTick(() => {
        this.file = event.target.files[0];
        // 判断上传必须是图片类型
        if (this.file && /^image\/\w+$/.test(this.file.type)) {
          let URL = window.URL || window.webkitURL;
          this.machWH(this.file);
          if (this.imageURL) {
            URL.revokeObjectURL(this.imageURL);
          }
          this.imageURL = URL.createObjectURL(this.file);
          this.$refs.cropper.replace(this.imageURL);
          return
        }
        console.error('上传的文件必须是图片类型')
      });
    },
    // 获取宽高 若裁剪的大小与上传图片的大小相同则不用裁剪
    machWH(file) {
      let that = this;
      let url = window.URL || window.webkitURL;
      let img = new Image(); // 手动创建一个Image对象
      img.src = url.createObjectURL(file); // 创建Image的对象的url
      img.onload = function () {
        if (this.width && this.height) {
          // 如果上传的图片和需要裁剪的大小正好相同则不用裁剪直接上传 || 如果是不裁切也是直接上传
          if ((that.cutWidth === this.width && that.cutHeight === this.height)  || that.noCut) {
            that.height === this.height;
            that.width === this.width;
            setTimeout(() => {
              // 直接提交
              that.clipperSubmit()
            }, 0);
          }
        }
      };
    },

    /**
     * 关闭窗口
     */
    closeCropper() {
      let URL = window.URL || window.webkitURL;
      URL.revokeObjectURL(this.imageURL);
      this.imageURL = null;
      this.file = null;
      this.$refs.cropper.clear();
      this.$refs.upload.value = '';
      this.visible = false;
    },

    /**
     * 获取裁切数据并上传
     */
    clipperSubmit() {
      let nowdate = new Date().getTime();
      // 节流 上传图片
      if (this.setTime) {
        if (nowdate - this.setTime < 3000) {
          return;
        } else {
          this.setTime = nowdate;
        }
      } else {
        this.setTime = nowdate;
      }
      let _blob = null;

      _blob = this.convertBase64UrlToBlob(
          this.$refs.cropper
            .getCroppedCanvas({
              width: this.width,
              height: this.height,
              maxWidth: this.maxWidth,
              maxHeight: this.maxHeight,
              imageSmoothingQuality: 'high',
            })
            .toDataURL('image/png')
        );
      this.doUpload(_blob);
    },
    // 执行文件上传
    async doUpload(_blob) {
      console.log(_blob);
      console.log(URL.createObjectURL(_blob))
      this.$emit('change', URL.createObjectURL(_blob));
    },

    /**
     * 获取裁切数据并上传
     * @param {string} urlData url数据
     */
    convertBase64UrlToBlob(urlData) {
      let bytes = window.atob(urlData.split(',')[1]); // 去掉url的头，并转换为byte
      // 处理异常,将ascii码小于0的转换为大于0
      let ab = new ArrayBuffer(bytes.length);
      let ia = new Uint8Array(ab);
      for (let i = 0; i < bytes.length; i++) {
        ia[i] = bytes.charCodeAt(i);
      }
      return new Blob([ab], {
        type: 'image/png',
      });
    },

    /**
     * 获取随机数
     */
    randomString() {
      let len = 32;
      let $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';
      let maxPos = $chars.length;
      let pwd = '';
      for (let i = 0; i < len; i++) {
        pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
      }
      return pwd;
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.$refs.upload.removeEventListener('change', this.handleFileChange);
      this.$refs.upload.addEventListener('change', this.handleFileChange);
    });
  },
  beforeDestroy() {
    console.log('beforeDestroy');
    this.$refs.upload.removeEventListener('change', this.handleFileChange);
  },
};
</script>
