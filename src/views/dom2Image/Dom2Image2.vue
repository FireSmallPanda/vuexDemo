<template>
  <div class="box">
    <!-- 将可保存为图片的内容 通过一个 标签 框起来 -->
    <div id="screenshot-box">
      <!-- 内容可以随意 -->
      <p>名称：<a-input v-model="formState.name" style="width:150px" /></p>
      <p>年龄：<a-input v-model="formState.age" style="width:150px" /></p>
      <p>
        班级：
        <a-radio-group v-model="formState.class">
          <a-radio value="1">班级1</a-radio>
          <a-radio value="2">班级2</a-radio>
        </a-radio-group>
      </p>
    </div>
    <a-button  @click="onSaveCanvas">保存为图片</a-button>
   
    <p><img :src="previewPic" alt="预览图片"></p>
    
    <a-button  @click="onPDFExport">导出为PDF</a-button>

    <div id="export-word">
      <table border >
        <tr>
          <th>姓名</th>
          <th>年龄</th>
        </tr>
        <tr>
          <td>贾维斯</td>
          <td>2</td>
        </tr>
      </table>
    </div>
    <a-button  @click="onWordExport">导出为word</a-button>
    <Html2Image ref="html2Image" @onExport="exportPic" >
      <div class="export-content" style="border: 1px solid #F0F;width:200px">
        <div>1</div>
        <div>2</div>
        <div>3</div>
      </div>
    </Html2Image>
    <a-button  @click="onExportImgByComponent">组件导出为图片</a-button>
    <p><img :src="previewPicComponent" alt="组件预览图片"></p>
    {{previewPic}}
    {{previewPicComponent}}
  </div>
</template>

<script>
//引入html2canvas
import html2canvas from 'html2canvas';
import htmlDocx from 'html-docx-js/dist/html-docx'
import jsPDF from "jspdf"
import Html2Image from '@/components/Html2Image/Html2Image.vue'

export default {
  name: "Dom2Image",
  components: { 
    Html2Image
  },
  data() {
    return {
      formState:{},
      previewPic:"",
      previewPicComponent:""
    }
  },
  computed: {},
  methods: {
    //点击保存为Canvas
    onSaveCanvas(){
       // 这里的类名要与点击事件里的一样
        const canvas = document.querySelector('#screenshot-box');
        let that = this;
        html2canvas(canvas,{scale:2,logging:false,useCORS:true}).then(function(canvas) {
          const type = 'png';
          let imgData = canvas.toDataURL(type);
          
          // 图片格式处理
          let _fixType = function(type) {
            type = type.toLowerCase().replace(/jpg/i, 'jpeg');
            let r = type.match(/png|jpeg|bmp|gif/)[0];
            return 'image/' + r;
          };
          imgData = imgData.replace(_fixType(type),'image/octet-stream');
          let filename = "htmlImg" + '.' + type;
          //  以bolb文件下载
          // that.downFileToLocal(filename,that.convertBase64ToBlob(imgData))
          // console.log(URL.createObjectURL(that.convertBase64ToBlob(imgData)))
          that.previewPic = URL.createObjectURL(that.convertBase64ToBlob(imgData));
          // // 保存为文件
          // that.saveFile(imgData,filename);
        });
    },
    // 保存为文件
    saveFile(data, filename){
        let save_link = document.createElementNS('http://www.w3.org/1999/xhtml', 'a');
        save_link.href = data;
        save_link.download = filename;
        console.log(filename)
        return 
        let event = document.createEvent('MouseEvents');
        event.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
        save_link.dispatchEvent(event);
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
    // 导出为word
    onWordExport(){
        let contentHtml = document.getElementById("export-word").innerHTML;
        const cssHTML = `table {
                          width: 200px;
                          border: 1px solid #ccc;
                          color:red;
                        }`
        let content = `<!DOCTYPE html><html>
            <head>
                <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
                <style>
                    ${cssHTML}
                </style>
            </head>
            <body>
                ${contentHtml}
            </body>
            </html>`
        let converted = htmlDocx.asBlob(content,{orientation:"landscape"});
        this.downFileToLocal('word文件名.docx',converted)
    },
    // 导出为PDF
    onPDFExport(){
      const canvas = document.querySelector('#screenshot-box');
      html2canvas(canvas).then(function(canvas) {
        let contentWidth = canvas.width;
            let contentHeight = canvas.height;
            //一页pdf显示html页面生成的canvas高度;
            let pageHeight = contentWidth / 592.28 * 841.89;
            //未生成pdf的html页面高度
            let leftHeight = contentHeight;
            //页面偏移
            let position = 0;
            //a4纸的尺寸[595.28,841.89]，html页面生成的canvas在pdf中图片的宽高
            let imgWidth = 595.28;
            let imgHeight = 592.28/contentWidth * contentHeight;

            let pageData = canvas.toDataURL('image/jpeg', 1.0);

            let pdf = new jsPDF('', 'pt', 'a4');

            //有两个高度需要区分，一个是html页面的实际高度，和生成pdf的页面高度(841.89)
            //当内容未超过pdf一页显示的范围，无需分页
            if (leftHeight < pageHeight) {
              pdf.addImage(pageData, 'JPEG', 0, 0, imgWidth, imgHeight );
            } else {
              while(leftHeight > 0) {
                  pdf.addImage(pageData, 'JPEG', 0, position, imgWidth, imgHeight)
                  leftHeight -= pageHeight;
                  position -= 841.89;
                  //避免添加空白页
                  if(leftHeight > 0) {
                    pdf.addPage();
                  }
              }
            }
            pdf.save('content.pdf');
      })
    },
    exportPic(baseUrl){
      this.previewPicComponent = baseUrl;
    },
    // 以组件形式导出
    onExportImgByComponent(){
      this.previewPicComponent =this.$refs.html2Image.onSaveCanvas()
    },
  },
  mounted() {
    
  },
  destroyed() {
    
  }
};
</script>

<style scoped>
.export-content{
  color: red;
}
</style>
