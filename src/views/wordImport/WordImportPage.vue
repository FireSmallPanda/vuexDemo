<template>
  <div class="excelImport">
    <button @click="toImport">导入word</button>
    <word-import ref="uploadWordFile" @changeExcel="uploadWordFile" accept=".doc,.docx"></word-import>
  </div>
</template>

<script>
import WordImport from './WordImport';
export default {
  name: 'wordImportPage',
  data() {
    return {
      dataList: []
    };
  },

  methods: {
    // 获取数据
    uploadWordFile(data) {
      console.log('导出的数据', data);
      this.dataList = data;
    },
    toImport() {
      this.$refs.uploadWordFile.open();
    }
  },
  components: {
    WordImport
  }
};
</script>
