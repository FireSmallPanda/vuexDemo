<template>
  <div class="imgImport">
    <input type="file" ref="upload" v-show="false" :accept="accept" />
  </div>
</template>
<script>
import OSS from 'ali-oss';
let accessConfig = {
  // yourRegion填写Bucket所在地域。以华东1（杭州）为例，yourRegion填写为oss-cn-hangzhou。
  region: 'yourRegion',
  // 从STS服务获取的临时访问密钥（AccessKey ID和AccessKey Secret）。
  accessKeyId: 'xxx',
  accessKeySecret: 'xxx',
  // 从STS服务获取的安全令牌（SecurityToken）。
  stsToken: 'yourSecurityToken',
  // 填写Bucket名称。
  bucket: 'lwhimgupload'
};
export default {
  name: 'imgImport',
  props: {
    accept: {
      // 允许上传的文件格式
      type: String,
      default: '.jpg,.jpeg,.png'
    }
  },
  data() {
    return {};
  },
  methods: {
    cleanUpload() {
      // 清空input值
      this.$refs.upload.value = null;
    }, // 文件上传事件
    handleFileChange(event) {
      // 这边也可以封装成多个文件上传的形式 目前是单个文件
      this.picFileLoad(event.target.files[0]);
    },
    async picFileLoad(file) {
      const client = new OSS(accessConfig);
      try {
        // 填写Object完整路径。Object完整路径中不能包含Bucket名称。
        // 您可以通过自定义文件名（例如exampleobject.txt）或文件完整路径（例如exampledir/exampleobject.txt）的形式实现将数据上传到当前Bucket或Bucket中的指定目录。
        // data对象可以自定义为file对象、Blob数据或者OSS Buffer。
        const result = await client.put('test/exampleobject.txt', file);
        console.log(result);
      } catch (e) {
        console.log(e);
      }
    },
    // 打开上传
    open() {
      this.$nextTick(() => {
        this.$refs.upload.click();
      });
    }
  },
  mounted() {
    // 绑定更改事件监听
    this.$nextTick(() => {
      this.$refs.upload.removeEventListener('change', this.handleFileChange);
      this.$refs.upload.addEventListener('change', this.handleFileChange);
    });
  },
  beforeDestroy() {
    // 移除更改事件监听
    this.$refs.upload.removeEventListener('change', this.handleFileChange);
  }
};
</script>
