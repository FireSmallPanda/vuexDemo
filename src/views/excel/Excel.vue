<template>
  <div id="excel">
    <table border>
      <tr>
        <th>ID</th>
        <th>名称</th>
        <th>登陆次数</th>
        <th>部门</th>
      </tr>
      <tr v-for="item in dataList" :key="item.id">
        <td>{{ item.id }}</td>
        <td>{{ item.name }}</td>
        <td>{{ item.loginTime }}</td>
        <td>{{ item.department }}</td>
      </tr>
    </table>

    <button @click="exportExcel">导出信息</button>
    <div class="season">
      <template v-for="(item, index) in seasonDatas">
        <div :key="index">
          {{ `第${index + 1}季度绩效` }}
          <table border>
            <tr>
              <th>名称</th>
              <th>绩效分</th>
            </tr>
            <tr v-for="(scoreItem, scoreindex) in item" :key="scoreindex">
              <td>{{ scoreItem.name }}</td>
              <td>{{ scoreItem.score }}</td>
            </tr>
          </table>
        </div>
      </template>
    </div>
    <button @click="exportSeason">导出绩效信息</button>

    <p><input type="number" v-model="rows" />行</p>
    <p><input type="number" v-model="cols" />列</p>
    <button @click="outPutBigData">导出自定义大小表格信息</button>
    <p>导出表格信息</p>
    <table border id="table-data">
      <tr>
        <td>1</td>
        <td>1</td>
        <td>1</td>
        <td>1</td>
      </tr>
      <tr>
        <td>2</td>
        <td>2</td>
        <td>2</td>
        <td>2</td>
      </tr>
    </table>
    <button @click="outPutIdTable">导出Id表格信息</button>
  </div>
</template>

<script>
export default {
  name: "excel",
  data() {
    return {
      dataList: [
        { name: "张明", loginTime: 16, id: 1, department: "生产部", sex: "男" },
        { name: "小金", loginTime: 11, id: 2, department: "生产部", sex: "女" },
        { name: "小凌", loginTime: 21, id: 3, department: "生产部", sex: "男" },
        { name: "盖伦", loginTime: 5, id: 4, department: "测试部", sex: "男" },
      ],
      seasonDatas: [
        [
          { name: "张明", score: 72 },
          { name: "小金", score: 21 },
          { name: "小凌", score: 16 },
          { name: "盖伦", score: 84 },
        ],
        [
          { name: "张明", score: 32 },
          { name: "小金", score: 54 },
          { name: "小凌", score: 45 },
          { name: "盖伦", score: 26 },
        ],
        [
          { name: "张明", score: 67 },
          { name: "小金", score: 87 },
          { name: "小凌", score: 45 },
          { name: "盖伦", score: 78 },
        ],
        [
          { name: "张明", score: 54 },
          { name: "小金", score: 34 },
          { name: "小凌", score: 26 },
          { name: "盖伦", score: 34 },
        ],
      ],
      rows: 100, // 行
      cols: 100, // 列
    };
  },
  computed: {},
  methods: {
    // 导出excel
    exportExcel() {
      // 引入文件
      const { export_json_to_excel } = require("vendor/Export2Excel.js");
      // 表头
      const tHeader = ["ID", "名称", "登陆次数", "部门"];
      // table表格中对应的属性名
      const filterVal = ["id", "name", "loginTime", "department"];
      // 表格绑定数据转json
      const data = this.formatJson(filterVal, this.dataList);
      export_json_to_excel(
        tHeader,
        data,
        "部门登陆信息" + new Date().toLocaleDateString()
      ); // 对应下载文件的名字
    },
    // 导出绩效信息excel
    exportSeason() {
      // 引入文件
      const { export_season_to_excel } = require("vendor/Export2Excel.js");
      // 表头
      const tHeader = ["名称", "绩效分"];
      // table表格中对应的属性名
      const filterVal = ["name", "score"];
      let datas = [];
      let sheets = [];
      this.seasonDatas.forEach((item, index) => {
        // 表格绑定数据转json
        datas.push(this.formatJson(filterVal, item));
        sheets.push(`第${index + 1}季度绩效`);
      });

      export_season_to_excel(
        tHeader,
        datas,
        "部门季度绩效" + new Date().toLocaleDateString(),
        sheets
      ); // 对应下载文件的名字
    },
    // 导出自定义数据
    outPutBigData() {
      // 引入文件
      const { export_json_to_excel } = require("vendor/Export2Excel.js");
      // 表头
      let tHeader = [];
      // table表格中对应的属性名
      let filterVal = [];
      // 需要导出的内容
      let pushData = [];
      // 自定义生成列
      for (let i = 0; i < this.cols * 1; i++) {
        tHeader.push(`第${i + 1}列数据`);
        filterVal.push(i);
      }
      // 生成自定义数据
      for (let j = 0; j < this.rows * 1; j++) {
        let pushObj = {};
        for (let i = 0; i < this.cols * 1; i++) {
          // 这边为展示数据不一致性设置为随机数
          pushObj[i] = Math.random();
        }
        // 插入一条数据
        pushData.push(pushObj);
      }
      // ---至此模拟后端请求数据结束---

      // 表格绑定数据转json
      const data = this.formatJson(filterVal, pushData);
      export_json_to_excel(
        tHeader,
        data,
        "自定义导出数据" + new Date().toLocaleDateString()
      ); // 对应下载文件的名字
    },
    // 导出列表格式化数据的方法
    formatJson(filterVal, jsonData) {
      return jsonData.map((v) => filterVal.map((j) => v[j]));
    },
    outPutIdTable() {
      // 引入文件
      const { export_table_to_excel } = require("vendor/Export2Excel.js");
      debugger;
      export_table_to_excel("table-data");
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#excel table {
  border-width: 1px;
}
.season {
  display: flex;
}
</style>
