<template>
  <div class="excelImport">
    <button @click="toImport">导入Excel</button>
    <excel-import
      ref="uploadExamFile"
      @changeExcel="uploadExamFile"
      accept=".xls,.xlsx"
      :dataRow="1"
      :valueMatch="valueMatch"
    ></excel-import>
    <!-- 展示数据 -->
    <table border v-if="dataList && dataList.length > 0">
      <!-- 表头 -->
      <tr>
        <th v-for="hItem in valueTitle" :key="hItem">{{ hItem }}</th>
      </tr>
      <!-- 数据 -->
      <tr v-for="(item, index) in dataList" :key="index">
        <td v-for="jItem in valueMatch" :key="jItem">{{ item[jItem] }}</td>
      </tr>
    </table>
  </div>
</template>

<script>
import ExcelImport from "./ExcelImport";
export default {
  name: "excelImportPage",
  data() {
    return {
      valueMatch: ["name", "sex", "age", "phone", "department", "position"], // 数据列 必须与excel中的表列顺序相对应
      valueTitle: ["姓名", "性别", "年龄", "联系方式", "部门", "职位"],
      dataList: [],
    };
  },

  methods: {
    // 获取数据
    uploadExamFile(data) {
      console.log("导出的数据", data);
      this.dataList = data;
    },
    toImport() {
      this.$refs.uploadExamFile.open();
    },
  },
  components: {
    ExcelImport,
  },
};
</script>
