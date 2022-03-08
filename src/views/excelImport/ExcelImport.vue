<template>
  <div class="excelImport">
    <input type="file" ref="upload" v-show="false" :accept="accept" />
  </div>
</template>
<script>
import XLSX from 'xlsx';
export default {
  name: 'excelImport',
  props: {
    accept: {
      // 允许上传的文件格式
      type: String,
      default: '.xls,.xlsx'
    },
    dataRow: {
      // 数据开始列 这个注意excel一定要有表头
      type: Number,
      default: 0,
      validator: val => {
        return val >= 0;
      }
    },
    valueMatch: {
      // 数据列 必须与excel中的表列顺序相对应
      type: Array
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
      this.handleReadExcel(event.target.files[0]);
    },
    // （重点）把文件按照二进制读取
    handleReadExcel(file) {
      const fileReader = new FileReader();
      fileReader.onload = ev => {
        try {
          const fileData = ev.target.result;
          const workbook = XLSX.read(fileData, {
            type: 'binary'
          });
          const wsname = workbook.SheetNames[0]; // 取第一张表(也可以取多个sheet)
          const snArr = XLSX.utils.sheet_to_json(workbook.Sheets[wsname]); // 生成json表格内容
          this.excelDataToJson(snArr);
        } catch (e) {
          console.log(e);
          return false;
        }
      };
      fileReader.readAsBinaryString(file);
    },
    // 表格数据转换
    excelDataToJson(arr) {
      let snArr = arr;
      let retn = []; // 如果数据不在第一列 则到相应列去取数据
      if (this.dataRow) {
        snArr = snArr.slice(this.dataRow, snArr.length);
      } // 如果不用匹配数据则直接返回原始数据
      if (!this.valueMatch || this.valueMatch.length === 0) {
        // 输出原始数据自己在组件外进行处理
        this.$emit('changeExcel', snArr);
        // 清空input值
        this.$refs.upload.value = null;
      } // 获取一个元素的key值（excel表格原始的key）
      let snKeys = Object.keys(snArr[0]);
      snArr.forEach(snItem => {
        let pushItem = {}; // 匹配我们传入的新属性
        this.valueMatch.forEach((item, index) => {
          pushItem[item] = snItem[snKeys[index]];
        });
        retn.push(pushItem);
      }); // 输出匹配后的数据
      this.$emit('changeExcel', retn);
      // 清空input值
      this.$refs.upload.value = null;
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
