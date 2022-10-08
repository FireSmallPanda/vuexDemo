<template>
  <div class="box">
    <!-- 将可保存为图片的内容 通过一个 标签 框起来 -->
    <div :id="id">
        <!-- 需要导出的内容 -->
        <slot></slot>
    </div>
  </div>
</template>
<script>
//引入html2canvas
import html2canvas from 'html2canvas';
export default {
  name: "Html2Image",
  props: {
    id: { // id
      type: String,
      default: 'export-box',
    },
    filename: { // 导出文件名称
      type: String,
      default: 'htmlPic',
    },
    outType:{ // 导出类型
      type: String,
      default: 'png',
      validator(value) {
        return ['png', 'jpg', 'bmp','jpeg','gif'].includes(value)
      }
    },
    isFile: { // 是否为导出文件
      type: Boolean,
      default: false,
    },
    
  },
  methods: {
    //点击保存为Canvas
    onSaveCanvas(){
       // 这里的类名要与点击事件里的一样
        const canvas = document.querySelector(`#${this.id}`);
        let that = this;
        html2canvas(canvas,{scale:2,logging:false,useCORS:true}).then(function(canvas) {
          const type = that.outType;
          let imgData = canvas.toDataURL(type);
          
          // 图片格式处理
          let _fixType = function(type) {
            type = type.toLowerCase().replace(/jpg/i, 'jpeg');
            let r = type.match(/png|jpeg|bmp|gif/)[0];
            return 'image/' + r;
          };
          imgData = imgData.replace(_fixType(type),'image/octet-stream');
          if(!that.isFile){
              const retn = URL.createObjectURL(that.convertBase64ToBlob(imgData))
              that.$emit('onExport',retn)
              return retn
          }
          //  以bolb文件下载
          that.downFileToLocal(that.filename + '.' + type,that.convertBase64ToBlob(imgData))
        });
    },
    // base64转化为Blob对象
    convertBase64ToBlob(imageEditorBase64) {
      let base64Arr = imageEditorBase64.split(",");
      let imgtype = "";
      let base64String = "";
      if (base64Arr.length > 1) {
        //如果是图片base64，去掉头信息
        base64String = base64Arr[1];
        imgtype = base64Arr[0].substring(
          base64Arr[0].indexOf(":") + 1,
          base64Arr[0].indexOf(";")
        );
      }
      // 将base64解码
      let bytes = atob(base64String);
      //let bytes = base64;
      let bytesCode = new ArrayBuffer(bytes.length);
      // 转换为类型化数组
      let byteArray = new Uint8Array(bytesCode);
 
      // 将base64转换为ascii码
      for (let i = 0; i < bytes.length; i++) {
        byteArray[i] = bytes.charCodeAt(i);
      }
      // 生成Blob对象（文件对象）
      return new Blob([bytesCode], { type: imgtype });
    },
    // 下载Blob流文件
    downFileToLocal(fileName, blob) {
      // 创建用于下载文件的a标签
      const d = document.createElement("a");
      // 设置下载内容
      d.href = URL.createObjectURL(blob);
      // 设置下载文件的名字
      d.download = fileName;
      // 界面上隐藏该按钮
      d.style.display = "none";
      // 放到页面上
      document.body.appendChild(d);
      // 点击下载文件
      d.click();
      // 从页面移除掉
      document.body.removeChild(d);
      // 释放 URL.createObjectURL() 创建的 URL 对象
      window.URL.revokeObjectURL(d.href);
    },
  },
};
</script>
