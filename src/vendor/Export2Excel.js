/* eslint-disable */
require('script-loader!file-saver');
// require('script-loader!./Blob');
require('script-loader!xlsx-style/dist/xlsx.core.min');
require('script-loader!xlsx-style/xlsx');

// 设置表格中cell默认的字体，居中，颜色等
/**
{ auto: 1} specifying automatic values
{ rgb: "FFAA00" } specifying a hex ARGB value
{ theme: "1", tint: "-0.25"} specifying an integer index to a theme color and a tint value (default 0)
{ indexed: 64} default value for fill.bgColor
 */
const defaultCellStyle = {
  font: { name: "宋体", sz: 11, color: { rgb: "000000" } },
  border: {
    color: { auto: 1 }
  },
  alignment: {
    /// 自动换行
    wrapText: 1,
    // 居中
    horizontal: "center",
    vertical: "center",
    indent: 0
  }
};

// 从json转化为sheet，xslx中没有aoaToSheet的方法，该方法摘自官方test
function sheet_from_array_of_arrays(data) {
  const ws = {};
  const range = { s: { c: 10000000, r: 10000000 }, e: { c: 0, r: 0 } };
  for (let R = 0; R !== data.length; ++R) {
    for (let C = 0; C !== data[R].length; ++C) {
      if (range.s.r > R) range.s.r = R;
      if (range.s.c > C) range.s.c = C;
      if (range.e.r < R) range.e.r = R;
      if (range.e.c < C) range.e.c = C;

      // 这里生成cell的时候，使用上面定义的默认样式
      const cell = { v: data[R][C], s: defaultCellStyle };
      if (cell.v == null) continue;
      const cell_ref = XLSX.utils.encode_cell({ c: C, r: R });

      /* TEST: proper cell types and value handling */
      if (typeof cell.v === 'number') cell.t = 'n';
      else if (typeof cell.v === 'boolean') cell.t = 'b';
      else if (cell.v instanceof Date) {
        cell.t = 'n'; cell.z = XLSX.SSF._table[14];
        cell.v = dateNum(cell.v);
      }
      else cell.t = 's';
      ws[cell_ref] = cell;
    }
  }

  /* TEST: proper range */
  if (range.s.c < 10000000) ws['!ref'] = XLSX.utils.encode_range(range);

  // 自适应宽度

  return ws;
}

export function formatJson(filterVal, jsonData) {
  return jsonData.map(v => filterVal.map(j => v[j]))
}

function Workbook() {
  if (!(this instanceof Workbook)) return new Workbook();
  this.SheetNames = [];
  this.Sheets = {};
}

function s2ab(s) {
  var buf = new ArrayBuffer(s.length);
  var view = new Uint8Array(buf);
  for (var i = 0; i != s.length; ++i) view[i] = s.charCodeAt(i) & 0xff;
  return buf;
}
export function export_table_to_excel(id) {
  var theTable = document.getElementById(id);

  var oo = generateArray(theTable);
  var ranges = oo[1];
  /* original data */
  var data = oo[0];
  var ws_name = 'SheetJS';
  console.log(data);
  var wb = new Workbook(),
    ws = sheet_from_array_of_arrays(data);
  /* add ranges to worksheet */
  // ws['!cols'] = ['apple', 'banan'];
  ws['!merges'] = ranges;
  /* add worksheet to workbook */
  wb.SheetNames.push(ws_name);
  wb.Sheets[ws_name] = ws;
  ws['!cols'] = [{ wch: 4 }, { wch: 8 }];
  var wbout = XLSX.write(wb, {
    bookType: 'xlsx',
    bookSST: false,
    type: 'binary',
  });
  saveAs(
    new Blob([s2ab(wbout)], {
      type: 'application/octet-stream',
    }),
    'test.xlsx'
  );
}
/**
 * 计算表格宽度
 * @param {*} th 
 * @param {*} ws 
 * @returns 
 */
function matchWidth(th) {
  let retn = []
  console.log(th);
  th.forEach(element => {
    retn.push({ wch: (element + "").length * 2 })
  });
  return retn
}

/**
 * 多sheet导出
 * @param {Array} th 表头
 * @param {Array} jsonDatas 数据集 
 * @param {String} defaultTitle 导出的excel名称
 * @param {Array} sheetNames sheet名称集
 */
export function export_season_to_excel(th, jsonDatas, defaultTitle, sheetNames) {
  var wb = new Workbook()
  jsonDatas.forEach((item, index) => {
    var data = item;
    data.unshift(th);
    var ws_name = sheetNames[index];
    var ws = sheet_from_array_of_arrays(data);
    /* add worksheet to workbook */
    wb.SheetNames.push(ws_name);
    wb.Sheets[ws_name] = ws;
  })
  var wbout = XLSX.write(wb, {
    bookType: 'xlsx',
    bookSST: false,
    type: 'binary'
  });
  var title = defaultTitle || '列表'
  saveAs(new Blob([s2ab(wbout)], {
    type: "application/octet-stream"
  }), title + ".xlsx")
}

export function export_json_to_excel(th, jsonData, defaultTitle) {
  /* original data */
  var data = jsonData;
  data.unshift(th);
  var ws_name = 'sheet1';
  var wb = new Workbook(),
    ws = sheet_from_array_of_arrays(data);
  /* add worksheet to workbook */
  th.push()
  // 自适应宽度再这里设置
  // ws['!cols'] = matchWidth(th)//  [{wch:100},{wch:200}];
  wb.SheetNames.push(ws_name);
  wb.Sheets[ws_name] = ws;

  var wbout = XLSX.write(wb, {
    bookType: 'xlsx',
    bookSST: false,
    type: 'binary',
  });
  var title = defaultTitle || '列表';
  saveAs(
    new Blob([s2ab(wbout)], {
      type: 'application/octet-stream',
    }),
    title + '.xlsx'
  );
}
